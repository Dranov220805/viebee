"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { WORKSHOP_CATEGORIES } from "@/src/@core/const/categories";
import { viebeeService } from "@/src/services/viebee-service";
import { WorkshopItem } from "@/src/@core/utils/seed-data";
import { formatVND } from "@/src/@core/utils/currency";
import {
  MapPin,
  Bot,
  ShieldCheck,
  Star,
  Clock,
  Users,
  ArrowRight,
  BadgePercent,
  Compass,
  Utensils,
  Layers,
  Leaf,
  Paintbrush,
  Wind,
  Circle,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  culinary: <Utensils className="w-5 h-5" />,
  "bamboo-weaving": <Wind className="w-5 h-5" />,
  ceramics: <Circle className="w-5 h-5" />,
  textiles: <Layers className="w-5 h-5" />,
  "folk-art": <Paintbrush className="w-5 h-5" />,
  herbal: <Leaf className="w-5 h-5" />,
};

export default function HomePage() {
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    viebeeService.workshop.getWorkshopsAsync().then((data) => {
      setWorkshops(data);
    });
  }, []);

  const filteredWorkshops =
    selectedCategory === "all"
      ? workshops
      : workshops.filter((w) => w.category === selectedCategory);

  return (
    <div className="space-y-16 pb-16">

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#fff9e9] border-b border-black/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid min-h-[620px] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">

            {/* Left: Heading & Value Prop */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Saigon, one neighborhood at a time
              </div>

              <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] text-black sm:text-5xl lg:text-6xl">
                Vietnam, lived <span className="text-amber-600">locally.</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-slate-700">
                Cook, make, and wander with the people who call these neighborhoods home.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={APP_ROUTES.culturalMap}
                  className="px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-black hover:bg-amber-800 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Find an experience
                </Link>

                <Link
                  href={APP_ROUTES.copilot}
                  className="px-5 py-3.5 rounded-lg text-sm font-semibold text-black bg-[#ffdf55] hover:bg-[#f4ce32] transition-colors flex items-center gap-2"
                >
                  <Bot className="w-5 h-5 text-amber-700" />
                  Ask the copilot
                </Link>

              </div>

              {/* Trust Signals */}
              <div className="pt-5 border-t border-black/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Community verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgePercent className="w-4 h-4 text-amber-600" />
                  <span>88% goes to hosts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Small-group workshops</span>
                </div>
              </div>
            </div>

            {/* Right: Workshop Preview Card */}
            <div className="lg:col-span-7 relative">
              <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-black">
                <div className="relative h-[360px] overflow-hidden sm:h-[460px]">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
                    alt="Cooking traditional Che with Ba Ba"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-[#ffdf55] px-3 py-1 text-xs font-semibold text-black">
                    Hosted in District 3
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-5 pb-5 pt-20 text-white sm:px-6 sm:pb-6">
                    <div className="max-w-[calc(100%-9rem)] sm:max-w-[calc(100%-11rem)]">
                      <div className="text-xs font-medium text-white/80">Cook with Bà Ba</div>
                      <h2 className="mt-1 text-xl font-semibold leading-snug text-white sm:text-2xl">
                        A family recipe, made together.
                      </h2>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-5">
                      <span className="text-sm font-semibold text-white">{formatVND(450000)} / person</span>
                      <Link
                        href={APP_ROUTES.workshopDetail("ws-che-buoi")}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#ffdf55] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-white"
                      >
                        Meet your host <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Categories Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Find your kind of day
            </h2>
            <p className="text-sm text-slate-500">Food, craft, and neighborhood stories.</p>
          </div>
          <Link
            href={APP_ROUTES.workshops}
            className="text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            View all ({workshops.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`p-4 rounded-xl border text-center transition-all ${
              selectedCategory === "all"
                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-amber-400"
            }`}
          >
            <Compass className="w-5 h-5 mx-auto mb-2" />
            <div className="text-xs font-bold">All</div>
            <div className="text-[10px] opacity-75">Tất cả</div>
          </button>

          {WORKSHOP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedCategory === cat.id
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:border-amber-400"
              }`}
            >
              <div className="flex justify-center mb-2">
                {CATEGORY_ICONS[cat.id] || <Compass className="w-5 h-5" />}
              </div>
              <div className="text-xs font-bold truncate">{cat.name}</div>
              <div className="text-[10px] opacity-75 truncate">{cat.nameVi}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Filtered Workshops Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredWorkshops.map((ws) => (
            <div
              key={ws.id}
              className="card-heritage rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ws.images[0]}
                    alt={ws.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-2.5 left-2.5 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${ws.qcVerified ? "bg-emerald-600/90" : "bg-slate-500/90"}`}>
                    {ws.qcVerified ? (
                      <><ShieldCheck className="w-3 h-3" /> Verified</>
                    ) : (
                      "Pending QC"
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                    {formatVND(ws.price)}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {ws.district.split(" ")[0]}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-amber-500" /> {ws.rating} ({ws.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-sm line-clamp-2">
                    {ws.title}
                  </h3>
                  <div className="text-[11px] text-amber-800 font-medium line-clamp-1 italic">
                    {ws.titleVi}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {ws.durationMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Max {ws.maxGuests}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href={APP_ROUTES.workshopDetail(ws.id)}
                  className="w-full block text-center py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GIS Cultural Map Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-black text-white p-8 sm:p-12 relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-semibold text-xs tracking-wider uppercase border border-amber-500/30">
                Interactive Geospatial Map
              </span>
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-white">
                Take the long way through Saigon.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Find workshops tucked into the neighborhoods around you.
              </p>
              <div className="pt-2">
                <Link
                  href={APP_ROUTES.culturalMap}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  Explore the map
                </Link>
              </div>
            </div>

            <div className="bg-[#fff9e9] p-5 rounded-xl text-black space-y-3">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                Around the city
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white text-xs">
                  <span className="font-semibold">District 3 · Bàn Cờ</span>
                  <span className="text-amber-800 font-semibold">2 workshops</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white text-xs">
                  <span className="font-semibold">District 5 · Chợ Lớn</span>
                  <span className="text-amber-800 font-semibold">2 workshops</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white text-xs">
                  <span className="font-semibold">Bình Thạnh · Thanh Đa</span>
                  <span className="text-amber-800 font-semibold">1 workshop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
