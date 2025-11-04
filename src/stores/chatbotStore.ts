import { create } from 'zustand';
import { ChatbotStore, ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialMessage: ChatMessage = {
    id: uuidv4(),
    text: "Olá! 👋 Sou seu assistente virtual da DevStore. Como posso te ajudar hoje?",
    sender: 'bot',
    options: ["Ver produtos", "Procurar um item", "Meu pedido"]
};

export const useChatbotStore = create<ChatbotStore>((set) => ({
    isOpen: false,
    messages: [initialMessage],
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
