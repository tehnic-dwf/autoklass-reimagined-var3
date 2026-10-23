import { Link } from "@tanstack/react-router";
import logo from "@/assets/autoklass-logo.png";
import "@/footer.css";

const termsUrl = "https://www.autoklass.ro/articole/termeni-si-conditii.html";
const privacyUrl = "https://www.autoklass.ro/articole/politica-confidentialitate.html";
const cookiesUrl = "https://www.autoklass.ro/articole/politica-cookie.html";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="ak-footer" aria-label="Subsol Autoklass">
      <div className="v3-wrap ak-footer-inner">
        <div className="ak-footer-top">
          <div className="ak-footer-brand">
            <Link to="/" aria-label="Autoklass, acasă">
              <img src={logo} alt="Autoklass" width="156" height="36" />
            </Link>
            <p>Mașini, service și oameni aproape de tine.</p>
          </div>
          <div className="ak-footer-contact">
            <span>Ai nevoie de ajutor?</span>
            <a href="tel:+40317133333">+40 317 133 333</a>
            <a href="mailto:office@autoklass.ro">office@autoklass.ro</a>
          </div>
        </div>

        <nav className="ak-footer-nav" aria-label="Linkuri utile">
          <section aria-labelledby="ak-footer-cars">
            <h2 id="ak-footer-cars">Mașini</h2>
            <ul>
              <li>
                <Link to="/autoturisme" search={{ condition: "nou" }}>
                  Autoturisme noi
                </Link>
              </li>
              <li>
                <Link to="/autoturisme" search={{ condition: "rulat" }}>
                  Autoturisme rulate
                </Link>
              </li>
              <li>
                <Link to="/" hash="oferte-vanzari">
                  Oferte vânzări
                </Link>
              </li>
              <li>
                <Link to="/comparatie">Mașini salvate</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="ak-footer-service">
            <h2 id="ak-footer-service">Service</h2>
            <ul>
              <li>
                <Link to="/service/programare">Programare service</Link>
              </li>
              <li>
                <Link to="/service/tarife">Tarife service</Link>
              </li>
              <li>
                <Link to="/" hash="oferte-service">
                  Oferte service
                </Link>
              </li>
              <li>
                <a href="https://www.autoklass.ro/articole/gestionarea-daunelor.html">Daune auto</a>
              </li>
            </ul>
          </section>
          <section aria-labelledby="ak-footer-help">
            <h2 id="ak-footer-help">Rezervări</h2>
            <ul>
              <li>
                <a href="https://www.autoklass.ro/faq">Cum rezervi o mașină</a>
              </li>
              <li>
                <a href={termsUrl}>Condiții de anulare și rambursare</a>
              </li>
              <li>
                <a href="https://www.autoklass.ro/auth">Contul meu</a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="ak-footer-company">
            <h2 id="ak-footer-company">Autoklass</h2>
            <ul>
              <li>
                <a href="https://www.autoklass.ro/sucursale">Sucursale</a>
              </li>
              <li>
                <a href="https://www.autoklass.ro/articole/despre-noi.html">Despre noi</a>
              </li>
              <li>
                <a href="https://piese.autoklass.ro/">Piese și accesorii</a>
              </li>
              <li>
                <a href="https://www.autoklass.ro/stiri">Noutăți</a>
              </li>
            </ul>
          </section>
        </nav>

        <div className="ak-footer-bottom">
          <div className="ak-footer-company-details">
            <strong>Autoklass Center S.R.L.</strong>
            <span>Reg. Com. J2003000627408 · CUI RO15134434</span>
          </div>
          <nav aria-label="Informații legale" className="ak-footer-legal">
            <a href={termsUrl}>Termeni și condiții</a>
            <a href={privacyUrl}>Confidențialitate</a>
            <a href={cookiesUrl}>Politica de cookies</a>
            <a href="https://anpc.ro/">Protecția consumatorilor</a>
            <a href="https://anpc.ro/ce-este-sal/">Soluționarea alternativă a litigiilor (SAL)</a>
          </nav>
          <div className="ak-footer-last-line">
            <span>© {new Date().getFullYear()} Autoklass. Toate drepturile rezervate.</span>
            <a href="https://netopia-payments.com/">Procesator de plăți: NETOPIA Payments</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
