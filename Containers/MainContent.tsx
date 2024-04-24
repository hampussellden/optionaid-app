import React from 'react';
import '../app/globals.css';
type MainContentProps = {
  children: React.ReactNode;
  margins?: boolean;
};
export default function MainContent({ children, margins }: MainContentProps) {
  const classes = `
    ${margins ? 'mx-16 xl:mx-20 2xl:mx-24' : ''}
    min-h-screen flex flex-col items-center  gap-4 mb-10 relative
  `;
  return (
    <main className={classes} id="content">
      {children}
    </main>
  );
}
