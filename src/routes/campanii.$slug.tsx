import { createFileRoute, notFound } from "@tanstack/react-router";
import { campaigns } from "@/data/campaigns";
import { CampaignLanding } from "@/components/campaign/CampaignLanding";
export const Route = createFileRoute("/campanii/$slug")({
  loader: ({ params }) => {
    const campaign = campaigns[params.slug];
    if (!campaign) throw notFound();
    return campaign;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Campanie"} | Autoklass` },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: loaderData?.intro ?? "" },
    ],
  }),
  component: CampaignPage,
});
function CampaignPage() {
  const campaign = Route.useLoaderData();
  return <CampaignLanding key={campaign.slug} campaign={campaign} />;
}
