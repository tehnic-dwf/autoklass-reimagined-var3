import { NavigationLink } from "@/components/layout/NavigationLink";
import { siteNavigation } from "@/data/site-navigation";

export function HomeServices() {
  const groups = siteNavigation.filter((group) => group.id !== "autoklass");
  return (
    <section id="servicii-autoklass" className="v3-wrap v3-section v3-service-directory">
      <div className="v3-row mb-8">
        <div>
          <p className="v3-kicker">Mai mult pentru tine și mașina ta</p>
          <h2>De ce ai nevoie astăzi?</h2>
        </div>
        <p className="v3-small v3-muted max-w-80">
          Toate serviciile, grupate după ce vrei să faci. Deschide categoria potrivită.
        </p>
      </div>
      <div className="v3-directory-grid">
        {groups.map((group) => (
          <details className="v3-disclosure" key={group.id}>
            <summary>
              <span>
                <span className="v3-directory-title">{group.label}</span>
                <span className="v3-small v3-muted block mt-2">{group.description}</span>
              </span>
            </summary>
            <div className="flex flex-col items-start">
              {group.items.map((item) => (
                <NavigationLink key={item.label} item={item} className="v3-link v3-small" />
              ))}
            </div>
          </details>
        ))}
      </div>
      <p className="v3-small v3-muted mt-6">
        Linkurile ↗ deschid site-ul Autoklass sau magazinele și serviciile partenere.
      </p>
    </section>
  );
}
