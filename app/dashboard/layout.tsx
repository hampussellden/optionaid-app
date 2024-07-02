import React from 'react';
import MainContent from '@/Containers/MainContent';
import Header from '@/views/Header';

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainContent margins>
        <Header rounded />
        {children}
      </MainContent>
    </>
  );
}
