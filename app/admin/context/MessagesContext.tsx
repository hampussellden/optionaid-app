'use client';
import { createContext, useState, useEffect } from 'react';
import { CreationMessage } from '../../types';
import { DEFAULT_COOKIE_OPTIONS } from '@supabase/ssr';

export type MessagesContextType = {
  messages: CreationMessage[];
  addMessage: (message: CreationMessage) => void;
};
export const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<CreationMessage[]>([]);
  const addMessage = (message: CreationMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <>
      <MessagesContext.Provider value={{ messages, addMessage }}>{children}</MessagesContext.Provider>
    </>
  );
};

export default MessagesProvider;
