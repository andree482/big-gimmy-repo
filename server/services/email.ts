import { Resend } from 'resend';

// Configurazione indirizzi
// In fase di test con Resend "onboarding", l'ADMIN_EMAIL deve essere quella con cui ti sei registrato su Resend
const ADMIN_EMAIL = 'lucaandrea264@gmail.com'; 
const FROM_EMAIL = 'onboarding@resend.dev'; // Cambierai in noreply@biggimmyintegratori.com dopo verifica DNS

// Modalità di simulazione
const SIMULATION_MODE = false;
export const isSimulationMode = SIMULATION_MODE;

// Inizializzazione Resend
let resend: Resend | null = null;

if (!SIMULATION_MODE) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("ATTENZIONE: RESEND_API_KEY non impostata. Il sistema userà la simulazione forzata.");
  } else {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
}

// --- INTERFACCE ---
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface OrderEmailData {
  orderId: string;
  userEmail: string;
  userName: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    province?: string;
  };
}

// --- FUNZIONI DI INVIO ---

/**
 * Invia notifica all'amministratore (TE)
 */
export async function sendAdminNotification(formData: ContactFormData): Promise<boolean> {
  const { name, email, phone, message } = formData;

  if (SIMULATION_MODE || !resend) {
    console.log('=== SIMULAZIONE ADMIN EMAIL ===', formData);
    return true;
  }

  try {
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="it">
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%); padding: 30px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 10px;">📬</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">
              Nuovo Messaggio dal Sito
            </h1>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">

            <!-- Contact Info -->
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px; width: 100px;">👤 Nome</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px;">📧 Email</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">
                    <a href="mailto:${email}" style="color: #1976d2; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px;">📞 Telefono</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${phone || '<span style="color: #999;">Non fornito</span>'}</td>
                </tr>
              </table>
            </div>

            <!-- Message -->
            <h3 style="color: #1a1a1a; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
              💬 Messaggio
            </h3>
            <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border-left: 4px solid #FFD100; padding: 20px; border-radius: 0 10px 10px 0;">
              <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <!-- Quick Reply Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Richiesta dal sito Big Gimmy"
                 style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px;
                        text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 15px rgba(255,209,0,0.3);">
                ✉️ Rispondi a ${name}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #1a1a1a; padding: 20px 30px; text-align: center;">
            <p style="color: #666; font-size: 11px; margin: 0;">
              📅 Ricevuto il ${new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `📬 Nuovo messaggio da ${name}`,
      html: emailHTML,
    });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Errore invio admin:', err);
    return false;
  }
}

/**
 * Invia conferma automatica al cliente
 */
export async function sendUserConfirmation(formData: ContactFormData): Promise<boolean> {
  const { name, email } = formData;

  if (SIMULATION_MODE || !resend) {
    console.log('=== SIMULAZIONE USER CONFIRMATION ===', email);
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Abbiamo ricevuto il tuo messaggio - Big Gimmy',
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #1a1a1a; margin: 0; font-size: 26px; font-weight: 700;">
                🏋️ Big Gimmy Integratori
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 22px;">
                Ciao ${name}! 👋
              </h2>

              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e lo abbiamo preso in carico.
              </p>

              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #FFD100; padding: 20px; border-radius: 0 8px 8px 0; margin: 25px 0;">
                <p style="color: #1a1a1a; font-size: 15px; margin: 0; font-weight: 500;">
                  ⏰ Ti risponderemo entro <strong>24 ore lavorative</strong>
                </p>
              </div>

              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 20px 0 0 0;">
                Nel frattempo, puoi continuare a esplorare il nostro catalogo di integratori premium!
              </p>

              <div style="text-align: center; margin: 35px 0 20px 0;">
                <a href="https://biggimmyintegratori.com/products"
                   style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 35px;
                          text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 15px rgba(255,209,0,0.3);">
                  Scopri i Prodotti
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #888; font-size: 13px; margin: 0 0 8px 0;">
                💪 Il Team di Big Gimmy Integratori
              </p>
              <p style="color: #666; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Errore invio conferma utente:', err);
    return false;
  }
}

/**
 * Invia conferma ordine dopo pagamento
 */
export async function sendOrderConfirmationEmail(orderData: OrderEmailData): Promise<boolean> {
  const { orderId, userEmail, userName, total, items, shippingAddress } = orderData;

  console.log(`[EMAIL ORDER] Tentativo invio email ordine #${orderId} a ${userEmail}`);
  console.log(`[EMAIL ORDER] Dati: userName=${userName}, total=${total}, items=${items?.length || 0}`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE ORDINE (SIMULATION_MODE=true) ===', orderId);
    return true;
  }

  if (!resend) {
    console.error('[EMAIL ORDER] ERRORE: Resend non inizializzato! Verifica RESEND_API_KEY in .env');
    console.log('=== SIMULAZIONE ORDINE (resend=null) ===', orderId);
    return true;
  }

  // ATTENZIONE: Con onboarding@resend.dev puoi inviare solo a lucaandrea264@gmail.com
  console.log(`[EMAIL ORDER] Resend configurato, invio a: ${userEmail}`);

  try {
    const itemsHTML = items.map(item => `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; text-align: center; color: #666;">${item.quantity}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; text-align: right; color: #333; font-weight: 500;">€${(item.price / 100).toFixed(2)}</td>
      </tr>
    `).join('');

    const shippingHTML = shippingAddress ? `
      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-top: 25px;">
        <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 12px 0;">📦 Indirizzo di Spedizione</h3>
        <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
          ${shippingAddress.street}<br>
          ${shippingAddress.postalCode} ${shippingAddress.city}${shippingAddress.province ? ` (${shippingAddress.province})` : ''}
        </p>
      </div>
    ` : '';

    const { error } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: `✅ Ordine Confermato #${orderId.slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Ordine Confermato!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${orderId.slice(-8).toUpperCase()}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Ciao <strong>${userName}</strong>, grazie per il tuo acquisto! Il tuo ordine è stato ricevuto ed è ora in fase di preparazione.
              </p>

              <!-- Order Items Table -->
              <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #FFD100;">
                🛒 Riepilogo Ordine
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background: #f8f9fa;">
                    <th style="padding: 12px 15px; text-align: left; color: #666; font-weight: 600; font-size: 13px;">PRODOTTO</th>
                    <th style="padding: 12px 15px; text-align: center; color: #666; font-weight: 600; font-size: 13px;">QTÀ</th>
                    <th style="padding: 12px 15px; text-align: right; color: #666; font-weight: 600; font-size: 13px;">PREZZO</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>

              <!-- Total -->
              <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); border-radius: 8px; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #1a1a1a; font-size: 16px; font-weight: 600;">Totale Pagato</span>
                <span style="color: #1a1a1a; font-size: 22px; font-weight: 700;">€${(total / 100).toFixed(2)}</span>
              </div>

              ${shippingHTML}

              <!-- Info Box -->
              <div style="background: #e8f5e9; border-left: 4px solid #2e7d32; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-top: 25px;">
                <p style="color: #2e7d32; font-size: 14px; margin: 0;">
                  📧 Riceverai un'email con il codice di tracciamento non appena il pacco sarà spedito.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                🏋️ Big Gimmy Integratori
              </p>
              <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">
                Grazie per aver scelto noi per i tuoi integratori!
              </p>
              <p style="color: #666; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error(`[EMAIL ORDER] Resend ha restituito errore:`, error);
      throw error;
    }
    console.log(`[EMAIL ORDER] ✅ Email ordine #${orderId} inviata con successo a ${userEmail}`);
    return true;
  } catch (err: any) {
    console.error(`[EMAIL ORDER] ❌ ERRORE invio email ordine #${orderId}:`, err?.message || err);
    // Se l'errore è "You can only send testing emails to your own email address"
    // significa che devi verificare il dominio su Resend
    if (err?.message?.includes('testing emails')) {
      console.error('[EMAIL ORDER] NOTA: Con onboarding@resend.dev puoi inviare solo a lucaandrea264@gmail.com');
    }
    return false;
  }
}

/**
 * Invia email di benvenuto dopo registrazione
 */
export async function sendWelcomeEmail(userData: { email: string; firstName?: string }): Promise<boolean> {
  const { email, firstName } = userData;
  const displayName = firstName || email.split('@')[0];

  console.log(`[EMAIL WELCOME] Tentativo invio welcome email a ${email} (nome: ${displayName})`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE WELCOME EMAIL (SIMULATION_MODE=true) ===', { email, firstName });
    return true;
  }

  if (!resend) {
    console.error('[EMAIL WELCOME] ERRORE: Resend non inizializzato! Verifica RESEND_API_KEY in .env');
    console.log('=== SIMULAZIONE WELCOME EMAIL (resend=null) ===', { email, firstName });
    return true; // Non blocchiamo il flusso
  }

  // ATTENZIONE: Con onboarding@resend.dev puoi inviare solo a lucaandrea264@gmail.com
  console.log(`[EMAIL WELCOME] Resend configurato, invio a: ${email}`);

  try {
    const { error } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Benvenuto in Big Gimmy! 💪',
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: sans-serif; background-color: #f8f9fa; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #FFD100 0%, #E6BC00 100%); padding: 30px; text-align: center;">
              <h1 style="color: #212121; margin: 0; font-size: 28px;">🏋️ Big Gimmy Integratori</h1>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #212121; margin-top: 0;">Ciao ${displayName}! 👋</h2>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Benvenuto nella famiglia Big Gimmy! Siamo felici di averti con noi.
              </p>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Il tuo account è stato creato con successo. Ora puoi:
              </p>
              <ul style="color: #555; font-size: 16px; line-height: 1.8;">
                <li>Sfogliare il nostro catalogo di integratori premium</li>
                <li>Aggiungere prodotti al carrello e completare ordini</li>
                <li>Seguire lo stato delle tue spedizioni</li>
                <li>Salvare i tuoi indirizzi per checkout più veloci</li>
              </ul>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://biggimmyintegratori.com/products"
                   style="display: inline-block; background: #FFD100; color: #212121; padding: 15px 30px;
                          text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Scopri i Nostri Prodotti
                </a>
              </div>
              <p style="color: #888; font-size: 14px; margin-top: 30px;">
                Hai domande? Rispondi a questa email o contattaci attraverso il sito.
              </p>
            </div>
            <div style="background: #f3f3f3; padding: 20px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error(`[EMAIL WELCOME] Resend ha restituito errore:`, error);
      throw error;
    }
    console.log(`[EMAIL WELCOME] ✅ Welcome email inviata con successo a ${email}`);
    return true;
  } catch (err: any) {
    console.error(`[EMAIL WELCOME] ❌ ERRORE invio welcome email a ${email}:`, err?.message || err);
    if (err?.message?.includes('testing emails')) {
      console.error('[EMAIL WELCOME] NOTA: Con onboarding@resend.dev puoi inviare solo a lucaandrea264@gmail.com');
    }
    return false;
  }
}

/**
 * Risposta personalizzata manuale
 */
export async function sendPersonalizedReply(
  recipientEmail: string,
  recipientName: string,
  subject: string,
  replyMessage: string
): Promise<boolean> {

  if (SIMULATION_MODE || !resend) {
    console.log('=== SIMULAZIONE RISPOSTA ===', recipientEmail);
    return true;
  }
// da capire
  try {
    const { error } = await resend.emails.send({
      from: `Team Big Gimmy <${FROM_EMAIL}>`,
      to: [recipientEmail],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); padding: 35px 30px; text-align: center;">
              <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 700;">
                🏋️ Big Gimmy Integratori
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 20px;">
                Ciao ${recipientName}!
              </h2>

              <div style="color: #4a4a4a; font-size: 15px; line-height: 1.8; white-space: pre-wrap; margin: 0 0 25px 0;">
${replyMessage}
              </div>

              <div style="border-top: 1px solid #eee; padding-top: 25px; margin-top: 25px;">
                <p style="color: #4a4a4a; font-size: 15px; line-height: 1.6; margin: 0;">
                  Rimaniamo a tua disposizione per qualsiasi altra domanda.
                </p>
                <p style="color: #4a4a4a; font-size: 15px; line-height: 1.6; margin: 15px 0 0 0;">
                  Un saluto,<br>
                  <strong style="color: #1a1a1a;">Il Team di Big Gimmy</strong>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #888; font-size: 13px; margin: 0 0 8px 0;">
                💪 Sempre al tuo fianco per raggiungere i tuoi obiettivi
              </p>
              <p style="color: #666; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Errore risposta personalizzata:', err);
    return false;
  }
}

/**
 * Invia un'email con il codice di tracciamento della spedizione
 */
export async function sendTrackingEmail(trackingData: any): Promise<boolean> {
  const { orderId, userEmail, userName, trackingNumber, carrier, trackingUrl } = trackingData;

  if (SIMULATION_MODE || !resend) {
    console.log('=== SIMULAZIONE EMAIL TRACKING ===', { orderId, trackingNumber });
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: `Spedizioni Big Gimmy <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: `🚚 Il tuo ordine #${orderId.slice(-8).toUpperCase()} è in viaggio!`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">🚚</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Il tuo pacco è in viaggio!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${orderId.slice(-8).toUpperCase()}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Ottime notizie <strong>${userName}</strong>! Il tuo ordine è stato spedito e sta arrivando da te.
              </p>

              <!-- Tracking Box -->
              <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="font-size: 24px; margin-right: 12px;">📦</span>
                  <div>
                    <p style="color: #666; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Corriere</p>
                    <p style="color: #1a1a1a; font-size: 18px; margin: 4px 0 0 0; font-weight: 600;">${carrier}</p>
                  </div>
                </div>

                <div style="background: #ffffff; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">Codice Tracking</p>
                  <p style="color: #1a1a1a; font-size: 20px; margin: 0; font-weight: 700; font-family: monospace; letter-spacing: 1px;">${trackingNumber}</p>
                </div>

                ${trackingUrl ? `
                <a href="${trackingUrl}"
                   style="display: block; background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: #ffffff; padding: 14px 25px;
                          text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; text-align: center;
                          box-shadow: 0 4px 15px rgba(25,118,210,0.3);">
                  📍 Traccia la Spedizione
                </a>
                ` : ''}
              </div>

              <!-- Info -->
              <div style="background: #fff3e0; border-left: 4px solid #ff9800; padding: 15px 20px; border-radius: 0 8px 8px 0;">
                <p style="color: #e65100; font-size: 14px; margin: 0;">
                  💡 <strong>Consiglio:</strong> Salva il codice tracking per monitorare la consegna in tempo reale.
                </p>
              </div>

              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 25px 0 0 0; text-align: center;">
                Preparati ad allenarti forte! 💪
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                🏋️ Big Gimmy Integratori
              </p>
              <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">
                Hai domande sulla spedizione? Contattaci!
              </p>
              <p style="color: #666; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Errore invio email tracking:', err);
    return false;
  }
}

/**
 * Invia email di conferma cambio password
 */
export async function sendPasswordChangedEmail(userData: { email: string; firstName?: string }): Promise<boolean> {
  const { email, firstName } = userData;
  const displayName = firstName || 'utente';

  console.log(`[EMAIL PASSWORD] Tentativo invio conferma cambio password a ${email}`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE PASSWORD CHANGED EMAIL (SIMULATION_MODE=true) ===', { email });
    return true;
  }

  if (!resend) {
    console.error('[EMAIL PASSWORD] ERRORE: Resend non inizializzato! Verifica RESEND_API_KEY in .env');
    console.log('=== SIMULAZIONE PASSWORD CHANGED EMAIL (resend=null) ===', { email });
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [email],
      subject: 'La tua password è stata modificata',
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Password Modificata
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 20px;">
                Ciao ${displayName}!
              </h2>

              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                Ti confermiamo che la password del tuo account <strong>${email}</strong> è stata modificata con successo.
              </p>

              <div style="background: #e8f5e9; border-left: 4px solid #2e7d32; padding: 15px 20px; border-radius: 0 8px 8px 0; margin: 25px 0;">
                <p style="color: #2e7d32; font-size: 14px; margin: 0;">
                  🔒 Il tuo account è al sicuro con la nuova password.
                </p>
              </div>

              <div style="background: #ffebee; border-left: 4px solid #c62828; padding: 15px 20px; border-radius: 0 8px 8px 0;">
                <p style="color: #c62828; font-size: 14px; margin: 0;">
                  ⚠️ <strong>Non sei stato tu?</strong> Contattaci immediatamente rispondendo a questa email o scrivendo a supporto@biggimmyintegratori.com
                </p>
              </div>

              <div style="text-align: center; margin-top: 35px;">
                <a href="https://biggimmyintegratori.com"
                   style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 35px;
                          text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 15px rgba(255,209,0,0.3);">
                  Vai al Sito
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                🏋️ Big Gimmy Integratori
              </p>
              <p style="color: #666; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error(`[EMAIL PASSWORD] Resend ha restituito errore:`, error);
      throw error;
    }
    console.log(`[EMAIL PASSWORD] ✅ Conferma cambio password inviata a ${email}`);
    return true;
  } catch (err: any) {
    console.error(`[EMAIL PASSWORD] ❌ ERRORE invio email a ${email}:`, err?.message || err);
    if (err?.message?.includes('testing emails')) {
      console.error('[EMAIL PASSWORD] NOTA: Con onboarding@resend.dev puoi inviare solo a lucaandrea264@gmail.com');
    }
    return false;
  }
}