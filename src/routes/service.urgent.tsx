import { createFileRoute } from "@tanstack/react-router";
import { OutOfScope } from "@/components/OutOfScope";
export const Route = createFileRoute("/service/urgent")({
  head: () => ({ meta: [{ title: "Asistență rutieră | Autoklass" }] }),
  component: () => (
    <OutOfScope
      title="Asistență rutieră"
      description="Consultă condițiile și serviciile de asistență Mercedes-Benz Mobilo."
      href="https://www.autoklass.ro/articole/mobilo.html"
    />
  ),
});
