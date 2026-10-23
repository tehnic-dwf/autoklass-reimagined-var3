import type { ServiceBranchId } from "@/data/service-prices";

// Approximate branch positions for the prototype. The visitor confirms the suggestion.
const locations: { id: ServiceBranchId; latitude: number; longitude: number }[] = [
  { id: "sud", latitude: 44.379, longitude: 26.128 },
  { id: "pipera", latitude: 44.503, longitude: 26.144 },
  { id: "chitila", latitude: 44.508, longitude: 25.994 },
  { id: "constanta", latitude: 44.201, longitude: 28.619 },
  { id: "ploiesti", latitude: 44.952, longitude: 26.044 },
  { id: "sibiu", latitude: 45.792, longitude: 24.142 },
  { id: "timisoara", latitude: 45.768, longitude: 21.228 },
  { id: "cluj", latitude: 46.744, longitude: 23.592 },
];

function distanceKm(
  latitude: number,
  longitude: number,
  otherLatitude: number,
  otherLongitude: number,
) {
  const radians = Math.PI / 180;
  const latitudeDifference = (otherLatitude - latitude) * radians;
  const longitudeDifference = (otherLongitude - longitude) * radians;
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude * radians) *
      Math.cos(otherLatitude * radians) *
      Math.sin(longitudeDifference / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function suggestServiceBranch(latitude: number, longitude: number): ServiceBranchId | null {
  const nearest = locations
    .map((branch) => ({
      id: branch.id,
      distance: distanceKm(latitude, longitude, branch.latitude, branch.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  // Do not recommend a distant city as if it were local.
  return nearest && nearest.distance <= 45 ? nearest.id : null;
}
