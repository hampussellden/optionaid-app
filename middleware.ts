import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: role, error } = await supabase.from('users').select('app_role').eq('id', user?.id).single();
  const app_role = user ? role?.app_role ? role?.app_role : 'client' : null;
  
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (user && request.nextUrl.pathname === '/admin' && app_role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // if user is signed in and the current path is / redirect the user to /dashboard
  if (user && request.nextUrl.pathname === '/') {
    if (app_role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (app_role === 'client') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return supabaseResponse
}

export const config = {
  matcher: [

    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
