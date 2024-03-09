import { createClient } from '@/utilities/supabase/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const fullName = String(formData.get('fullName'));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });
  if (data.user) {
    const { user } = data;
    await supabase.from('users').update({ full_name: fullName }).eq('id', user.id);
  }

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/login?error=Could not authenticate user`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  return NextResponse.redirect(`${requestUrl.origin}/`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
