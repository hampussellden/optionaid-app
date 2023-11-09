import './globals.css';
import AuthButton from './_components/AuthButton';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center mx-16 gap-4 mb-10">
          <header className="flex flex-row justify-between w-full mt-4 bg-static p-4 rounded">
            <a href="/">
              <h1 className="text-3xl font-bold">Optionaid</h1>
            </a>
            <AuthButton />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
