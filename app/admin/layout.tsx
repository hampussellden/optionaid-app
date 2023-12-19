import React from 'react';
import MessagesProvider from './context/MessagesContext';
import FrontsProvider from './context/FrontsContext';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MessagesProvider>
      <FrontsProvider>{children}</FrontsProvider>
    </MessagesProvider>
  );
}
