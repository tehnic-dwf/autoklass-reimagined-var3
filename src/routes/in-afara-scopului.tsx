import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/in-afara-scopului")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
