import { type Vehicle } from "@/data/vehicles";
import { vehicleFacts } from "@/lib/vehicle-facts";
export function VehicleFacts({
  vehicle,
  compact = false,
}: {
  vehicle: Vehicle;
  compact?: boolean;
}) {
  const facts = vehicleFacts(vehicle).filter(
    ({ label }) => compact || vehicle.condition !== "rulat" || label !== "Emisii CO₂",
  );
  return (
    <dl className={compact ? "ak-card-facts" : "ak-product-facts"}>
      {facts.map(({ label, value, icon: Icon }) => (
        <div key={label}>
          <dt>
            <Icon size={18} strokeWidth={1.5} aria-hidden />
            <span className={compact ? "sr-only" : undefined}>{label}</span>
          </dt>
          <dd>
            {!compact && label === "Tracțiune"
              ? value.replace(/^Tracțiune /, "").replace(/^./, (c) => c.toUpperCase())
              : value}
            {compact && label === "Emisii CO₂" && <span> CO₂</span>}
            {compact && label === "Tracțiune" && value === "De confirmat" && (
              <span> (tracțiune)</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
