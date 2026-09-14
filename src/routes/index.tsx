import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Pause, ArrowRight, BadgeCheck, FileText, MapPin } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import showroomVideo from "@/assets/showroom.mp4";
import showroomPoster from "@/assets/showroom-poster.jpg";
import serviceImage from "@/assets/service-consultant.jpg";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { HomeSearch } from "@/components/search/HomeSearch";
import { vehicles } from "@/data/vehicles";
import { demoSlug } from "@/data/demo-vehicle";
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
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    userPaused.current = reduced.matches;
    const sync = () => {
      const visible =
        video.getBoundingClientRect().bottom > 0 && document.visibilityState === "visible";
      if (!userPaused.current && visible)
        void video
          .play()
          .then(() => setPaused(false))
          .catch(() => setPaused(true));
      else {
        video.pause();
        setPaused(true);
      }
    };
    const observer = new IntersectionObserver(sync, { threshold: 0.1 });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  const toggleVideo = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      void v
        .play()
        .then(() => setPaused(false))
        .catch(() => setPaused(true));
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  };
  const shown = [vehicles.find((v) => v.slug === demoSlug)!, vehicles[2]!, vehicles[1]!];
  return (
    <div className="v3">
      <SiteHeader overlay />
      <main id="main-content">
        <section
          id="acasa-hero"
          className="relative isolate -mt-16 overflow-hidden bg-primary text-primary-foreground lg:-mt-20"
        >
          <div className="hero-media absolute inset-0 overflow-hidden" aria-hidden>
            <video
              ref={heroVideoRef}
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
          <button
            type="button"
            aria-label={paused ? "Pornește video-ul din fundal" : "Oprește video-ul din fundal"}
            title={paused ? "Pornește video-ul" : "Oprește video-ul"}
            onClick={toggleVideo}
            className="press absolute right-6 top-24 z-10 flex size-12 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary/55 text-primary-foreground shadow-lg backdrop-blur-sm hover:bg-primary/75 md:right-8 lg:right-10 lg:top-28"
          >
            {paused ? (
              <Play className="size-5" aria-hidden />
            ) : (
              <Pause className="size-5" aria-hidden />
            )}
          </button>

          <div className="relative mx-auto flex min-h-[86svh] w-full max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-8 md:pb-16 lg:px-10">
            <h1
              className="hero-rise font-display"
              style={{
                animationDelay: "120ms",
                fontSize: "clamp(2.6rem, 7vw, 6rem)",
                lineHeight: 0.98,
                maxWidth: "14ch",
              }}
            >
              Un Mercedes-Benz nu se alege dintr-o poză.
            </h1>

            <p
              className="hero-rise mt-6 text-pretty text-base text-primary-foreground/85"
              style={{ animationDelay: "220ms", maxWidth: "44ch" }}
            >
              Descoperă mașinile noi și rulate din selecția Autoklass. Găsește modelul potrivit și
              solicită o ofertă.
            </p>

            <div
              className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "320ms" }}
            >
              <Button asChild size="lg" variant="secondary" className="press">
                <a href="#cauta-masina">Găsește-ți mașina</a>
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
              className="hero-rise mt-8 text-xs text-primary-foreground/65"
              style={{ animationDelay: "400ms" }}
            >
              Dealer autorizat Mercedes-Benz
            </p>
          </div>
        </section>

        <HomeSearch />
        <HomeServices />
        <section className="v3-wrap v3-section">
          <p className="v3-kicker">Selecția Autoklass</p>
          <div className="v3-row">
            <h2>Alege mașina. Descoperă detaliile.</h2>
            <Link className="v3-link" to="/autoturisme">
              Vezi toate mașinile <ArrowRight size={18} />
            </Link>
          </div>
          <div className="v3-cards">
            {shown.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        </section>
        <section id="cum-soliciti-oferta" className="v3-rule v3-buying">
          <div className="v3-wrap v3-section">
            <div className="v3-grid items-start">
              <div>
                <p className="v3-kicker">Cumpărare, cu repere clare</p>
                <h2>
                  De la prima căutare
                  <br />
                  la oferta pentru tine.
                </h2>
                <p className="v3-intro">
                  Vezi prețul, echiparea și disponibilitatea mașinii înainte să începi discuția cu
                  un consultant.
                </p>
                <div className="v3-proof mt-8">
                  <BadgeCheck size={24} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <p>Dealer autorizat Mercedes-Benz</p>
                    <p className="v3-small v3-muted mt-1">
                      Autoturisme noi și rulate, cu sprijinul echipei Autoklass.
                    </p>
                  </div>
                </div>
                <a href="https://www.autoklass.ro/articole/cumparam.html" className="v3-link mt-4">
                  Ai o mașină de oferit la schimb? <span aria-hidden="true">↗</span>
                  <span className="sr-only">Pe site-ul Autoklass</span>
                </a>
              </div>
              <ol className="v3-journey">
                <li>
                  <span aria-hidden="true">01</span>
                  <div>
                    <h3>Găsești și compari</h3>
                    <p>Alegi criteriile tale și compari până la trei mașini.</p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">02</span>
                  <div>
                    <h3>Soliciți o ofertă</h3>
                    <p>Din pagina mașinii, „Contactează-ne” deschide formularul cu datele tale.</p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">03</span>
                  <div>
                    <h3>Discuți cu un consultant</h3>
                    <p>
                      Clarifici disponibilitatea, echiparea și pașii următori pentru mașina aleasă.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>
        <section className="bg-[#f4f5f5]">
          <div className="v3-wrap v3-section">
            <div className="v3-grid items-center">
              <img
                src={serviceImage}
                alt="Discuție în service-ul Autoklass"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="lg:pl-8">
                <p className="v3-kicker">Service Autoklass</p>
                <h2>
                  Grija pentru mașină.
                  <br />
                  Claritate pentru tine.
                </h2>
                <p className="v3-intro">
                  Alege sucursala, consultă tarifele de manoperă și cere o estimare pentru lucrarea
                  de care ai nevoie.
                </p>
                <div className="v3-service-proof mt-8">
                  <div className="v3-proof">
                    <BadgeCheck size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p>Service autorizat Mercedes-Benz</p>
                      <p className="v3-small v3-muted mt-1">
                        Întreținere și reparații în rețeaua Autoklass.
                      </p>
                    </div>
                  </div>
                  <div className="v3-proof">
                    <FileText size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p>Tarife pe sucursală, cu TVA inclus</p>
                      <p className="v3-small v3-muted mt-1">
                        Separăm manopera pe oră de costul total al lucrării.
                      </p>
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
                  Solicită programare service <ArrowRight size={18} />
                </Link>
                <div>
                  <Link className="v3-link mt-4" to="/service/tarife">
                    Consultă serviciile și tarifele <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="v3-wrap v3-section">
          <div className="v3-location-callout">
            <div>
              <p className="v3-kicker">Aproape de tine</p>
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
