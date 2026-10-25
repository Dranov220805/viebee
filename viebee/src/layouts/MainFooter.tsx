import React from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { Heart, Globe2, ShieldCheck, MapPin } from "lucide-react";

export const MainFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand & Mission Statement */}
          <div className="space-y-4 md:col-span-1">
            <Link href={APP_ROUTES.home} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 shrink-0 bg-amber-50 rounded-xl overflow-hidden">
                <Image
                  src="/images/main/viebee-official.png"
                  alt="VieBee Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                VieBee
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Khắc họa di sản, Nâng tầm cộng đồng. Peer-to-peer experiential travel connecting international travelers with Vietnamese artisans.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-950/60 p-2.5 rounded-lg border border-amber-800/40">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>UEH UII Sandbox 2026 • Ho Chi Minh City</span>
            </div>
          </div>

          {/* Core Pillars */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={APP_ROUTES.culturalMap} className="hover:text-amber-400 transition-colors">
                  GIS Cultural Map
                </Link>
              </li>
              <li>
                <Link href={APP_ROUTES.workshops} className="hover:text-amber-400 transition-colors">
                  Culinary & Desserts
                </Link>
              </li>
              <li>
                <Link href={APP_ROUTES.workshops} className="hover:text-amber-400 transition-colors">
                  Bamboo & Weaving
                </Link>
              </li>
              <li>
                <Link href={APP_ROUTES.workshops} className="hover:text-amber-400 transition-colors">
                  Saigon Pottery
                </Link>
              </li>
              <li>
                <Link href={APP_ROUTES.copilot} className="hover:text-amber-400 transition-colors">
                  AI Cultural Copilot
                </Link>
              </li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              For Hosts
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={APP_ROUTES.createWorkshop} className="hover:text-amber-400 transition-colors">
                  List a Workshop
                </Link>
              </li>
              <li>
                <Link href={APP_ROUTES.hostDashboard} className="hover:text-amber-400 transition-colors">
                  Host Dashboard
                </Link>
              </li>
              <li>
                <Link href={APP_ROUTES.adminVerification} className="hover:text-amber-400 transition-colors">
                  QC Standards
                </Link>
              </li>
              <li>
                <span className="text-slate-400">88% Direct Payout</span>
              </li>
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Impact
            </h4>
            <p className="text-sm text-slate-400 mb-3">
              Phase 1: HCMC (Districts 1, 3, 5).<br />
              Phase 2: Hội An, Huế & Hà Nội.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Community-verified spaces</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-sky-400" />
                <span>Zero-interpreter AI translation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 VieBee • Ton Duc Thang University • UII Sandbox 2026</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> for Vietnamese intangible cultural heritage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
