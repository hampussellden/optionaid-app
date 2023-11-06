import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Button from './Button'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action="/auth/sign-out" method="post">
        <Button text='Logout' />
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className='rounded bg-accent py-2 px-4 text-lg w-fit font-semibold self-end hover:bg-accentHover flex flex-row gap-2 items-center mt-auto'
    >
      Login
    </Link>
  )
}
