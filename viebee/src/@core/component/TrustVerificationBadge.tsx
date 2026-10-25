import React from "react";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  verified: boolean;
  size?: "sm" | "md";
}

export const TrustVerificationBadge: React.FC<Props> = ({ verified, size = "md" }) => {
  if (verified) {
    return (
      <span
        className={`inline-flex items-center gap-1 font-bold rounded-full bg-emerald-100 text-emerald-800 ${
          size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
        }`}
      >
        <ShieldCheck className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
        <span>Community QC Verified</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-100 text-amber-900 ${
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      <Sparkles className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>Pending Verification</span>
    </span>
  );
};

export default TrustVerificationBadge;
