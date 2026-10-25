"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { viebeeService } from "@/src/services/viebee-service";
import { RsvpBooking } from "@/src/@core/utils/seed-data";
import { formatVND } from "@/src/@core/utils/currency";
import { useAppSelector } from "@/src/stores/hook";
import {
  QrCode,
  MapPin,
  Calendar,
  Clock,
  Bot,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function TravelerBookingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [rsvps, setRsvps] = useState<RsvpBooking[]>([]);

  useEffect(() => {
    viebeeService.rsvp.getRsvpsForTravelerAsync(user.id).then((data) => {
      setRsvps(data);
    });
  }, [user.id]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-amber-900/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Confirmed Electronic Tickets & Passes
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          My Workshop Passes
        </h1>
        <p className="text-sm text-slate-600">
          Present your QR pass at the host's alleyway courtyard. Tap "Chat with Host" to ask questions via the AI Copilot.
        </p>
      </div>

      {/* Ticket Cards List */}
      <div className="space-y-6">
        {rsvps.map((rsvp) => (
          <div
            key={rsvp.id}
            className="card-heritage rounded-3xl bg-white border border-amber-200 overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12"
          >
            {/* Left section: Ticket Details */}
            <div className="md:col-span-8 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Confirmed RSVP
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Booked: {rsvp.bookedAt}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 leading-snug">
                  {rsvp.workshopTitle}
                </h3>
                <div className="text-xs text-amber-800 font-semibold flex items-center gap-1.5 mt-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{rsvp.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Date
                  </div>
                  <div className="font-bold text-slate-800">{rsvp.date}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Time
                  </div>
                  <div className="font-bold text-slate-800">{rsvp.time}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 mb-1">Party Size</div>
                  <div className="font-bold text-slate-800">{rsvp.guestsCount} Guest(s)</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                <Link
                  href={APP_ROUTES.copilot}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Bot className="w-4 h-4" />
                  Chat with Host (AI Translated)
                </Link>

                <Link
                  href={APP_ROUTES.culturalMap}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Compass className="w-4 h-4 text-amber-700" />
                  Alleyway Walking Directions
                </Link>
              </div>
            </div>

            {/* Right section: Boarding Pass QR Stub */}
            <div className="md:col-span-4 bg-gradient-to-b from-amber-500 to-amber-600 text-white p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-3 border-t md:border-t-0 md:border-l border-dashed border-amber-300">
              <div className="w-28 h-28 bg-white p-2.5 rounded-2xl shadow-lg flex items-center justify-center text-slate-900">
                {/* Simulated QR Code Icon Graphic */}
                <QrCode className="w-full h-full text-slate-900" />
              </div>

              <div className="space-y-0.5">
                <div className="text-[10px] tracking-widest uppercase font-semibold text-amber-100">
                  Electronic Check-in Code
                </div>
                <div className="font-mono text-xs font-bold bg-amber-700/60 px-2 py-0.5 rounded-md">
                  {rsvp.qrCodeToken}
                </div>
              </div>

              <div className="text-xs text-amber-100">
                Paid: <strong>{formatVND(rsvp.totalPrice)}</strong>
              </div>
            </div>
          </div>
        ))}

        {rsvps.length === 0 && (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
            <Compass className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-slate-800">You have no active workshop passes yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Browse our living heritage map to book your first authentic local workshop in Saigon.
            </p>
            <Link
              href={APP_ROUTES.workshops}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
            >
              Discover Experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
