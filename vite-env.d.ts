/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    readonly VITE_MODEL: string;
    readonly VITE_SYSTEM_PROMPT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  