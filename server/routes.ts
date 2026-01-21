import { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendAdminNotification, sendUserConfirmation, sendPersonalizedReply } from './services/email.ts';
import { syncAllImages } from "./utils/imageSync.ts";
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
// ... existing code ...
import { db, pool } from "./db";
import { products, productImages, brands, productCategories, productSizes } from "@shared/schema";
import { eq, and, inArray, sql } from "drizzle-orm";
import Stripe from "stripe";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
  import crypto from "crypto";

const supabaseAdmin = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt}:${buf.toString("hex")}`;
}

function verifyPassword(password: string, stored: string): boolean {
  if (typeof stored !== "string") return false;
  if (stored.startsWith("scrypt:")) {
    const parts = stored.split(":");
    if (parts.length !== 3) return false;
    const salt = parts[1];
    const hash = parts[2];
    const buf = crypto.scryptSync(password, salt, 64).toString("hex");
    return buf === hash;
  }
  return stored === password;
}
const supabaseAnon = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
  ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

async function getAuthFromToken(req: Request): Promise<{ id: string; email?: string; isAdmin: boolean; firstName?: string; lastName?: string; phone?: string; address?: string; city?: string; postalCode?: string; province?: string; country?: string } | null> {
  const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
  const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
  if (!token) return null;
  let uid: string | undefined;
  let email: string | undefined;
  let isAdmin = false;
  let firstName: string | undefined = undefined;
  let lastName: string | undefined = undefined;
  let phone: string | undefined = undefined;
  let address: string | undefined = undefined;
  let city: string | undefined = undefined;
  let postalCode: string | undefined = undefined;
  let province: string | undefined = undefined;
  let country: string | undefined = undefined;
  let verifiedByAdmin = false;
  
  if (supabaseAdmin) {
    try {
      const r = await (supabaseAdmin as any).auth.getUser(token);
      if (!r.error && r.data?.user) {
        uid = r.data.user.id;
        email = r.data.user.email || undefined;
        verifiedByAdmin = true;
        // console.log(`[AUTH] Token verified via supabaseAdmin for ${email}`);
        try {
          const p = await (supabaseAdmin as any).from("users").select("id,email,is_admin,first_name,last_name,phone").eq("id", uid).limit(1).maybeSingle();
          if (p?.data) {
            email = p.data.email || email;
            isAdmin = !!p.data.is_admin;
            firstName = p.data.first_name;
            lastName = p.data.last_name;
            phone = p.data.phone;
          }
          const a = await (supabaseAdmin as any).from("user_addresses").select("street,city,cap,province,country").eq("user_id", uid).limit(1).maybeSingle();
          if (a?.data) {
            address = a.data.street;
            city = a.data.city;
            postalCode = a.data.cap;
            province = a.data.province;
            country = a.data.country;
          }
        } catch (e) {}
      }
    } catch (e) {}
  }
  
  if (!verifiedByAdmin) {
    try {
      const parts = token.split(".");
      if (parts.length >= 2) {
        let payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        while (payloadB64.length % 4 !== 0) payloadB64 += "=";
        const json = Buffer.from(payloadB64, "base64").toString("utf8");
        const payload = JSON.parse(json);
        const exp = typeof payload.exp === "number" ? payload.exp : 0;
        const nowSec = Math.floor(Date.now() / 1000);
        const tolerance = 60;
        if (!exp || exp > (nowSec - tolerance)) {
          uid = String(payload.sub || payload.user_id || "");
          email = typeof payload.email === "string" ? payload.email : undefined;
          console.log(`[AUTH] Token decoded (fallback) for ${email}. Exp: ${exp}, Now: ${nowSec}, uid=${uid}`);

          // CRITICAL FIX: Query database anche nel fallback per avere isAdmin, firstName, lastName
          console.log(`[AUTH] Fallback - supabaseAdmin exists: ${!!supabaseAdmin}, uid: ${uid}`);
          if (supabaseAdmin && uid) {
            try {
              console.log(`[AUTH] Fallback - Executing DB query for uid: ${uid}`);
              const dbUser = await (supabaseAdmin as any)
                .from("users")
                .select("is_admin,first_name,last_name,phone,email")
                .eq("id", uid)
                .maybeSingle();

              console.log(`[AUTH] Fallback - DB query result:`, dbUser);
              if (dbUser?.data) {
                isAdmin = !!dbUser.data.is_admin;
                firstName = dbUser.data.first_name;
                lastName = dbUser.data.last_name;
                phone = dbUser.data.phone;
                email = dbUser.data.email || email;
                console.log(`[AUTH] Fallback DB query: isAdmin=${isAdmin}, firstName=${firstName}, lastName=${lastName}`);
              } else {
                console.log(`[AUTH] Fallback - No data returned from DB or error:`, dbUser?.error);
              }
            } catch (dbErr) {
              console.error("[AUTH] Fallback DB query error:", dbErr);
            }
          } else {
            console.log(`[AUTH] Fallback - Skipping DB query. supabaseAdmin: ${!!supabaseAdmin}, uid: ${uid}`);
          }
        } else {
           console.log(`[AUTH] Token expired (fallback). Exp: ${exp}, Now: ${nowSec}`);
        }
      }
    } catch (e) {}
  }
  if (!uid) return null;
  return {
    id: uid,
    email,
    isAdmin,
    firstName,
    lastName,
    phone,
    address,
    city,
    postalCode,
    province,
    country
  };
}

async function buildCartItem(
  productId: number,
  variant: string,
  quantity: number,
  price: number
) {
  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!product) {
    throw new Error("Product not found");
  }
  const [primaryImg] = await db
    .select()
    .from(productImages)
    .where(and(eq(productImages.productId, product.id), eq(productImages.isPrimary, true)))
    .limit(1);

  const imageUrl = primaryImg?.src
    ? (primaryImg.src.startsWith('/images/') || primaryImg.src.startsWith('/attached_assets/')
        ? primaryImg.src
        : `/images/products/${primaryImg.src}`)
    : undefined;

  return {
    id: productId.toString(),
    name: product.name,
    price: price,
    variant,
    quantity,
    image: imageUrl,
  };
}

export async function registerRoutes(app: Express): Promise<Server> {

  // ================================
  // SESSION CONFIGURATION
  // ================================
  
  console.log('🔧 [SESSION] Configurazione middleware di sessione con PostgreSQL...');
  const maxAgeMs = Number(process.env.SESSION_MAX_AGE_MS || (30 * 24 * 60 * 60 * 1000));
  console.log(`🔧 [SESSION] Cookie MaxAge: ${maxAgeMs}ms`);
  const isProduction = process.env.NODE_ENV === 'production';
  const isLocal = (
    process.env.NODE_ENV !== 'production' ||
    String(process.env.HOST || process.env.APP_URL || process.env.ORIGIN || process.env.BASE_URL || '')
      .includes('localhost')
  );
  // Prefer explicit opt-in for secure cookies; never set secure on localhost
  const useSecureCookies = !isLocal && (
    process.env.COOKIE_SECURE === 'true' || (isProduction && process.env.COOKIE_SECURE !== 'false')
  );
  console.log(`🔧 [SESSION] Secure Cookie: ${useSecureCookies} (NODE_ENV=${process.env.NODE_ENV}, isLocal=${isLocal})`);
  const sameSiteEnv = String(process.env.COOKIE_SAMESITE || 'lax').toLowerCase();
  let sameSiteOpt: 'lax' | 'strict' | 'none' = sameSiteEnv === 'none' ? 'none' : (sameSiteEnv === 'strict' ? 'strict' : 'lax');
  if (sameSiteOpt === 'none' && !useSecureCookies) {
    console.warn('🔧 [SESSION] SameSite=None richiede Secure; fallback a Lax su ambiente non sicuro');
    sameSiteOpt = 'lax';
  }
  
  const pgSession = connectPgSimple(session);
  
  app.use(session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true,
      pruneSessionInterval: 60 * 60 * 24 // Prune expired sessions every 24 hours
    }),
    secret: process.env.SESSION_SECRET || 'big-gimmy-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      maxAge: maxAgeMs,
      secure: useSecureCookies,
      httpOnly: true,
      sameSite: sameSiteOpt,
      path: '/',
      domain: process.env.COOKIE_DOMAIN && process.env.COOKIE_DOMAIN.length > 0 ? process.env.COOKIE_DOMAIN : undefined
    },
    rolling: true, // Refreshes cookie on every response
    name: 'biggimmy-session'
  }));

  console.log('✅ [SESSION] Middleware di sessione PostgreSQL configurato');

  // ================================
  // AUTHENTICATION & SESSION ROUTES
  // ================================

  // Helper per evitare caching delle risposte di auth
  const noCache = (res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  };

  // Middleware di autenticazione unificato (Token + Session)
  const ensureAuth = async (req: Request, res: Response, next: Function) => {
    try {
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      console.log(`[AUTH] ensureAuth headers: Authorization present=${!!authHdr}, Cookie present=${!!(req.headers as any)["cookie"]}`);
      // 1. Check Token (Supabase)
      const tokenAuth = await getAuthFromToken(req);
      if (tokenAuth) {
        console.log(`[AUTH] Token verificato per utente: ${tokenAuth.email}`);
        (req as any).user = { 
          ...tokenAuth, 
          authenticated: true,
          firstName: (tokenAuth as any).firstName,
          lastName: (tokenAuth as any).lastName
        };
        // PROACTIVE FIX: Se il token è valido, aggiorniamo anche la sessione cookie per evitare loop
        if (req.session) {
           const now = new Date().toISOString();
           const sessUser = (req.session as any).user;
           if (!sessUser || sessUser.id !== tokenAuth.id) {
               (req.session as any).user = {
                   ...tokenAuth,
                   authenticated: true,
                   loginTime: now,
                   updatedAt: now
               };
               (req.session as any).siteAccessGranted = true;
               req.session.save((err) => {
                   if (err) console.error("[AUTH] Error syncing session from token:", err);
               });
           }
        }
        return next();
      }

      // 2. Check Session (Cookie)
      const sessionUser = (req.session as any)?.user;
      if (sessionUser && sessionUser.authenticated) {
        const loginTime = new Date(sessionUser.loginTime).getTime();
        const now = Date.now();
        const logicalMaxAge = Number(process.env.SESSION_MAX_AGE_MS || (30 * 24 * 60 * 60 * 1000));
        if (now - loginTime > logicalMaxAge) {
           console.log(`[AUTH] Sessione scaduta logicamente per: ${sessionUser.email}`);
           req.session.destroy(() => {});
           return res.status(401).json({ success: false, message: "Sessione scaduta" });
        }

        console.log(`[AUTH] Sessione valida per: ${sessionUser.email}`);
        (req as any).user = sessionUser;
        return next();
      }

      console.log(`[AUTH] Accesso negato: Nessuna credenziale valida`);
      return res.status(401).json({ success: false, message: "Non autenticato" });
    } catch (e) {
      console.error("[AUTH] Errore middleware:", e);
      return res.status(500).json({ success: false, message: "Errore interno" });
    }
  };

  // Middleware Admin
  const ensureAdmin = (req: Request, res: Response, next: Function) => {
    const user = (req as any).user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Accesso negato" });
    }
    next();
  };

  // Login endpoint
 app.post("/api/auth/login", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const { email, password, code } = req.body || {};
      console.log(`[AUTH-FIX] Tentativo di login per: ${email || (code ? 'Codice Accesso' : 'Sconosciuto')}`);

      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
      if (typeof code === "string" && code.length > 0) {
        if (code !== ADMIN_CODE) {
          console.warn(`[AUTH] Codice admin non valido`);
          return res.status(401).json({ success: false, message: "Codice non valido" });
        }
        if (!req.session) {
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const now = new Date().toISOString();
        let sessionUserId: any = Date.now();
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        if (client) {
          try {
            const { data } = await (client as any)
              .from("users")
              .select("id,email,first_name,last_name")
              .eq("email", adminEmail)
              .limit(1)
              .maybeSingle();
            if (data && data.id) {
              sessionUserId = String(data.id);
            } else {
              const newId = crypto.randomUUID();
              await (client as any)
                .from("users")
                .insert({ id: newId, email: adminEmail, created_at: now, updated_at: now, first_name: "Admin", last_name: "User" });
              sessionUserId = newId;
            }
          } catch {}
        }
        (req.session as any).user = {
          id: sessionUserId,
          email: adminEmail,
          authenticated: true,
          isAdmin: true,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
          firstName: "Admin",
          lastName: "User",
        };
        (req.session as any).siteAccessGranted = true;

        // CRITICAL FIX: Attendere il save con error handling
        try {
          await new Promise<void>((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                console.error("[AUTH] Error saving session in admin login:", err);
                reject(err);
              } else {
                console.log(`[AUTH] Login Admin completato: ${adminEmail}`);
                resolve();
              }
            });
          });
        } catch (saveErr) {
          console.error("[AUTH] Session save critical error in admin login:", saveErr);
          return res.status(500).json({
            success: false,
            message: "Errore salvataggio sessione durante login admin"
          });
        }

        noCache(res);
        return res.json({ success: true, message: "Login effettuato con successo", user: { email: adminEmail, isAdmin: true } });
      }

      if (email) {
        if (!password) {
          return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
        }
        if (!req.session) {
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        
        if (!client) {
          // DEV SESSION (Mock)
          const now = new Date().toISOString();
          const devId = crypto.randomUUID();
          (req.session as any).user = {
            id: String(devId),
            email: String(email),
            authenticated: true,
            isAdmin: false,
            loginTime: now,
            createdAt: now,
            updatedAt: now,
            firstName: "User",
            lastName: "Dev",
          };
          (req.session as any).siteAccessGranted = true;
          console.log(`[AUTH] Login DEV Session creato per: ${email}`);
          await new Promise<void>((resolve) => req.session.save(() => resolve()));
          return res.json({ success: true, message: "Login effettuato con successo (dev session)", user: { email, isAdmin: false } });
        }

        // 1. Try Standard Supabase Auth (Priority)
        let authUser = null;
        try {
            console.log(`[AUTH] Tentativo Supabase Auth signInWithPassword per ${email}...`);
            const { data, error } = await client.auth.signInWithPassword({ email, password });
            if (!error && data.user) {
                authUser = data.user;
                console.log(`[AUTH] Supabase Auth successo. UID: ${authUser.id}`);
            } else {
                console.warn(`[AUTH] Supabase Auth fallito: ${error?.message}`);
            }
        } catch (e) {
            console.error(`[AUTH] Supabase Auth Exception:`, e);
        }

        if (authUser) {
            // Fetch profile
            let profile = null;
            try {
                const { data } = await (client as any)
                  .from("users")
                  .select("id,email,first_name,last_name,is_admin")
                  .eq("id", authUser.id)
                  .maybeSingle();
                profile = data;
            } catch (e) {
                console.error(`[AUTH] Profile fetch error:`, e);
            }

            // Ensure a row exists in application profile table linked to Supabase user
            try {
              if (!profile || !profile.id) {
                const meta = (authUser as any)?.user_metadata || {};
                const now = new Date().toISOString();
                const insertPayload = {
                  id: authUser.id,
                  email: authUser.email,
                  first_name: meta.first_name || meta.firstName || 'Utente',
                  last_name: meta.last_name || meta.lastName || 'BigGimmy',
                  is_admin: false,
                  created_at: now,
                  updated_at: now,
                };
                await (client as any).from("users").insert(insertPayload);
                profile = insertPayload as any;
                console.log(`[AUTH] Created profile row for ${authUser.email}`);
              }
            } catch (e) {
              console.warn(`[AUTH] Upsert profile failed:`, e);
            }

            const now = new Date().toISOString();
            (req.session as any).user = {
              id: authUser.id,
              email: authUser.email,
              authenticated: true,
              isAdmin: !!(profile?.is_admin),
              loginTime: now,
              createdAt: authUser.created_at || now,
              updatedAt: now,
              firstName: profile?.first_name,
              lastName: profile?.last_name,
            };
            (req.session as any).siteAccessGranted = true;

            // CRITICAL FIX: Attendere il save con error handling
            try {
              await new Promise<void>((resolve, reject) => {
                req.session.save((err) => {
                  if (err) {
                    console.error("[AUTH] Error saving session in login:", err);
                    reject(err);
                  } else {
                    console.log(`[AUTH] Sessione server creata via Supabase Auth per: ${email}`);
                    resolve();
                  }
                });
              });
            } catch (saveErr) {
              console.error("[AUTH] Session save critical error in login:", saveErr);
              return res.status(500).json({
                success: false,
                message: "Errore salvataggio sessione durante login"
              });
            }

            return res.json({
              success: true,
              message: "Login effettuato con successo",
              user: (req.session as any).user
            });
        }
        try {
          let existing: any = null;
          try {
            const { rows } = await pool.query(
              "select id,email,password,first_name,last_name,is_admin,created_at,updated_at from public.users where email=$1 limit 1",
              [email]
            );
            existing = rows && rows[0] ? rows[0] : null;
          } catch {}
          if (existing?.id && verifyPassword(password, String(existing.password))) {
            const now = new Date().toISOString();
            (req.session as any).user = {
              id: existing.id,
              email: existing.email,
              authenticated: true,
              isAdmin: !!existing.is_admin,
              loginTime: now,
              createdAt: existing.created_at ? new Date(existing.created_at).toISOString() : now,
              updatedAt: now,
              firstName: existing.first_name,
              lastName: existing.last_name,
            };
            (req.session as any).siteAccessGranted = true;

            // CRITICAL FIX: Attendere il save con error handling
            try {
              await new Promise<void>((resolve, reject) => {
                req.session.save((err) => {
                  if (err) {
                    console.error("[AUTH] Error saving session in fallback login:", err);
                    reject(err);
                  } else {
                    console.log(`[AUTH] Login fallback completato per: ${email}`);
                    resolve();
                  }
                });
              });
            } catch (saveErr) {
              console.error("[AUTH] Session save critical error in fallback login:", saveErr);
              return res.status(500).json({
                success: false,
                message: "Errore salvataggio sessione durante login fallback"
              });
            }

            return res.json({ success: true, message: "Login effettuato con successo (fallback)", user: (req.session as any).user });
          }
        } catch (e) {
          console.warn(`[AUTH] Fallback login error:`, e);
        }
        return res.status(401).json({ success: false, message: "Credenziali non valide" });
      }

      const { username, password: pwd } = req.body;
      if (username || pwd) {
        return res.status(401).json({ success: false, message: "Login via username/password disabilitato" });
      }

      // Se arriviamo qui, nessun metodo di login è stato riconosciuto
      return res.status(400).json({ success: false, message: "Richiesta di login non valida (parametri mancanti)" });

    } catch (error) {
      console.error(`[AUTH] Errore Login:`, error);
      res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    noCache(res);
    const userEmail = (req.session as any)?.user?.email || 'Anonimo';
    console.log(`[AUTH] Logout richiesto per: ${userEmail}`);
    
    req.session.destroy((err) => {
      if (err) {
        console.error(`[AUTH] Errore distruzione sessione:`, err);
        return res.status(500).json({ success: false, message: "Errore durante il logout" });
      }
      res.clearCookie('biggimmy-session', { path: '/' });
      console.log(`[AUTH] Logout completato e cookie rimosso`);
      return res.json({ success: true, message: "Logout effettuato con successo" });
    });
  });

  app.get("/api/auth/diagnostics", async (req: Request, res: Response) => {
    try {
      const tokenAuth = await getAuthFromToken(req);
      const cookieUser = (req.session as any)?.user || null;
      const result: any = {
        success: true,
        tokenAuthenticated: !!tokenAuth,
        cookieAuthenticated: !!(cookieUser && cookieUser.authenticated),
        tokenUser: tokenAuth || null,
        cookieUser: cookieUser || null,
        metadata: null,
        rlsCheck: null
      };
      if (supabaseAdmin && (tokenAuth?.id || cookieUser?.id)) {
        const uid = tokenAuth?.id || cookieUser?.id;
        const meta = await (supabaseAdmin as any).auth.admin.getUserById(uid);
        result.metadata = meta?.data?.user?.user_metadata || meta?.data?.user?.raw_user_meta_data || null;
      }
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      if (authHdr && typeof authHdr === "string" && authHdr.startsWith("Bearer ")) {
        const token = authHdr.slice(7);
        const client = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
          ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } } })
          : null;
        if (client && (tokenAuth?.id || cookieUser?.id)) {
          const uid = tokenAuth?.id || cookieUser?.id;
          const own = await (client as any).from("users").select("id,email").eq("id", uid).limit(1);
          const others = await (client as any).from("users").select("id,email").neq("id", uid).limit(1);
          result.rlsCheck = {
            ownStatus: !!own?.data?.length,
            othersStatus: !!others?.data?.length,
            ownError: own?.error || null,
            othersError: others?.error || null
          };
        }
      }
      return res.json(result);
    } catch {
      return res.status(500).json({ success: false });
    }
  });

  app.get("/api/auth/metadata", async (req: Request, res: Response) => {
    try {
      if (!supabaseAdmin) return res.status(400).json({ success: false });
      const tokenAuth = await getAuthFromToken(req);
      const cookieUser = (req.session as any)?.user || null;
      const uid = tokenAuth?.id || cookieUser?.id;
      if (!uid) return res.status(401).json({ success: false });
      const meta = await (supabaseAdmin as any).auth.admin.getUserById(uid);
      const raw = meta?.data?.user?.raw_user_meta_data || meta?.data?.user?.user_metadata || null;
      return res.json({ success: true, uid, raw });
    } catch {
      return res.status(500).json({ success: false });
    }
  });

  app.put("/api/auth/profile", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const sess = req.session as any;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { firstName, lastName, phone } = req.body || {};
      const updates: any = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string") updates.phone = phone;
      const now = new Date().toISOString();
      updates.updated_at = now;
      let persisted = false;
      if (supabaseAdmin && Object.keys(updates).length > 0) {
        try {
          const { error } = await (supabaseAdmin as any)
            .from("users")
            .update(updates)
            .eq("id", String(userId));
          if (!error) persisted = true;
        } catch {}
      }
      // Aggiorna anche la sessione locale per coerenza UI
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string") sess.user.phone = phone;
        sess.user.updatedAt = now;
      }
      return res.json({
        success: true,
        persisted,
        user: {
          id: userId,
          email: tokenAuth?.email || sess?.user?.email,
          firstName: typeof firstName === "string" ? firstName : sess?.user?.firstName,
          lastName: typeof lastName === "string" ? lastName : sess?.user?.lastName,
          phone: typeof phone === "string" ? phone : sess?.user?.phone,
          updatedAt: now
        }
      });
    } catch (err) {
      console.error("[AUTH] /profile - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.get("/api/auth/profile", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const sess = req.session as any;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const client = supabaseAdmin || supabaseAnon;
      let profile: any = null;
      if (client) {
        try {
          const { data } = await (client as any)
            .from("users")
            .select("id,email,first_name,last_name,phone,updated_at")
            .eq("id", String(userId))
            .limit(1)
            .maybeSingle();
          profile = data || null;
        } catch {}
      }
      return res.json({
        success: true,
        user: {
          id: userId,
          email: tokenAuth?.email || sess?.user?.email || profile?.email,
          firstName: profile?.first_name ?? sess?.user?.firstName,
          lastName: profile?.last_name ?? sess?.user?.lastName,
          phone: profile?.phone ?? sess?.user?.phone,
          updatedAt: profile?.updated_at ?? sess?.user?.updatedAt
        }
      });
    } catch (err) {
      console.error("[AUTH] /profile [GET] - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Endpoint current user per client/auth gating
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    noCache(res);
    console.log(`[AUTH] GET /api/auth/me - Request received. SessionID: ${req.sessionID}`);
    console.log(`[AUTH] GET /api/auth/me - Headers: Authorization=${!!(req.headers as any)["authorization"]}, Cookie=${!!(req.headers as any)["cookie"]}`);
    try {
      console.log(`[DEBUG] /api/auth/me - Start. SessionID: ${req.sessionID}`);

      if (!req.session) {
          console.error("[AUTH] /me - Critical: req.session is undefined!");
          return res.status(500).json({ success: false, message: "Session store error" });
      }

      // 1. Prima verifica il token (Bearer) se presente
      let tokenAuth = null;
      try {
        tokenAuth = await getAuthFromToken(req);
      } catch (tokenErr) {
        console.error("[AUTH] /me - Token verification error:", tokenErr);
      }

      if (tokenAuth) {
         console.log(`[AUTH] /me - Bearer present: true, email=${tokenAuth.email}, id=${tokenAuth.id}, isAdmin from token=${tokenAuth.isAdmin}`);
         const now = new Date().toISOString();
         const existing = (req.session as any)?.user || {};
         console.log(`[AUTH] /me - existing.isAdmin=${existing.isAdmin}, tokenAuth.isAdmin=${tokenAuth.isAdmin}`);
         const mergedUser = {
           id: tokenAuth.id || existing.id,
           email: existing.email || tokenAuth.email,
           authenticated: true,
           isAdmin: !!(tokenAuth.isAdmin ?? existing.isAdmin),
           firstName: (tokenAuth as any).firstName ?? existing.firstName,
           lastName: (tokenAuth as any).lastName ?? existing.lastName,
           phone: existing.phone ?? (tokenAuth as any).phone,
           address: existing.address ?? (tokenAuth as any).address,
           city: existing.city ?? (tokenAuth as any).city,
           postalCode: existing.postalCode ?? (tokenAuth as any).postalCode,
           province: existing.province ?? (tokenAuth as any).province,
           country: existing.country ?? (tokenAuth as any).country,
           loginTime: existing.loginTime || now,
           updatedAt: now,
         };
         // Ensure cookie is set even after refresh: update session
         (req.session as any).user = mergedUser;
         (req.session as any).siteAccessGranted = true;

         // CRITICAL FIX: Attendere il save PRIMA di rispondere
         try {
           await new Promise<void>((resolve, reject) => {
             req.session.save((err) => {
               if (err) {
                 console.error("[AUTH] Error saving session in /me:", err);
                 reject(err);
               } else {
                 console.log("[AUTH] Session saved successfully in /me");
                 resolve();
               }
             });
           });
         } catch (saveErr) {
           console.error("[AUTH] Session save critical error:", saveErr);
           return res.status(500).json({
             success: false,
             message: "Errore salvataggio sessione"
           });
         }

         // ORA possiamo rispondere con certezza
         console.log(`[AUTH] /me - Returning mergedUser with isAdmin=${mergedUser.isAdmin}, email=${mergedUser.email}`);
         return res.json({ success: true, authenticated: true, user: mergedUser });
      }

      // 2. Fallback alla sessione cookie
      const user = (req.session as any)?.user;
      console.log(`[AUTH] /me - Bearer present: false, cookie present=${!!((req.headers as any)["cookie"])}, sessionUser=${!!user}`);

      if (user && user.authenticated) {
        console.log(`[AUTH] /me - Sessione cookie valida: ${user.email}, isAdmin from cookie=${user.isAdmin}`);

        // CRITICAL FIX: Rileggi sempre i dati dal database per avere valori aggiornati
        let dbIsAdmin = user.isAdmin;
        let dbFirstName = user.firstName;
        let dbLastName = user.lastName;
        let dbPhone = user.phone;

        if (supabaseAdmin && user.id) {
          try {
            const dbUser = await (supabaseAdmin as any)
              .from("users")
              .select("is_admin,first_name,last_name,phone")
              .eq("id", user.id)
              .maybeSingle();

            if (dbUser?.data) {
              dbIsAdmin = !!dbUser.data.is_admin;
              dbFirstName = dbUser.data.first_name;
              dbLastName = dbUser.data.last_name;
              dbPhone = dbUser.data.phone;
              console.log(`[AUTH] /me - DB refresh: isAdmin=${dbIsAdmin}, firstName=${dbFirstName}, lastName=${dbLastName}`);
            }
          } catch (e) {
            console.error("[AUTH] /me - Error refreshing from DB:", e);
          }
        }

        const payload = {
          id: user.id ?? 0,
          email: user.email ?? (user.username ? `${user.username}@local` : undefined),
          firstName: dbFirstName,
          lastName: dbLastName,
          phone: dbPhone,
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          province: user.province,
          country: user.country,
          createdAt: user.createdAt ?? user.loginTime ?? new Date().toISOString(),
          updatedAt: user.updatedAt ?? new Date().toISOString(),
          username: user.username,
          isAdmin: dbIsAdmin,
        };

        // Aggiorna anche la sessione con i valori freschi
        (req.session as any).user = { ...user, isAdmin: dbIsAdmin, firstName: dbFirstName, lastName: dbLastName, phone: dbPhone };

        console.log(`[AUTH] /me - Returning cookie user with isAdmin=${payload.isAdmin}, email=${payload.email}`);
        return res.json({ success: true, authenticated: true, user: payload });
      }
      
      console.log(`[AUTH] /me - Returning unauthenticated (no token, no session). SessionID: ${req.sessionID}`);
      return res.json({ success: true, authenticated: false });
    } catch (err) {
      console.error("[AUTH] /me - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.put("/api/auth/me", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const sess = req.session as any;
      const tokenAuth = await getAuthFromToken(req);
      let userId = tokenAuth?.id || sess?.user?.id;
      
      console.log(`[AUTH] PUT /me - Start update for userId: ${userId}`);

      if (!userId && sess?.siteAccessGranted) {
        const now = new Date().toISOString();
        sess.user = {
          id: 'guest',
          email: undefined,
          authenticated: true,
          isAdmin: false,
          firstName: sess?.user?.firstName,
          lastName: sess?.user?.lastName,
          phone: sess?.user?.phone,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
        };
        userId = 'guest';
      }
      if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
      
      const schema = z
        .object({
          firstName: z.string().trim().min(1, "Nome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato nome non valido"),
          lastName: z.string().trim().min(1, "Cognome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato cognome non valido"),
          phone: z.union([
            z.string().trim().length(0),
            z.string().trim().min(7).max(20).regex(/^[+]?[\d\s\-().]{7,20}$/),
          ]).optional(),
        })
        .strip();
        
      const parsed = schema.safeParse(req.body || {});
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Dati non validi", errors: parsed.error.errors });
      }
      
      const { firstName, lastName, phone } = parsed.data;
      const updates: any = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string" && phone.trim().length > 0) updates.phone = phone;
      const now = new Date().toISOString();
      updates.updated_at = now;
      
      // Update Database
      let dbUpdated = false;
      let updateError = null;

      // 1. Try with Admin Client (Bypass RLS)
      if (supabaseAdmin && Object.keys(updates).length > 0 && userId !== 'guest') {
        try {
          console.log(`[AUTH] Updating public.users (Admin) for ${userId}`, updates);
          const { error } = await (supabaseAdmin as any)
            .from("users")
            .update(updates)
            .eq("id", String(userId));
            
          if (error) {
            console.warn(`[AUTH] DB Update (Admin) failed:`, error);
            updateError = error;
          } else {
            console.log(`[AUTH] DB Update (Admin) success`);
            dbUpdated = true;
          }
        } catch (e) {
          console.error(`[AUTH] DB Update (Admin) exception:`, e);
          updateError = e;
        }
      } 
      
      // 2. Fallback: Try with User Token (Respect RLS)
      if (!dbUpdated && Object.keys(updates).length > 0 && userId !== 'guest') {
        const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
        const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
        
        if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
           try {
             console.log(`[AUTH] Updating public.users (User Token) for ${userId}`);
             const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
               global: { headers: { Authorization: `Bearer ${token}` } }
             } as any);
             
             const { error } = await (client as any)
               .from("users")
               .update(updates)
               .eq("id", String(userId));
               
             if (error) {
               console.warn(`[AUTH] DB Update (User) failed:`, error);
               updateError = error;
             } else {
               console.log(`[AUTH] DB Update (User) success`);
               dbUpdated = true;
               updateError = null;
             }
           } catch (e) {
             console.error(`[AUTH] DB Update (User) exception:`, e);
           }
        } else {
           if (!supabaseAdmin) console.warn(`[AUTH] No Admin client and no Token available for DB update`);
        }
      }

      if (!dbUpdated && updateError) {
         // Log but don't fail request yet
      }
      
      // Update Session
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string" && phone.trim().length > 0) sess.user.phone = phone;
        sess.user.updatedAt = now;

        // CRITICAL FIX: Attendere il save con error handling
        try {
          await new Promise<void>((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                console.error("[AUTH] Error saving session in /me [PUT]:", err);
                reject(err);
              } else {
                console.log("[AUTH] Session saved with profile updates");
                resolve();
              }
            });
          });
        } catch (saveErr) {
          console.error("[AUTH] Session save critical error in PUT /me:", saveErr);
          return res.status(500).json({
            success: false,
            message: "Errore salvataggio sessione durante aggiornamento profilo"
          });
        }
      }

      return res.json({ success: true, dbUpdated });
    } catch (err) {
      console.error("[AUTH] /me [PUT] - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.patch("/api/auth/me", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const sess = req.session as any;
      const tokenAuth = await getAuthFromToken(req);
      let userId = tokenAuth?.id || sess?.user?.id;
      if (!userId && sess?.siteAccessGranted) {
        const now = new Date().toISOString();
        sess.user = {
          id: 'guest',
          email: undefined,
          authenticated: true,
          isAdmin: false,
          firstName: sess?.user?.firstName,
          lastName: sess?.user?.lastName,
          phone: sess?.user?.phone,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
        };
        userId = 'guest';
      }
      if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
      const schema = z
        .object({
          firstName: z.string().trim().min(1, "Nome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato nome non valido"),
          lastName: z.string().trim().min(1, "Cognome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato cognome non valido"),
          phone: z.union([
            z.string().trim().length(0),
            z.string().trim().min(7).max(20).regex(/^[+]?[\d\s\-().]{7,20}$/),
          ]).optional(),
        })
        .strip();
      const parsed = schema.safeParse(req.body || {});
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Dati non validi", errors: parsed.error.errors });
      }
      const { firstName, lastName, phone } = parsed.data;
      const now = new Date().toISOString();
      const updates: any = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string" && phone.trim().length > 0) updates.phone = phone;
      updates.updated_at = now;
      if (supabaseAdmin && Object.keys(updates).length > 0 && userId !== 'guest') {
        try {
          await (supabaseAdmin as any).from("users").update(updates).eq("id", String(userId));
        } catch {}
      }
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string" && phone.trim().length > 0) sess.user.phone = phone;
        sess.user.updatedAt = now;
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.put("/api/auth/profile", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const sess = req.session as any;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { firstName, lastName, phone } = req.body || {};
      const schema = z
        .object({
          firstName: z.string().trim().min(1).max(64).regex(/^[\p{L}][\p{L} \-']*$/u),
          lastName: z.string().trim().min(1).max(64).regex(/^[\p{L}][\p{L} \-']*$/u),
          phone: z.union([z.string().trim().length(0), z.string().trim().min(7).max(20).regex(/^[+]?[\d\s\-().]{7,20}$/)]).optional(),
        })
        .strip();
      const parsed = schema.safeParse({ firstName, lastName, phone });
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Dati non validi", errors: parsed.error.errors });
      }
      const data = parsed.data;
      const now = new Date().toISOString();
      const updates: any = {};
      if (typeof data.firstName === "string") updates.first_name = data.firstName;
      if (typeof data.lastName === "string") updates.last_name = data.lastName;
      if (typeof data.phone === "string" && data.phone.trim().length > 0) updates.phone = data.phone;
      updates.updated_at = now;
      if (supabaseAdmin && Object.keys(updates).length > 0) {
        try {
          await (supabaseAdmin as any).from("users").update(updates).eq("id", String(userId));
        } catch {}
      }
      if (sess?.user) {
        if (typeof data.firstName === "string") sess.user.firstName = data.firstName;
        if (typeof data.lastName === "string") sess.user.lastName = data.lastName;
        if (typeof data.phone === "string" && data.phone.trim().length > 0) sess.user.phone = data.phone;
        sess.user.updatedAt = now;
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.patch("/api/auth/profile", async (req: Request, res: Response) => {
    noCache(res);
    try {
      const sess = req.session as any;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { firstName, lastName, phone } = req.body || {};
      const now = new Date().toISOString();
      const updates: any = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string") updates.phone = phone;
      updates.updated_at = now;
      if (supabaseAdmin && Object.keys(updates).length > 0) {
        try {
          await (supabaseAdmin as any).from("users").update(updates).eq("id", String(userId));
        } catch {}
      }
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string") sess.user.phone = phone;
        sess.user.updatedAt = now;
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app.get("/api/auth/me/orders", async (req: Request, res: Response) => {
    try {
      // Ottieni l'utente corrente
      const authUser = await getAuthFromToken(req);
      const sessionUser = (req.session as any)?.user;
      const currentUserId = authUser?.id || sessionUser?.id;

      if (!currentUserId) {
        return res.json({ success: true, orders: [] });
      }

      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Database non configurato" });
      }

      // Query alla tabella orders in Supabase filtrando per user_id
      const { data: orders, error } = await (supabaseAdmin as any)
        .from("orders")
        .select("*")
        .eq("user_id", currentUserId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[ORDERS] Errore lettura orders per user:", error);
        return res.status(500).json({ success: false, message: "Errore lettura ordini" });
      }

      // Sanitizza i dati rimuovendo informazioni sensibili
      const sanitized = (orders || []).map((o: any) => ({
        id: o.id,
        snipcartOrderId: o.snipcart_order_id,
        total: o.total,
        status: o.status,
        items: o.items,
        createdAt: o.created_at,
        updatedAt: o.updated_at,
      }));

      return res.json({ success: true, orders: sanitized });
    } catch (err) {
      console.error("[ORDERS] Errore endpoint /api/auth/me/orders:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Access Gate: verifica codice (non associa alcun utente)
  app.post("/api/access/verify", async (req: Request, res: Response) => {
    try {
      const { code } = req.body || {};
      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      if (typeof code !== "string" || code.length === 0) {
        return res.status(400).json({ success: false, message: "Codice mancante" });
      }
      if (code !== ADMIN_CODE) {
        return res.status(401).json({ success: false, message: "Codice non valido" });
      }
      (req.session as any).siteAccessGranted = true;
      return res.json({ success: true, granted: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Access Gate: stato
  app.get("/api/access/status", async (req: Request, res: Response) => {
    try {
      const sess = req.session as any;
      const grantedByCode = !!(sess?.siteAccessGranted);
      const grantedBySession = !!(sess?.user?.authenticated);
      const tokenAuth = await getAuthFromToken(req);
      const granted = grantedByCode || grantedBySession || !!tokenAuth;
      return res.json({ success: true, granted });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, phone, address, city, postalCode, province, country } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
      }
      const emailOk = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const passOk = typeof password === "string" && password.length >= 6;
      const firstOk = !firstName || (typeof firstName === "string" && firstName.trim().length >= 2);
      const lastOk = !lastName || (typeof lastName === "string" && lastName.trim().length >= 2);
      const phoneOk = !phone || (typeof phone === "string" && /^(\+?\d{1,3}\s?)?(\d[\s-]?){6,}$/.test(phone));
      const addrOk = !address || (typeof address === "string" && address.trim().length >= 2);
      const cityOk = !city || (typeof city === "string" && city.trim().length >= 2);
      const capOk = !postalCode || (typeof postalCode === "string" && /^\d{5}$/.test(postalCode));
      const provOk = !province || (typeof province === "string" && /^[A-Z]{2}$/.test(province));
      if (!emailOk || !passOk || !firstOk || !lastOk || !phoneOk || !addrOk || !cityOk || !capOk || !provOk) {
        return res.status(400).json({ success: false, message: "Dati non validi" });
      }
      const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
      const now = new Date().toISOString();
      let userId: string = crypto.randomUUID();
      let persisted = false;
      // Create Supabase Auth user (ANON key supports signUp)
      if (supabaseAnon) {
        try {
          const { data, error } = await (supabaseAnon as any).auth.signUp({
            email,
            password,
            options: {
              data: {
                first_name: firstName,
                last_name: lastName,
                phone,
                address,
                city,
                postal_code: postalCode,
                province,
                country,
              }
            }
          });
          if (!error && data?.user?.id) {
            userId = String(data.user.id);
            if (supabaseAdmin) {
              try {
                await (supabaseAdmin as any).auth.admin.updateUserById(userId, { email_confirmed_at: new Date().toISOString() });
              } catch {}
            }
          }
        } catch (e) {
          console.warn("[AUTH] Supabase Auth signUp fallito:", e);
        }
      }
      if (client) {
        try {
          const existing = await (client as any)
            .from("users")
            .select("id,email")
            .eq("email", email)
            .limit(1)
            .maybeSingle();
          if (existing?.data?.id) {
            userId = String(existing.data.id);
            const { error } = await (client as any)
              .from("users")
              .update({
                password: hashPassword(password),
                first_name: firstName,
                last_name: lastName,
                phone,
                address,
                city,
                postal_code: postalCode,
                province,
                country,
                updated_at: now
              })
              .eq("id", userId);
            if (!error) persisted = true;
          } else {
            const { error } = await (client as any)
              .from("users")
              .insert({
                id: userId,
                email,
                password: hashPassword(password),
                first_name: firstName,
                last_name: lastName,
                phone,
                address,
                city,
                postal_code: postalCode,
                province,
                country,
                created_at: now,
                updated_at: now,
                is_admin: false
              });
            if (!error) persisted = true;
            else {
              console.warn("[AUTH] Insert su 'users' fallito, ritento su 'users_backup'");
              const { error: err2 } = await (client as any)
                .from("users_backup")
                .insert({
                  id: userId,
                  email,
                  password: hashPassword(password),
                  first_name: firstName,
                  last_name: lastName,
                  phone,
                  address,
                  city,
                  postal_code: postalCode,
                  province,
                  country,
                  created_at: now,
                  updated_at: now,
                  is_admin: false
                });
              if (!err2) persisted = true;
            }
          }
        } catch (e) {
          console.error("[AUTH] Registrazione DB errore:", e);
        }
      }
      if (req.session) {
        (req.session as any).user = {
          id: userId,
          email,
          authenticated: true,
          isAdmin: false,
          createdAt: now,
          updatedAt: now,
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          province,
          country
        };
        await new Promise<void>((resolve) => req.session.save(() => resolve()));
      }
      return res.json({ success: true, persisted, user: { id: userId, email } });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // ================================
  // ADMIN ORDERS - legge dalla tabella "orders" in Supabase
  // ================================
  app.get("/api/admin/orders", ensureAuth, ensureAdmin, async (req: Request, res: Response) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Database non configurato" });
      }

      // Query alla tabella orders con join su users per email
      const { data: orders, error } = await (supabaseAdmin as any)
        .from("orders")
        .select(`
          id,
          user_id,
          status,
          currency,
          total_cents,
          stripe_session_id,
          created_at,
          updated_at,
          tracking_number,
          carrier,
          users:user_id (email)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[ADMIN] Errore lettura orders:", error);
        return res.status(500).json({ success: false, message: "Errore lettura ordini" });
      }

      // Per ogni ordine, recupera gli order_items con i dettagli prodotto
      const ordersWithItems = await Promise.all(
        (orders || []).map(async (order: any) => {
          const { data: items } = await (supabaseAdmin as any)
            .from("order_items")
            .select(`
              id,
              quantity,
              unit_price_cents,
              line_total_cents,
              product_option:product_option_id (
                id,
                flavor,
                size,
                product:product_id (
                  name
                )
              )
            `)
            .eq("order_id", order.id);

          // Formatta gli items per il frontend
          const formattedItems = (items || []).map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.unit_price_cents,
            name: item.product_option?.product?.name
              ? `${item.product_option.product.name}${item.product_option.flavor ? ` - ${item.product_option.flavor}` : ''}${item.product_option.size ? ` (${item.product_option.size})` : ''}`
              : 'Prodotto'
          }));

          return {
            id: order.id,
            user_id: order.user_id,
            snipcart_order_id: order.id,
            total: order.total_cents,
            status: order.status,
            items: formattedItems,
            created_at: order.created_at,
            updated_at: order.updated_at,
            user_email: order.users?.email || null,
            tracking_number: order.tracking_number || null,
            carrier: order.carrier || null
          };
        })
      );

      return res.json(ordersWithItems);
    } catch (err) {
      console.error("[ADMIN] Errore endpoint /api/admin/orders:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // ================================
  // ADMIN USERS - legge dalla tabella "users" in Supabase
  // ================================
  app.get("/api/admin/users", ensureAuth, ensureAdmin, async (req: Request, res: Response) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Database non configurato" });
      }

      // Query alla tabella users in Supabase
      const { data: users, error } = await (supabaseAdmin as any)
        .from("users")
        .select("id,email,first_name,last_name,is_admin,created_at,updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[ADMIN] Errore lettura users:", error);
        return res.status(500).json({ success: false, message: "Errore lettura utenti" });
      }

      // Trasforma i dati nel formato atteso dal client
      const formattedUsers = (users || []).map((u: any) => ({
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        isAdmin: !!u.is_admin,
        createdAt: u.created_at,
        updatedAt: u.updated_at,
      }));

      return res.json({ success: true, users: formattedUsers });
    } catch (err) {
      console.error("[ADMIN] Errore endpoint /api/admin/users:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Get all contacts endpoint (for admin purposes)
  app.get("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      return res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while fetching contacts" 
      });
    }
  });

  // Get all products endpoint (for main /prodotti page)
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { search, brand, priceRange, sortBy } = req.query;

      // Cache lato client per ridurre richieste ripetute (aggiornamento ogni 5 min)
      const timestamp = Math.floor(Date.now() / (5 * 60 * 1000)); // Cambia ogni 5 minuti
      res.set({
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=1800',
        'ETag': `products-${timestamp}-${search || 'no-search'}-${brand || 'no-brand'}-${priceRange || 'no-range'}-${sortBy || 'default'}`
      });

      let products;
      
      // Se ci sono parametri di ricerca/filtro, usa searchProducts
      if (search || brand || priceRange || sortBy) {
        products = await storage.searchProducts(
          search as string,
          {
            brandSlug: brand as string,
            priceRange: priceRange as string,
            sortBy: sortBy as string
          }
        );
      } else {
        // Usa searchProducts senza filtri per restituire tutti i productGroups (226 invece di 84)
        products = await storage.searchProducts("", {});
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching all products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products" 
      });
    }
  });

  // Get products by category endpoint (grouped by variants)
  app.get("/api/products/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const { search, brand, priceRange, sortBy } = req.query;

      // Set cache headers for real-time price updates
      const timestamp = Math.floor(Date.now() / (5 * 60 * 1000)); // Cambia ogni 5 minuti
      res.set({
        'Cache-Control': 'no-cache, must-revalidate', // Nessun cache - aggiornamenti istantanei
        'ETag': `products-${category}-${timestamp}-${search || 'no-search'}-${brand || 'no-brand'}-${priceRange || 'no-range'}-${sortBy || 'default'}`
      });

      let products;
      
      // Se ci sono parametri di ricerca/filtro, usa searchProducts con categoria
      if (search || brand || priceRange || sortBy) {
        products = await storage.searchProducts(
          search as string,
          {
            categorySlug: category,
            brandSlug: brand as string,
            priceRange: priceRange as string,
            sortBy: sortBy as string
          }
        );
      } else {
        // Altrimenti usa il metodo esistente
        products = await storage.getProductsByCategory(category);
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products" 
      });
    }
  });

  // Get base products with variants by category endpoint
  app.get("/api/base-products/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const baseProducts = await storage.getBaseProductsByCategory(category);
      res.json(baseProducts);
    } catch (error) {
      console.error("Error fetching base products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch base products" 
      });
    }
  });

  // Get product variants for a specific base product
  app.get("/api/base-product/:slug/variants", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const variants = await storage.getProductVariants(slug);
      res.json(variants);
    } catch (error) {
      console.error("Error fetching product variants:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product variants" 
      });
    }
  });

  // Get single product by slug endpoint with options and min_price_cents
  app.get("/api/product/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Prima provo a trovare il prodotto direttamente
      let product = await storage.getProductBySlug(slug);
      
      // Se non trovato, controllo se è un vecchio slug che necessita di redirect
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          // Restituisco HTTP 301 redirect permanente al nuovo slug
          const redirectUrl = `/api/product/${redirect.newSlug}`;
          return res.redirect(301, redirectUrl);
        }
        
        // Se non c'è nemmeno un redirect, restituisco 404
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      // Get product options from database for pricing
      const options = await storage.getProductOptionsById(product.id);
      
      // Calculate min_price_cents from options
      const min_price_cents = options.length > 0 
        ? Math.min(...options.map(opt => opt.priceCents))
        : null;
      
      res.json({
        ...product,
        options,
        min_price_cents
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product" 
      });
    }
  });

  // Get product with full details (images and sizes)
  app.get("/api/product/:slug/details", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Prima provo a trovare il prodotto direttamente
      let product = await storage.getProductBySlugWithDetails(slug);
      
      // Se non trovato, controllo se è un vecchio slug che necessita di redirect
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          // Restituisco HTTP 301 redirect permanente al nuovo slug
          const redirectUrl = `/api/product/${redirect.newSlug}/details`;
          return res.redirect(301, redirectUrl);
        }
        
        // Se non c'è nemmeno un redirect, restituisco 404
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product details" 
      });
    }
  });

  // Get product options/variants in ProductVariant format (price in euros)
  app.get("/api/product/:slug/options", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Prima provo a trovare il prodotto direttamente
      let product = await storage.getProductBySlug(slug);
      
      // Se non trovato, controllo se è un vecchio slug che necessita di redirect
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          // Restituisco HTTP 301 redirect permanente al nuovo slug
          const redirectUrl = `/api/product/${redirect.newSlug}/options`;
          return res.redirect(301, redirectUrl);
        }
        
        // Se non c'è nemmeno un redirect, restituisco 404
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      const options = await storage.getProductOptionsById(product.id);
      
      const variants = options.map((option: any) => ({
        id: option.id,
        product_id: option.productId,
        flavor: option.flavor || "",
        size: option.size || "",
        price_cents: option.priceCents,
        price: option.priceCents / 100,
        original_price_cents: option.originalPriceCents ?? null,
        originalPrice: option.originalPriceCents ? option.originalPriceCents / 100 : undefined,
        image: option.image || "",
        in_stock: option.inStock,
        inStock: option.inStock
      }));
      
      res.json(variants);
    } catch (error) {
      console.error("Error fetching product options:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product options" 
      });
    }
  });

  // Get all categories endpoint
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch categories" 
      });
    }
  });

  // Get all brands endpoint (with optional filtering by category and search)
  app.get("/api/brands", async (req: Request, res: Response) => {
    try {
      const { category, search } = req.query;
      
      let brands;
      
      // Se ci sono parametri di filtro, usa il metodo filtrato
      if (category || search) {
        brands = await storage.getBrandsFilteredByContext({
          categorySlug: category as string,
          searchQuery: search as string
        });
      } else {
        // Altrimenti usa il metodo standard per ottenere tutti i brand
        brands = await storage.getBrands();
      }
      
      res.json(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch brands" 
      });
    }
  });

  // Create new brand endpoint
  app.post("/api/brands", async (req: Request, res: Response) => {
    try {
      const brand = await storage.createBrand(req.body);
      res.status(201).json(brand);
    } catch (error) {
      console.error("Error creating brand:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create brand" 
      });
    }
  });

  // Create new product endpoint
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product" 
      });
    }
  });

  // Create product image endpoint
  app.post("/api/product-images", async (req: Request, res: Response) => {
    try {
      const image = await storage.createProductImage(req.body);
      res.status(201).json(image);
    } catch (error) {
      console.error("Error creating product image:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product image" 
      });
    }
  });

  // Create product size endpoint
  app.post("/api/product-sizes", async (req: Request, res: Response) => {
    try {
      const size = await storage.createProductSize(req.body);
      res.status(201).json(size);
    } catch (error) {
      console.error("Error creating product size:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product size" 
      });
    }
  });

  // Create product availability endpoint
  app.post("/api/product-availability", async (req: Request, res: Response) => {
    try {
      const availability = await storage.createProductAvailability(req.body);
      res.status(201).json(availability);
    } catch (error) {
      console.error("Error creating product availability:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product availability" 
      });
    }
  });

  // Send email route
  app.post("/api/send-email", async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
      }

      // TODO: Implement sendEmail function
      // await sendEmail(name, email, message);
      res.json({ success: true, message: "Email inviata con successo" });
    } catch (error) {
      console.error("Errore invio email:", error);
      res.status(500).json({ error: "Errore interno del server" });
    }
  });

  // Sync images route
  app.post("/api/sync-images", async (req: Request, res: Response) => {
    try {
      console.log("🔄 Richiesta sincronizzazione immagini...");
      const result = await syncAllImages();

      res.json({ 
        success: true, 
        message: "Sincronizzazione completata",
        ...result
      });
    } catch (error) {
      console.error("Errore sincronizzazione immagini:", error);
      res.status(500).json({ error: "Errore durante la sincronizzazione" });
    }
  });

  // ========== USER FAVORITES API ROUTES ==========

  // Add product to favorites
  app.post("/api/favorites", async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId are required" 
        });
      }

      let persisted = false;
      // Supabase via user token (RLS)
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          } as any);
          const { error } = await (client as any)
            .from("user_favorites")
            .upsert({ user_id: String(userId), product_id: Number(productId) }, { onConflict: "user_id,product_id" });
          if (!error) {
            persisted = true;
            return res.status(201).json({ success: true, message: "Product added to favorites successfully" });
          }
        } catch {}
      }

      try {
        const isAlreadyFavorite = await storage.isProductFavorite(parseInt(String(userId)), parseInt(String(productId)));
        if (isAlreadyFavorite) {
          return res.status(409).json({ success: false, message: "Product is already in favorites" });
        }
        const favorite = await storage.addToFavorites(parseInt(String(userId)), parseInt(String(productId)));
        return res.status(201).json({ success: true, message: "Product added to favorites successfully", favorite });
      } catch {
        const sess = req.session as any;
        const favs: number[] = Array.isArray(sess?.favorites) ? sess.favorites : [];
        if (!favs.includes(Number(productId))) {
          favs.push(Number(productId));
        }
        (req.session as any).favorites = favs;
        if (!persisted) {
          return res.status(201).json({ success: true, message: "Product added to favorites successfully" });
        }
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to add product to favorites" 
      });
    }
  });

  // Remove product from favorites
  app.delete("/api/favorites", async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId are required" 
        });
      }

      // Supabase via user token (RLS)
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          } as any);
          const { error } = await (client as any)
            .from("user_favorites")
            .delete()
            .eq("user_id", String(userId))
            .eq("product_id", Number(productId));
          if (!error) {
            return res.json({ success: true, message: "Product removed from favorites successfully" });
          }
        } catch {}
      }

      try {
        await storage.removeFromFavorites(parseInt(String(userId)), parseInt(String(productId)));
        return res.json({ success: true, message: "Product removed from favorites successfully" });
      } catch {
        const sess = req.session as any;
        const favs: number[] = Array.isArray(sess?.favorites) ? sess.favorites : [];
        const next = favs.filter(id => id !== Number(productId));
        (req.session as any).favorites = next;
        return res.json({ success: true, message: "Product removed from favorites successfully" });
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to remove product from favorites" 
      });
    }
  });

  // Get user's favorite products
  app.get("/api/favorites/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId is required" 
        });
      }

      // Supabase via user token (RLS)
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          } as any);
          const { data: favRows, error: favErr } = await (client as any)
            .from("user_favorites")
            .select("product_id")
            .eq("user_id", String(userId));
          if (!favErr) {
            const ids = (favRows || []).map((r: any) => Number(r.product_id)).filter((n: number) => Number.isFinite(n));
            if (ids.length === 0) {
              return res.json({ success: true, favorites: [] });
            }
            const { data: prods, error: prodErr } = await (client as any)
              .from("products")
              .select(`
                id,
                slug,
                name,
                description,
                brand_id,
                category_id,
                brands!products_brand_id_fkey(name, slug),
                product_categories!products_category_id_fkey(name, slug),
                product_images!product_images_product_id_fkey(src, is_primary),
                product_options!product_options_product_id_fkey(price_cents)
              `)
              .in("id", ids);
            if (!prodErr) {
              // Processa i prodotti esattamente come fa searchProducts per mantenere coerenza
              const favorites = (prods || []).map((p: any) => {
                // Get primary image from product_images (same as searchProducts storage.ts:469)
                const primaryImg = p.product_images?.find((img: any) => img.is_primary)?.src;
                const firstImg = p.product_images?.[0]?.src;
                const rawImage = primaryImg || firstImg || null;

                // Calculate min price from product_options (same as searchProducts)
                const prices = (p.product_options || []).map((opt: any) => opt.price_cents).filter((price: number) => price > 0);
                const minPriceCents = prices.length > 0 ? Math.min(...prices) : null;

                // Process primaryImage exactly like searchProducts does (storage.ts:513-517)
                const processedImage = rawImage ? (
                  rawImage.startsWith('/images/') || rawImage.startsWith('/attached_assets/')
                    ? rawImage
                    : `/images/products/${rawImage}`
                ) : undefined;

                return {
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  description: p.description,
                  primaryImage: processedImage, // Usa primaryImage come searchProducts
                  brand_name: p.brands?.name || null,
                  brand_slug: p.brands?.slug || null,
                  category_slug: p.product_categories?.slug || null,
                  min_price_cents: minPriceCents,
                };
              });
              return res.json({ success: true, favorites });
            }
          }
        } catch {}
      }

      try {
        const favorites = await storage.getUserFavorites(parseInt(String(userId)));
        return res.json({ success: true, favorites });
      } catch {
        const sess = req.session as any;
        const favIds: number[] = Array.isArray(sess?.favorites) ? sess.favorites : [];
        if (favIds.length === 0) {
          return res.json({ success: true, favorites: [] });
        }
        const rows = await db
          .select({
            id: products.id,
            name: products.name,
            slug: products.slug,
            description: products.description,
            longDescription: products.longDescription,
            brandName: brands.name,
            categoryName: productCategories.name,
            categorySlug: productCategories.slug,
            isNew: products.isNew,
            hasSpecialOffer: products.hasSpecialOffer,
            minPriceCents: sql<number>`COALESCE(MIN(${productSizes.price}), 0)`.as("min_price_cents")
          })
          .from(products)
          .leftJoin(brands, eq(products.brandId, brands.id))
          .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
          .leftJoin(productSizes, eq(products.id, productSizes.productId))
          .where(inArray(products.id, favIds))
          .groupBy(products.id, brands.name, productCategories.name, productCategories.slug);
        const favorites = rows.map(r => ({ ...r, basePrice: r.minPriceCents ? r.minPriceCents / 100 : null })) as any;
        return res.json({ success: true, favorites });
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch favorites" 
      });
    }
  });

  // Check if product is favorited by user
  app.get("/api/favorites/:userId/:productId", async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.params;

      if (!userId || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId are required" 
        });
      }

      // Supabase via user token (RLS)
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          } as any);
          const { data, error } = await (client as any)
            .from("user_favorites")
            .select("id")
            .eq("user_id", String(userId))
            .eq("product_id", Number(productId))
            .maybeSingle();
          if (!error) {
            return res.json({ success: true, isFavorite: !!data });
          }
        } catch {}
      }

      try {
        const numericProductId = parseInt(String(productId));
        const numericUserId = parseInt(String(userId));
        const isFavorite = await storage.isProductFavorite(numericUserId, numericProductId);
        return res.json({ success: true, isFavorite });
      } catch {
        const sess = req.session as any;
        const favs: number[] = Array.isArray(sess?.favorites) ? sess.favorites : [];
        const isFavorite = favs.includes(Number(productId));
        return res.json({ success: true, isFavorite });
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check favorite status" 
      });
    }
  });

  // Clear all user favorites
  app.delete("/api/favorites/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId is required" 
        });
      }

      // Supabase via user token (RLS)
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          } as any);
          const { error } = await (client as any)
            .from("user_favorites")
            .delete()
            .eq("user_id", String(userId));
          if (!error) {
            return res.json({ success: true, message: "All favorites cleared successfully" });
          }
        } catch {}
      }

      try {
        await storage.clearUserFavorites(parseInt(String(userId)));
        return res.json({ success: true, message: "All favorites cleared successfully" });
      } catch {
        (req.session as any).favorites = [];
        return res.json({ success: true, message: "All favorites cleared successfully" });
      }
    } catch (error) {
      console.error("Error clearing favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to clear favorites" 
      });
    }
  });

  // Addresses API
  app.get("/api/addresses", async (req: Request, res: Response) => {
    try {
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        } as any);
        const { data: me } = await (client as any).auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        let { data, error } = await (client as any)
          .from("user_addresses")
          .select("id,street,city,cap,province,country,is_default,first_name,last_name")
          .eq("user_id", String(userId));
        if (error) {
          const fallback = await (client as any)
            .from("user_addresses")
            .select("id,street,city,cap,province,country,is_default")
            .eq("user_id", String(userId));
          data = fallback.data;
          error = fallback.error;
          if (error) return res.status(400).json({ success: false, error });
        }
        const normalized = (data || []).map((row: any) => ({
          id: row.id,
          firstName: row.first_name ?? undefined,
          lastName: row.last_name ?? undefined,
          address: row.street,
          city: row.city,
          postalCode: row.cap ?? row.postal_code,
          province: row.province,
          country: row.country,
          isDefault: !!row.is_default,
          type: "home",
        }));
        return res.json(normalized);
      }
      const sess = req.session as any;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const addresses = Array.isArray(sess.addresses) ? sess.addresses : [];
      return res.json(addresses);
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.post("/api/addresses", async (req: Request, res: Response) => {
    try {
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      const { firstName, lastName, address, city, postalCode, province, country, isDefault } = req.body || {};
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        } as any);
        const { data: me } = await (client as any).auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        // Count existing addresses to decide default
        const { count: addrCount } = await (client as any)
          .from("user_addresses")
          .select("id", { count: "exact", head: true })
          .eq("user_id", String(userId));
        const willBeDefault = (addrCount ?? 0) === 0 ? true : !!isDefault;

        let { data, error } = await (client as any)
          .from("user_addresses")
          .insert({
            user_id: String(userId),
            street: address,
            city,
            cap: postalCode,
            province,
            country,
            is_default: willBeDefault,
            first_name: firstName,
            last_name: lastName,
          })
          .select("*")
          .maybeSingle();
        if (error) {
          const retry = await (client as any)
            .from("user_addresses")
            .insert({
              user_id: String(userId),
              street: address,
              city,
              cap: postalCode,
              province,
              country,
              is_default: willBeDefault,
            })
            .select("*")
            .maybeSingle();
          data = retry.data;
          error = retry.error;
          if (error) return res.status(400).json({ success: false, error });
        }

        // If set as default, unset others
        if (willBeDefault && data?.id) {
          await (client as any)
            .from("user_addresses")
            .update({ is_default: false })
            .eq("user_id", String(userId))
            .neq("id", data.id);
        }

        const normalized = data
          ? {
              id: data.id,
              firstName,
              lastName,
              address: data.street,
              city: data.city,
              postalCode: data.cap ?? data.postal_code,
              province: data.province,
              country: data.country,
              isDefault: !!data.is_default,
              type: "home",
            }
          : null;
        return res.status(201).json({ success: true, address: normalized });
      }
      const sess = req.session as any;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const list: any[] = Array.isArray(sess.addresses) ? sess.addresses : [];
      const id = Date.now();
      const newAddr = { id, firstName, lastName, address, city, postalCode, province, country, isDefault: !!isDefault };
      let next = [...list, newAddr];
      const hasDefault = next.some(a => a.isDefault);
      if (!hasDefault) {
        next = next.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
      } else if (newAddr.isDefault) {
        next = next.map(a => ({ ...a, isDefault: a.id === id }));
      }
      (req.session as any).addresses = next;
      return res.status(201).json({ success: true, address: newAddr });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Set default address
  app.put("/api/addresses/:id/default", async (req: Request, res: Response) => {
    try {
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      const addrId = Number(req.params.id);
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        } as any);
        const { data: me } = await (client as any).auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        await (client as any)
          .from("user_addresses")
          .update({ is_default: false })
          .eq("user_id", String(userId));
        const { error } = await (client as any)
          .from("user_addresses")
          .update({ is_default: true })
          .eq("id", addrId)
          .eq("user_id", String(userId));
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      }
      const sess = req.session as any;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const list: any[] = Array.isArray(sess.addresses) ? sess.addresses : [];
      const next = list.map(a => ({ ...a, isDefault: Number(a.id) === addrId }));
      (req.session as any).addresses = next;
      return res.json({ success: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.delete("/api/addresses/:id", async (req: Request, res: Response) => {
    try {
      const authHdr = (req.headers as any)["authorization"] || (req.headers as any)["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : undefined;
      const addrId = Number(req.params.id);
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        } as any);
        const { data: me } = await (client as any).auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        const { error } = await (client as any)
          .from("user_addresses")
          .delete()
          .eq("id", addrId)
          .eq("user_id", String(userId));
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      }
      const sess = req.session as any;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const list: any[] = Array.isArray(sess.addresses) ? sess.addresses : [];
      const next = list.filter(a => Number(a.id) !== addrId);
      (req.session as any).addresses = next;
      return res.json({ success: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Orders API
  app.get("/api/orders", async (req: Request, res: Response) => {
    try {
      const sess = req.session as any;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      console.log(`[ORDERS] headers: Authorization=${!!((req.headers as any)["authorization"] || (req.headers as any)["Authorization"])}, cookie=${!!(req.headers as any)["cookie"]}, sessionAuth=${!!user?.authenticated}`);
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }

      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Database non configurato" });
      }

      // Recupera ordini dal database per questo utente
      const { data: orders, error } = await (supabaseAdmin as any)
        .from("orders")
        .select(`
          id,
          user_id,
          shipping_address_id,
          status,
          currency,
          total_cents,
          stripe_session_id,
          created_at,
          updated_at,
          tracking_number,
          carrier
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[ORDERS] Errore recupero ordini:", error);
        return res.status(500).json({ success: false, message: "Errore recupero ordini" });
      }

      // Recupera anche gli order_items per ogni ordine
      const ordersWithItems = await Promise.all(
        (orders || []).map(async (order: any) => {
          const { data: items, error: itemsError } = await (supabaseAdmin as any)
            .from("order_items")
            .select(`
              id,
              quantity,
              unit_price_cents,
              line_total_cents,
              product_option:product_option_id (
                id,
                flavor,
                size,
                image,
                product:product_id (
                  name,
                  image
                )
              )
            `)
            .eq("order_id", order.id);

          if (itemsError) {
            console.error(`[ORDERS] Errore recupero items per ordine ${order.id}:`, itemsError);
          }

          // Formatta items per il frontend
          const formattedItems = (items || []).map((item: any) => ({
            id: item.id,
            name: item.product_option?.product?.name || "Prodotto",
            variant: [item.product_option?.flavor, item.product_option?.size].filter(Boolean).join(" - "),
            quantity: item.quantity,
            price: item.unit_price_cents,
            image: item.product_option?.image || item.product_option?.product?.image || null
          }));

          return {
            id: order.id,
            snipcartOrderId: order.stripe_session_id,
            total: order.total_cents,
            status: order.status,
            items: formattedItems,
            shippingAddress: null, // TODO: fetch shipping address if needed
            createdAt: order.created_at,
            updatedAt: order.updated_at,
            trackingNumber: order.tracking_number || null,
            carrier: order.carrier || null
          };
        })
      );

      return res.json({ orders: ordersWithItems });
    } catch (error) {
      console.error("[ORDERS] Errore:", error);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Get order by Stripe session ID
  app.get("/api/orders/by-session/:sessionId", async (req: Request, res: Response) => {
    try {
      const sess = req.session as any;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;

      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }

      const { sessionId } = req.params;
      if (!sessionId) {
        return res.status(400).json({ success: false, message: "Session ID mancante" });
      }

      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Database non configurato" });
      }

      // Cerca l'ordine tramite stripe_session_id, verificando che appartenga all'utente
      const { data: order, error } = await (supabaseAdmin as any)
        .from("orders")
        .select("id, user_id, status, currency, total_cents, created_at")
        .eq("id", sessionId)
        .eq("user_id", user.id)
        .single();

      if (error || !order) {
        console.log(`[ORDERS] Ordine non trovato per session: ${sessionId}, user: ${user.id}`);
        return res.json({ success: true, order: null });
      }

      return res.json({ success: true, order });
    } catch (error: any) {
      console.error("[ORDERS] Errore recupero ordine per session:", error?.message || error);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // ========== PRODUCT SLUG MANAGEMENT API ROUTES ==========

  // Update product slug and create redirect from old slug
  app.put("/api/product/:id/slug", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { newSlug } = req.body;

      // Validate required fields
      if (!id || !newSlug) {
        return res.status(400).json({ 
          success: false, 
          message: "Product ID and newSlug are required" 
        });
      }

      // Validate that id is numeric
      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Product ID must be a valid number" 
        });
      }

      // Validate slug format (basic validation)
      if (typeof newSlug !== 'string' || newSlug.trim() === '') {
        return res.status(400).json({ 
          success: false, 
          message: "newSlug must be a valid non-empty string" 
        });
      }

      // Clean the slug (remove special characters, make URL-friendly)
      const cleanSlug = newSlug.trim().toLowerCase()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      if (cleanSlug === '') {
        return res.status(400).json({ 
          success: false, 
          message: "newSlug contains only invalid characters" 
        });
      }

      // Update product slug and create redirect
      const result = await storage.updateProductSlug(numericId, cleanSlug);
      
      res.json({ 
        success: true, 
        message: "Product slug updated successfully and redirect created",
        oldSlug: result.oldSlug,
        newSlug: result.newSlug
      });
    } catch (error) {
      console.error("Error updating product slug:", error);
      
      // Handle specific error cases
      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to update product slug" 
      });
    }
  });

  // ========== PRICE WATCHER API ROUTES ==========

  // Start automatic price watching
  app.post("/api/price-watcher/start", async (req: Request, res: Response) => {
    try {
      const { spreadsheetId, intervalMinutes = 2 } = req.body;

      if (!spreadsheetId) {
        return res.status(400).json({ 
          success: false, 
          message: "spreadsheetId is required" 
        });
      }

      // Import PriceWatcher dynamically to avoid circular dependencies
      const { PriceWatcher } = await import('./priceWatcher');

      // Stop existing watcher if running
      if ((global as any).priceWatcher) {
        (global as any).priceWatcher.stop();
      }

      // Start new watcher
      (global as any).priceWatcher = new PriceWatcher(spreadsheetId);
      (global as any).priceWatcher.start(intervalMinutes);

      res.json({ 
        success: true, 
        message: `Price watcher started. Checking every ${intervalMinutes} minutes.`,
        spreadsheetId,
        intervalMinutes
      });
    } catch (error) {
      console.error("Error starting price watcher:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to start price watcher" 
      });
    }
  });

  // Stop automatic price watching
  app.post("/api/price-watcher/stop", async (req: Request, res: Response) => {
    try {
      if ((global as any).priceWatcher) {
        (global as any).priceWatcher.stop();
        (global as any).priceWatcher = null;

        res.json({ 
          success: true, 
          message: "Price watcher stopped successfully" 
        });
      } else {
        res.json({ 
          success: false, 
          message: "No price watcher is currently running" 
        });
      }
    } catch (error) {
      console.error("Error stopping price watcher:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to stop price watcher" 
      });
    }
  });

  // Get price watcher status
  app.get("/api/price-watcher/status", async (req: Request, res: Response) => {
    try {
      const isActive = (global as any).priceWatcher ? (global as any).priceWatcher.isActive() : false;

      res.json({ 
        success: true, 
        isActive,
        message: isActive ? "Price watcher is running" : "Price watcher is stopped"
      });
    } catch (error) {
      console.error("Error checking price watcher status:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check price watcher status" 
      });
    }
  });

  // Debug Google Sheets content
  app.post("/api/price-watcher/debug-sheets", async (req: Request, res: Response) => {
    try {
      const { spreadsheetId, sheetName = 'Prezzi Prodotti' } = req.body;

      if (!spreadsheetId) {
        return res.status(400).json({ 
          success: false, 
          message: "spreadsheetId is required" 
        });
      }

      const { PriceWatcher } = await import('./priceWatcher');
      const watcher = new PriceWatcher(spreadsheetId, sheetName);

      // Leggi direttamente dal Google Sheets
      const auth = await watcher.authenticate();
      const { google } = await import('googleapis');
      const sheets = google.sheets({ version: 'v4', auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${sheetName}'!A:G`,
      });

      const rows = response.data.values;

      res.json({ 
        success: true,
        data: {
          totalRows: rows ? rows.length : 0,
          headers: rows ? rows[0] : null,
          firstFewRows: rows ? rows.slice(1, 6) : [],
          lastModified: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Error debugging Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to debug Google Sheets",
        error: (error as Error).message || String(error)
      });
    }
  });

  // Sync database to Google Sheets
  app.post("/api/price-watcher/sync-to-sheets", async (req: Request, res: Response) => {
    try {
      const { spreadsheetId, sheetName = 'Prezzi Prodotti' } = req.body;

      if (!spreadsheetId) {
        return res.status(400).json({ 
          success: false, 
          message: "spreadsheetId is required" 
        });
      }

      const { PriceWatcher } = await import('./priceWatcher');
      const watcher = new PriceWatcher(spreadsheetId, sheetName);

      // Esegui sincronizzazione completa dal database al Google Sheets
      await watcher.syncDatabaseToGoogleSheets();

      res.json({ 
        success: true,
        message: "Database synchronized to Google Sheets successfully"
      });
    } catch (error) {
      console.error("Error syncing to Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to sync to Google Sheets",
        error: (error as Error).message || String(error)
      });
    }
  });

  // ================================
  // AUTHENTICATION GATE ENDPOINTS
  // ================================

  // Credenziali hardcoded per accesso privato
  const VALID_CREDENTIALS = [
    { username: 'biggimmy', password: 'XNCahKl09P!298Gq20LkAns!1' },
    { username: 'andrea', password: 'So347291Pa21Jkaò!ksi=p0!' }
  ];

  // [REMOVED] Duplicate /api/auth/login endpoint unificato sopra








  async function buildCartItem(
      productId: number,
      variant: string,
      quantity: number,
      price: number
    ) {
      const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
      if (!product) {
        throw new Error("Product not found");
      }
      const [primaryImg] = await db
        .select()
        .from(productImages)
        .where(and(eq(productImages.productId, product.id), eq(productImages.isPrimary, true)))
        .limit(1);

      const imageUrl = primaryImg?.src
        ? (primaryImg.src.startsWith('/images/') || primaryImg.src.startsWith('/attached_assets/')
            ? primaryImg.src
            : `/images/products/${primaryImg.src}`)
        : undefined;

      return {
        id: productId.toString(),
        name: product.name,
        price: price,
        variant,
        quantity,
        image: imageUrl,
      };
    }



    app.get("/api/cart/:userId", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const auth = await getAuthFromToken(req);
        const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }
        const { userId } = req.params;
        if (supabaseAdmin) {
          // Query diretta alla tabella cart_items con join
          const { data, error } = await (supabaseAdmin as any)
            .from("cart_items")
            .select(`
              id,
              quantity,
              product_option_id,
              product_options (
                id,
                flavor,
                size,
                price_cents,
                product_id,
                products (
                  id,
                  name,
                  image_url
                )
              )
            `)
            .eq("user_id", userId);

          if (error) return res.status(400).json({ success: false, error });

          // Trasforma nel formato atteso dal frontend
          const items = (data || []).map((item: any) => ({
            id: item.id,
            product_option_id: item.product_option_id,
            quantity: item.quantity,
            price_cents: item.product_options?.price_cents,
            name: item.product_options?.products?.name || "Prodotto",
            variant: `${item.product_options?.flavor || ""} ${item.product_options?.size || ""}`.trim(),
            image: item.product_options?.products?.image_url,
          }));

          return res.json({ success: true, items });
        } else {
          const items = sess.cart || [];
          return res.json({ success: true, items });
        }
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Alias: GET /api/cart senza userId → usa sessione corrente
    app.get("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const auth = await getAuthFromToken(req);
        const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }
        if (supabaseAdmin && user?.id) {
          // Query diretta alla tabella cart_items con join
          const { data, error } = await (supabaseAdmin as any)
            .from("cart_items")
            .select(`
              id,
              quantity,
              product_option_id,
              product_options (
                id,
                flavor,
                size,
                price_cents,
                product_id,
                products (
                  id,
                  name,
                  image_url
                )
              )
            `)
            .eq("user_id", String(user.id));

          if (error) return res.status(400).json({ success: false, error });

          // Trasforma nel formato atteso dal frontend
          const items = (data || []).map((item: any) => ({
            id: item.id,
            product_option_id: item.product_option_id,
            quantity: item.quantity,
            price_cents: item.product_options?.price_cents,
            name: item.product_options?.products?.name || "Prodotto",
            variant: `${item.product_options?.flavor || ""} ${item.product_options?.size || ""}`.trim(),
            image: item.product_options?.products?.image_url,
          }));

          return res.json({ success: true, items });
        }
        const items = sess.cart || [];
        return res.json({ success: true, items });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Aggiungi al carrello
    app.post("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const auth = await getAuthFromToken(req);
        const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        console.log("DEBUG /api/cart POST body:", req.body);
        const { product_option_id, quantity, productId, variant, price } = req.body || {};

        if (supabaseAdmin) {
          const poid = Number(product_option_id);
          const qty = Number(quantity);
          if (Number.isFinite(poid) && poid > 0 && Number.isFinite(qty) && qty > 0) {
            const { error } = await (supabaseAdmin as any).rpc("add_to_cart", {
              p_product_option_id: poid,
              p_quantity: qty,
              p_user_id: String(user.id),
            });
            if (error) return res.status(400).json({ success: false, error });
            return res.json({ success: true });
          }

          const pid = Number(productId);
          const vstr = typeof variant === "string" ? variant : "";
          if (Number.isFinite(pid) && pid > 0 && vstr.length > 0 && Number.isFinite(qty) && qty > 0) {
            try {
              const { data, error } = await (supabaseAdmin as any)
                .from("product_options")
                .select("id, flavor, size, product_id")
                .eq("product_id", pid);
              if (error) return res.status(400).json({ success: false, error });
              const match = Array.isArray(data) ? data.find((o: any) => {
                const disp = `${(o.flavor ?? '').toString()} ${(o.size ?? '').toString()}`.replace(/Unico/gi, '').trim();
                return disp === vstr.replace(/Unico/gi, '').trim();
              }) : null;
              const resolvedId = match ? Number(match.id) : NaN;
              if (!Number.isFinite(resolvedId) || resolvedId <= 0) {
                return res.status(400).json({ success: false, message: "Parametri non validi" });
              }
              const { error: err2 } = await (supabaseAdmin as any).rpc("add_to_cart", {
                p_product_option_id: resolvedId,
                p_quantity: qty,
                p_user_id: String(user.id),
              });
              if (err2) return res.status(400).json({ success: false, error: err2 });
              return res.json({ success: true });
            } catch (e) {
              return res.status(500).json({ success: false, message: "Errore interno del server" });
            }
          }
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        if (supabaseAnon) {
          const poid = Number(product_option_id);
          const qty = Number(quantity);
          if (Number.isFinite(poid) && poid > 0 && Number.isFinite(qty) && qty > 0) {
            // Try RPC with anon
            const rpcRes = await (supabaseAnon as any).rpc("add_to_cart", {
              p_product_option_id: poid,
              p_quantity: qty,
              p_user_id: String(user.id),
            });
            if (!rpcRes.error) return res.json({ success: true });

            // Fallback: direct upsert into cart_items if policies allow
            const { error: upErr } = await (supabaseAnon as any)
              .from("cart_items")
              .upsert({ user_id: String(user.id), product_option_id: poid, quantity: qty }, { onConflict: "user_id,product_option_id" });
            if (!upErr) return res.json({ success: true });
          }
        }

        // Session fallback: support both product_option_id and productId+variant shapes
        const poidSess = Number(product_option_id);
        const qtySess = Number(quantity);
        let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];

        if (Number.isFinite(poidSess) && poidSess > 0 && Number.isFinite(qtySess) && qtySess > 0) {
          const idxByOption = current.findIndex(i => Number(i.product_option_id) === poidSess);
          if (idxByOption >= 0) {
            current[idxByOption] = { ...current[idxByOption], quantity: qtySess };
            sess.cart = current;
            return res.json({ success: true, items: current });
          }
          if (supabaseAnon) {
            const { data } = await (supabaseAnon as any)
              .from("product_options")
              .select("id, flavor, size, product_id, price_cents, image")
              .eq("id", poidSess)
              .limit(1)
              .maybeSingle();
            if (data && data.product_id) {
              let nameVal = "";
              try {
                const { data: prod } = await (supabaseAnon as any)
                  .from("products")
                  .select("name")
                  .eq("id", data.product_id)
                  .limit(1)
                  .maybeSingle();
                if (prod && prod.name) nameVal = String(prod.name);
              } catch {}
              const variantStr = `${(data.flavor ?? '').toString()} ${(data.size ?? '').toString()}`.replace(/Unico/gi, '').trim();
              const priceVal = typeof data.price_cents === "number" ? data.price_cents / 100 : 0;
              const imageUrl = data.image ?? "";
              const newItem = {
                id: String(data.product_id),
                name: nameVal,
                price: priceVal,
                variant: variantStr,
                quantity: qtySess,
                image: imageUrl,
                product_option_id: poidSess,
              };
              current.push(newItem);
              sess.cart = current;
              return res.json({ success: true, items: current });
            }
          }
        }

        if (!productId || !variant || !quantity || typeof price !== "number") {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        const newItem = await buildCartItem(parseInt(productId), String(variant), parseInt(quantity), price);
        const idx = current.findIndex(i => i.id === newItem.id && i.variant === newItem.variant);
        if (idx >= 0) {
          current[idx] = { ...current[idx], quantity: current[idx].quantity + newItem.quantity };
        } else {
          current.push({ ...newItem, product_option_id: Number.isFinite(poidSess) && poidSess > 0 ? poidSess : undefined });
        }
        sess.cart = current;
        return res.json({ success: true, items: current });
      } catch (error: any) {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Aggiorna quantità
    app.put("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const auth = await getAuthFromToken(req);
        const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        console.log("DEBUG /api/cart PUT body:", req.body);

        const { product_option_id, quantity, productId, variant } = req.body || {};

        if (typeof product_option_id === "number" && typeof quantity === "number") {
          if (!supabaseAdmin) {
            // Fallback session update by product_option_id o id
            let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];
            const poidNum = Number(product_option_id);
            let idxByOption = current.findIndex(i => Number(i.product_option_id) === poidNum);
            if (idxByOption < 0) {
              idxByOption = current.findIndex(i => String(i.id) === String(product_option_id));
            }
            if (idxByOption >= 0) {
              if (quantity <= 0) {
                current = current.filter((_, i) => i !== idxByOption);
              } else {
                const updated = { ...current[idxByOption], quantity: Number(quantity), product_option_id: poidNum };
                current[idxByOption] = updated;
              }
              sess.cart = current;
              return res.status(200).json({ success: true, items: current });
            }
            // Not found → proceed a productId+variant path sotto
          } else {
            const { error } = await (supabaseAdmin as any).rpc("update_cart_quantity", {
              p_product_option_id: product_option_id,
              p_quantity: quantity,
              p_user_id: String(user.id),
            });
            if (error) {
              console.error("Errore update cart_items su Supabase", error);
              return res.status(500).json({ success: false, message: "Errore aggiornamento carrello (DB)" });
            }
            return res.status(200).json({ success: true });
          }
        }

        if (!productId || typeof quantity !== "number") {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];
        const idx = current.findIndex(i => {
          const idMatch = i.id === String(productId);
          if (typeof variant === "string" && variant.length > 0) {
            return idMatch && i.variant === String(variant);
          }
          return idMatch;
        });
        if (idx < 0) {
          return res.status(404).json({ success: false, message: "Item non trovato" });
        }
        if (quantity <= 0) {
          current = current.filter((_, i) => i !== idx);
        } else {
          current[idx] = { ...current[idx], quantity };
        }
        sess.cart = current;
        return res.json({ success: true, items: current });
      } catch (error) {
        console.error("Errore PUT /api/cart:", error);
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Rimuovi item dal carrello
    app.delete("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const auth = await getAuthFromToken(req);
        const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        const { product_option_id, productId, variant } = req.body || {};

        // Supabase path: rimozione per product_option_id
        if (supabaseAdmin && typeof product_option_id === "number" && product_option_id > 0) {
          const { error } = await (supabaseAdmin as any).rpc("remove_from_cart", {
            p_product_option_id: product_option_id,
            p_user_id: String(user.id),
          });
          if (error) {
            console.error("Errore remove cart_items su Supabase", error);
            return res.status(500).json({ success: false, message: "Errore rimozione carrello (DB)" });
          }
          return res.json({ success: true });
        }

        if (!supabaseAdmin && supabaseAnon && typeof product_option_id === "number" && product_option_id > 0) {
          const { error } = await (supabaseAnon as any)
            .from("cart_items")
            .delete()
            .eq("user_id", String(user.id))
            .eq("product_option_id", Number(product_option_id));
          if (!error) return res.json({ success: true });
        }

        // Session fallback: support product_option_id or productId + variant
        let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];

        if (typeof product_option_id === "number" && product_option_id > 0) {
          const next = current.filter(i => Number(i.product_option_id) !== Number(product_option_id));
          sess.cart = next;
          return res.json({ success: true, items: next });
        }

        if (!productId) {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        const next = current.filter(i => {
          const idMatch = i.id === String(productId);
          if (typeof variant === "string" && variant.length > 0) {
            return !(idMatch && i.variant === String(variant));
          }
          return !idMatch;
        });
        sess.cart = next;
        return res.json({ success: true, items: next });
      } catch {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Svuota carrello utente
    app.delete("/api/cart/:userId", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const auth = await getAuthFromToken(req);
        const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }
        const { userId } = req.params;
        if (supabaseAdmin) {
          const { error } = await (supabaseAdmin as any).rpc("clear_cart", { p_user_id: userId });
          if (error) return res.status(400).json({ success: false, error });
          return res.json({ success: true });
        }
        sess.cart = [];
        return res.json({ success: true, items: [] });
      } catch {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    

    app.get("/api/cart-db/:userId", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { userId } = req.params;
        // Query diretta alla tabella cart_items con join
        const { data, error } = await (supabaseAdmin as any)
          .from("cart_items")
          .select(`
            id,
            quantity,
            product_option_id,
            product_options (
              id,
              flavor,
              size,
              price_cents,
              product_id,
              products (
                id,
                name,
                image_url
              )
            )
          `)
          .eq("user_id", userId);

        if (error) return res.status(400).json({ success: false, error });

        // Trasforma nel formato atteso dal frontend
        const items = (data || []).map((item: any) => ({
          id: item.id,
          product_option_id: item.product_option_id,
          quantity: item.quantity,
          price_cents: item.product_options?.price_cents,
          name: item.product_options?.products?.name || "Prodotto",
          variant: `${item.product_options?.flavor || ""} ${item.product_options?.size || ""}`.trim(),
          image: item.product_options?.products?.image_url,
        }));

        return res.json({ success: true, items });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore caricamento carrello" });
      }
    });

    app.post("/api/cart-db", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { product_option_id, quantity } = req.body || {};
        if (!product_option_id || !quantity) {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }
        const sess = req.session as any;
        const userId = sess?.user?.id;
        const { error } = await (supabaseAdmin as any).rpc("add_to_cart", {
          p_product_option_id: product_option_id,
          p_quantity: quantity,
          ...(userId ? { p_user_id: userId } : {}),
        });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore aggiunta carrello" });
      }
    });

    app.put("/api/cart-db", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { product_option_id, quantity } = req.body || {};
        if (!product_option_id || typeof quantity !== "number") {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }
        const sess = req.session as any;
        const userId = sess?.user?.id;
        const { error } = await (supabaseAdmin as any).rpc("update_cart_quantity", {
          p_product_option_id: product_option_id,
          p_quantity: quantity,
          ...(userId ? { p_user_id: userId } : {}),
        });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore aggiornamento carrello" });
      }
    });

    app.delete("/api/cart-db", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { product_option_id } = req.body || {};
        if (!product_option_id) {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }
        const sess = req.session as any;
        const userId = sess?.user?.id;
        const { error } = await (supabaseAdmin as any).rpc("remove_from_cart", {
          p_product_option_id: product_option_id,
          ...(userId ? { p_user_id: userId } : {}),
        });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore rimozione carrello" });
      }
    });

    app.delete("/api/cart-db/:userId", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { userId } = req.params;
        const { error } = await (supabaseAdmin as any).rpc("clear_cart", { p_user_id: userId });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore svuotamento carrello" });
      }
    });

    app.post("/api/checkout", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        // Recupera indirizzo spedizione dal body (opzionale)
        const { shipping_address_id } = req.body || {};

        let items: any[] = [];
        if (supabaseAdmin && user?.id) {
          // Query diretta alla tabella cart_items con join a product_options e products
          const { data, error } = await (supabaseAdmin as any)
            .from("cart_items")
            .select(`
              id,
              quantity,
              product_option_id,
              product_options (
                id,
                flavor,
                size,
                price_cents,
                product_id,
                products (
                  id,
                  name
                )
              )
            `)
            .eq("user_id", user.id);

          if (error) {
            console.error("Checkout cart query error:", error);
            return res.status(400).json({ success: false, error });
          }

          // Trasforma i dati nel formato atteso
          items = (data || []).map((item: any) => ({
            product_option_id: item.product_option_id,
            quantity: item.quantity,
            price_cents: item.product_options?.price_cents,
            name: item.product_options?.products?.name || "Prodotto",
            variant: `${item.product_options?.flavor || ""} ${item.product_options?.size || ""}`.trim(),
            image: null, // Le immagini verranno gestite separatamente se necessario
          }));
        } else {
          items = Array.isArray(sess.cart) ? sess.cart : [];
        }
        if (!items.length) {
          return res.status(400).json({ success: false, message: "Carrello vuoto" });
        }

        const secret = process.env.STRIPE_SECRET_KEY;
        const successUrl = process.env.CHECKOUT_SUCCESS_URL || "http://localhost:5000/checkout/success";
        const cancelUrl = process.env.CHECKOUT_CANCEL_URL || "http://localhost:5000/checkout/cancel";
        if (!secret) {
          console.error("Checkout error: STRIPE_SECRET_KEY mancante");
          return res.status(500).json({ success: false, message: "Stripe non configurato" });
        }

        console.log("Checkout env check:", { hasSecret: !!secret, successUrl, cancelUrl, userId: user.id });

        const stripe = new Stripe(secret as string);

        // Calcola il totale per applicare lo sconto
        const subtotalCents = items.reduce((sum, i) => {
          const priceCents = typeof i.price_cents === "number" ? i.price_cents : Math.round(Number(i.price) * 100);
          return sum + (priceCents * Number(i.quantity));
        }, 0);

        // Applica sconto 10%
        const totalAfterDiscount = Math.round(subtotalCents * 0.90);

        // Spedizione: gratis sopra 160 EUR, altrimenti 12 EUR
        const shippingCents = totalAfterDiscount >= 16000 ? 0 : 1200;

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => {
          const priceCents = typeof i.price_cents === "number" ? i.price_cents : Math.round(Number(i.price) * 100);
          // Applica sconto 10% sul prezzo unitario
          const discountedPrice = Math.round(priceCents * 0.90);
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: `${String(i.name ?? '')} - ${String(i.variant ?? '')}`.trim(),
                images: i.image && i.image.startsWith('http') ? [i.image] : [],
              },
              unit_amount: discountedPrice,
            },
            quantity: Number(i.quantity),
          };
        });

        // Aggiungi spedizione come line item se necessario
        if (shippingCents > 0) {
          line_items.push({
            price_data: {
              currency: "eur",
              product_data: {
                name: "Spedizione",
              },
              unit_amount: shippingCents,
            },
            quantity: 1,
          });
        }

        // Prepara metadata con info carrello (max 500 chars per valore)
        const cartMetadata = items.map(i => ({
          product_option_id: i.product_option_id,
          quantity: i.quantity,
          price_cents: i.price_cents
        }));
        const cartItemsJson = JSON.stringify(cartMetadata).slice(0, 500);

        const sessionStripe = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items,
          success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: cancelUrl,
          customer_email: user.email || undefined,
          metadata: {
            user_id: user.id,
            shipping_address_id: shipping_address_id ? String(shipping_address_id) : "",
            cart_items: cartItemsJson,
          },
        });

        console.log(`Checkout session creata: ${sessionStripe.id} per user: ${user.id}`);
        return res.json({ success: true, url: sessionStripe.url });
      } catch (error: any) {
        console.error("Checkout error:", error?.message || error);
        return res.status(500).json({ success: false, message: "Errore creazione checkout" });
      }
    });

  // ================================
  // ORDER TRACKING ENDPOINT (semplificato)
  // ================================

  // PUT aggiorna tracking number e corriere (admin only)
  app.put("/api/admin/orders/:orderId/tracking", ensureAuth, ensureAdmin, async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { tracking_number, carrier } = req.body;

      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Database non configurato" });
      }

      const updates: any = {
        updated_at: new Date().toISOString()
      };

      if (tracking_number !== undefined) updates.tracking_number = tracking_number;
      if (carrier !== undefined) updates.carrier = carrier;

      const { error } = await (supabaseAdmin as any)
        .from("orders")
        .update(updates)
        .eq("id", orderId);

      if (error) {
        console.error("[TRACKING] Errore aggiornamento tracking:", error);
        return res.status(500).json({ success: false, message: "Errore aggiornamento tracciamento" });
      }

      return res.json({ success: true, message: "Tracciamento aggiornato" });
    } catch (err) {
      console.error("[TRACKING] Errore PUT /api/admin/orders/:orderId/tracking:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

