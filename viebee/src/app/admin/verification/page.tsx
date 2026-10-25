"use client";

import React, { useState, useEffect } from "react";
import { viebeeService } from "@/src/services/viebee-service";
import { WorkshopItem } from "@/src/@core/utils/seed-data";
import { showNotificationSuccess } from "@/src/@core/utils/message";
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Sparkles,
  Award,
  AlertTriangle,
} from "lucide-react";

export default function AdminVerificationPage() {
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);

  useEffect(() => {
    viebeeService.workshop.getWorkshopsAsync().then(setWorkshops);
  }, []);

  const handleToggleVerification = async (workshopId: string, currentStatus: boolean) => {
    await viebeeService.qc.verifyWorkshopAsync(workshopId, !currentStatus);
    const updated = await viebeeService.workshop.getWorkshopsAsync();
    setWorkshops(updated);
    showNotificationSuccess(
      !currentStatus
        ? "Đã cấp huy hiệu Kiểm duyệt Chất lượng (QC Verified) cho workshop."
        : "Đã thu hồi kiểm duyệt."
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-amber-900/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          UEH UII Sandbox 2026 • Platform Administration
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          Quality Control (QC) & Host Verification Center
        </h1>
        <p className="text-sm text-slate-600">
          Review host residential spaces, inspect traditional techniques, and grant trust badges to maintain traveler safety and authentic cultural integrity.
        </p>
      </div>

      {/* QC Criteria Checklist */}
      <div className="p-6 rounded-3xl bg-indigo-50/70 border border-indigo-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="font-bold text-sm text-indigo-950 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" /> 1. Identity & Craft Pedigree
          </div>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Verify host citizen ID and confirm genuine generational knowledge of traditional craft or culinary arts.
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-sm text-indigo-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> 2. Space & Safety Standards
          </div>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Ensure private residential kitchen, kiln, or workshop meets cleanliness, adequate ventilation, and guest seating limits.
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-sm text-indigo-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" /> 3. Grounded Knowledge Sheet
          </div>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Validate that ingredients, steps, and house etiquette are fact-checked before ingestion into the AI Cultural Copilot.
          </p>
        </div>
      </div>

      {/* Workshops Moderation List */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-slate-900">
          Workshops in Active Verification Queue
        </h3>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Workshop & Craft</th>
                <th className="p-4">Host Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Max Capacity</th>
                <th className="p-4">Current QC Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workshops.map((ws) => (
                <tr key={ws.id} className="hover:bg-slate-50">
                  <td className="p-4 space-y-1 max-w-xs">
                    <div className="font-bold text-slate-900">{ws.title}</div>
                    <div className="text-[11px] text-amber-800">{ws.titleVi}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{ws.hostName}</td>
                  <td className="p-4 text-slate-500 max-w-xs truncate">{ws.address}</td>
                  <td className="p-4 text-slate-800 font-semibold">{ws.maxGuests} guests</td>
                  <td className="p-4">
                    {ws.qcVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> QC Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Pending Review
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleVerification(ws.id, ws.qcVerified)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                        ws.qcVerified
                          ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                      }`}
                    >
                      {ws.qcVerified ? "Revoke Badge" : "Approve & Grant Badge"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
