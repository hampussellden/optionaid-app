import './globals.css';
import AuthButton from '../components/AuthButton';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Optionaid</title>
      </head>
      <body className="bg-background text-foreground flex flex-col items-stretch">
        <main
          className="min-h-screen flex flex-col items-center mx-16 xl:mx-20 2xl:mx-24 gap-4 mb-10 relative"
          id="content"
        >
          <header className="flex flex-row justify-between w-full mt-4 bg-static p-4 rounded">
            <a href="/" className="focus:outline-none">
              <h1 className="text-3xl font-bold ">Optionaid</h1>
            </a>
            <AuthButton />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
