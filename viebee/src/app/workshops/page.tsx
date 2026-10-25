"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { WORKSHOP_CATEGORIES, DISTRICT_OPTIONS } from "@/src/@core/const/categories";
import { viebeeService } from "@/src/services/viebee-service";
import { WorkshopItem } from "@/src/@core/utils/seed-data";
import { formatVND } from "@/src/@core/utils/currency";
import { Search, MapPin, Star, Clock, Users, Sparkles, ShieldCheck, SearchX } from "lucide-react";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  useEffect(() => {
    viebeeService.workshop.getWorkshopsAsync().then(setWorkshops);
  }, []);

  const filtered = workshops.filter((w) => {
    const matchCat = selectedCategory === "all" || w.category === selectedCategory;
    const matchDist = selectedDistrict === "all" || w.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchSearch =
      !search.trim() ||
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.titleVi.toLowerCase().includes(search.toLowerCase()) ||
      w.hostName.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDist && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Tagline */}
      <div className="space-y-2 border-b border-amber-900/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sparkles className="w-4 h-4" />
          Living Heritage Micro-Experiences
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Community-Verified Workshops
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl">
          Learn ancestral crafts, family cooking secrets, and traditional techniques directly from neighborhood masters in intimate small groups.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by craft, host, or alley (e.g. Chè, Bamboo, Bàn Cờ)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-white"
          >
            <option value="all">All Domains (Tất cả)</option>
            {WORKSHOP_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-white"
          >
            <option value="all">All Districts (Quận)</option>
            {DISTRICT_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          <Link
            href={APP_ROUTES.culturalMap}
            className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            Switch to GIS Map
          </Link>
        </div>

      </div>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((ws) => (
          <div
            key={ws.id}
            className="card-heritage rounded-3xl overflow-hidden bg-white flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ws.images[0]}
                  alt={ws.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 ${ws.qcVerified ? "bg-emerald-600" : "bg-slate-500"}`}>
                  {ws.qcVerified ? <><ShieldCheck className="w-3 h-3" /> Verified</> : "Under QC"}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  {formatVND(ws.price)} / guest
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-amber-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5" /> {ws.district}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {ws.rating} ({ws.reviewCount})
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                  {ws.title}
                </h3>
                <div className="text-xs text-amber-800 font-medium italic">
                  {ws.titleVi}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {ws.description}
                </p>

                {/* Host Info */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={ws.hostAvatar}
                    alt={ws.hostName}
                    className="w-9 h-9 rounded-full object-cover border border-amber-300"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-slate-800">{ws.hostName}</div>
                    <div className="text-slate-500 text-[11px] line-clamp-1">{ws.hostBio}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {ws.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" /> Max {ws.maxGuests} guests
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={APP_ROUTES.workshopDetail(ws.id)}
                className="w-full block text-center py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Inspect Details & RSVP
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <SearchX className="w-10 h-10 text-slate-300 mx-auto" />
          <div className="font-bold text-slate-700 text-base">No workshops found</div>
          <p className="text-xs text-slate-500">Try adjusting your keyword, district, or category filter.</p>
        </div>
      )}

    </div>
  );
}
