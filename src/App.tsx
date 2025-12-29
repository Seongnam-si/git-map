import { useEffect } from "react";
import supabase from "./lib/supabase";

function App() {
  const loginToGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });
  };

  const createApiKey = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) return;

    const res = await fetch(
      "https://wrbyuqqtpdrvudgtskaq.supabase.co/functions/v1/create_key",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )

    const data = await res.json();

    alert(
      `다음 키값은 지금 한 번만 노출 됩니다. 해당 키를 복사해주세요.\n${data.api_key}`
    );
  };

  return (
    <div style={{ padding: 30 }}>
      <button onClick={loginToGithub}>깃허브 로그인</button>
      <br />
      <br />
      <button onClick={createApiKey}>API Key 발급</button>
    </div>
  );
}

export default App;
