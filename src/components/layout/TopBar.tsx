import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMicrophone, IconArrowUp, IconLoading, IconCalendar, IconChartSquare, IconFinances, IconRanking, IconGPS, IconMessageText, IconChevronLeft } from "../icons";
import { Button } from "../ui/Button";
import { useBookingStore } from "../../stores/booking-store";
import { useChatStore } from "../../stores/chat-store";
import { cn, formatCurrency } from "../../lib/utils";
import type { Cabin, ChatAction } from "../../types/cabin";

const SUGGESTED_PROMPTS = [
  { icon: IconCalendar, text: "Do you have any special offer for a stay?" },
  { icon: IconChartSquare, text: "What makes this place special compared to others nearby?" },
  { icon: IconFinances, text: "Is it quiet and private, or are there neighbors nearby?" },
  { icon: IconRanking, text: "What amenities are included (sauna, fireplace, Wi-Fi, parking)?" },
  { icon: IconGPS, text: "How far is it from the lake / beach / city / attractions?" },
  { icon: IconMessageText, text: "Can I check in earlier or check out later?" },
];

interface TopBarProps {
  cabin: Cabin;
  onSendMessage: (message: string) => void;
}

export function TopBar({ cabin, onSendMessage }: TopBarProps) {
  const [inputValue, setInputValue] = useState("");
  const openBooking = useBookingStore((s) => s.openBooking);
  const isOpen = useChatStore((s) => s.isOpen);
  const openChat = useChatStore((s) => s.openChat);
  const closeChat = useChatStore((s) => s.closeChat);
  const messages = useChatStore((s) => s.messages);
  const isLoading = useChatStore((s) => s.isLoading);
  const clearMessages = useChatStore((s) => s.clearMessages);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInputValue(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    if (!isOpen) openChat();
  }, [isOpen, openChat]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Stop listening when chat closes
  useEffect(() => {
    if (!isOpen && isListening) stopListening();
  }, [isOpen, isListening, stopListening]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue("");
    if (!isOpen) openChat();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      closeChat();
    }
  };

  const handlePromptClick = (text: string) => {
    onSendMessage(text);
  };

  const handleAction = (action: ChatAction) => {
    if (action.type === "book") {
      const promoId = (action.payload as { promoId?: string })?.promoId;
      if (promoId) {
        const promo = cabin.promos.find((p) => p.id === promoId);
        openBooking(promo || null);
      } else {
        openBooking();
      }
      closeChat();
    } else if (action.type === "navigate") {
      const section = (action.payload as { section?: string })?.section;
      if (section) {
        const el = document.getElementById(section);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      closeChat();
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;
      const target = e.target as Node;
      if (inputWrapperRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      closeChat();
      setInputValue("");
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeChat]);

  // Scroll to bottom of messages within the chat container only
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0 || isLoading;

  return (
    <header className="sticky top-0 z-30 bg-bg-primary border-b border-border-light">
      <div className="flex items-center px-4 sm:px-8 py-2 max-w-[1440px] mx-auto gap-2">
        {/* Left: Owner info — hidden on xs, visible sm+ */}
        <div className="hidden sm:flex items-center gap-2 shrink-0 min-w-0 w-[200px] lg:w-[260px]">
          <img
            src={cabin.images[0].url}
            alt={cabin.images[0].alt}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
            style={{ imageRendering: 'auto' }}
          />
          <div className="flex flex-col text-[10px] sm:text-xs leading-3 sm:leading-4 min-w-0">
            <span className="text-text-primary font-medium truncate">{cabin.location.address},</span>
            <span className="text-text-primary font-medium truncate">{cabin.location.city}, {cabin.location.country}</span>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(`${cabin.location.address}, ${cabin.location.city}, ${cabin.location.country}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary font-semibold underline text-left text-[9px] sm:text-[11px] hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              show map
            </a>
          </div>
        </div>

        {/* Center: AI Search input + dropdown */}
        <div className="relative flex-1 min-w-0 max-w-[554px] mx-auto" ref={inputWrapperRef}>
          {/* Input — always in the same position */}
          <div
            className={cn(
              "relative z-[52] flex items-center gap-1 rounded-sm h-12 pl-3 pr-2 w-full transition-colors",
              isOpen
                ? "bg-bg-tertiary border border-border-focus ring-3 ring-border-focus/30"
                : "bg-bg-tertiary border border-transparent hover:border-border-hover"
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M0.0735125 0.845513C-0.107031 0.410309 0.35724 -0.0750837 0.802759 0.0845439C2.12262 0.557443 4.19505 1.1897 5.78532 1.16552C7.32007 1.14219 9.32109 0.493543 10.5536 0.0336401C10.9763 -0.124059 11.424 0.300538 11.2855 0.727626C10.8525 2.06247 10.2277 4.29898 10.2705 5.98065C10.308 7.45476 10.881 9.39021 11.2859 10.5858C11.428 11.0054 10.9999 11.4286 10.5785 11.2852C9.3805 10.8774 7.44271 10.3007 5.96473 10.2608C4.29912 10.2158 2.09579 10.8221 0.740958 11.2585C0.300079 11.4005 -0.13723 10.9261 0.0406618 10.5008C0.569953 9.23507 1.30166 7.19982 1.30017 5.62397C1.29872 4.0866 0.598599 2.11124 0.0735125 0.845513Z" fill="#58586C" transform="rotate(45 8 8) translate(2.343 2.343)"/>
            </svg>
            {isListening ? (
              <>
                <span className="flex-1 text-sm text-text-tertiary animate-pulse select-none">Listening...</span>
                <button
                  onClick={toggleListening}
                  className="flex items-center justify-center size-9 shrink-0 cursor-pointer"
                >
                  <span className="relative flex items-center justify-center size-9">
                    <span className="absolute inset-0 rounded-full bg-alert-negative/20 animate-ping" />
                    <span className="relative flex items-center justify-center size-7 rounded-full bg-alert-negative">
                      <IconMicrophone size={14} className="text-white" />
                    </span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (!isOpen) openChat(); }}
                  placeholder={isOpen ? "" : "Ask me anything about this place"}
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none min-w-0"
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleListening}
                    className="hidden sm:flex items-center justify-center size-9 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <IconMicrophone size={16} className="text-text-secondary" />
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                    className={cn(
                      "flex items-center justify-center size-9 rounded-lg border-2 transition-all cursor-pointer",
                      inputValue.trim()
                        ? "border-border-dark text-text-primary hover:opacity-80"
                        : "border-border-light text-text-tertiary cursor-default"
                    )}
                  >
                    <IconArrowUp size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Open state — dark container behind input + dropdown below */}
          <AnimatePresence>
            {isOpen && (hasMessages || !inputValue.trim()) && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-1 -left-1 -right-1 bg-bg-surface-secondary rounded-lg shadow-[0px_6px_8px_0px_rgba(0,0,0,0.2)] z-[51]"
                style={{ paddingTop: 'calc(48px + 8px)' }}
              >
                {/* Content below input */}
                {!hasMessages ? (
                  /* Prompt suggestions */
                  <div className="px-4 pt-3 pb-4">
                    <p className="font-semibold text-[14px] leading-[18px] tracking-[-0.28px] text-white pb-3">
                      What question would you like to get an answer to?
                    </p>
                    <div className="flex flex-col gap-1">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt.text}
                          onClick={() => handlePromptClick(prompt.text)}
                          className="py-2 rounded-lg text-[14px] leading-[18px] text-white/70 hover:text-white/90 transition-colors cursor-pointer text-left"
                        >
                          {prompt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Chat conversation */
                  <div className="flex flex-col max-h-[40vh] md:max-h-[400px]">
                    {/* Back to suggestions button */}
                    <div className="flex items-center px-4 pt-3 pb-1">
                      <button
                        onClick={() => {
                          clearMessages();
                          setInputValue("");
                        }}
                        className="flex items-center gap-1.5 text-xs text-text-tertiary hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <IconChevronLeft size={14} />
                        <span>New question</span>
                      </button>
                    </div>
                    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex",
                            msg.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {msg.role === "assistant" && (
                            <div className="shrink-0 mt-2.5 mr-2">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.0735125 0.845513C-0.107031 0.410309 0.35724 -0.0750837 0.802759 0.0845439C2.12262 0.557443 4.19505 1.1897 5.78532 1.16552C7.32007 1.14219 9.32109 0.493543 10.5536 0.0336401C10.9763 -0.124059 11.424 0.300538 11.2855 0.727626C10.8525 2.06247 10.2277 4.29898 10.2705 5.98065C10.308 7.45476 10.881 9.39021 11.2859 10.5858C11.428 11.0054 10.9999 11.4286 10.5785 11.2852C9.3805 10.8774 7.44271 10.3007 5.96473 10.2608C4.29912 10.2158 2.09579 10.8221 0.740958 11.2585C0.300079 11.4005 -0.13723 10.9261 0.0406618 10.5008C0.569953 9.23507 1.30166 7.19982 1.30017 5.62397C1.29872 4.0866 0.598599 2.11124 0.0735125 0.845513Z" fill="white" transform="rotate(45 8 8) translate(2.343 2.343)"/>
                              </svg>
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                              msg.role === "user"
                                ? "bg-[#010101] text-white rounded-br-sm"
                                : "text-white/90 rounded-bl-sm"
                            )}
                          >
                            <p className="leading-relaxed">{msg.content}</p>
                            {msg.actions && msg.actions.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {msg.actions.map((action, i) => (
                                  <button
                                    key={i}
                                    onClick={() => handleAction(action)}
                                    className="text-xs font-semibold px-3 py-1 rounded-full border border-white/30 text-white hover:opacity-80 transition-opacity cursor-pointer"
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="rounded-xl px-3 py-2 rounded-bl-sm">
                            <div className="flex items-center gap-2">
                              <IconLoading size={12} className="text-white/50 animate-spin" />
                              <span className="text-sm text-white/50">Leo is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Price + Book CTA - Hidden on mobile/tablet */}
        <div className="hidden md:flex items-center justify-end shrink-0 w-[200px] lg:w-[260px] gap-4">
          <div className="flex flex-col items-end text-right whitespace-nowrap">
            <span className="text-sm leading-tight text-text-secondary">starts from</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-semibold text-text-primary leading-tight">
                {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)}
              </span>
              <span className="text-sm text-text-secondary">/ night</span>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => openBooking()}
            className="whitespace-nowrap"
          >
            Book a stay
          </Button>
        </div>
      </div>
    </header>
  );
}
