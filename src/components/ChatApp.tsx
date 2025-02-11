'use client';

import React, { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Bot, User, Trash2, Loader2 } from 'lucide-react';
import { Message, LLMResponse } from '../lib/types';
import { getLLMResponse } from '../services/llm';
import { formatMessageTimestamp } from '../utils/date';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'chat_history';
const NAME_STORAGE_KEY = 'user_name';

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Failed to load chat history:', error);
        return [];
      }
    }
    return [];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save chat history:', error);
      }
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const appendMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NAME_STORAGE_KEY);
  }, []);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    appendMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log("Sending request:", inputMessage);

      const response: LLMResponse = await getLLMResponse(inputMessage);
      console.log("Received response:", response);

      if (!response || !response.message) {
        throw new Error("Invalid response format from LLM API");
      }

      const botMessage: Message = {
        id: uuidv4(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      appendMessage(botMessage);
    } catch (error) {
      console.error('Error fetching LLM response:', error);

      appendMessage({
        id: uuidv4(),
        content: 'Sorry, I encountered an error processing your request.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-screen p-4">
      <Button onClick={clearHistory} className="mb-4 flex items-center gap-2">
        <Trash2 /> Clear Chat
      </Button>

      <div className="flex-grow overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`p-3 rounded-lg mb-2 ${
                msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-xs text-gray-500">{formatMessageTimestamp(msg.timestamp)}</div>
              <p>{msg.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && <Loader2 className="animate-spin mx-auto mt-2" />}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </Card>
  );
};

export default ChatApp;
