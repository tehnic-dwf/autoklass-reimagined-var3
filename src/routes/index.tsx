import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, FileText, MapPin } from "lucide-react";
import showroomVideo from "@/assets/showroom.mp4";
import showroomPoster from "@/assets/showroom-poster.jpg";
import serviceImage from "@/assets/service-consultant.jpg";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { HomeBrands, HomeOffers } from "@/components/home/HomeBrands";
import { HomeVehicles } from "@/components/home/HomeVehicles";
import { HomeSearch } from "@/components/search/HomeSearch";
import { HomeServices } from "@/components/home/HomeServices";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Autoklass | Autoturisme și service" },
      {
        name: "description",
        content:
          "Găsește un Mercedes-Benz nou sau rulat și solicită o ofertă. Descoperă serviciile Autoklass.",
      },
    ],
  }),
  component: HomePage,
});
function HomePage() {
  return (
    <div className="v3 ak-home">
      <SiteHeader overlay />
      <main id="main-content">
        <section
          id="acasa-hero"
          className="relative isolate -mt-16 overflow-hidden bg-primary text-primary-foreground lg:-mt-20"
        >
          <div className="hero-media absolute inset-0 overflow-hidden" aria-hidden>
            <video
              className="size-full object-cover"
              style={{ transform: "scale(1.32)", transformOrigin: "50% 100%" }}
              src={showroomVideo}
              poster={showroomPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
          <div className="hero-copy-scrim absolute inset-0 bg-primary/10" aria-hidden />

          <div className="relative mx-auto flex v3-hero-content min-h-[86svh] w-full max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-8 md:pb-16 lg:px-10">
            <h1
              className="hero-rise font-display"
              style={{
                animationDelay: "120ms",
                fontSize: "clamp(2.6rem, 7vw, 6rem)",
                lineHeight: 0.98,
                maxWidth: "14ch",
              }}
            >
              Următoarea ta mașină, cu Autoklass.
            </h1>

            <p
              className="hero-rise mt-6 text-pretty text-base text-primary-foreground/85"
              style={{ animationDelay: "220ms", maxWidth: "44ch" }}
            >
              Autoturisme noi și rulate. Service autorizat. Oamenii potriviți, la fiecare pas.
            </p>

            <div
              className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "320ms" }}
            >
              <Button asChild size="lg" variant="secondary" className="press">
                <a href="#cauta-masina">Caută o mașină</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="press border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/service/programare">Programare service</Link>
              </Button>
            </div>

            <p
              className="hero-rise mt-6 text-sm text-primary-foreground/85"
              style={{ animationDelay: "400ms" }}
            >
              Dealer și service autorizat
            </p>
          </div>
        </section>

        <HomeServices />
        <HomeSearch />
        <HomeBrands />
        <HomeOffers />
        <HomeVehicles />
        <section className="ak-assurance v3-wrap v3-section">
          <BadgeCheck size={32} strokeWidth={1.3} aria-hidden />
          <h2>
            O alegere mare.
            <br />
            Un partener aproape.
          </h2>
          <p>
            Autoklass este centru autorizat de vânzări și service pentru Mercedes-Benz, Audi,
            Volkswagen, XPENG și Honda.
          </p>
          <a className="v3-link" href="https://www.autoklass.ro/sucursale">
            Găsește echipa din apropiere <ArrowRight size={18} aria-hidden />
          </a>
        </section>
        <section className="bg-[#f4f5f5] ak-service-story">
          <div className="v3-wrap v3-section">
            <div className="v3-grid items-center">
              <img
                src={serviceImage}
                alt="Discuție în service-ul Autoklass"
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="lg:pl-8">
                <p className="v3-kicker">Service Autoklass</p>
                <h2>
                  Mașina ta merită
                  <br />
                  să fie pe mâini bune.
                </h2>
                <p className="v3-intro">
                  De la revizia periodică la reparații. Alegi serviciul și sucursala, iar echipa
                  Autoklass confirmă programarea.
                </p>
                <div className="v3-service-proof mt-8">
                  <div className="v3-proof">
                    <BadgeCheck size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p>Service autorizat Mercedes-Benz</p>
                    </div>
                  </div>
                  <div className="v3-proof">
                    <FileText size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p>Intervale de preț, cu TVA inclus</p>
                    </div>
                  </div>
                  <div className="v3-proof">
                    <MapPin size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p>Preluare și livrare a mașinii</p>
                      <a
                        href="https://www.autoklass.ro/articole/pick-up-service.html"
                        className="v3-link v3-small"
                      >
                        Vezi condițiile serviciului <span aria-hidden="true">↗</span>
                        <span className="sr-only">Pe site-ul Autoklass</span>
                      </a>
                    </div>
                  </div>
                </div>
                <Link className="v3-button mt-8" to="/service/programare">
                  Programare service <ArrowRight size={18} />
                </Link>
                <div>
                  <Link className="v3-link mt-4" to="/service/tarife">
                    Vezi tarifele service <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="v3-wrap v3-section v3-rule">
          <div className="v3-location-callout">
            <div>
              <h2>Găsește sucursala potrivită.</h2>
              <p className="v3-intro">
                Vezi adresa, programul și mărcile reprezentate în fiecare locație.
              </p>
            </div>
            <a className="v3-button secondary" href="https://www.autoklass.ro/sucursale">
              Vezi sucursalele <span aria-hidden="true">↗</span>
              <span className="sr-only">Pe site-ul Autoklass</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
