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

  useEffect(() => {
    const handleSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const { error } = await supabase.from("users").upsert(
        {
          id: session.user.id,
          github_username: session.user.user_metadata.preferred_username,
        },
        { onConflict: "id" }
      );

      if (error) {
        console.error("User upsert error:", error);
      } else {
        console.log("users upsert 성공");
      }
    };

    handleSession();
  }, []);

  return <button onClick={loginToGithub}>GitHub 로그인</button>;
}

export default App;
