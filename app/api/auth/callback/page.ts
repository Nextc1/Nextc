// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the SSR package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/server-side/nextjs
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const origin = requestUrl.origin;

//   if (code) {
//     const supabase = createClient();
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   // URL to redirect to after sign up process completes
//   return NextResponse.redirect(`${origin}/protected`);
// }

// pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.query;

  // Store the access token in localStorage or a secure cookie
  if (typeof access_token === 'string') {
    // Example: Store the token in a cookie (requires additional setup)
    res.setHeader('Set-Cookie', `access_token=${access_token}; Path=/; HttpOnly; Secure`);
    // Redirect the user to the desired page
    res.redirect('/kyc');
  } else {
    res.status(400).json({ error: 'Access token not provided' });
  }
}
