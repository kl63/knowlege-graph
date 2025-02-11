export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'developer'; // ✅ Fixed the allowed roles
  content: string;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot"; // ✅ Restrict sender to "user" or "bot"
  timestamp: string;
  isError?: boolean; // ✅ Add isError as optional property
}



export interface LLMResponse {
  message: string;
  error?: string;
}
