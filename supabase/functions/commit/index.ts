import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

Deno.serve(async (req) => {

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Missing Authorization header", { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await req.json();

  console.log("✅ user:", user.id);
  console.log("📦 commit payload:", payload);

  const { error: insertError } = await supabase
    .from("commits")
    .insert({
      user_id: user.id,
      repo_full_name: payload.repo_full_name,
      repo_url: payload.repo_url,
      branch: payload.branch,
      commit_hash: payload.commit_hash,
      commit_message: payload.commit_message,
      committed_at: payload.committed_at,
      source: payload.source,
    });

  if (insertError) {
    console.error("❌ DB insert error:", insertError);
    return new Response(
      JSON.stringify({ message: "insert failed" }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "commit saved",
      user_id: user.id,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
