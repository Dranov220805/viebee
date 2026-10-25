"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { WORKSHOP_CATEGORIES, DISTRICT_OPTIONS } from "@/src/@core/const/categories";
import { viebeeService } from "@/src/services/viebee-service";
import { WorkshopItem } from "@/src/@core/utils/seed-data";
import { formatVND } from "@/src/@core/utils/currency";
import {
  MapPin,
  Star,
  Clock,
  Users,
  Compass,
  Sparkles,
  Bot,
} from "lucide-react";

export default function CulturalMapPage() {
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [radiusKm, setRadiusKm] = useState(5);

  useEffect(() => {
    viebeeService.workshop.getWorkshopsAsync().then((data) => {
      setWorkshops(data);
      if (data.length > 0) {
        setSelectedWorkshop(data[0]);
      }
    });
  }, []);

  const filtered = workshops.filter((w) => {
    const matchCat = selectedCategory === "all" || w.category === selectedCategory;
    const matchDist =
      selectedDistrict === "all" ||
      w.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    return matchCat && matchDist;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Compass className="w-4 h-4" />
            GIS Cultural Mapping • Bản Đồ Văn Hóa Số
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Saigon Living Heritage Map
          </h1>
          <p className="text-sm text-slate-600">
            Locate hyper-local workshops, artisan alleyways, and living traditions near you.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="all">All Domains (Tất cả ngành nghề)</option>
            {WORKSHOP_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="all">All Neighborhoods (Toàn thành phố)</option>
            {DISTRICT_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          {/* Walking Radius slider */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-xs">
            <span className="text-slate-500">Radius:</span>
            <span className="font-bold text-amber-700">{radiusKm} km</span>
            <input
              type="range"
              min="1"
              max="10"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-16 accent-amber-600"
            />
          </div>
        </div>
      </div>

      {/* Main Map & Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* OpenStreetMap */}
        <div className="lg:col-span-8 min-h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm lg:min-h-[600px]">
          <iframe
            title="OpenStreetMap centered on District 3, Ho Chi Minh City"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.665%2C10.755%2C106.735%2C10.80&layer=mapnik&marker=10.7769%2C106.7009"
            className="h-full min-h-[420px] w-full border-0 lg:min-h-[600px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right Column: Detailed Selected Workshop Card Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {selectedWorkshop ? (
            <div className="card-heritage rounded-3xl p-6 bg-white space-y-5 border border-amber-100 shadow-md">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img
                  src={selectedWorkshop.images[0]}
                  alt={selectedWorkshop.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {selectedWorkshop.qcVerified ? "✓ Community Verified" : "Pending Verification"}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  {formatVND(selectedWorkshop.price)} / guest
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedWorkshop.district}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {selectedWorkshop.rating} ({selectedWorkshop.reviewCount})
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                  {selectedWorkshop.title}
                </h3>
                <div className="text-xs text-amber-800 font-medium italic">
                  {selectedWorkshop.titleVi}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 pt-1 leading-relaxed">
                  {selectedWorkshop.culturalStory}
                </p>
              </div>

              {/* Host Profile Capsule */}
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center gap-3">
                <img
                  src={selectedWorkshop.hostAvatar}
                  alt={selectedWorkshop.hostName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-300"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">{selectedWorkshop.hostName}</div>
                  <div className="text-slate-500 line-clamp-1">{selectedWorkshop.hostBio}</div>
                </div>
              </div>

              {/* Quick Details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{selectedWorkshop.durationMinutes} Minutes</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Max {selectedWorkshop.maxGuests} Guests</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Link
                  href={APP_ROUTES.workshopDetail(selectedWorkshop.id)}
                  className="w-full block text-center py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  Book Instant RSVP ({formatVND(selectedWorkshop.price)})
                </Link>

                <Link
                  href={APP_ROUTES.copilot}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors"
                >
                  <Bot className="w-4 h-4 text-amber-600" />
                  Ask AI Cultural Copilot about this venue
                </Link>
              </div>
            </div>
          ) : (
            <div className="card-heritage rounded-3xl p-8 bg-white text-center text-slate-500">
              Select a workshop pin on the map to inspect details.
            </div>
          )}

          {/* Quick Alleyway Navigation Tip */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Alleyway Walking Tip:</strong> Saigon alleys (Hẻm) have deep cultural charm. Look for the VieBee heritage QR stand or call host directly through the app upon arrival.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
