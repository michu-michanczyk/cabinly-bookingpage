import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconClose, IconAI, IconLoading } from "../icons";
import { useChatStore } from "../../stores/chat-store";
import { useBookingStore } from "../../stores/booking-store";
import { cn } from "../../lib/utils";
import type { ChatAction, Cabin } from "../../types/cabin";

interface ChatPanelProps {
  cabin: Cabin;
}

export function ChatPanel({ cabin }: ChatPanelProps) {
  const messages = useChatStore((s) => s.messages);
  const isOpen = useChatStore((s) => s.isOpen);
  const isLoading = useChatStore((s) => s.isLoading);
  const closeChat = useChatStore((s) => s.closeChat);
  const openBooking = useBookingStore((s) => s.openBooking);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const handleSuggestedQuestion = (text: string) => {
    const addMessage = useChatStore.getState().addMessage;
    addMessage({
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    });
    window.dispatchEvent(new CustomEvent("chat-send", { detail: text }));
  };

  const hasMessages = messages.length > 0 || isLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-[64px] inset-x-0 bottom-0 z-40 bg-bg-primary/95 backdrop-blur-sm flex flex-col"
        >
          {/* Close bar */}
          <div className="flex items-center justify-end px-6 py-2">
            <button
              onClick={closeChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity cursor-pointer text-sm text-text-tertiary"
            >
              Close
              <IconClose size={14} />
            </button>
          </div>

          {/* Content area - centered */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[640px] mx-auto px-6 w-full min-h-full flex flex-col">
              {!hasMessages ? (
                /* Empty state - centered on screen */
                <div className="flex-1 flex flex-col items-center justify-center -mt-12">
                  <div className="w-16 h-16 rounded-full bg-text-primary flex items-center justify-center mb-6">
                    <IconAI size={28} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">
                    Hi, I'm Leo
                  </h2>
                  <p className="text-base text-text-secondary mb-1 text-center">
                    Your AI cabin assistant
                  </p>
                  <p className="text-sm text-text-tertiary mb-8 text-center max-w-md">
                    Ask me anything using the input above, or try one of these:
                  </p>

                  {/* Suggested questions */}
                  <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                    {[
                      "Is there a BBQ?",
                      "Any weekend deals?",
                      "How much per night?",
                      "Do you have a sauna?",
                      "What's the check-in time?",
                      "Is it pet-friendly?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="text-sm text-text-secondary border border-border-light rounded-full px-4 py-2 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Messages */
                <div className="flex-1 space-y-4 py-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-text-primary flex items-center justify-center shrink-0 mt-1 mr-3">
                          <IconAI size={14} className="text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-3 text-sm",
                          msg.role === "user"
                            ? "bg-text-primary text-white rounded-br-sm"
                            : "bg-bg-tertiary text-text-primary rounded-bl-sm"
                        )}
                      >
                        <p className="leading-relaxed">{msg.content}</p>

                        {/* Action buttons */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {msg.actions.map((action, i) => (
                              <button
                                key={i}
                                onClick={() => handleAction(action)}
                                className={cn(
                                  "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer",
                                  msg.role === "user"
                                    ? "bg-white/20 text-white hover:opacity-80"
                                    : "bg-bg-secondary text-text-primary border border-border-light hover:opacity-80"
                                )}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 rounded-full bg-text-primary flex items-center justify-center shrink-0 mt-1 mr-3">
                        <IconAI size={14} className="text-white" />
                      </div>
                      <div className="bg-bg-tertiary rounded-2xl px-4 py-3 rounded-bl-sm">
                        <div className="flex items-center gap-2">
                          <IconLoading size={14} className="text-text-tertiary animate-spin" />
                          <span className="text-sm text-text-tertiary">Leo is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
