"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { APP_ROUTES, MAIN_NAV_ITEMS } from "@/src/@core/const/routes";
import { useAppDispatch, useAppSelector } from "@/src/stores/hook";
import { switchRole } from "@/src/stores/slices/authSlice";
import { showMessageSuccess } from "@/src/@core/utils/message";
import {
  MapPin,
  Compass,
  Bot,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Backpack,
  User,
  LayoutDashboard,
} from "lucide-react";

export const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleChange = (newRole: "TRAVELER" | "HOST" | "ADMIN") => {
    dispatch(switchRole(newRole));
    const roleNames = {
      TRAVELER: "Maya (Traveler)",
      HOST: "Bà Ba (Local Host)",
      ADMIN: "VieBee QC & Admin Team",
    };
    showMessageSuccess(`Switched role: ${roleNames[newRole]}`);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-8">
            <Link href={APP_ROUTES.home} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/main/viebee-official.png"
                  alt="VieBee Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                  VieBee
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-700">
                  Living Heritage
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      active
                        ? "text-amber-800 bg-amber-50/80 font-semibold"
                        : "text-slate-600 hover:text-amber-700 hover:bg-amber-50/40"
                    }`}
                  >
                    {item.path === APP_ROUTES.culturalMap && <MapPin className="w-4 h-4 text-amber-600" />}
                    {item.path === APP_ROUTES.workshops && <Compass className="w-4 h-4 text-amber-600" />}
                    {item.path === APP_ROUTES.copilot && <Bot className="w-4 h-4 text-amber-600" />}
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Role Switcher & Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quick Prototype Role Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="px-2 text-slate-500 font-medium">Demo:</span>
              <button
                onClick={() => handleRoleChange("TRAVELER")}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
                  role === "TRAVELER"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Backpack className="w-3.5 h-3.5" />
                Traveler
              </button>
              <button
                onClick={() => handleRoleChange("HOST")}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
                  role === "HOST"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Host
              </button>
              <button
                onClick={() => handleRoleChange("ADMIN")}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
                  role === "ADMIN"
                    ? "bg-indigo-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </button>
            </div>

            {/* Contextual Action Button based on Role */}
            {role === "HOST" ? (
              <div className="flex items-center gap-2">
                <Link
                  href={APP_ROUTES.hostDashboard}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-amber-900 bg-amber-100/70 hover:bg-amber-200 transition-all flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Host Portal
                </Link>
                <Link
                  href={APP_ROUTES.createWorkshop}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  List Workshop
                </Link>
              </div>
            ) : role === "ADMIN" ? (
              <Link
                href={APP_ROUTES.adminVerification}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 shadow-sm transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                QC & Verification
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href={APP_ROUTES.travelerBookings}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
                >
                  My Passes
                </Link>
                <Link
                  href={APP_ROUTES.workshops}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all"
                >
                  Explore Workshops
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-amber-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Switch Test Role:</div>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { handleRoleChange("TRAVELER"); setMobileMenuOpen(false); }}
                className={`py-1.5 text-xs rounded-md flex items-center justify-center gap-1 ${role === "TRAVELER" ? "bg-amber-500 text-white" : "bg-slate-100"}`}
              >
                <Backpack className="w-3.5 h-3.5" /> Traveler
              </button>
              <button
                onClick={() => { handleRoleChange("HOST"); setMobileMenuOpen(false); }}
                className={`py-1.5 text-xs rounded-md flex items-center justify-center gap-1 ${role === "HOST" ? "bg-amber-600 text-white" : "bg-slate-100"}`}
              >
                <User className="w-3.5 h-3.5" /> Host
              </button>
              <button
                onClick={() => { handleRoleChange("ADMIN"); setMobileMenuOpen(false); }}
                className={`py-1.5 text-xs rounded-md flex items-center justify-center gap-1 ${role === "ADMIN" ? "bg-indigo-700 text-white" : "bg-slate-100"}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
