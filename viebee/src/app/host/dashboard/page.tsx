"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { viebeeService } from "@/src/services/viebee-service";
import { RsvpBooking, WorkshopItem } from "@/src/@core/utils/seed-data";
import { formatVND } from "@/src/@core/utils/currency";
import { useAppSelector } from "@/src/stores/hook";
import {
  Calendar,
  Users,
  DollarSign,
  ShieldCheck,
  Bot,
  PlusCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HostDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [hostRsvps, setHostRsvps] = useState<RsvpBooking[]>([]);
  const [hostWorkshops, setHostWorkshops] = useState<WorkshopItem[]>([]);

  useEffect(() => {
    viebeeService.workshop.getWorkshopsAsync().then((ws) => {
      // Show workshops belonging to current host or demo host (user-baba)
      const myWorkshops = ws.filter((w) => w.hostId === user.id || w.hostId === "user-baba");
      setHostWorkshops(myWorkshops.length ? myWorkshops : ws.slice(0, 2));
    });

    viebeeService.rsvp.getRsvpsForHostAsync(user.id).then((rsvps) => {
      setHostRsvps(rsvps);
    });
  }, [user.id]);

  const totalEarnings = hostRsvps.reduce((acc, r) => acc + r.hostPayout, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Sparkles className="w-4 h-4" />
            Local Host Portal • Đại Sứ Văn Hóa
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Welcome back, {user.name}
          </h1>
          <p className="text-sm text-slate-600">
            Manage your schedule, RSVPs, and track your direct 88% cultural earnings.
          </p>
        </div>

        <Link
          href={APP_ROUTES.createWorkshop}
          className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Workshop
        </Link>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Host Payout (88%)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900">
            {formatVND(totalEarnings > 0 ? totalEarnings : 792000)}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            ✓ Deposited directly to your bank account
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Confirmed RSVPs</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900">
            {hostRsvps.length > 0 ? hostRsvps.length : 3} Guests
          </div>
          <div className="text-[11px] text-slate-500">
            Across active workshop slots
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Listings</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-slate-900">
            {hostWorkshops.length} Workshops
          </div>
          <div className="text-[11px] text-slate-500">
            Available on Saigon Cultural Map
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Community Trust</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-700">
            QC Verified
          </div>
          <div className="text-[11px] text-emerald-800 font-medium">
            ✓ Space inspected by UII team
          </div>
        </div>

      </div>

      {/* Guest RSVPs Table */}
      <div className="card-heritage rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Incoming Guest RSVPs</h3>
            <p className="text-xs text-slate-500">All guest messages are automatically translated via the AI Copilot.</p>
          </div>
          <Link
            href={APP_ROUTES.copilot}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            Open Host AI Copilot Console <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Ticket / Pass ID</th>
                <th className="p-4">Guest Name</th>
                <th className="p-4">Workshop</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Party Size</th>
                <th className="p-4">Your Payout (88%)</th>
                <th className="p-4">AI Chat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {hostRsvps.map((rsvp) => (
                <tr key={rsvp.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-mono font-bold text-amber-800">{rsvp.qrCodeToken}</td>
                  <td className="p-4 font-semibold text-slate-900">{rsvp.travelerName}</td>
                  <td className="p-4 text-slate-700 max-w-xs truncate">{rsvp.workshopTitle}</td>
                  <td className="p-4 text-slate-600 font-medium">
                    {rsvp.date} <br />
                    <span className="text-[11px] text-slate-400">{rsvp.time}</span>
                  </td>
                  <td className="p-4 text-slate-800 font-semibold">{rsvp.guestsCount} Guest(s)</td>
                  <td className="p-4 font-bold text-emerald-700">{formatVND(rsvp.hostPayout)}</td>
                  <td className="p-4">
                    <Link
                      href={APP_ROUTES.copilot}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5" /> Chat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Host Workshops Active List */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-slate-900">Your Active Workshops</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hostWorkshops.map((ws) => (
            <div key={ws.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex gap-4 items-center">
              <img
                src={ws.images[0]}
                alt={ws.title}
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active Listing
                </span>
                <h4 className="font-serif font-bold text-slate-900 text-sm line-clamp-1">{ws.title}</h4>
                <div className="text-xs text-slate-500">{ws.district} • {formatVND(ws.price)}</div>
                <div className="pt-1 flex items-center gap-3">
                  <Link
                    href={APP_ROUTES.workshopDetail(ws.id)}
                    className="text-xs font-semibold text-amber-700 hover:underline"
                  >
                    View Public Page →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
