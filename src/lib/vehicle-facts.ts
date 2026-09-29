import { Fuel, Gauge, Settings2, Cylinder, Cloud, Route, CarFront } from "lucide-react";
import { type Vehicle, formatKm, formatPrice } from "@/data/vehicles";
export function vehicleFacts(v: Vehicle) {
  return [
    ...(v.condition === "rulat"
      ? [
          {
            label: "Kilometraj",
            value: v.km === null ? "De confirmat" : formatKm(v.km),
            icon: Route,
          },
        ]
      : []),
    { label: "Combustibil", value: v.hybrid ? "Hibrid" : v.fuel, icon: Fuel },
    { label: "Putere", value: `${v.powerHp} CP`, icon: Gauge },
    { label: "Transmisie", value: v.gearbox, icon: Settings2 },
    {
      label: "Cilindree",
      value: v.fuel === "Electric" ? "Electric · fără cilindri" : `${formatPrice(v.engineCc)} cm³`,
      icon: Cylinder,
    },
    {
      label: "Emisii CO₂",
      value:
        v.co2 != null
          ? `${v.co2} g/km`
          : v.fuel === "Electric"
            ? "0 g/km la evacuare"
            : "De confirmat",
      icon: Cloud,
    },
    {
      label: "Tracțiune",
      value:
        (
          { AWD: "Tracțiune integrală", FWD: "Tracțiune față", RWD: "Tracțiune spate" } as Record<
            string,
            string
          >
        )[v.drive] || "De confirmat",
      icon: CarFront,
    },
  ];
}
