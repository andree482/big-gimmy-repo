import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="font-semibold text-xl mb-4">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
        
        <section className="mb-8">
          <p>
            La presente Privacy Policy è resa nel rispetto dell'articolo 13 del Regolamento UE 2016/679 
            (di seguito "GDPR") nonché ai sensi del Provvedimento in materia di cookie n. 229 dell'8 
            maggio 2014, così come integrato e modificato dal successivo Provvedimento n. 231 del 10 giugno 2021, 
            al fine di informare gli Utenti circa le modalità di gestione del sito internet https://biggimmyintegratori.it rispetto 
            al trattamento dei dati personali degli Utenti che lo consultano e che interagiscono con i servizi web 
            accessibili per via telematica dall'indirizzo https://biggimmyintegratori.it.
          </p>
          <p>
            La presente policy descrive le modalità di gestione del sito internet e dei cookies in riferimento al trattamento 
            dei dati personali degli utenti che lo consultano.<br />
            Si tratta di un'informativa che è resa anche ai sensi dell'art. 13 e 14 del Regolamento UE 2016/679 
            (Regolamento Generale per la Protezione dei Dati Personali) a coloro che interagiscono con i servizi web 
            di BIG GIMMY INTEGRATORI.
          </p>
          <p>
            L'informativa è resa solo per il sito in oggetto e non anche per altri siti web eventualmente 
            consultati dall'utente tramite link.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">IL "TITOLARE" DEL TRATTAMENTO</h2>
          <p>
            Titolare del trattamento è BIG GIMMY INTEGRATORI, con sede a Buttigliera Alta (TO), Corso Torino, 85, 
            P.IVA 09256080012 e filiale a Aosta (AO), Corso Saint-Martin-de-Corléans, 55.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">LUOGO DI TRATTAMENTO DEI DATI</h2>
          <p>
            I trattamenti connessi ai servizi web del sito https://biggimmyintegratori.it sono effettuati presso la sede dell'Azienda 
            e sono curati solo da personale tecnico dell'ufficio incaricato del trattamento. 
            Nessun dato derivante dal servizio web viene comunicato o diffuso. I dati personali forniti dagli utenti 
            che inoltrano richieste di invio di materiale informativo o altre comunicazioni sono utilizzati al solo fine di 
            eseguire il servizio o la prestazione richiesta e sono comunicati a terzi nel solo caso in cui ciò sia a tal fine necessario.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">TIPI DI DATI TRATTATI</h2>
          <h3 className="font-semibold text-xl mb-2">Dati di navigazione</h3>
          <p>
            I sistemi informatici e le procedure software preposte al funzionamento di questo sito web acquisiscono, 
            nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell'uso dei 
            protocolli di comunicazione di Internet. Si tratta di informazioni che non sono raccolte per essere associate 
            a interessati identificati, ma che per loro stessa natura potrebbero, attraverso elaborazioni ed associazioni 
            con dati detenuti da terzi, permettere di identificare gli utenti.
          </p>
          <p>
            In questa categoria di dati rientrano gli indirizzi IP o i nomi a dominio dei computer utilizzati dagli utenti 
            che si connettono al sito, gli indirizzi in notazione URI (Uniform Resource Identifier) delle risorse richieste, 
            l'orario della richiesta, il metodo utilizzato nel sottoporre la richiesta al server, la dimensione del file 
            ottenuto in risposta, il codice numerico indicante lo stato della risposta data dal server (buon fine, errore, ecc.) 
            ed altri parametri relativi al sistema operativo e all'ambiente informatico dell'utente.
          </p>
          <p>
            Questi dati vengono utilizzati al solo fine di ricavare informazioni statistiche anonime sull'uso del sito e 
            per controllarne il corretto funzionamento e vengono cancellati dopo l'elaborazione. I dati potrebbero essere 
            utilizzati per l'accertamento di responsabilità in caso di ipotetici reati informatici ai danni del sito.
          </p>

          <h3 className="font-semibold text-xl mt-6 mb-2">Dati forniti volontariamente dall'utente</h3>
          <p>
            L'invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta 
            la successiva acquisizione dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli 
            eventuali altri dati personali inseriti nella missiva.
          </p>
          <p>
            Specifiche informative di sintesi verranno progressivamente riportate o visualizzate nelle pagine del sito 
            predisposte per particolari servizi a richiesta.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">COOKIES</h2>
          <p>
            Per informazioni specifiche sui Cookies utilizzati dal sito https://biggimmyintegratori.it, si prega di consultare la <Link 
            href="/cookie-policy" className="text-yellow-600 hover:underline">Cookie Policy</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">FINALITÀ DEL TRATTAMENTO</h2>
          <p>
            I dati di natura personale volontariamente forniti dagli utenti che inoltrano richieste di informazioni 
            o di contatto, saranno trattati per le seguenti finalità:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Rispondere a una richiesta di contatto</li>
            <li>Gestire il contatto commerciale e fornire informazioni sui prodotti e servizi di BIG GIMMY</li>
            <li>Adempiere ad obblighi previsti dalla legge, da un regolamento o dalla normativa comunitaria</li>
            <li>Analisi statistiche interne in forma anonima</li>
            <li>Attività di marketing, previo consenso, attraverso l'invio, anche tramite e-mail, di comunicazioni commerciali e promozionali</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">NATURA DEL CONFERIMENTO DEI DATI</h2>
          <p>
            A parte quanto specificato per i dati di navigazione, l'utente è libero di fornire i dati personali riportati 
            nei moduli di richiesta informazioni o di contatto. Il loro mancato conferimento può comportare l'impossibilità 
            di ottenere quanto richiesto.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">MODALITÀ DI TRATTAMENTO</h2>
          <p>
            I dati personali sono trattati con strumenti automatizzati per il tempo strettamente necessario a conseguire 
            gli scopi per cui sono stati raccolti. Specifiche misure di sicurezza sono osservate per prevenire la perdita 
            dei dati, usi illeciti o non corretti ed accessi non autorizzati.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">DIRITTI DEGLI INTERESSATI</h2>
          <p>
            I soggetti cui si riferiscono i dati personali hanno il diritto in qualunque momento di ottenere la conferma 
            dell'esistenza o meno dei medesimi dati e di conoscerne il contenuto e l'origine, verificarne l'esattezza o 
            chiederne l'integrazione o l'aggiornamento, oppure la rettificazione (articoli 15, 16 e 17 del GDPR).
          </p>
          <p>
            Inoltre, gli interessati hanno il diritto di chiedere la cancellazione, la limitazione del trattamento, il diritto 
            di opporsi al loro trattamento, oltre al diritto alla portabilità dei dati (articoli 18, 19, 20 e 21 del GDPR).
          </p>
          <p>
            Qualora il trattamento sia basato sul consenso espresso, gli interessati hanno il diritto di revocare il consenso 
            in qualsiasi momento senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.
          </p>
          <p>
            Tali diritti possono essere esercitati scrivendo all'indirizzo e-mail: biggimmy@gmail.com o mediante raccomandata 
            A/R all'indirizzo: BIG GIMMY INTEGRATORI, Corso Torino, 85, 10090 Buttigliera Alta (TO).
          </p>
          <p>
            L'interessato, qualora ritenga che il trattamento che lo riguarda violi il GDPR, ha il diritto di proporre reclamo 
            a un'autorità di controllo, segnatamente nello Stato membro in cui risiede abitualmente, lavora oppure del luogo 
            ove si è verificata la presunta violazione (Garante per la Protezione dei Dati Personali - www.garanteprivacy.it).
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
