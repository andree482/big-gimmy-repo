import { Resend } from 'resend';

// Configurazione indirizzi
const ADMIN_EMAIL = 'help@biggimmyintegratori.com';
const FROM_EMAIL = 'noreply@biggimmyintegratori.com';
const REPLY_TO_EMAIL = 'help@biggimmyintegratori.com';

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
  requestType?: string;
  orderId?: string;
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
  fulfillmentType?: 'spedizione' | 'ritiro';
  pickupStore?: string | null;
}

// Dati negozi per le email
const STORE_INFO: Record<string, { name: string; address: string; hours: string; mapsUrl: string }> = {
  torino: {
    name: "Sede di Torino",
    address: "Corso Torino 85, Buttigliera Alta",
    hours: "Lun-Ven 09:30-12:30, 15:30-19:30",
    mapsUrl: "https://maps.app.goo.gl/bq2d6JxFty7pXkTv6",
  },
  aosta: {
    name: "Sede di Aosta",
    address: "Corso Saint-Martin-de-Corléans 55, Aosta",
    hours: "Lun-Ven 09-12:30, 15-19:30",
    mapsUrl: "https://maps.app.goo.gl/K3L55t9XdVfesoUr6",
  },
};

interface PickupReadyEmailData {
  orderId: string;
  userEmail: string;
  userName: string;
  pickupStore: string;
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
      reply_to: email,
      subject: `Nuovo messaggio da ${name}`,
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
      reply_to: REPLY_TO_EMAIL,
      subject: 'Abbiamo ricevuto il tuo messaggio - Big Gimmy Integratori',
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
                <a href="https://big-gimmy-private.onrender.com/prodotti"
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
  const { orderId, userEmail, userName, total, items, shippingAddress, fulfillmentType, pickupStore } = orderData;
  const isPickup = fulfillmentType === 'ritiro';
  const storeInfo = pickupStore ? STORE_INFO[pickupStore] : null;

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
    console.log(`[EMAIL ORDER] Items ricevuti:`, JSON.stringify(items));

    const itemsHTML = items && items.length > 0 ? items.map(item => {
      const isShipping = (item.name || '').toLowerCase().includes('spedizione') || (item.name || '').toLowerCase().includes('shipping');
      return `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">${item.name || 'Prodotto'}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">${isShipping ? '-' : (item.quantity || 1)}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; text-align: right; color: #333; font-weight: 600; font-size: 14px;">€${((item.price || 0) / 100).toFixed(2)}</td>
      </tr>
    `;
    }).join('') : `
      <tr>
        <td colspan="3" style="padding: 15px; text-align: center; color: #666; font-style: italic;">Dettagli prodotti non disponibili</td>
      </tr>
    `;

    const shippingHTML = isPickup && storeInfo ? `
      <table style="width: 100%; border-collapse: collapse; margin-top: 25px; background: #e3f2fd; border-radius: 8px;">
        <tr>
          <td style="padding: 20px;">
            <h3 style="color: #1565c0; font-size: 16px; margin: 0 0 12px 0;">🏪 Ritiro in Negozio</h3>
            <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">${storeInfo.name}</p>
            <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
              📍 ${storeInfo.address}<br>
              🕐 ${storeInfo.hours}
            </p>
          </td>
        </tr>
      </table>
    ` : shippingAddress ? `
      <table style="width: 100%; border-collapse: collapse; margin-top: 25px; background: #f8f9fa; border-radius: 8px;">
        <tr>
          <td style="padding: 20px;">
            <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 12px 0;">📦 Indirizzo di Spedizione</h3>
            <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
              ${shippingAddress.street}<br>
              ${shippingAddress.postalCode} ${shippingAddress.city}${shippingAddress.province ? ` (${shippingAddress.province})` : ''}
            </p>
          </td>
        </tr>
      </table>
    ` : '';

    // Testo info box diverso per ritiro vs spedizione
    const infoBoxText = isPickup
      ? '📧 Ti invieremo un\'email quando il tuo ordine sarà pronto per il ritiro.'
      : '📧 Riceverai un\'email con il codice di tracciamento non appena il pacco sarà spedito.';

    const { error } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: isPickup
        ? `✅ Ordine Confermato #${orderId.slice(-8).toUpperCase()} - Ritiro presso ${storeInfo?.name || 'negozio'}`
        : `✅ Ordine Confermato #${orderId.slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">${isPickup ? '🏪' : '✅'}</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Ordine Confermato!
              </h1>
              ${isPickup ? `<p style="color: #FFD100; margin: 8px 0 0 0; font-size: 15px; font-weight: 600;">RITIRO IN NEGOZIO - ${storeInfo?.name || ''}</p>` : ''}
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${orderId.slice(-8).toUpperCase()}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Ciao <strong>${userName}</strong>, grazie per il tuo acquisto! ${isPickup ? 'Il tuo ordine è stato ricevuto e verrà preparato per il ritiro.' : 'Il tuo ordine è stato ricevuto ed è ora in fase di preparazione.'}
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

              <!-- Total - usando tabella invece di flex -->
              <table style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); border-radius: 8px;">
                <tr>
                  <td style="padding: 18px 20px; color: #1a1a1a; font-size: 16px; font-weight: 600;">Totale Pagato</td>
                  <td style="padding: 18px 20px; color: #1a1a1a; font-size: 24px; font-weight: 700; text-align: right;">€${(total / 100).toFixed(2)}</td>
                </tr>
              </table>

              ${shippingHTML}

              <!-- Info Box -->
              <table style="width: 100%; border-collapse: collapse; margin-top: 25px;">
                <tr>
                  <td style="background: #e8f5e9; border-left: 4px solid #2e7d32; padding: 15px 20px; border-radius: 0 8px 8px 0;">
                    <p style="color: #2e7d32; font-size: 14px; margin: 0;">
                      ${infoBoxText}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL || process.env.ORIGIN || 'https://big-gimmy-private.onrender.com'}/ordini"
                   style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  📋 Visualizza i tuoi ordini
                </a>
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
 * Invia notifica all'admin quando arriva un nuovo ordine pagato
 */
export async function sendAdminOrderNotification(orderData: OrderEmailData): Promise<boolean> {
  const { orderId, userEmail, userName, total, items, shippingAddress, fulfillmentType, pickupStore } = orderData;
  const isPickup = fulfillmentType === 'ritiro';
  const storeInfo = pickupStore ? STORE_INFO[pickupStore] : null;

  console.log(`[EMAIL ADMIN ORDER] Tentativo invio notifica nuovo ordine #${orderId} a ${ADMIN_EMAIL}`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE ADMIN ORDER NOTIFICATION (SIMULATION_MODE=true) ===', orderId);
    return true;
  }

  if (!resend) {
    console.error('[EMAIL ADMIN ORDER] ERRORE: Resend non inizializzato! Verifica RESEND_API_KEY in .env');
    console.log('=== SIMULAZIONE ADMIN ORDER NOTIFICATION (resend=null) ===', orderId);
    return true;
  }

  try {
    console.log(`[EMAIL ADMIN ORDER] Items ricevuti:`, JSON.stringify(items));

    const itemsHTML = items && items.length > 0 ? items.map(item => {
      const isShipping = (item.name || '').toLowerCase().includes('spedizione') || (item.name || '').toLowerCase().includes('shipping');
      return `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">${item.name || 'Prodotto'}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">${isShipping ? '-' : (item.quantity || 1)}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #eee; text-align: right; color: #333; font-weight: 600; font-size: 14px;">€${((item.price || 0) / 100).toFixed(2)}</td>
      </tr>
    `;
    }).join('') : `
      <tr>
        <td colspan="3" style="padding: 15px; text-align: center; color: #666; font-style: italic;">Dettagli prodotti non disponibili</td>
      </tr>
    `;

    const shippingHTML = isPickup && storeInfo ? `
      <table style="width: 100%; border-collapse: collapse; margin-top: 25px; background: #e3f2fd; border-radius: 8px;">
        <tr>
          <td style="padding: 20px;">
            <h3 style="color: #1565c0; font-size: 16px; margin: 0 0 12px 0;">🏪 RITIRO IN NEGOZIO</h3>
            <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">${storeInfo.name}</p>
            <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
              📍 ${storeInfo.address}<br>
              🕐 ${storeInfo.hours}
            </p>
          </td>
        </tr>
      </table>
    ` : shippingAddress ? `
      <table style="width: 100%; border-collapse: collapse; margin-top: 25px; background: #f8f9fa; border-radius: 8px;">
        <tr>
          <td style="padding: 20px;">
            <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 12px 0;">📦 Indirizzo di Spedizione</h3>
            <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
              ${shippingAddress.street}<br>
              ${shippingAddress.postalCode} ${shippingAddress.city}${shippingAddress.province ? ` (${shippingAddress.province})` : ''}
            </p>
          </td>
        </tr>
      </table>
    ` : '';

    const adminActionText = isPickup
      ? 'Ricordati di preparare l\'ordine per il ritiro!'
      : 'Ricordati di preparare e spedire l\'ordine!';

    const { error } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: isPickup
        ? `🏪 Nuovo Ordine RITIRO #${orderId.slice(-8).toUpperCase()} - ${storeInfo?.name || 'Negozio'} - €${(total / 100).toFixed(2)}`
        : `🛒 Nuovo Ordine #${orderId.slice(-8).toUpperCase()} - €${(total / 100).toFixed(2)}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">${isPickup ? '🏪' : '🛒'}</div>
              <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 700;">
                Nuovo Ordine Ricevuto!
              </h1>
              ${isPickup ? `<p style="color: #d32f2f; margin: 8px 0 0 0; font-size: 15px; font-weight: 700;">RITIRO IN NEGOZIO - ${storeInfo?.name || ''}</p>` : ''}
              <p style="color: #333; margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${orderId.slice(-8).toUpperCase()}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">

              <!-- Customer Info -->
              <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #1565c0; font-size: 16px; margin: 0 0 12px 0;">👤 Dati Cliente</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px; width: 80px;">Nome:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${userName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Email:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 15px;">
                          <a href="mailto:${userEmail}" style="color: #1976d2; text-decoration: none;">${userEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Order Items Table -->
              <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #FFD100;">
                📋 Prodotti Ordinati
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

              <!-- Total - usando tabella invece di flex -->
              <table style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); border-radius: 8px;">
                <tr>
                  <td style="padding: 18px 20px; color: #ffffff; font-size: 16px; font-weight: 600;">Totale Incassato</td>
                  <td style="padding: 18px 20px; color: #ffffff; font-size: 24px; font-weight: 700; text-align: right;">€${(total / 100).toFixed(2)}</td>
                </tr>
              </table>

              ${shippingHTML}

              <!-- Action -->
              <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">
                      ${adminActionText}
                    </p>
                    <a href="${process.env.APP_URL || process.env.ORIGIN || 'https://big-gimmy-private.onrender.com'}/admin/ordini"
                       style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      📦 Gestisci Ordini
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 20px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                📅 Ordine ricevuto il ${new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error(`[EMAIL ADMIN ORDER] Resend ha restituito errore:`, error);
      throw error;
    }
    console.log(`[EMAIL ADMIN ORDER] ✅ Notifica nuovo ordine #${orderId} inviata a ${ADMIN_EMAIL}`);
    return true;
  } catch (err: any) {
    console.error(`[EMAIL ADMIN ORDER] ❌ ERRORE invio notifica ordine #${orderId}:`, err?.message || err);
    if (err?.message?.includes('testing emails')) {
      console.error('[EMAIL ADMIN ORDER] NOTA: Con onboarding@resend.dev puoi inviare solo a lucaandrea264@gmail.com');
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
                <a href="https://big-gimmy-private.onrender.com/prodotti"
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
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                  <tr>
                    <td style="vertical-align: middle; width: 40px;">
                      <span style="font-size: 24px;">📦</span>
                    </td>
                    <td style="vertical-align: middle;">
                      <p style="color: #666; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Corriere</p>
                      <p style="color: #1a1a1a; font-size: 18px; margin: 4px 0 0 0; font-weight: 600;">${carrier}</p>
                    </td>
                  </tr>
                </table>

                ${trackingUrl ? `
                <a href="${trackingUrl}" target="_blank"
                   style="display: block; background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: #ffffff; padding: 14px 25px;
                          text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; text-align: center;
                          box-shadow: 0 4px 15px rgba(25,118,210,0.3); margin-bottom: 12px;">
                  📍 Traccia la Spedizione
                </a>
                <div style="background: #ffffff; border-radius: 8px; padding: 12px; text-align: center;">
                  <p style="color: #666; font-size: 11px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Codice Tracking</p>
                  <p style="color: #1a1a1a; font-size: 16px; margin: 0; font-weight: 700; font-family: monospace; letter-spacing: 1px;">${trackingNumber}</p>
                </div>
                ` : `
                <div style="background: #ffffff; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">Codice Tracking</p>
                  <p style="color: #1a1a1a; font-size: 20px; margin: 0; font-weight: 700; font-family: monospace; letter-spacing: 1px;">${trackingNumber}</p>
                </div>
                `}
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

    // Email di conferma all'admin
    const trackingLinkHTML = trackingUrl
      ? `<a href="${trackingUrl}" style="color: #1976d2; text-decoration: none; font-weight: 600;">${trackingUrl}</a>`
      : 'N/D';

    const { error: adminError } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `📦 Tracking inserito per ordine #${orderId.slice(-8).toUpperCase()} - ${carrier}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">📦 Tracking inserito correttamente</h1>
            </div>
            <div style="padding: 30px;">
              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0 0 15px 0;">
                Il codice di tracciamento per l'ordine <strong>#${orderId.slice(-8).toUpperCase()}</strong> è stato inserito e il cliente è stato notificato.
              </p>
              <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 8px; margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px; width: 100px;">Cliente:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${userName} (${userEmail})</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Corriere:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${carrier}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Tracking:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600; font-family: monospace;">${trackingNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Link:</td>
                        <td style="padding: 5px 0; font-size: 13px; word-break: break-all;">${trackingLinkHTML}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table style="width: 100%; border-collapse: collapse; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 0 8px 8px 0;">
                <tr>
                  <td style="padding: 12px 20px;">
                    <p style="color: #2e7d32; font-size: 14px; margin: 0;">
                      ✅ Email di tracciamento inviata al cliente con successo.
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <div style="background: #f5f5f5; padding: 15px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">Big Gimmy Integratori - Notifica Admin</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (adminError) {
      console.error('[EMAIL TRACKING] Errore email admin:', adminError);
    } else {
      console.log(`[EMAIL TRACKING] ✅ Conferma tracking inviata ad admin per ordine #${orderId}`);
    }

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

}

/**
 * Invia email "Il tuo ordine è pronto per il ritiro"
 */
export async function sendPickupReadyEmail(data: PickupReadyEmailData): Promise<boolean> {
  const { orderId, userEmail, userName, pickupStore } = data;
  const storeInfo = STORE_INFO[pickupStore];

  if (!storeInfo) {
    console.error(`[EMAIL PICKUP] Negozio non trovato: ${pickupStore}`);
    return false;
  }

  console.log(`[EMAIL PICKUP] Tentativo invio email pronto per ritiro #${orderId} a ${userEmail}`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE PICKUP READY EMAIL ===', { orderId, pickupStore });
    return true;
  }

  if (!resend) {
    console.error('[EMAIL PICKUP] ERRORE: Resend non inizializzato!');
    console.log('=== SIMULAZIONE PICKUP READY EMAIL (resend=null) ===', { orderId });
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: `📦 Il tuo ordine #${orderId.slice(-8).toUpperCase()} è pronto per il ritiro!`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">📦</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Il tuo ordine è pronto!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${orderId.slice(-8).toUpperCase()}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Ciao <strong>${userName}</strong>, il tuo ordine è stato preparato ed è pronto per il ritiro!
              </p>

              <!-- Store Info -->
              <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-radius: 12px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #1565c0; font-size: 18px; margin: 0 0 15px 0;">🏪 Vieni a ritirarlo presso:</h3>
                    <p style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">${storeInfo.name}</p>
                    <p style="color: #4a4a4a; font-size: 14px; line-height: 1.8; margin: 0;">
                      📍 ${storeInfo.address}<br>
                      🕐 ${storeInfo.hours}
                    </p>
                    <a href="${storeInfo.mapsUrl}" target="_blank" style="display: inline-block; margin-top: 12px; background: #ffffff; color: #1565c0; border: 1px solid #1565c0; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none;">
                      🗺️ Apri su Google Maps
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Order ID Box -->
              <table style="width: 100%; border-collapse: collapse; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="color: #e65100; font-size: 14px; margin: 0 0 8px 0;">
                      💡 Presenta il numero d'ordine <strong>#${orderId.slice(-8).toUpperCase()}</strong> al momento del ritiro.
                    </p>
                    <p style="color: #e65100; font-size: 13px; margin: 0;">
                      ⏰ Hai <strong>7 giorni</strong> di tempo per ritirare il tuo ordine.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL || process.env.ORIGIN || 'https://big-gimmy-private.onrender.com'}/ordini"
                   style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  📋 Visualizza i tuoi ordini
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                🏋️ Big Gimmy Integratori
              </p>
              <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">
                Ti aspettiamo in negozio!
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
      console.error(`[EMAIL PICKUP] Resend ha restituito errore:`, error);
    } else {
      console.log(`[EMAIL PICKUP] ✅ Email pronto per ritiro inviata a ${userEmail}`);
    }

    // Email all'admin
    const { error: adminError } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `🏪 Ordine #${orderId.slice(-8).toUpperCase()} segnato come pronto per il ritiro - ${storeInfo.name}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🏪 Ordine pronto per il ritiro</h1>
            </div>
            <div style="padding: 30px;">
              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0 0 15px 0;">
                L'ordine <strong>#${orderId.slice(-8).toUpperCase()}</strong> del cliente <strong>${userName}</strong> (${userEmail}) è stato segnato come <strong>pronto per il ritiro</strong>.
              </p>
              <p style="color: #4a4a4a; font-size: 14px; margin: 0 0 15px 0;">
                Sede: <strong>${storeInfo.name}</strong><br>
                📍 ${storeInfo.address}
              </p>
              <p style="color: #e65100; font-size: 13px; margin: 0;">
                ⏰ Il cliente ha 7 giorni per ritirare l'ordine.
              </p>
            </div>
            <div style="background: #f5f5f5; padding: 15px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">Big Gimmy Integratori - Notifica Admin</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (adminError) {
      console.error(`[EMAIL PICKUP] Errore email admin:`, adminError);
    } else {
      console.log(`[EMAIL PICKUP] ✅ Email pronto per ritiro inviata ad admin`);
    }

    return true;
  } catch (err: any) {
    console.error(`[EMAIL PICKUP] ❌ ERRORE invio email:`, err?.message || err);
    return false;
  }
}

/**
 * Invia email di consegna ordine al cliente e all'admin.
 * Gestisce sia ordini con spedizione che con ritiro in negozio.
 */
interface OrderDeliveredEmailData {
  orderId: string;
  userEmail: string;
  userName: string;
  fulfillmentType: 'spedizione' | 'ritiro' | string;
  pickupStore?: string | null;
  trackingNumber?: string | null;
  carrier?: string | null;
}

export async function sendOrderDeliveredEmail(data: OrderDeliveredEmailData): Promise<boolean> {
  const { orderId, userEmail, userName, fulfillmentType, pickupStore, trackingNumber, carrier } = data;
  const isPickup = fulfillmentType === 'ritiro';
  const shortId = orderId.slice(-8).toUpperCase();

  const headerEmoji = isPickup ? '🏪' : '📦';
  const headerTitle = isPickup ? 'Ordine ritirato con successo!' : 'Il tuo ordine è stato consegnato!';
  const subjectEmoji = isPickup ? '🏪' : '✅';
  const subjectText = isPickup
    ? `${subjectEmoji} Ordine #${shortId} ritirato con successo!`
    : `${subjectEmoji} Ordine #${shortId} consegnato con successo!`;

  const storeInfo = isPickup && pickupStore ? STORE_INFO[pickupStore] : null;

  // Tracking info per spedizioni
  const trackingHTML = !isPickup && trackingNumber && carrier ? `
    <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-radius: 12px; margin-bottom: 15px;">
      <tr>
        <td style="padding: 20px;">
          <h3 style="color: #1565c0; font-size: 14px; margin: 0 0 8px 0;">📦 Dati spedizione</h3>
          <p style="color: #4a4a4a; font-size: 13px; margin: 0;">
            Corriere: <strong>${carrier}</strong><br>
            Tracking: <strong style="font-family: monospace;">${trackingNumber}</strong>
          </p>
        </td>
      </tr>
    </table>
  ` : '';

  const deliveryDetailHTML = isPickup && storeInfo
    ? `
      <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-radius: 12px; margin-bottom: 25px;">
        <tr>
          <td style="padding: 25px;">
            <h3 style="color: #1565c0; font-size: 16px; margin: 0 0 10px 0;">🏪 Ritirato presso:</h3>
            <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 5px 0;">${storeInfo.name}</p>
            <p style="color: #4a4a4a; font-size: 13px; margin: 0;">📍 ${storeInfo.address}</p>
          </td>
        </tr>
      </table>
    `
    : `
      <table style="width: 100%; border-collapse: collapse; background: #e8f5e9; border-radius: 12px; margin-bottom: 25px;">
        <tr>
          <td style="padding: 25px;">
            <h3 style="color: #2e7d32; font-size: 16px; margin: 0 0 10px 0;">🚚 Consegnato a domicilio</h3>
            <p style="color: #4a4a4a; font-size: 13px; margin: 0;">Il pacco è stato consegnato all'indirizzo di spedizione indicato.</p>
          </td>
        </tr>
      </table>
      ${trackingHTML}
    `;

  const bodyText = isPickup
    ? `Ciao <strong>${userName}</strong>, confermiamo che hai ritirato con successo il tuo ordine!`
    : `Ciao <strong>${userName}</strong>, il tuo ordine è stato consegnato con successo!`;

  const headerGradient = isPickup
    ? 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)'
    : 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)';

  const emailHTML = `
    <!DOCTYPE html>
    <html lang="it">
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: ${headerGradient}; padding: 40px 30px; text-align: center;">
          <div style="font-size: 50px; margin-bottom: 15px;">${headerEmoji}</div>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">${headerTitle}</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Ordine #${shortId}</p>
        </div>
        <!-- Content -->
        <div style="padding: 35px 30px;">
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">${bodyText}</p>
          ${deliveryDetailHTML}
          <table style="width: 100%; border-collapse: collapse; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
            <tr>
              <td style="padding: 15px 20px;">
                <p style="color: #2e7d32; font-size: 14px; margin: 0;">
                  ✅ Grazie per il tuo acquisto! Speriamo che i nostri prodotti ti aiutino a raggiungere i tuoi obiettivi. 💪
                </p>
              </td>
            </tr>
          </table>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.APP_URL || process.env.ORIGIN || 'https://big-gimmy-private.onrender.com'}/ordini"
               style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
              📋 Visualizza i tuoi ordini
            </a>
          </div>
        </div>
        <!-- Footer -->
        <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
          <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">🏋️ Big Gimmy Integratori</p>
          <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">Hai domande? Contattaci!</p>
          <p style="color: #666; font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email admin
  const adminSubject = isPickup
    ? `🏪 Ordine #${shortId} ritirato dal cliente`
    : `✅ Ordine #${shortId} consegnato al cliente`;
  const trackingAdminInfo = !isPickup && trackingNumber && carrier
    ? `<br>Corriere: <strong>${carrier}</strong> - Tracking: <strong>${trackingNumber}</strong>`
    : '';
  const adminBody = isPickup
    ? `L'ordine <strong>#${shortId}</strong> è stato ritirato dal cliente <strong>${userName}</strong> (${userEmail}) presso ${storeInfo?.name || 'negozio'}.`
    : `L'ordine <strong>#${shortId}</strong> è stato consegnato al cliente <strong>${userName}</strong> (${userEmail}) tramite spedizione.${trackingAdminInfo}`;

  const adminHTML = `
    <!DOCTYPE html>
    <html lang="it">
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">${adminSubject}</h1>
        </div>
        <div style="padding: 30px;">
          <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">${adminBody}</p>
          <p style="color: #4a4a4a; font-size: 14px; margin: 0;">L'ordine è stato segnato come <strong>consegnato</strong>.</p>
        </div>
        <div style="background: #f5f5f5; padding: 15px 30px; text-align: center;">
          <p style="color: #888; font-size: 12px; margin: 0;">Big Gimmy Integratori - Notifica Admin</p>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(`[EMAIL DELIVERED] Invio email consegna ordine #${shortId} a ${userEmail} (${fulfillmentType})`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE DELIVERED EMAIL ===', { orderId, fulfillmentType });
    return true;
  }

  if (!resend) {
    console.log('=== SIMULAZIONE DELIVERED EMAIL (resend=null) ===', { orderId });
    return true;
  }

  try {
    // Email al cliente
    const { error: clientError } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: subjectText,
      html: emailHTML,
    });

    if (clientError) {
      console.error(`[EMAIL DELIVERED] Errore email cliente:`, clientError);
    } else {
      console.log(`[EMAIL DELIVERED] ✅ Email consegna inviata a ${userEmail}`);
    }

    // Email all'admin
    const { error: adminError } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: adminSubject,
      html: adminHTML,
    });

    if (adminError) {
      console.error(`[EMAIL DELIVERED] Errore email admin:`, adminError);
    } else {
      console.log(`[EMAIL DELIVERED] ✅ Email consegna inviata ad admin`);
    }

    return true;
  } catch (err: any) {
    console.error(`[EMAIL DELIVERED] ❌ ERRORE invio email:`, err?.message || err);
    return false;
  }
}

/**
 * Invia reminder ritiro al cliente e notifica all'admin.
 * type: '4days' = reminder a 4 giorni, '6days' = avviso finale a 6 giorni (24h rimanenti)
 */
interface PickupReminderEmailData {
  orderId: string;
  userEmail: string;
  userName: string;
  pickupStore: string;
  type: '4days' | '6days';
}

export async function sendPickupReminderEmail(data: PickupReminderEmailData): Promise<boolean> {
  const { orderId, userEmail, userName, pickupStore, type } = data;
  const storeInfo = STORE_INFO[pickupStore];
  const shortId = orderId.slice(-8).toUpperCase();

  if (!storeInfo) {
    console.error(`[EMAIL REMINDER] Negozio non trovato: ${pickupStore}`);
    return false;
  }

  const is4Days = type === '4days';
  const subjectClient = is4Days
    ? `⏰ Promemoria: ritira il tuo ordine #${shortId}`
    : `🚨 Ultimo avviso: ritira il tuo ordine #${shortId} entro 24 ore!`;

  const headerGradient = is4Days
    ? 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)'
    : 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)';
  const headerEmoji = is4Days ? '⏰' : '🚨';
  const headerTitle = is4Days
    ? 'Non dimenticare il tuo ordine!'
    : 'Ultima possibilità per ritirare!';
  const bodyText = is4Days
    ? `Ciao <strong>${userName}</strong>, ti ricordiamo che il tuo ordine <strong>#${shortId}</strong> è pronto per il ritiro da 4 giorni. Hai ancora <strong>3 giorni</strong> per venire a ritirarlo!`
    : `Ciao <strong>${userName}</strong>, il tuo ordine <strong>#${shortId}</strong> è in attesa di ritiro da 6 giorni. Hai ancora <strong>24 ore</strong> per venire a ritirarlo prima che venga considerato non ritirato.`;
  const urgencyColor = is4Days ? '#e65100' : '#c62828';
  const urgencyText = is4Days
    ? '⏰ Hai ancora 3 giorni per ritirare il tuo ordine.'
    : '🚨 ATTENZIONE: Hai solo 24 ore rimanenti per il ritiro!';

  const clientHTML = `
    <!DOCTYPE html>
    <html lang="it">
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: ${headerGradient}; padding: 40px 30px; text-align: center;">
          <div style="font-size: 50px; margin-bottom: 15px;">${headerEmoji}</div>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">${headerTitle}</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Ordine #${shortId}</p>
        </div>
        <div style="padding: 35px 30px;">
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">${bodyText}</p>
          <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-radius: 12px; margin-bottom: 25px;">
            <tr>
              <td style="padding: 25px;">
                <h3 style="color: #1565c0; font-size: 16px; margin: 0 0 10px 0;">🏪 Vieni a ritirarlo presso:</h3>
                <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">${storeInfo.name}</p>
                <p style="color: #4a4a4a; font-size: 14px; line-height: 1.8; margin: 0;">
                  📍 ${storeInfo.address}<br>
                  🕐 ${storeInfo.hours}
                </p>
              </td>
            </tr>
          </table>
          <table style="width: 100%; border-collapse: collapse; background: ${is4Days ? '#fff3e0' : '#ffebee'}; border-left: 4px solid ${urgencyColor}; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
            <tr>
              <td style="padding: 15px 20px;">
                <p style="color: ${urgencyColor}; font-size: 14px; font-weight: 600; margin: 0;">${urgencyText}</p>
              </td>
            </tr>
          </table>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.APP_URL || process.env.ORIGIN || 'https://big-gimmy-private.onrender.com'}/ordini"
               style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
              📋 Visualizza i tuoi ordini
            </a>
          </div>
        </div>
        <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
          <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">🏋️ Big Gimmy Integratori</p>
          <p style="color: #888; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Big Gimmy Integratori</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email admin
  const daysLabel = is4Days ? '4 giorni' : '6 giorni';
  const adminSubject = is4Days
    ? `⏰ Promemoria inviato: ordine #${shortId} in attesa di ritiro da 4 giorni`
    : `🚨 Avviso finale inviato: ordine #${shortId} in attesa di ritiro da 6 giorni`;
  const adminHTML = `
    <!DOCTYPE html>
    <html lang="it">
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: ${headerGradient}; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">${headerEmoji} Ritiro in sospeso da ${daysLabel}</h1>
        </div>
        <div style="padding: 30px;">
          <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0 0 15px 0;">
            Ho inviato un ${is4Days ? 'promemoria' : 'avviso finale'} al cliente <strong>${userName}</strong> (<a href="mailto:${userEmail}" style="color: #1976d2;">${userEmail}</a>) per l'ordine <strong>#${shortId}</strong>.
          </p>
          <p style="color: #4a4a4a; font-size: 14px; margin: 0 0 15px 0;">
            L'ordine è in attesa di ritiro da <strong>${daysLabel}</strong> presso <strong>${storeInfo.name}</strong>.
          </p>
          <table style="width: 100%; border-collapse: collapse; background: ${is4Days ? '#fff3e0' : '#ffebee'}; border-left: 4px solid ${urgencyColor}; border-radius: 0 8px 8px 0;">
            <tr>
              <td style="padding: 15px 20px;">
                <p style="color: ${urgencyColor}; font-size: 14px; font-weight: 600; margin: 0;">
                  ${is4Days ? '💡 Se necessario, contatta direttamente il cliente.' : '🚨 Contattare direttamente il cliente se necessario. Scadenza tra 24 ore.'}
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div style="background: #f5f5f5; padding: 15px 30px; text-align: center;">
          <p style="color: #888; font-size: 12px; margin: 0;">Big Gimmy Integratori - Notifica automatica</p>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(`[EMAIL REMINDER] Invio ${type} reminder ordine #${shortId} a ${userEmail}`);

  if (SIMULATION_MODE) {
    console.log(`=== SIMULAZIONE REMINDER ${type} ===`, { orderId, pickupStore });
    return true;
  }

  if (!resend) {
    console.log(`=== SIMULAZIONE REMINDER ${type} (resend=null) ===`, { orderId });
    return true;
  }

  try {
    const { error: clientError } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: subjectClient,
      html: clientHTML,
    });
    if (clientError) {
      console.error(`[EMAIL REMINDER] Errore email cliente:`, clientError);
    } else {
      console.log(`[EMAIL REMINDER] ✅ Reminder ${type} inviato a ${userEmail}`);
    }

    const { error: adminError } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: adminSubject,
      html: adminHTML,
    });
    if (adminError) {
      console.error(`[EMAIL REMINDER] Errore email admin:`, adminError);
    } else {
      console.log(`[EMAIL REMINDER] ✅ Reminder ${type} inviato ad admin`);
    }

    return true;
  } catch (err: any) {
    console.error(`[EMAIL REMINDER] ❌ ERRORE:`, err?.message || err);
    return false;
  }
}

/**
 * Invia email di richiesta rimborso al cliente e all'admin
 */
interface RefundRequestData {
  name: string;
  email: string;
  phone?: string;
  orderId: string;
  message: string;
}

export async function sendRefundRequestEmail(data: RefundRequestData): Promise<boolean> {
  const { name, email, phone, orderId, message } = data;
  const shortId = orderId.trim().toUpperCase();

  console.log(`[EMAIL REFUND] Invio email richiesta rimborso ordine #${shortId} da ${email}`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE REFUND REQUEST EMAIL ===', { orderId, email });
    return true;
  }

  if (!resend) {
    console.log('=== SIMULAZIONE REFUND REQUEST EMAIL (resend=null) ===', { orderId });
    return true;
  }

  try {
    // Email al cliente
    const { error: clientError } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [email],
      subject: `📋 Richiesta di rimborso ricevuta - Ordine #${shortId}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">📋</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Richiesta di rimborso ricevuta
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${shortId}
              </p>
            </div>
            <div style="padding: 35px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Ciao <strong>${name}</strong>, abbiamo ricevuto la tua richiesta di rimborso per l'ordine <strong>#${shortId}</strong>.
              </p>

              <table style="width: 100%; border-collapse: collapse; background: #fff3e0; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #e65100; font-size: 16px; margin: 0 0 12px 0;">📝 La tua richiesta</h3>
                    <p style="color: #4a4a4a; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="color: #1565c0; font-size: 14px; margin: 0;">
                      ⏰ Il nostro team esaminerà la tua richiesta e ti risponderà entro <strong>48 ore lavorative</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
                Se hai bisogno di ulteriori informazioni, rispondi a questa email o contattaci tramite il nostro sito.
              </p>
            </div>
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">🏋️ Big Gimmy Integratori</p>
              <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">Siamo qui per aiutarti!</p>
              <p style="color: #666; font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (clientError) {
      console.error(`[EMAIL REFUND] Errore email cliente:`, clientError);
    } else {
      console.log(`[EMAIL REFUND] ✅ Email richiesta rimborso inviata a ${email}`);
    }

    // Email all'admin
    const { error: adminError } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `🔴 Richiesta di Rimborso - Ordine #${shortId} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #d32f2f 0%, #c62828 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🔴 Nuova Richiesta di Rimborso</h1>
            </div>
            <div style="padding: 30px;">
              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
                Il cliente <strong>${name}</strong> ha richiesto un rimborso per l'ordine <strong>#${shortId}</strong>.
              </p>

              <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px; width: 100px;">Cliente:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Email:</td>
                        <td style="padding: 5px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #1976d2; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Telefono:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px;">${phone || 'Non fornito'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Ordine:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">#${shortId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h3 style="color: #1a1a1a; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">💬 Motivo della richiesta</h3>
              <div style="background: #ffebee; border-left: 4px solid #d32f2f; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                <p style="color: #333; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 20px;">
                    <p style="color: #e65100; font-size: 14px; font-weight: 600; margin: 0;">
                      ⚠️ Lo stato dell'ordine è stato aggiornato a "Richiesta di rimborso". Gestisci la richiesta dalla dashboard.
                    </p>
                  </td>
                </tr>
              </table>

              <div style="text-align: center; margin-top: 25px;">
                <a href="mailto:${email}?subject=Re: Richiesta rimborso ordine %23${shortId}"
                   style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC000 100%); color: #1a1a1a; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin-right: 10px;">
                  ✉️ Rispondi al cliente
                </a>
              </div>
            </div>
            <div style="background: #f5f5f5; padding: 15px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">Big Gimmy Integratori - Notifica Admin</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (adminError) {
      console.error(`[EMAIL REFUND] Errore email admin:`, adminError);
    } else {
      console.log(`[EMAIL REFUND] ✅ Notifica rimborso inviata ad admin`);
    }

    return true;
  } catch (err: any) {
    console.error(`[EMAIL REFUND] ❌ ERRORE:`, err?.message || err);
    return false;
  }
}

/**
 * Invia email di rimborso completato al cliente e all'admin
 */
interface RefundCompletedData {
  orderId: string;
  userEmail: string;
  userName: string;
  total: number; // in centesimi
}

export async function sendRefundCompletedEmail(data: RefundCompletedData): Promise<boolean> {
  const { orderId, userEmail, userName, total } = data;
  const shortId = orderId.trim().toUpperCase();
  const totalFormatted = (total / 100).toFixed(2).replace('.', ',');

  console.log(`[EMAIL RIMBORSATO] Invio email rimborso completato ordine #${shortId} a ${userEmail}`);

  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE REFUND COMPLETED EMAIL ===', { orderId, userEmail });
    return true;
  }

  if (!resend) {
    console.log('=== SIMULAZIONE REFUND COMPLETED EMAIL (resend=null) ===', { orderId });
    return true;
  }

  try {
    // Email al cliente
    const { error: clientError } = await resend.emails.send({
      from: `Ordini Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [userEmail],
      subject: `✅ Rimborso effettuato - Ordine #${shortId}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Rimborso effettuato
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                Ordine #${shortId}
              </p>
            </div>
            <div style="padding: 35px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Ciao <strong>${userName}</strong>, ti informiamo che il rimborso per l'ordine <strong>#${shortId}</strong> è stato approvato ed elaborato.
              </p>

              <table style="width: 100%; border-collapse: collapse; background: #e8f5e9; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #2e7d32; font-size: 16px; margin: 0 0 12px 0;">💰 Dettagli rimborso</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 5px 0; color: #555; font-size: 14px; width: 140px;">Ordine:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">#${shortId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #555; font-size: 14px;">Importo rimborsato:</td>
                        <td style="padding: 5px 0; color: #2e7d32; font-size: 16px; font-weight: 700;">€${totalFormatted}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table style="width: 100%; border-collapse: collapse; background: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="color: #1565c0; font-size: 14px; margin: 0;">
                      ⏰ Il pagamento verrà accreditato sul metodo di pagamento originale entro <strong>10 giorni lavorativi</strong>, in base ai tempi del tuo istituto bancario o gestore di pagamento.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
                Per qualsiasi dubbio, rispondi a questa email o contattaci tramite il nostro sito.
              </p>
            </div>
            <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
              <p style="color: #FFD100; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">🏋️ Big Gimmy Integratori</p>
              <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">Siamo qui per aiutarti!</p>
              <p style="color: #666; font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Big Gimmy Integratori - Tutti i diritti riservati</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (clientError) {
      console.error(`[EMAIL RIMBORSATO] Errore email cliente:`, clientError);
    } else {
      console.log(`[EMAIL RIMBORSATO] ✅ Email rimborso completato inviata a ${userEmail}`);
    }

    // Email all'admin
    const { error: adminError } = await resend.emails.send({
      from: `Big Gimmy Integratori <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `✅ Rimborso elaborato - Ordine #${shortId} - ${userName}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">✅ Rimborso Elaborato</h1>
            </div>
            <div style="padding: 30px;">
              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
                Il rimborso per l'ordine <strong>#${shortId}</strong> del cliente <strong>${userName}</strong> è stato segnato come elaborato.
              </p>

              <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px; width: 140px;">Cliente:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${userName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Email:</td>
                        <td style="padding: 5px 0; font-size: 14px;"><a href="mailto:${userEmail}" style="color: #1976d2; text-decoration: none;">${userEmail}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Ordine:</td>
                        <td style="padding: 5px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">#${shortId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666; font-size: 13px;">Importo:</td>
                        <td style="padding: 5px 0; color: #2e7d32; font-size: 15px; font-weight: 700;">€${totalFormatted}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color: #555; font-size: 13px; margin: 0;">
                Il cliente è stato notificato che riceverà il pagamento entro 10 giorni lavorativi.
              </p>
            </div>
            <div style="background: #f5f5f5; padding: 15px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">Big Gimmy Integratori - Notifica Admin</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (adminError) {
      console.error(`[EMAIL RIMBORSATO] Errore email admin:`, adminError);
    } else {
      console.log(`[EMAIL RIMBORSATO] ✅ Notifica rimborso completato inviata ad admin`);
    }

    return true;
  } catch (err: any) {
    console.error(`[EMAIL RIMBORSATO] ❌ ERRORE:`, err?.message || err);
    return false;
  }
}