import { Link } from "wouter";

export default function DirittoRecesso() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Diritto di Recesso</h1>

      <div className="prose prose-lg max-w-none">
        <p className="font-semibold text-xl mb-4">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">INFORMATIVA SUL DIRITTO DI RECESSO</h2>
          <p>
            Ai sensi degli articoli 52 e seguenti del D.Lgs. 206/2005 (Codice del Consumo), il consumatore ha diritto
            di recedere dal contratto di acquisto concluso a distanza entro 14 giorni, senza dover fornire alcuna
            motivazione e senza penalità.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">TERMINE PER IL RECESSO</h2>
          <p>
            Il periodo di recesso scade dopo 14 giorni dal giorno in cui il consumatore o un terzo, diverso dal
            vettore e designato dal consumatore, acquisisce il possesso fisico dei beni.
          </p>
          <p className="mt-4">
            Per esercitare il diritto di recesso, il consumatore è tenuto a informare BIG GIMMY INTEGRATORI
            della sua decisione di recedere dal presente contratto tramite una dichiarazione esplicita.
          </p>
        </section>

        <section className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <h2 className="font-bold text-2xl mb-4">COME ESERCITARE IL DIRITTO DI RECESSO</h2>
          <p className="mb-4">
            Per avviare la procedura di reso, il cliente deve inviare un'email a:
          </p>
          <p className="text-xl font-bold text-center mb-4">
            <a href="mailto:info@biggimmyintegratori.com" className="text-yellow-600 hover:underline">
              info@biggimmyintegratori.com
            </a>
          </p>
          <p className="mb-2">Nell'email dovranno essere indicati:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Numero dell'ordine</strong> (reperibile nella conferma d'ordine ricevuta via email)</li>
            <li><strong>Data dell'ordine</strong></li>
            <li><strong>Nome e cognome</strong> dell'intestatario dell'ordine</li>
            <li><strong>Foto del prodotto</strong> da restituire (per verificare le condizioni)</li>
            <li><strong>Motivo del reso</strong> (facoltativo)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">CONDIZIONI PER IL RECESSO</h2>
          <p>Il diritto di recesso si applica ai prodotti che rispettano le seguenti condizioni:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Il prodotto deve essere integro e non utilizzato</li>
            <li>Il prodotto deve essere restituito nella sua confezione originale, completa di tutti i suoi elementi</li>
            <li>Il prodotto non deve essere stato aperto o sigilli rimossi</li>
            <li>Il prodotto deve essere accompagnato dalla documentazione d'acquisto</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">ESCLUSIONI DAL DIRITTO DI RECESSO</h2>
          <p>
            Ai sensi dell'art. 59 del Codice del Consumo, il diritto di recesso è escluso per:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              Prodotti sigillati che non si prestano ad essere restituiti per motivi igienici o connessi alla
              protezione della salute e che sono stati aperti dopo la consegna (es. integratori alimentari con
              sigillo di sicurezza rimosso)
            </li>
            <li>Prodotti confezionati su misura o chiaramente personalizzati</li>
            <li>Prodotti che rischiano di deteriorarsi o scadere rapidamente</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">RESTITUZIONE DEI PRODOTTI</h2>
          <p>
            Una volta autorizzato il reso, il cliente dovrà provvedere alla spedizione dei prodotti entro 14 giorni
            dalla comunicazione di recesso al seguente indirizzo:
          </p>
          <div className="p-4 bg-gray-100 rounded mt-4">
            <p className="font-semibold">BIG GIMMY INTEGRATORI</p>
            <p>Corso Torino, 85</p>
            <p>10090 Buttigliera Alta (TO)</p>
            <p>Italia</p>
          </div>
          <p className="mt-4">
            Le spese di spedizione per la restituzione del prodotto sono a carico del consumatore.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">RIMBORSO</h2>
          <p>
            Una volta ricevuto il prodotto e verificata la conformità alle condizioni sopra descritte,
            BIG GIMMY INTEGRATORI provvederà al rimborso dell'importo versato entro 14 giorni dalla
            ricezione della merce.
          </p>
          <p className="mt-4">
            Il rimborso sarà effettuato utilizzando lo stesso mezzo di pagamento usato per la transazione
            iniziale, salvo diverso accordo. Il consumatore non dovrà sostenere alcun costo quale
            conseguenza del rimborso.
          </p>
          <p className="mt-4 font-semibold">
            Il rimborso può essere sospeso fino al ricevimento dei beni oppure fino all'avvenuta
            dimostrazione da parte del consumatore di aver rispedito i beni.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">PRODOTTI DANNEGGIATI O DIFETTOSI</h2>
          <p>
            Nel caso in cui il prodotto ricevuto sia danneggiato o difettoso, il cliente ha diritto alla
            sostituzione o al rimborso integrale. In questo caso, le spese di spedizione per la restituzione
            saranno a carico di BIG GIMMY INTEGRATORI.
          </p>
          <p className="mt-4">
            Per segnalare un prodotto danneggiato o difettoso, inviare un'email a{" "}
            <a href="mailto:info@biggimmyintegratori.com" className="text-yellow-600 hover:underline">
              info@biggimmyintegratori.com
            </a>{" "}
            allegando foto del prodotto e del pacco.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">CONTATTI</h2>
          <p>Per qualsiasi domanda relativa al diritto di recesso, contattare:</p>
          <ul className="list-none mt-4 space-y-2">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@biggimmyintegratori.com" className="text-yellow-600 hover:underline">
                info@biggimmyintegratori.com
              </a>
            </li>
            <li>
              <strong>Telefono:</strong> Contattare il negozio più vicino
            </li>
            <li>
              <strong>Indirizzo:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-2xl mb-4">RIFERIMENTI NORMATIVI</h2>
          <p>
            Il presente documento è redatto in conformità al D.Lgs. 206/2005 (Codice del Consumo),
            in particolare agli articoli 52-59 che disciplinano il diritto di recesso nei contratti
            a distanza.
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
