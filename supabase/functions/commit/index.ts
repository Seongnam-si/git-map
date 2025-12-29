import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const payload = await req.json();

  const apiKey = payload.api_key;
  if (!apiKey) {
    return new Response("Missing api_key", { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const keyHash = await sha256(apiKey);

  const { data: keyRow, error: keyError } = await supabase
    .from("api_keys")
    .select("user_id, is_active")
    .eq("key_hash", keyHash)
    .single();

  if (keyError || !keyRow || !keyRow.is_active) {
    return new Response("Invalid API Key", { status: 401 });
  }

  const userId = keyRow.user_id;

  const { error: insertError } = await supabase
    .from("commits")
    .insert({
      user_id: userId,
      repo_full_name: payload.repo_full_name,
      repo_url: payload.repo_url,
      branch: payload.branch,
      commit_hash: payload.commit_hash,
      commit_message: payload.commit_message,
      committed_at: payload.committed_at,
      country: payload.country,
      city: payload.city,
      source: payload.source,
    });

  if (insertError) {
    console.error("DB insert error:", insertError);
    return new Response("Insert failed", { status: 500 });
  }

  return new Response(
    JSON.stringify({ message: "commit saved (body api key auth)" }),
    { headers: { "Content-Type": "application/json" } }
  );
});
