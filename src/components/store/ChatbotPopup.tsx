import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import { useChatbotStore } from '@/stores/chatbotStore';
import { useCartStore } from '@/stores/cartStore';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';

const ChatbotPopup = () => {
    const { isOpen, toggleChat, messages, addMessage } = useChatbotStore();
    const { addItem } = useCartStore();
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage = { id: uuidv4(), text: inputValue, sender: 'user' as const };
        addMessage(userMessage);

        // Simulated bot response logic
        setTimeout(() => {
            const botResponse = getBotResponse(inputValue);
            addMessage(botResponse);
        }, 1000);

        setInputValue('');
    };

    const getBotResponse = (userInput: string) => {
        const lowerInput = userInput.toLowerCase();
        
        const product = MOCK_PRODUCTS.find(p => p.name.toLowerCase().includes(lowerInput));
        if (product) {
            addItem(product);
            return { id: uuidv4(), text: `Adicionei "${product.name}" ao seu carrinho! Deseja mais alguma coisa?`, sender: 'bot' as const };
        }

        if (lowerInput.includes('produto')) {
            return { id: uuidv4(), text: `Temos vários produtos! O que você procura? Tente digitar o nome de um, como "${MOCK_PRODUCTS[0].name}"`, sender: 'bot' as const };
        }

        return { id: uuidv4(), text: "Desculpe, não entendi. Você pode perguntar sobre produtos ou seu pedido.", sender: 'bot' as const };
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-24 right-5 w-80 h-[450px] bg-card border rounded-lg shadow-xl flex flex-col z-50"
                    >
                        <header className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground rounded-t-lg">
                            <h3 className="font-bold">Assistente Virtual</h3>
                            <button onClick={toggleChat} className="hover:opacity-75"><X size={20} /></button>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <footer className="p-3 border-t">
                            <div className="flex items-center gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Digite sua mensagem..."
                                />
                                <Button onClick={handleSendMessage} size="icon">
                                    <Send size={20} />
                                </Button>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className="fixed bottom-5 right-5 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg z-50"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'x' : 'chat'}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </>
    );
};

export default ChatbotPopup;
