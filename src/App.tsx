import { useState } from "react";
import githubIcon from "./asset/githubIcon.svg";
import supabase from "./lib/supabase";

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  const loginGithubBtn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://loaclhost:5173/auth/callback"
      }
    })
  }

  const createApiKeyBtn = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) return;

    const res = await fetch(
      "https://wrbyuqqtpdrvudgtskaq.supabase.co/functions/v1/create_key",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
    
    const data = await res.json();

    setApiKey(data.api_key);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    {apiKey ? (
      <div className="max-w-md rounded-xl bg-gray-700 p-6 flex flex-col text-center">
        <img src={githubIcon} alt="icon" className="w-16 h-16 mx-auto"/>
        <span className="text-white text-4xl">Gitmap</span>
        <span className="text-gray-400 text-xl">My Coding Locations</span>
        <button
          className="bg-blue-400 text-white text-semibold rounded-xl mt-6"
          onClick={loginGithubBtn}
        >
          Sign in with GitHub
        </button>
      </div>
    ) : (
      <div className="flex flex-col justify-center">
        <span className="text-white text-5xl">API Key Management</span>
        <span className="text-gray-400 mt-4">아래 키 생성 버튼을 클릭하여 키를 발급 받아 주세요.</span>
        <span className="text-gray-400">복사 버튼이 활성화 되면, 클릭하여 발급 받은 키를 다른곳에 임시로 저장해 주세요!</span>
        <div className="max-w-3xl rounded-xl bg-gray-700 p-2 mt-8 border border-gray-400 h-80 flex flex-col divide-y divide-gray-600 px-6">
          <div className="flex-[5] flex items-center justify-between text-gray-200">
            <div className="flex flex-col gap-2">
              <span className="flex flex-row font-semibold text-xl">
                🔐 Generate API Key
              </span>
              <span className="flex flex-row font-normal text-gray-300">
                우측 버튼을 눌러 API Key를 발급 받아주세요.
              </span>
            </div>
            <button
              className="flex flex-row bg-blue-600 rounded-xl px-2 py-2 border border-gray-400"
              onClick={createApiKeyBtn}
            >
              API Key 생성
            </button>
          </div>
          <div className="flex-[5] flex-col items-center text-gray-200">
            <div className="flex flex-col gap-2 py-4">
              <span className="font-semibold text-xl">
                your api key
              </span>
              <div className="w-full max-w-xl flex items-center justify-between gap-2 rounded-xl border border-gray-500 bg-gray-800 px-4 py-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-gray-400 text-lg">🔒</span>
                  <code className="text-gray-500 text-sm truncate">
                    {apiKey ? apiKey : "No API key yet"}
                  </code>
                </div>
                <button 
                  className="rounded-lg bg-gray-600 px-2 py-2 text-sm hover:bg-gray-500 transition border border-gray-500"
                  onClick={async () => {
                    if (!apiKey) return;
                    await navigator.clipboard.writeText(apiKey);
                    setCopied(true);
                  }}
                >
                  {!copied ? "copy" : "copied!"}
                </button>
              </div>
              <span className="text-xs text-gray-200">
              ❗️ 이 키는 한 번만 표시됩니다. 안전하게 보관하세요.
              </span>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default App;
