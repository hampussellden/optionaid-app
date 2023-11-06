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

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center mx-12 gap-8 mb-40">
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
