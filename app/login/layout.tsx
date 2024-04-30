import MainContent from '@/containers/MainContent';
import '../globals.css';
import Header from '@/views/Header';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Optionaid</title>
      </head>
      <body className="bg-background text-foreground flex flex-col items-stretch min-h-screen">
        <Header />
        <MainContent>
        {children}
        </MainContent>
        </body>
    </html>
  );
}
