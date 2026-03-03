import { useCallback, useEffect } from "react";
import { useChatStore } from "../stores/chat-store";
import { sendChatMessage } from "../lib/ai";
import type { Cabin, ChatMessage } from "../types/cabin";

export function useChat(cabin: Cabin) {
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const setLoading = useChatStore((s) => s.setLoading);

  const send = useCallback(
    async (text: string) => {
      // Add user message
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: Date.now(),
      };
      addMessage(userMsg);

      // Get AI response
      setLoading(true);
      try {
        const allMessages = [...useChatStore.getState().messages];
        const response = await sendChatMessage(allMessages, cabin);

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.message,
          timestamp: Date.now(),
          actions: response.actions,
        };
        addMessage(assistantMsg);
      } catch {
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Sorry, I had trouble processing your request. Please try again!",
          timestamp: Date.now(),
        };
        addMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [cabin, addMessage, setLoading]
  );

  // Listen for chat-send events from suggested chips
  useEffect(() => {
    const handler = async () => {
      // User message already added by the chip, just send to AI
      setLoading(true);
      try {
        const allMessages = [...useChatStore.getState().messages];
        const response = await sendChatMessage(allMessages, cabin);
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.message,
          timestamp: Date.now(),
          actions: response.actions,
        };
        addMessage(assistantMsg);
      } catch {
        addMessage({
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Sorry, something went wrong. Please try again!",
          timestamp: Date.now(),
        });
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("chat-send", handler);
    return () => window.removeEventListener("chat-send", handler);
  }, [cabin, addMessage, setLoading]);

  return { send, messages };
}
