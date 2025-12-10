import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
  const body = await req.json();

  const { email, password, name, role } = body;

  // 1. Create Auth user
  const { data: auth, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Errore signup:", authError);
    return NextResponse.json({ error: "Errore creazione utente Auth" }, { status: 400 });
  }

  const authUserId = auth.user?.id;

  // 2. Trigger Supabase creates public.users row automatically
  // (handle_new_user)

  // 3. Complete user profile
  const { error: updateError } = await supabase
    .from("users")
    .update({
      name,
      role,
    })
    .eq("auth_user_id", authUserId);

  if (updateError) {
    console.error("Errore update profilo:", updateError);
    return NextResponse.json({ error: "Errore aggiornamento profilo" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
