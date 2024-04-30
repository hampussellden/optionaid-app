import './globals.css';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Optionaid</title>
      </head>
      <body className="bg-background text-foreground flex flex-col items-stretch min-h-screen h-full overflow-hidden">{children}</body>
    </html>
  );
}
