import React from 'react';
import '../app/globals.css';
type MainContentProps = {
  children: React.ReactNode;
  margins?: boolean;
};
export default function MainContent({ children, margins }: MainContentProps) {
  const classes = `
    ${margins ? 'mx-16 xl:mx-20 2xl:mx-24' : ''} flex flex-col items-center justify-center gap-4 my-10 relative h-full
  `;
  return (
    <main className={classes} id="content">
      {children}
    </main>
  );
}
