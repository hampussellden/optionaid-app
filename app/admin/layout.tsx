import React from 'react';
import MessagesProvider from './context/MessagesContext';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return <MessagesProvider>{children}</MessagesProvider>;
}
