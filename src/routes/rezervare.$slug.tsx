import { createFileRoute, redirect } from "@tanstack/react-router";
// Legacy V2 links lead to the same offer journey. Reservation is outside V3 scope.
export const Route = createFileRoute("/rezervare/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/autoturisme/$slug", params: { slug: params.slug } });
  },
});
