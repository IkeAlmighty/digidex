export async function createSubscription(membership) {
  return await fetch(`/api/stripe/create-subscription/${membership}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
