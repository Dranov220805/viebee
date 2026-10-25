"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { INITIAL_DEMO_USERS } from "@/src/@core/utils/seed-data";
import { useAppDispatch, useAppSelector } from "@/src/stores/hook";
import { setUser } from "@/src/stores/slices/authSlice";
import { showNotificationSuccess } from "@/src/@core/utils/message";
import Image from "next/image";
import { ShieldCheck, UserCheck, Sparkles, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSelectDemoUser = (u: (typeof INITIAL_DEMO_USERS)[0]) => {
    dispatch(setUser(u));
    showNotificationSuccess(`Đã đăng nhập thành công dưới vai trò: ${u.name} (${u.role})`);
    if (u.role === "HOST") {
      router.push(APP_ROUTES.hostDashboard);
    } else if (u.role === "ADMIN") {
      router.push(APP_ROUTES.adminVerification);
    } else {
      router.push(APP_ROUTES.workshops);
    }
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to traveler for quick custom login
    const customUser = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0] || "Cultural Traveler",
      email: email || "traveler@viebee.vn",
      role: "TRAVELER" as const,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Independent cultural traveler exploring Vietnam.",
    };
    dispatch(setUser(customUser));
    showNotificationSuccess(`Đăng nhập thành công! Chào mừng ${customUser.name}`);
    router.push(APP_ROUTES.workshops);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="relative w-12 h-12 rounded-2xl overflow-hidden mx-auto shadow-md">
          <Image src="/images/main/viebee-official.png" alt="VieBee" fill className="object-contain" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          Sign In to VieBee
        </h1>
        <p className="text-sm text-slate-600">
          Choose a pre-configured demo account to test the complete end-to-end prototype.
        </p>
      </div>

      {/* 1-Click Sandbox Prototype Switcher */}
      <div className="card-heritage rounded-3xl p-6 bg-white border border-amber-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 border-b pb-3">
          <Sparkles className="w-4 h-4 text-amber-600" />
          1-Click Prototype Persona Selector:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INITIAL_DEMO_USERS.map((demo) => {
            const isSelected = user?.id === demo.id;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleSelectDemoUser(demo)}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  isSelected
                    ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20"
                    : "border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                }`}
              >
                <img
                  src={demo.avatar}
                  alt={demo.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0 border"
                />
                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-slate-900 truncate">{demo.name}</div>
                  <div className="text-[11px] font-semibold text-amber-700">{demo.role}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Standard Form */}
      <form onSubmit={handleCustomLogin} className="card-heritage rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Or Enter Credentials:
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Email Address:</label>
          <input
            type="email"
            placeholder="e.g. maya.traveler@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Password:</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-sm"
        >
          Sign In
        </button>
      </form>

      <div className="text-center text-xs text-slate-500">
        <Link href={APP_ROUTES.home} className="text-amber-700 font-semibold hover:underline">
          ← Return to Living Heritage Home
        </Link>
      </div>

    </div>
  );
}
