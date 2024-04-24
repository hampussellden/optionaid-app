import React from 'react';
import MainContent from '@/containers/MainContent';
import Header from '@/views/Header';

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainContent>
        <Header rounded />
        {children}
      </MainContent>
    </>
  );
}
