import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-primary/30 selection:text-zinc-900">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase text-zinc-900 mb-12">
            Privacy Policy
          </h1>
          <div className="markdown-body text-lg leading-relaxed text-zinc-700 space-y-6">
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
            
            <h2>1. Informazioni generali</h2>
            <p>
              In questa pagina si descrivono le modalità di gestione del sito in riferimento al trattamento dei dati personali 
              degli utenti che lo consultano. L'informativa è resa ai sensi del Regolamento (UE) 2016/679 (GDPR) e 
              della normativa nazionale vigente in materia di protezione dei dati personali.
            </p>

            <h2>2. Titolare del Trattamento dei Dati</h2>
            <p>
              Nazzareno Boldrini<br />
              Via Mulini 108/B - 25039 - Travagliato (BS)<br />
              Email: <a>nazzareno.boldrini@gmail.com</a>
            </p>

            <h2>3. Tipologia dei dati raccolti</h2>
            <p>
              Fra i Dati Personali raccolti da questo sito, in modo autonomo o tramite terze parti, ci sono: 
              Dati di utilizzo, Cookie, nome, cognome, indirizzo email.
              Dettagli completi su ciascuna tipologia di dati raccolti sono forniti nelle sezioni dedicate di 
              questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta 
              dei dati stessi.
            </p>

            <h2>4. Finalità del Trattamento</h2>
            <p>
              I Dati dell'Utente sono raccolti per consentire al Titolare di fornire i propri Servizi, 
              così come per le seguenti finalità: Statistica, Contattare l'Utente, Visualizzazione di 
              contenuti da piattaforme esterne.
            </p>

            <h2>5. Diritti dell'Utente</h2>
            <p>
              Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare. 
              In particolare, l'Utente ha il diritto di: 
            </p>
            <ul>
              <li>Revocare il consenso in ogni momento.</li>
              <li>Opporsi al trattamento dei propri Dati.</li>
              <li>Accedere ai propri Dati.</li>
              <li>Verificare e chiedere la rettificazione.</li>
              <li>Ottenere la limitazione del trattamento.</li>
              <li>Ottenere la cancellazione o rimozione dei propri Dati Personali.</li>
              <li>Ricevere i propri Dati o farli trasferire ad altro titolare.</li>
            </ul>

            <h2>6. Come esercitare i diritti</h2>
            <p>
              Per esercitare i diritti sopra descritti, gli Utenti possono indirizzare una richiesta agli 
              estremi di contatto del Titolare indicati in questo documento. Le richieste sono depositate a 
              titolo gratuito e evase dal Titolare nel più breve tempo possibile.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
