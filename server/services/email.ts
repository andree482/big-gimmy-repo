import { MailService } from '@sendgrid/mail';

// Email mittente e destinatario
const ADMIN_EMAIL = 'info@biggimmyintegratori.com' as string;
const FROM_EMAIL = 'noreply@biggimmyintegratori.com' as string;
// Non usiamo più un'email alternativa per le notifiche admin
const ALTERNATE_ADMIN_EMAIL = '' as string; // Non inviamo a un indirizzo di backup

// Modalità di simulazione - impostata a false per usare SendGrid in produzione
const SIMULATION_MODE = false;

// Esporta lo stato della modalità di simulazione così può essere usato altrove
export const isSimulationMode = SIMULATION_MODE;

// Configuro il servizio di email solo se non siamo in modalità simulazione
let mailService: MailService | null = null;

if (!SIMULATION_MODE) {
  // Verifico che la chiave API di SendGrid sia disponibile
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY deve essere impostata nelle variabili d'ambiente");
  }

  // Configuro il servizio di email
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

// Interfaccia per i dati del contatto
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Invia un'email di notifica all'amministratore quando un utente compila il form di contatto
 */
export async function sendAdminNotification(formData: ContactFormData): Promise<boolean> {
  const { name, email, phone, message } = formData;
  
  // Se siamo in modalità simulazione, logghiamo il messaggio e restituiamo true
  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE: Email di notifica all\'amministratore ===');
    console.log('A:', ADMIN_EMAIL);
    console.log('Da:', FROM_EMAIL);
    console.log('Oggetto:', `Nuovo messaggio dal sito web da ${name}`);
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Telefono:', phone || 'Non fornito');
    console.log('Messaggio:', message);
    console.log('=== FINE SIMULAZIONE ===');
    return true;
  }
  
  // Altrimenti usiamo SendGrid (se configurato correttamente)
  try {
    if (!mailService) {
      throw new Error('Servizio email non configurato');
    }
    
    // Prepariamo il contenuto dell'email con grafica migliorata
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuovo Contatto - Big Gimmy Integratori</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #212121; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              🏋️ Big Gimmy Integratori
            </h1>
            <p style="color: #333; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
              Nuovo messaggio dal sito web
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px; background-color: #ffffff;">
            <div style="background-color: #f8f9fa; border-left: 4px solid #FFD100; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
              <h2 style="color: #212121; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                📧 Dettagli del Contatto
              </h2>
            </div>
            
            <div style="margin-bottom: 20px;">
              <div style="display: inline-block; background-color: #e3f2fd; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                <strong style="color: #1976d2; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">👤 Nome:</strong>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 500;">${name}</p>
              </div>
              
              <div style="display: inline-block; background-color: #e8f5e8; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                <strong style="color: #2e7d32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">📧 Email:</strong>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 500;">
                  <a href="mailto:${email}" style="color: #1976d2; text-decoration: none;">${email}</a>
                </p>
              </div>
              
              <div style="display: inline-block; background-color: #fff3e0; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                <strong style="color: #f57c00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">📱 Telefono:</strong>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 500;">
                  ${phone ? `<a href="tel:${phone}" style="color: #1976d2; text-decoration: none;">${phone}</a>` : 'Non fornito'}
                </p>
              </div>
            </div>
            
            <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #9c27b0;">
              <strong style="color: #7b1fa2; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 10px;">💬 Messaggio:</strong>
              <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0; line-height: 1.6;">
                <p style="margin: 0; color: #333; font-size: 15px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Risposta alla tua richiesta - Big Gimmy Integratori&body=Ciao ${name},%0D%0A%0D%0AGrazie per averci contattato tramite il nostro sito web.%0D%0A%0D%0AIn riferimento al tuo messaggio:%0D%0A"${message.replace(/"/g, '').replace(/\n/g, '%0D%0A')}"%0D%0A%0D%0A[Scrivi qui la tua risposta]%0D%0A%0D%0ACordiali saluti,%0D%0AIl team di Big Gimmy Integratori%0D%0Ainfo@biggimmyintegratori.com%0D%0A%0D%0A---%0D%0ABig Gimmy Integratori%0D%0ACorso Torino, 85 - 10090 Buttigliera Alta (TO)%0D%0ACorso Saint-Martin-de-Corléans, 55 - Aosta (AO)%0D%0Awww.biggimmyintegratori.it" style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 209, 0, 0.3); transition: all 0.3s ease;">
                ✉️ Rispondi al Cliente
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #212121; color: #ffffff; padding: 25px 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <div style="margin-bottom: 15px;">
              <h3 style="margin: 0; color: #FFD100; font-size: 18px; font-weight: bold;">Big Gimmy Integratori</h3>
              <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">P.IVA 09256080012</p>
            </div>
            
            <div style="border-top: 1px solid #444; padding-top: 15px; margin-top: 15px;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                📍 <strong>Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)<br>
                📍 <strong>Filiale:</strong> Corso Saint-Martin-de-Corléans, 55 - Aosta (AO)<br>
                🌐 <a href="https://biggimmyintegratori.it" style="color: #FFD100; text-decoration: none;">www.biggimmyintegratori.it</a>
              </p>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
              <p style="margin: 0; color: #888888; font-size: 11px;">
                &copy; ${new Date().getFullYear()} Big Gimmy Integratori. Tutti i diritti riservati.<br>
                Questa è un'email automatica generata dal sito web.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Mobile Responsive -->
        <style>
          @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content-padding { padding: 20px 15px !important; }
            h1 { font-size: 24px !important; }
            h2 { font-size: 18px !important; }
          }
        </style>
      </body>
      </html>
    `;
    
    const emailText = `
      NUOVO MESSAGGIO DAL SITO WEB BIG GIMMY
      
      Nome: ${name}
      Email: ${email}
      Telefono: ${phone || 'Non fornito'}
      Messaggio: ${message}
    `;
    
    // Inviamo solo all'indirizzo principale
    const recipients = [ADMIN_EMAIL];
    
    // Non aggiungiamo più l'indirizzo di backup
    
    // Invio dell'email senza riferimenti a SendGrid
    await mailService?.send({
      to: recipients,
      from: FROM_EMAIL,
      subject: `Nuovo messaggio dal sito web da ${name}`,
      text: emailText,
      html: emailHTML,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      }
    });
    
    console.log('Email all\'amministratore inviata con successo ai seguenti destinatari:', recipients);
    return true;
  } catch (error) {
    console.error('Errore nell\'invio dell\'email all\'amministratore:', error);
    // Log dettagliato per debugging
    if (error instanceof Error) {
      console.error('Dettagli errore:', {
        message: error.message,
        stack: error.stack,
        recipients: [ADMIN_EMAIL],
        fromEmail: FROM_EMAIL
      });
    }
    return false;
  }
}

/**
 * Invia un'email di risposta personalizzata da info@biggimmyintegratori.com
 */
export async function sendPersonalizedReply(
  recipientEmail: string, 
  recipientName: string, 
  subject: string, 
  replyMessage: string
): Promise<boolean> {
  
  // Se siamo in modalità simulazione, logghiamo il messaggio e restituiamo true
  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE: Email di risposta personalizzata ===');
    console.log('A:', recipientEmail);
    console.log('Da:', ADMIN_EMAIL);
    console.log('Oggetto:', subject);
    console.log('Contenuto:', replyMessage);
    console.log('=== FINE SIMULAZIONE ===');
    return true;
  }
  
  // Altrimenti usiamo SendGrid (se configurato correttamente)
  try {
    if (!mailService) {
      throw new Error('Servizio email non configurato');
    }
    
    await mailService?.send({
      to: recipientEmail,
      from: ADMIN_EMAIL, // Inviamo da info@biggimmyintegratori.com
      subject: subject,
      text: `
        Ciao ${recipientName},

        ${replyMessage}
        
        Cordiali saluti,
        Il team di Big Gimmy Integratori
        info@biggimmyintegratori.com
      `,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      },
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Risposta - Big Gimmy Integratori</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #212121; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                🏋️ Big Gimmy Integratori
              </h1>
              <p style="color: #333; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
                Risposta dal nostro team
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 25px; background-color: #ffffff;">
              <div style="background-color: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
                  👋 Ciao ${recipientName}!
                </h2>
                <p style="margin: 0; color: #4caf50; font-size: 14px; font-weight: 500;">
                  Ti rispondiamo personalmente
                </p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; line-height: 1.6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <p style="margin: 0; color: #333; font-size: 16px; white-space: pre-wrap;">${replyMessage}</p>
                </div>
                
                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; margin: 25px 0;">
                  <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                    📞 Contattaci per ulteriori informazioni:
                  </h3>
                  <div style="color: #555; font-size: 14px; line-height: 1.8;">
                    <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:info@biggimmyintegratori.com" style="color: #1976d2; text-decoration: none;">info@biggimmyintegratori.com</a></p>
                    <p style="margin: 5px 0;"><strong>📍 Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)</p>
                    <p style="margin: 5px 0;"><strong>📍 Filiale:</strong> Corso Saint-Martin-de-Corléans, 55 - Aosta (AO)</p>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://biggimmyintegratori.it" style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 209, 0, 0.3);">
                  🛒 Visita il nostro Sito
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; color: #666; font-size: 15px; font-weight: 500;">
                  Cordiali saluti,<br>
                  <strong style="color: #FFD100; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Il team di Big Gimmy Integratori</strong> 💪
                </p>
                <p style="margin: 10px 0 0 0; color: #999; font-size: 13px;">
                  <a href="mailto:info@biggimmyintegratori.com" style="color: #FFD100; text-decoration: none; font-weight: 500;">info@biggimmyintegratori.com</a>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #212121; color: #ffffff; padding: 25px 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 15px;">
                <h3 style="margin: 0; color: #FFD100; font-size: 18px; font-weight: bold;">Big Gimmy Integratori</h3>
                <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">P.IVA 09256080012</p>
              </div>
              
              <div style="border-top: 1px solid #444; padding-top: 15px; margin-top: 15px;">
                <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                  📍 <strong>Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)<br>
                  📍 <strong>Filiale:</strong> Corso Saint-Martin-de-Corléans, 55 - Aosta (AO)<br>
                  🌐 <a href="https://biggimmyintegratori.it" style="color: #FFD100; text-decoration: none;">www.biggimmyintegratori.it</a>
                </p>
              </div>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
                <p style="margin: 0; color: #888888; font-size: 11px;">
                  &copy; ${new Date().getFullYear()} Big Gimmy Integratori. Tutti i diritti riservati.<br>
                  Questa email è stata inviata dal nostro team di supporto.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    
    console.log('Email di risposta personalizzata inviata con successo a:', recipientEmail);
    return true;
  } catch (error) {
    console.error('Errore nell\'invio dell\'email di risposta personalizzata:', error);
    return false;
  }
}

/**
 * Invia un'email di conferma all'utente che ha compilato il form di contatto
 */
export async function sendUserConfirmation(formData: ContactFormData): Promise<boolean> {
  const { name, email } = formData;
  
  // Se siamo in modalità simulazione, logghiamo il messaggio e restituiamo true
  if (SIMULATION_MODE) {
    console.log('=== SIMULAZIONE: Email di conferma all\'utente ===');
    console.log('A:', email);
    console.log('Da:', FROM_EMAIL);
    console.log('Oggetto:', 'Conferma ricezione messaggio - Big Gimmy');
    console.log('Contenuto:', `Ciao ${name}, grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.`);
    console.log('=== FINE SIMULAZIONE ===');
    return true;
  }
  
  // Altrimenti usiamo SendGrid (se configurato correttamente)
  try {
    if (!mailService) {
      throw new Error('Servizio email non configurato');
    }
    
    await mailService?.send({
      to: email,
      from: FROM_EMAIL,
      subject: 'Conferma ricezione messaggio - Big Gimmy',
      text: `
        Ciao ${name},

        Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.
        
        Il team di Big Gimmy
      `,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      },
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Conferma Ricezione - Big Gimmy Integratori</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #212121; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                🏋️ Big Gimmy Integratori
              </h1>
              <p style="color: #333; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
                Conferma ricezione messaggio
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 25px; background-color: #ffffff;">
              <div style="background-color: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
                  ✅ Messaggio Ricevuto!
                </h2>
                <p style="margin: 0; color: #4caf50; font-size: 14px; font-weight: 500;">
                  Ti risponderemo al più presto
                </p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <p style="margin: 0 0 15px 0; font-size: 18px; color: #333; font-weight: 500;">
                  Ciao <strong style="color: #FFD100; background-color: #333; padding: 2px 8px; border-radius: 4px;">${name}</strong> 👋
                </p>
                
                <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                  Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e il nostro team ti risponderà entro <strong>24 ore</strong>.
                </p>
                
                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; margin: 20px 0;">
                  <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                    🔍 Nel frattempo, puoi:
                  </h3>
                  <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.8;">
                    <li>Visitare il nostro <a href="https://biggimmyintegratori.it/prodotti" style="color: #1976d2; text-decoration: none; font-weight: 500;">catalogo prodotti</a></li>
                    <li>Scoprire i nostri <a href="https://biggimmyintegratori.it/negozi" style="color: #1976d2; text-decoration: none; font-weight: 500;">punti vendita</a></li>
                    <li>Seguirci sui social per offerte esclusive</li>
                  </ul>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://biggimmyintegratori.it" style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 209, 0, 0.3);">
                  🛒 Visita il nostro Sito
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; color: #666; font-size: 15px; font-weight: 500;">
                  Cordiali saluti,<br>
                  <strong style="color: #FFD100; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Il team di Big Gimmy Integratori</strong> 💪
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #212121; color: #ffffff; padding: 25px 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 15px;">
                <h3 style="margin: 0; color: #FFD100; font-size: 18px; font-weight: bold;">Big Gimmy Integratori</h3>
                <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">P.IVA 09256080012</p>
              </div>
              
              <div style="border-top: 1px solid #444; padding-top: 15px; margin-top: 15px;">
                <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                  📍 <strong>Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)<br>
                  📍 <strong>Filiale:</strong> Corso Saint-Martin-de-Corléans, 55 - Aosta (AO)<br>
                  📧 <a href="mailto:info@biggimmyintegratori.com" style="color: #FFD100; text-decoration: none;">info@biggimmyintegratori.com</a>
                </p>
              </div>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
                <p style="margin: 0; color: #888888; font-size: 11px;">
                  &copy; ${new Date().getFullYear()} Big Gimmy Integratori. Tutti i diritti riservati.<br>
                  Questa è un'email automatica, si prega di non rispondere direttamente.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    
    return true;
  } catch (error) {
    console.error('Errore nell\'invio dell\'email di conferma all\'utente:', error);
    return false;
  }
}