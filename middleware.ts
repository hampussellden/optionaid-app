import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: role, error } = await supabase.from('users').select('app_role').eq('id', user?.id).single();
  const app_role = role?.app_role;

  // if user is not signed in and the current path is not /login redirect the user to /login
  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (user && session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (user && session && req.nextUrl.pathname === '/admin' && app_role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  // if user is signed in and the current path is / redirect the user to /dashboard
  if (user && session && req.nextUrl.pathname === '/') {
    if (app_role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    } else if (app_role === 'client') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/', '/account', '/admin', '/dashboard', '/login'],
};
