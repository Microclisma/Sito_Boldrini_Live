import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-primary/30 selection:text-zinc-900">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase text-zinc-900 mb-12">
            Cookie Policy
          </h1>
          <div className="markdown-body text-lg leading-relaxed text-zinc-700 space-y-6">
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>

            <h2>Cosa sono i Cookie?</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati dall'utente inviano e registrano sul suo computer o dispositivo mobile, 
              per essere poi ritrasmessi agli stessi siti alla successiva visita. Grazie ai cookie un sito ricorda le azioni e preferenze 
              dell'utente (come, ad esempio, i dati di login, la lingua prescelta, le dimensioni dei caratteri, altre impostazioni di visualizzazione, ecc.) 
              in modo che non debbano essere indicate nuovamente quando l'utente torni a visitare detto sito o navighi da una pagina all'altra di esso.
            </p>

            <h2>Tipologie di cookie utilizzati da questo sito</h2>
            <p>Questo sito utilizza le seguenti categorie di cookie:</p>
            <ul>
              <li>
                <strong>Cookie tecnici:</strong> strettamente necessari al funzionamento del sito o per consentire all'utente di usufruire 
                dei contenuti e dei servizi da questi richiesti.
              </li>
              <li>
                <strong>Cookie analitici:</strong> consentono di comprendere come il sito viene utilizzato dagli utenti. Con questi cookie non vengono 
                raccolte informazioni sull'identità dell'utente, né alcun dato personale. Tali cookie sono raccolti in forma aggregata e anonima.
              </li>
              <li>
                <strong>Cookie di terze parti:</strong> utilizzati per l'integrazione di funzionalità di terze parti nel sito (es. moduli per i commenti o icone di social network che consentono ai visitatori di condividere i contenuti del sito).
              </li>
            </ul>

            <h2>Gestione dei Cookie</h2>
            <p>
              Gli utenti possono gestire le preferenze relative ai Cookie direttamente all'interno del proprio browser ed impedire 
              – ad esempio – che terze parti possano installarne. Tramite le preferenze del browser è inoltre possibile eliminare i Cookie 
              installati in passato, incluso il Cookie in cui venga eventualmente salvato il consenso all'installazione di Cookie da parte di questo sito.
            </p>
            <p>
              L'utente può trovare informazioni su come gestire i Cookie nel suo browser agli indirizzi indicati dalla rispettiva software house (es: Google Chrome, Mozilla Firefox, Apple Safari e Microsoft Edge).
            </p>

            <h2>Titolare del Trattamento</h2>
            <p>
              Nazzareno Boldrini<br />
              Via Mulini 108/B - 25039 - Travagliato (BS)<br />
              Email: <a>nazzareno.boldrini@gmail.com</a>
            </p>
            <p>
              Dal momento che l'installazione di Cookie e di altri sistemi di tracciamento operata da terze parti tramite i servizi utilizzati 
              all'interno di questo Sito non può essere tecnicamente controllata dal Titolare, ogni riferimento specifico a Cookie e sistemi 
              di tracciamento installati da terze parti è da considerarsi indicativo. 
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
