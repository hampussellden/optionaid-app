import { Database } from '@/utils/supabase/supabase'
import './globals.css'
import { createClient } from '@supabase/supabase-js'
import AuthButton from './_components/AuthButton'

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseURL, supabaseAnonKey);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center mx-12">
          <header className='flex felx-row justify-between w-full my-6 '>
            <a href="/">
              <h1 className="text-3xl font-bold">Optionaid</h1>
            </a>
            <AuthButton />
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}
