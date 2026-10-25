"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { viebeeService } from "@/src/services/viebee-service";
import { WorkshopItem, WorkshopSlot } from "@/src/@core/utils/seed-data";
import { formatVND, calculatePayoutBreakdown } from "@/src/@core/utils/currency";
import { showNotificationSuccess, showNotificationError } from "@/src/@core/utils/message";
import {
  MapPin,
  Star,
  Clock,
  Users,
  ShieldCheck,
  Bot,
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function WorkshopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workshopId = (params?.id as string) || "ws-che-buoi";

  const [workshop, setWorkshop] = useState<WorkshopItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<WorkshopSlot | null>(null);
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "ingredients" | "etiquette" | "rag">("story");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    viebeeService.workshop.getWorkshopByIdAsync(workshopId).then((data) => {
      if (data) {
        setWorkshop(data);
        if (data.slots?.length > 0) {
          setSelectedSlot(data.slots[0]);
        }
      }
    });
  }, [workshopId]);

  if (!workshop) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-4">
        <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Workshop not found</h2>
        <Link href={APP_ROUTES.workshops} className="text-amber-700 font-semibold underline">
          Return to Workshops
        </Link>
      </div>
    );
  }

  const breakdown = calculatePayoutBreakdown(workshop.price * guestsCount);

  const handleCompleteRsvp = async () => {
    if (!selectedSlot) {
      showNotificationError("Vui lòng chọn thời gian trải nghiệm.");
      return;
    }
    setIsSubmitting(true);
    try {
      await viebeeService.rsvp.createRsvpAsync({
        workshopId: workshop.id,
        slotId: selectedSlot.id,
        guestsCount,
      });
      showNotificationSuccess("Đặt chỗ RSVP thành công! Vé điện tử và mã QR đã sẵn sàng.");
      setBookingModalOpen(false);
      router.push(APP_ROUTES.travelerBookings);
    } catch (err: any) {
      showNotificationError(err.message || "Đặt chỗ thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2">
          <Link href={APP_ROUTES.home} className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <Link href={APP_ROUTES.workshops} className="hover:text-amber-700">Workshops</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{workshop.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 hover:text-amber-700">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-1 hover:text-rose-600">
            <Heart className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            {workshop.category}
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Community QC Verified
          </span>
          <span className="text-xs text-amber-700 font-medium">
            Take Rate: 12% (88% goes directly to host)
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
          {workshop.title}
        </h1>
        <h2 className="text-lg text-amber-800 font-serif italic">
          {workshop.titleVi}
        </h2>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-1">
          <span className="flex items-center gap-1.5 font-bold text-amber-600">
            <Star className="w-4 h-4 fill-amber-500" /> {workshop.rating} ({workshop.reviewCount} community reviews)
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-700" /> {workshop.address}
          </span>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden max-h-[460px]">
        <div className="md:col-span-2 h-[460px]">
          <img
            src={workshop.images[0]}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-[460px]">
          <div className="h-1/2 overflow-hidden rounded-xl">
            <img
              src={workshop.images[1] || workshop.images[0]}
              alt={workshop.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/2 overflow-hidden rounded-xl">
            <img
              src={workshop.images[2] || workshop.images[0]}
              alt={workshop.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Story, Ingredients, Etiquette, Grounded RAG info */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Host Profile Spotlight */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={workshop.hostAvatar}
                alt={workshop.hostName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-300 shadow-sm"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-slate-900">{workshop.hostName}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Host Ambassador
                  </span>
                </div>
                <p className="text-xs text-slate-600 max-w-md">{workshop.hostBio}</p>
              </div>
            </div>

            <Link
              href={APP_ROUTES.copilot}
              className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-2 shadow-xs"
            >
              <Bot className="w-4 h-4 text-amber-600" />
              Chat via AI Copilot
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-3 border-b border-slate-200 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("story")}
              className={`pb-3 px-2 transition-all border-b-2 ${
                activeTab === "story"
                  ? "border-amber-600 text-amber-800"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Cultural Story & Craft
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`pb-3 px-2 transition-all border-b-2 ${
                activeTab === "ingredients"
                  ? "border-amber-600 text-amber-800"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Ingredients & Tools
            </button>
            <button
              onClick={() => setActiveTab("etiquette")}
              className={`pb-3 px-2 transition-all border-b-2 ${
                activeTab === "etiquette"
                  ? "border-amber-600 text-amber-800"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              House Rules & Etiquette
            </button>
            <button
              onClick={() => setActiveTab("rag")}
              className={`pb-3 px-2 transition-all border-b-2 flex items-center gap-1 ${
                activeTab === "rag"
                  ? "border-amber-600 text-amber-800"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              AI Verified Knowledge Base
            </button>
          </div>

          {/* Tab 1: Story & Craft */}
          {activeTab === "story" && (
            <div className="space-y-6 leading-relaxed text-slate-700 text-sm sm:text-base">
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-slate-900">About this Experience</h3>
                <p>{workshop.description}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm space-y-3">
                <h4 className="font-serif text-lg font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" /> Living Heritage Background
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{workshop.culturalStory}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-bold text-slate-800">Duration</div>
                    <div>{workshop.durationMinutes} Minutes Hands-on</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Users className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-bold text-slate-800">Group Intimacy</div>
                    <div>Capped at {workshop.maxGuests} guests</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients & Tools */}
          {activeTab === "ingredients" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">All Supplies Provided by Host</h3>
              <p className="text-sm text-slate-600">You do not need to bring any specialized tools or ingredients.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {workshop.ingredientsOrTools.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: House Rules & Etiquette */}
          {activeTab === "etiquette" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">Customs for Entering a Local Home</h3>
              <p className="text-sm text-slate-600">
                VieBee workshops take place in authentic neighborhood residential homes. Respecting local customs ensures a warm, dignified exchange.
              </p>
              <div className="space-y-3 pt-2">
                {workshop.etiquetteTips.map((tip, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3 text-sm text-amber-950">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: AI Verified Knowledge Base (RAG) */}
          {activeTab === "rag" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 text-xs text-indigo-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <Bot className="w-4 h-4 text-indigo-700" />
                  LangChain RAG Grounding Sheet
                </div>
                <p>
                  This structured sheet is ingested by the VieBee AI Cultural Copilot. During your workshop, any question asked by either guest or host is verified against this knowledge base before answering.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Key Techniques Taught:</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                  {workshop.ragKnowledgeDoc.techniques.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Bilingual Craft Glossary (Host ↔ Traveler):</h4>
                <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                      <tr>
                        <th className="p-3">English</th>
                        <th className="p-3">Tiếng Việt</th>
                        <th className="p-3">Cultural Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {workshop.ragKnowledgeDoc.bilingualDictionary.map((dict, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{dict.en}</td>
                          <td className="p-3 text-amber-800 font-medium">{dict.vi}</td>
                          <td className="p-3 text-slate-500">{dict.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Booking Card & Slot Selector */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 card-heritage rounded-3xl p-6 bg-white border border-amber-200 shadow-xl space-y-6">
            
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-2xl font-bold text-slate-900 font-serif">
                  {formatVND(workshop.price)}
                </span>
                <span className="text-xs text-slate-500"> / guest</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
                Instant Confirmation
              </div>
            </div>

            {/* Step 1: Select Available Schedule Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                Select Date & Time Slot:
              </label>

              <div className="space-y-2">
                {workshop.slots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const seatsLeft = slot.capacity - slot.bookedCount;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20"
                          : "border-slate-200 hover:border-amber-300 text-slate-700"
                      }`}
                    >
                      <div>
                        <div className="font-bold">{slot.date}</div>
                        <div className="text-slate-500">{slot.startTime} - {slot.endTime}</div>
                      </div>
                      <div className="text-[11px] font-semibold text-amber-700">
                        {seatsLeft > 0 ? `${seatsLeft} spots left` : "Full"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Guest Count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Number of Guests:</span>
                <span className="text-slate-500 font-normal">Max {workshop.maxGuests}</span>
              </label>
              <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                >
                  -
                </button>
                <span className="font-bold text-sm text-slate-900">{guestsCount} Guest(s)</span>
                <button
                  type="button"
                  onClick={() => setGuestsCount(Math.min(workshop.maxGuests, guestsCount + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Step 3: Transparent Fee Breakdown (Hypothesis 3: 12% Take Rate) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Workshop Subtotal ({guestsCount} × {formatVND(workshop.price)}):</span>
                <span className="font-semibold">{formatVND(breakdown.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-amber-800 text-[11px]">
                <span>Host Direct Payout (88%):</span>
                <span>{formatVND(breakdown.hostPayout)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>VieBee Community Platform Fee (12%):</span>
                <span>{formatVND(breakdown.platformFee)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Due:</span>
                <span className="text-amber-700">{formatVND(breakdown.totalPrice)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Reserve Spot via Instant RSVP
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Zero prepayment penalty • Free reschedule up to 24 hours before
            </p>

          </div>
        </div>

      </div>

      {/* Confirmation & Checkout Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-amber-100 animate-fade-slide">
            
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Confirm RSVP Booking
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {workshop.title}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-2 text-xs text-amber-950">
              <div className="flex justify-between">
                <span className="text-slate-500">Host:</span>
                <span className="font-bold">{workshop.hostName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-bold">{selectedSlot?.date} ({selectedSlot?.startTime} - {selectedSlot?.endTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guests:</span>
                <span className="font-bold">{guestsCount} person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-bold">{workshop.address}</span>
              </div>
              <div className="border-t border-amber-200 pt-2 flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-800">{formatVND(breakdown.totalPrice)}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              By confirming, an electronic pass with a QR code will be generated in your wallet, and Bà Ba will be notified directly.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCompleteRsvp}
                className="w-1/2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {isSubmitting ? "Generating Ticket..." : "Confirm & Get Ticket"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
