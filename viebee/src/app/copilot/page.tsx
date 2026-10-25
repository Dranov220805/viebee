"use client";

import React, { useState, useEffect, useRef } from "react";
import { viebeeService } from "@/src/services/viebee-service";
import { WorkshopItem, CopilotChatMessage } from "@/src/@core/utils/seed-data";
import { useAppSelector } from "@/src/stores/hook";
import {
  Bot,
  Send,
  Sparkles,
  Languages,
  BookOpen,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function CopilotPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>("ws-che-buoi");
  const [messages, setMessages] = useState<CopilotChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viebeeService.workshop.getWorkshopsAsync().then((data) => {
      setWorkshops(data);
    });
  }, []);

  useEffect(() => {
    if (selectedWorkshopId) {
      setChatLoaded(false);
      setHasStartedChat(false);
      viebeeService.copilot.getChatMessagesAsync(selectedWorkshopId).then((chats) => {
        setMessages(chats);
        setChatLoaded(true);
      });
    }
  }, [selectedWorkshopId]);

  useEffect(() => {
    if (!chatLoaded || !hasStartedChat) return;
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [chatLoaded, hasStartedChat, messages, isTyping]);

  const selectedWorkshop = workshops.find((w) => w.id === selectedWorkshopId) || workshops[0];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    setHasStartedChat(true);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await viebeeService.copilot.sendCopilotMessageAsync({
        workshopId: selectedWorkshopId,
        text: textToSend,
      });

      setMessages((prev) => [...prev, res.userMessage]);

      setTimeout(() => {
        if (res.aiReply) {
          setMessages((prev) => [...prev, res.aiReply!]);
        }
        setIsTyping(false);
      }, 700);
    } catch (err) {
      setIsTyping(false);
    }
  };

  const samplePrompts = [
    "Are peanuts or cashews used in this dessert? I have a mild nut allergy.",
    "What shoes or greeting etiquette should I follow when entering Bà Ba's home?",
    "Where is the entrance to the alley in District 3?",
    "Can I take home a jar of the pomelo blossom water we make?",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Bot className="w-4 h-4 text-amber-600" />
            AI Cultural Copilot • LangChain + RAG Architecture
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Real-Time Bilateral Cultural Assistant
          </h1>
          <p className="text-sm text-slate-600">
            Eliminates the language barrier between international guests and non-English speaking elder artisans, grounded in verified workshop sheets.
          </p>
        </div>

        {/* Workshop Context Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Active Workshop Context:</label>
          <select
            value={selectedWorkshopId}
            onChange={(e) => setSelectedWorkshopId(e.target.value)}
            className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            {workshops.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title.slice(0, 36)}... ({w.hostName.split("(")[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Chat Console + Grounded RAG Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        
        {/* Left Column: Chat Console */}
        <div className="lg:col-span-8 card-heritage rounded-3xl bg-white border border-amber-100 shadow-md flex flex-col justify-between overflow-hidden">
          
          {/* Chat Window Header */}
          <div className="p-4 border-b border-slate-100 bg-amber-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>VieBee Copilot Channel</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Bilateral Auto-Translate Active
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Communicating with: <strong>{selectedWorkshop?.hostName}</strong>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Role: <strong>{user.name}</strong>
            </div>
          </div>

          {/* Messages Stream */}
          <div ref={messagesContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[460px] bg-slate-50/30">
            {messages.map((msg) => {
              const isAi = msg.senderRole === "AI_COPILOT";
              const isMe = msg.senderId === user.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isAi
                      ? "items-center"
                      : isMe
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  {isAi ? (
                    /* AI Copilot Context Briefing Box */
                    <div className="max-w-xl w-full p-4 rounded-2xl bg-amber-50 border border-amber-200/80 shadow-xs text-xs text-amber-950 space-y-1 my-2">
                      <div className="flex items-center justify-between font-bold text-amber-800">
                        <span className="flex items-center gap-1.5">
                          <Bot className="w-4 h-4 text-amber-600" />
                          VieBee Grounded RAG Assistant
                        </span>
                        <span className="text-[10px] text-amber-600 font-normal">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed font-medium">{msg.originalText}</p>
                      {msg.culturalNote && (
                        <div className="flex items-start gap-1.5 border-t border-amber-200/50 pt-1 text-[11px] italic text-amber-700/80">
                          <Info className="mt-0.5 h-3 w-3 shrink-0" />
                          <span>{msg.culturalNote}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* User or Host Message with Bilateral Translation */
                    <div
                      className={`max-w-md p-4 rounded-2xl space-y-1 shadow-xs text-xs ${
                        isMe
                          ? "bg-amber-600 text-white rounded-br-none"
                          : "bg-white text-slate-900 border border-slate-200 rounded-bl-none"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] opacity-80 mb-1">
                        <span className="font-bold">{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="font-medium text-sm leading-relaxed">{msg.originalText}</p>

                      {/* Bilateral Translation Bubble */}
                      <div
                        className={`p-2.5 rounded-xl text-[11px] mt-2 border ${
                          isMe
                            ? "bg-amber-700/60 border-amber-500/40 text-amber-100"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider mb-0.5">
                          <Languages className="w-3 h-3" /> Auto-Translated:
                        </div>
                        <div>{msg.translatedText}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                <Bot className="w-4 h-4 text-amber-600 animate-spin" />
                <span>AI Cultural Copilot verifying against host sheet and translating...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="p-3 border-t border-slate-100 bg-white flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Prompts:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                {p.slice(0, 36)}...
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask a question in English or Tiếng Việt..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>

        </div>

        {/* Right Column: RAG Grounding Document Inspector */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="card-heritage rounded-3xl p-6 bg-white border border-amber-100 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-base border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Verified Knowledge Base (RAG Source)
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Grounding Document:
              </span>
              <div className="font-bold text-slate-800 text-sm">{selectedWorkshop?.title}</div>
              <div className="text-slate-500">Host: {selectedWorkshop?.hostName}</div>
            </div>

            {/* Ingested Ingredients */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">Verified Ingredients / Supplies:</span>
              <div className="space-y-1">
                {selectedWorkshop?.ingredientsOrTools.map((ing, idx) => (
                  <div key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingested Etiquette */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">Verified Customs & Etiquette:</span>
              <div className="space-y-1.5">
                {selectedWorkshop?.etiquetteTips.map((tip, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-amber-50 text-[11px] text-amber-900 border border-amber-200/50">
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* RAG Rule Confirmation */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> RAG Grounding Rule:
              </div>
              <p>
                The Copilot is strictly prohibited from inventing cultural folklore. If an answer cannot be grounded from the verified workshop sheet, it politely flags a human community mentor.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
