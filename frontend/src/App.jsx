import { useState } from "react"
import axios from "axios"

function App() {
  const [status, setStatus] = useState("Idle")
  const [output, setOutput] = useState("")

  const targetIP = import.meta.env.VITE_TARGET_IP || "0.0.0.0";

  const runPing = async () => {
    setStatus("Running Ansible.....")
    try {
      const response = await axios.get("http://127.0.0.1:8000/ping-server")
      setOutput(response.data.output)
      setStatus("Success!")
    } catch (error) {
      setStatus("Error connecting to backend")
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              Infrastructure Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-2">Cloud Node Controller</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Target IP</p>
            <p className="font-mono text-blue-400 text-lg">{targetIP}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Controls</h3>
            <button 
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white font-bold py-3 px-6 rounded-xl shadow-lg"
              onClick={runPing}
            >
              Ping Server
            </button>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-slate-400 text-sm">Status:</span>
              <span className={`text-sm font-bold ${status === "Success!" ? "text-green-400" : "text-yellow-400"}`}>
                {status}
              </span>
            </div>
          </div>

          <div className="md:col-span-2 bg-black/60 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <pre className="font-mono text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed h-64">
              {output || "$ Waiting for command..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App