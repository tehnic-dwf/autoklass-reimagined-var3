import { createFileRoute } from "@tanstack/react-router";
import { OutOfScope } from "@/components/OutOfScope";
export const Route = createFileRoute("/buy-back")({
  head: () => ({ meta: [{ title: "Buy-back Autoklass | Autoklass" }] }),
  component: () => (
    <OutOfScope
      title="Buy-back Autoklass"
      description="Solicită o evaluare pentru mașina ta actuală."
      href="https://www.autoklass.ro/articole/cumparam.html"
    />
  ),
});
