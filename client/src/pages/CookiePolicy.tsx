import { Link } from "wouter";

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Cookie Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="font-semibold text-xl mb-4">Ultimo aggiornamento: 04/03/2026</p>
        
        <section className="mb-8">
          <p>
            La presente cookie policy è relativa al sito https://biggimmyintegratori.it («Sito») gestito e operato da BIG GIMMY INTEGRATORI, 
            con sede a Buttigliera Alta (TO), Corso Torino, 85, P.IVA 09256080012 e filiale a Aosta (AO), Corso Saint-Martin-de-Corléans, 55.
          </p>
          <p>
            I cookies sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati, 
            per poi essere ritrasmessi agli stessi siti alla visita successiva.
          </p>
          <p>
            Il Sito utilizza cookies per rendere l'esperienza di navigazione dell'utente più facile ed intuitiva: essi servono a 
            facilitare la navigazione quanto si è all'interno del sito, riconoscere l'utente che si è registrato, ed altri simili servizi. 
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">TIPOLOGIE DI COOKIE</h2>
          <p>
            I cookie possono essere:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Cookie di prima parte: sono predisposti e gestiti direttamente dal gestore del sito e utilizzati, ad esempio, per garantirne il funzionamento tecnico (i cosiddetti cookie tecnici)</li>
            <li>Cookie di terza parte: sono predisposti e gestiti da soggetti terzi rispetto al sito visitato dall'utente. Su questi cookie BIG GIMMY INTEGRATORI non ha il controllo diretto e non può né installarli direttamente né cancellarli.</li>
          </ul>
          
          <p className="font-semibold mt-6 mb-2">Cookie Tecnici</p>
          <p>
            I cookie tecnici sono essenziali per il corretto funzionamento del Sito e consentono agli utenti di navigare sul Sito e di 
            sfruttarne le caratteristiche. Questi cookie non raccolgono informazioni da utilizzare a fini commerciali.
          </p>
          <p>
            Tra i cookie tecnici, BIG GIMMY INTEGRATORI utilizza:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Cookie di navigazione o di sessione: garantiscono la normale navigazione e fruizione del sito web</li>
            <li>Cookie di funzionalità: permettono all'utente la navigazione in funzione di una serie di criteri selezionati (ad esempio, la lingua, i prodotti selezionati per l'acquisto) al fine di migliorare il servizio reso allo stesso</li>
          </ul>
          
          <p className="font-semibold mt-6 mb-2">Cookie Analitici</p>
          <p>
            Sono cookie utilizzati per raccogliere e analizzare il traffico e l'utilizzo del sito in modo anonimo. Questi cookie, 
            pur senza identificare l'utente, consentono, per esempio, di rilevare se il medesimo utente torna a collegarsi in 
            momenti diversi. Permettono inoltre di monitorare il sistema e migliorarne le prestazioni e l'usabilità.
          </p>
          <p>
            BIG GIMMY INTEGRATORI utilizza Google Analytics con IP anonimizzato per raccogliere informazioni statistiche aggregate sull'utilizzo del Sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">DURATA DEI COOKIE</h2>
          <p>
            I cookie hanno una durata dettata dalla data di scadenza (o da un'azione specifica come la chiusura del browser) impostata al momento dell'installazione.
          </p>
          <p>
            I cookie sono classificati in base alla durata:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Cookie di sessione: sono utilizzati per archiviare informazioni temporanee, consentono di collegare le azioni eseguite durante una sessione specifica e vengono rimossi dal dispositivo quando il browser viene chiuso</li>
            <li>Cookie permanenti: sono utilizzati per archiviare informazioni, ad esempio il nome e la password di accesso, in modo da evitare che l'utente debba digitarli nuovamente ogni volta che visita un sito specifico. Questi rimangono memorizzati nel dispositivo anche dopo aver chiuso il browser</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">GESTIONE DEI COOKIE</h2>
          <p>
            L'utente può decidere se accettare o meno i cookie utilizzando le impostazioni del proprio browser.
          </p>
          <p>
            <strong>Attenzione:</strong> la disabilitazione totale o parziale dei cookie tecnici può compromettere l'utilizzo 
            delle funzionalità del sito riservate agli utenti registrati. Al contrario, la fruibilità dei contenuti pubblici 
            è possibile anche disabilitando completamente i cookie.
          </p>
          <p>
            La disabilitazione dei cookie "terze parti" non pregiudica in alcun modo la navigabilità.
          </p>
          <p>
            Di seguito sono forniti i link alle istruzioni di gestione dei cookie dei principali browser:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><a href="https://support.google.com/chrome/answer/95647?hl=it" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Firefox</a></li>
            <li><a href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Internet Explorer</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Edge</a></li>
            <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Opera</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">DIRITTI DELL'UTENTE</h2>
          <p>
            L'utente può esercitare in ogni momento i diritti riconosciuti dal Regolamento UE 2016/679 (GDPR), e in particolare 
            ottenere:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>La conferma dell'esistenza di dati personali che lo riguardano e la loro comunicazione</li>
            <li>L'indicazione dell'origine dei dati, delle finalità e modalità del trattamento, della logica applicata in caso di trattamento con strumenti elettronici</li>
            <li>L'aggiornamento, la rettifica o l'integrazione dei dati</li>
            <li>La cancellazione dei dati personali nei casi previsti dalla legge o la limitazione del trattamento</li>
            <li>La portabilità dei dati presso un altro titolare del trattamento</li>
            <li>L'attestazione che le operazioni di cui sopra sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati o diffusi</li>
            <li>L'opposizione al trattamento per motivi legittimi</li>
          </ul>
          <p>
            Per l'esercizio di tali diritti, l'utente può rivolgersi al Titolare del trattamento inviando una comunicazione 
            scritta all'indirizzo e-mail biggimmy@gmail.com o mediante raccomandata A/R all'indirizzo: BIG GIMMY INTEGRATORI, 
            Corso Torino, 85, 10090 Buttigliera Alta (TO).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">ELENCO DETTAGLIATO DEI COOKIE</h2>
          <p className="mb-4">
            Di seguito l'elenco completo dei cookie utilizzati dal Sito, con indicazione di provider, finalità e durata.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left font-semibold">Nome cookie</th>
                  <th className="border border-gray-300 p-2 text-left font-semibold">Provider</th>
                  <th className="border border-gray-300 p-2 text-left font-semibold">Finalità</th>
                  <th className="border border-gray-300 p-2 text-left font-semibold">Durata</th>
                  <th className="border border-gray-300 p-2 text-left font-semibold">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">biggimmy_cookie_consent</td>
                  <td className="border border-gray-300 p-2">Big Gimmy</td>
                  <td className="border border-gray-300 p-2">Memorizza la scelta dell'utente sulle preferenze cookie</td>
                  <td className="border border-gray-300 p-2">6 mesi</td>
                  <td className="border border-gray-300 p-2">Tecnico</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">biggimmy_cookie_preferences</td>
                  <td className="border border-gray-300 p-2">Big Gimmy</td>
                  <td className="border border-gray-300 p-2">Memorizza le preferenze granulari per categoria di cookie</td>
                  <td className="border border-gray-300 p-2">6 mesi</td>
                  <td className="border border-gray-300 p-2">Tecnico</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">sb-[id]-auth-token</td>
                  <td className="border border-gray-300 p-2">Supabase</td>
                  <td className="border border-gray-300 p-2">Mantiene la sessione dell'utente autenticato</td>
                  <td className="border border-gray-300 p-2">Sessione / Persistente</td>
                  <td className="border border-gray-300 p-2">Tecnico</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">__stripe_mid</td>
                  <td className="border border-gray-300 p-2">Stripe, Inc.</td>
                  <td className="border border-gray-300 p-2">Identificativo dispositivo per la prevenzione delle frodi nei pagamenti</td>
                  <td className="border border-gray-300 p-2">1 anno</td>
                  <td className="border border-gray-300 p-2">Tecnico (necessario per i pagamenti)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">__stripe_sid</td>
                  <td className="border border-gray-300 p-2">Stripe, Inc.</td>
                  <td className="border border-gray-300 p-2">Identificativo sessione di pagamento sicura</td>
                  <td className="border border-gray-300 p-2">30 minuti</td>
                  <td className="border border-gray-300 p-2">Tecnico (necessario per i pagamenti)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">_ga</td>
                  <td className="border border-gray-300 p-2">Google LLC</td>
                  <td className="border border-gray-300 p-2">Distingue gli utenti per le statistiche di Google Analytics (IP anonimizzato)</td>
                  <td className="border border-gray-300 p-2">2 anni</td>
                  <td className="border border-gray-300 p-2">Analitico (solo con consenso)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_gid</td>
                  <td className="border border-gray-300 p-2">Google LLC</td>
                  <td className="border border-gray-300 p-2">Distingue gli utenti per le statistiche di Google Analytics</td>
                  <td className="border border-gray-300 p-2">24 ore</td>
                  <td className="border border-gray-300 p-2">Analitico (solo con consenso)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">_gat</td>
                  <td className="border border-gray-300 p-2">Google LLC</td>
                  <td className="border border-gray-300 p-2">Limita il numero di richieste al server di Google Analytics</td>
                  <td className="border border-gray-300 p-2">1 minuto</td>
                  <td className="border border-gray-300 p-2">Analitico (solo con consenso)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Per informazioni sui cookie di Stripe: <a href="https://stripe.com/it/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Informativa Privacy Stripe</a>.
            Per informazioni sui cookie di Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Informativa Privacy Google</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">MODIFICHE ALLA COOKIE POLICY</h2>
          <p>
            BIG GIMMY INTEGRATORI si riserva il diritto di modificare questa cookie policy in qualsiasi momento. Le modifiche saranno 
            pubblicate su questa pagina e, se sostanziali, sarà data comunicazione agli utenti attraverso un avviso ben visibile sul Sito.
          </p>
          <p>
            Per ulteriori informazioni sul trattamento dei dati personali, si prega di consultare la <Link 
            href="/privacy-policy" className="text-yellow-600 hover:underline">Privacy Policy</Link>.
          </p>
        </section>
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/">
          <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition">
            Torna alla home
          </button>
        </Link>
      </div>
    </div>
  );
}
