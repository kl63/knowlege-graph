'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Trash2, Loader2 } from 'lucide-react';
import { Message } from '../lib/types';
import { getLLMResponse } from '../services/llm';
import { v4 as uuidv4 } from 'uuid';

const HISTORY_STORAGE_KEY = 'chat_history';

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Load chat history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    }
  }, []);

  // ✅ Save chat history whenever messages update
  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await getLLMResponse(inputMessage);
      const botMessage: Message = {
        id: uuidv4(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Error in getLLMResponse:', error);
      setMessages(prev => [
        ...prev,
        { id: uuidv4(), content: 'Sorry, I encountered an error.', sender: 'bot', timestamp: new Date().toISOString(), isError: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-screen p-4 glass card-shadow">
      <Button onClick={() => { setMessages([]); localStorage.removeItem(HISTORY_STORAGE_KEY); }} className="mb-4 flex items-center gap-2">
        <Trash2 /> Clear Chat
      </Button>

      <div className="flex-grow overflow-y-auto p-4 scrollbar-custom">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender === 'user' ? 'message-bubble-user ml-auto' : 'message-bubble-bot mr-auto'}`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && <Loader2 className="animate-spin mx-auto mt-2" />}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type your message..." disabled={isLoading} />
        <Button type="submit" disabled={isLoading || !inputMessage.trim()}><Send /></Button>
      </form>
    </Card>
  );
};

export default ChatApp;
