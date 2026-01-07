import { useState, useEffect } from "react";
import githubIcon from "./asset/githubIcon.svg";
import supabase from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const loginGithubBtn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://git-map.netlify.app/"
      }
    })
  }

  const createApiKeyBtn = async () => {
    if (!session) return;

    try {
      setLoading(true);

      const res = await fetch(
        "https://wrbyuqqtpdrvudgtskaq.supabase.co/functions/v1/create_key",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create API key");
      }

      const data = await res.json();
      setApiKey(data.api_key);
    } catch (err) {
      console.error(err);
      alert("API Key 발급에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md rounded-xl bg-gray-700 p-6 flex flex-col text-center">
        <img src={githubIcon} alt="icon" className="w-16 h-16 mx-auto"/>
        <span className="text-white text-4xl">Gitmap</span>
        <span className="text-gray-400 text-xl">My Commit Locations</span>
          <button
            className="bg-blue-400 text-white text-semibold rounded-xl mt-6"
            onClick={loginGithubBtn}
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-3xl w-full rounded-xl bg-gray-700 p-8 border border-gray-600">
          <h1 className="text-white text-2xl font-semibold">
            🔐 API Key Management
          </h1>
          <p className="text-gray-400 mt-2">
            GitMap을 사용하려면 API Key를 발급받아야 합니다.
          </p>
          <p className="text-gray-400">
            아래 버튼을 클릭하여 API Key를 발급받아 주세요.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 mt-4"
            onClick={createApiKeyBtn}
            disabled={loading}
          >
            {loading ? "Generating..." : "API Key 생성"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-3xl w-full rounded-xl bg-gray-700 p-8 border border-gray-600">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-bold">
            🔑 Your API Key
          </h1>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-500 bg-gray-800 px-4 py-4">
          <code className="text-gray-300 text-sm truncate">{apiKey}</code>
          <button
            className="rounded-lg bg-gray-600 px-2 py-2 text-sm hover:bg-gray-500 transition border border-gray-500 text-white"
            onClick={async () => {
              await navigator.clipboard.writeText(apiKey);
              setCopied(true);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-s text-gray-200 mt-4">
          ❗ 이 키는 한 번만 표시됩니다. 안전한 곳에 보관하세요.
        </p>
      </div>
    </div>
  )
}

export default App;
