"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { APP_ROUTES } from "@/src/@core/const/routes";
import { WORKSHOP_CATEGORIES, DISTRICT_OPTIONS } from "@/src/@core/const/categories";
import { viebeeService } from "@/src/services/viebee-service";
import { formatVND, calculatePayoutBreakdown } from "@/src/@core/utils/currency";
import { showNotificationSuccess, showNotificationError } from "@/src/@core/utils/message";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";

export default function CreateWorkshopPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [titleVi, setTitleVi] = useState("");
  const [category, setCategory] = useState("culinary");
  const [district, setDistrict] = useState("d3");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [culturalStory, setCulturalStory] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [etiquetteText, setEtiquetteText] = useState("");

  // Step 2
  const [date, setDate] = useState("2026-10-28");
  const [startTime, setStartTime] = useState("09:30");
  const [endTime, setEndTime] = useState("11:00");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [maxGuests, setMaxGuests] = useState(6);

  // Step 3
  const [price, setPrice] = useState(450000);
  const [bankName, setBankName] = useState("Vietcombank");
  const [bankAccount, setBankAccount] = useState("0071000123456");
  const [accountHolder, setAccountHolder] = useState("NGUYEN THI MAI");

  const breakdown = calculatePayoutBreakdown(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !address) {
      showNotificationError("Vui lòng điền tiêu đề và địa chỉ tổ chức.");
      return;
    }

    setIsSubmitting(true);
    try {
      const matchedDistrict = DISTRICT_OPTIONS.find((d) => d.value === district);
      await viebeeService.workshop.createWorkshopAsync({
        title,
        titleVi: titleVi || title,
        category,
        district: matchedDistrict ? matchedDistrict.label : "District 3",
        address,
        latitude: matchedDistrict?.lat || 10.7769,
        longitude: matchedDistrict?.lng || 106.7009,
        price,
        durationMinutes,
        maxGuests,
        description,
        culturalStory,
        ingredientsOrTools: ingredientsText
          ? ingredientsText.split("\n").filter((i) => i.trim())
          : ["Tất cả nguyên liệu và dụng cụ do người tổ chức chuẩn bị sẵn."],
        etiquetteTips: etiquetteText
          ? etiquetteText.split("\n").filter((e) => e.trim())
          : ["Vui lòng tháo giày trước khi vào nhà."],
        slots: [
          {
            id: `slot-${Date.now()}-1`,
            date,
            startTime,
            endTime,
            capacity: maxGuests,
            bookedCount: 0,
          },
        ],
      });

      showNotificationSuccess("Đã tạo workshop thành công! Thông tin đã được lưu và gửi đến hội đồng QC.");
      router.push(APP_ROUTES.hostDashboard);
    } catch (err: any) {
      showNotificationError(err.message || "Tạo workshop thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-amber-900/10 pb-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sparkles className="w-4 h-4" />
          Zero-Tech Host Onboarding Tool
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          List Your Cultural Micro-Workshop
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Share your craft, recipes, and heritage with global guests in 3 simple steps without complex tech barriers.
        </p>
      </div>

      {/* 3-Step Wizard Indicator */}
      <div className="grid grid-cols-3 gap-2">
        <div
          onClick={() => setStep(1)}
          className={`cursor-pointer p-3 rounded-2xl border text-center transition-all ${
            step === 1
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : step > 1
              ? "bg-amber-50 text-amber-900 border-amber-200"
              : "bg-white text-slate-400 border-slate-200"
          }`}
        >
          <div className="text-xs font-bold">Step 1</div>
          <div className="text-sm font-semibold truncate">Story & Craft</div>
        </div>

        <div
          onClick={() => step > 1 && setStep(2)}
          className={`cursor-pointer p-3 rounded-2xl border text-center transition-all ${
            step === 2
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : step > 2
              ? "bg-amber-50 text-amber-900 border-amber-200"
              : "bg-white text-slate-400 border-slate-200"
          }`}
        >
          <div className="text-xs font-bold">Step 2</div>
          <div className="text-sm font-semibold truncate">Schedule & Slots</div>
        </div>

        <div
          onClick={() => step > 2 && setStep(3)}
          className={`cursor-pointer p-3 rounded-2xl border text-center transition-all ${
            step === 3
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white text-slate-400 border-slate-200"
          }`}
        >
          <div className="text-xs font-bold">Step 3</div>
          <div className="text-sm font-semibold truncate">Pricing & Payout</div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="card-heritage rounded-3xl p-6 sm:p-10 bg-white border border-amber-100 shadow-md space-y-6">
        
        {/* STEP 1: Story & Craft */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-slide">
            <div className="space-y-1 border-b pb-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                Step 1: Your Traditional Craft & Venue
              </h3>
              <p className="text-xs text-slate-500">
                Tell international travelers about what you will teach and the neighborhood space.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">English Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Bamboo Weaving in Riverside Alley"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tên Tiếng Việt:</label>
                <input
                  type="text"
                  placeholder="e.g. Nghệ Thuật Đan Lát Mây Tre Thanh Đa"
                  value={titleVi}
                  onChange={(e) => setTitleVi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Cultural Domain Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  {WORKSHOP_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.nameVi})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">District / Neighborhood:</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  {DISTRICT_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Specific Workshop Venue Address:</label>
              <input
                type="text"
                required
                placeholder="e.g. Hẻm 242/18 Nguyễn Thiện Thuật, Phường 3, Quận 3, TP. Hồ Chí Minh"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Experience Description:</label>
              <textarea
                rows={3}
                placeholder="Describe what guests will experience, touch, smell, or taste..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Artisan's Heritage Story (Câu chuyện gia đình):</label>
              <textarea
                rows={2}
                placeholder="How did you learn this craft? Who passed it down to you?"
                value={culturalStory}
                onChange={(e) => setCulturalStory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center gap-2"
              >
                Next: Schedule & Capacity <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Schedule & Capacity */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-slide">
            <div className="space-y-1 border-b pb-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Step 2: Availability & Guest Limits
              </h3>
              <p className="text-xs text-slate-500">
                Small group sizes (3-6 people) ensure high authenticity and intimate human connection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Initial Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Duration (Minutes):</label>
                <input
                  type="number"
                  min="30"
                  max="240"
                  step="15"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Max Guest Capacity (Sức chứa tối đa):</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Supplies & Ingredients (One per line):</label>
              <textarea
                rows={3}
                placeholder="e.g. Cùi bưởi Năm Roi tươi&#10;Đậu xanh bóc vỏ&#10;Nước hoa bưởi tinh khiết"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 1
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center gap-2"
              >
                Next: Pricing & Payout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pricing & Payout */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-slide">
            <div className="space-y-1 border-b pb-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-600" />
                Step 3: Pricing & Guaranteed Direct Payout
              </h3>
              <p className="text-xs text-slate-500">
                VieBee operates with a transparent 12% take rate, ensuring 88% of all tourism dollars go directly into your bank account.
              </p>
            </div>

            <div className="space-y-1.5 max-w-sm">
              <label className="text-xs font-bold text-slate-700">Workshop Ticket Price (VND per guest):</label>
              <input
                type="number"
                min="100000"
                step="50000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-lg font-bold text-amber-700"
              />
            </div>

            {/* Real-time Payout Calculator */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Transparent Revenue Split
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <div className="text-xs text-slate-500">Ticket Price</div>
                  <div className="font-bold text-slate-900 text-sm">{formatVND(breakdown.totalPrice)}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-300">
                  <div className="text-xs text-emerald-700 font-bold">You Keep (88%)</div>
                  <div className="font-bold text-emerald-800 text-base">{formatVND(breakdown.hostPayout)}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">VieBee Fee (12%)</div>
                  <div className="font-bold text-slate-600 text-sm">{formatVND(breakdown.platformFee)}</div>
                </div>
              </div>
              <p className="text-[11px] text-amber-900/80">
                * Covers automated AI translation server costs, on-site QC inspection, and global traveler marketing.
              </p>
            </div>

            {/* Payout Banking Details */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Vietnamese Bank Account for Direct Payout:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Bank (e.g. Vietcombank)"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs uppercase"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 2
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                {isSubmitting ? "Publishing Workshop..." : "Publish Workshop & Submit to QC"}
              </button>
            </div>
          </div>
        )}

      </form>

    </div>
  );
}
