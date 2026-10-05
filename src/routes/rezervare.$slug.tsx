import { createFileRoute, notFound } from "@tanstack/react-router";
import { getVehicle } from "@/data/vehicles";
import { ReservationCheckout } from "@/components/reservation/ReservationCheckout";
export const Route = createFileRoute("/rezervare/$slug")({
  validateSearch: (s: Record<string, unknown>): { demo?: "error" } =>
    s["demo"] === "error" ? { demo: "error" } : {},
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return vehicle;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Rezervare ${loaderData?.title ?? "autoturism"} | Autoklass` },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReservationPage,
});
function ReservationPage() {
  const vehicle = Route.useLoaderData();
  const { demo } = Route.useSearch();
  return (
    <ReservationCheckout key={vehicle.slug} vehicle={vehicle} simulateError={demo === "error"} />
  );
}
