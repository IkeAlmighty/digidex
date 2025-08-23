import SubscriptionCheckout from "../components/SubscriptionCheckout";
import { useState } from "react";

export default function MembershipPage() {
  const [membership, setMembership] = useState("basic");
  return (
    <div>
      <SubscriptionCheckout membership={membership} />
    </div>
  );
}
