import type React from "react"
import { useState } from "react"
import type { ProcessRequest } from "../types/task"
import { Loader2, Wand2, Zap } from "lucide-react"

interface InputFormProps {
  onParse: (request: ProcessRequest) => void
  isLoading?: boolean
}

export function InputForm({ onParse, isLoading }: InputFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onParse({
        text: text.trim()
      })
      setText("") // Clear input after submission
    }
  }

  return (
    <section className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            AI Meeting Minutes to Task Converter
          </h1>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
        </div>
        <p className="text-gray-600 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
          Transform meeting transcripts into organized action items automatically
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Enhanced Input Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <label htmlFor="meeting-transcript" className="block text-lg font-semibold text-gray-700 mb-4">
            Paste your meeting transcript here
          </label>
          <div className="relative group">
            <textarea
              id="meeting-transcript"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."
              rows={6}
              className="w-full px-6 py-5 bg-white/80 backdrop-blur-sm border-2 border-violet-200/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-4 focus:ring-violet-300/30 focus:border-violet-400 transition-all duration-300 text-lg shadow-lg shadow-violet-100/50 group-hover:shadow-xl group-hover:shadow-violet-200/60 resize-none"
              disabled={isLoading}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="
              group relative flex items-center gap-3 px-10 py-5
              bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600
              text-white font-bold rounded-2xl
              hover:from-violet-400 hover:via-purple-500 hover:to-indigo-500
              focus:ring-4 focus:ring-violet-300/50
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/40
              border border-violet-400/20 text-lg
              transform-gpu
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing Magic...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Extract Tasks from Meeting
                <Zap className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Helpful Examples */}
      <div className="mt-12 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200/50">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">✨ Try these meeting transcript examples:</h3>
        <div className="grid md:grid-cols-1 gap-4">
          <div className="space-y-3">
            <button
              onClick={() => setText("Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight.")}
              className="w-full text-left p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-sm text-gray-600 hover:text-gray-800 border border-violet-100 hover:border-violet-200"
            >
              <strong>Example 1:</strong> "Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."
            </button>
            <button
              onClick={() => setText("John needs to fix the payment bug ASAP P1. Sarah will prepare the quarterly report by Friday. Mike please schedule the client meeting for next week P2.")}
              className="w-full text-left p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-sm text-gray-600 hover:text-gray-800 border border-violet-100 hover:border-violet-200"
            >
              <strong>Example 2:</strong> "John needs to fix the payment bug ASAP P1. Sarah will prepare the quarterly report by Friday. Mike please schedule the client meeting for next week P2."
            </button>
            <button
              onClick={() => setText("Lisa you handle the social media campaign by end of week. Tom please update the website content by Thursday 5pm. Alex will coordinate with the design team tonight P1.")}
              className="w-full text-left p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-sm text-gray-600 hover:text-gray-800 border border-violet-100 hover:border-violet-200"
            >
              <strong>Example 3:</strong> "Lisa you handle the social media campaign by end of week. Tom please update the website content by Thursday 5pm. Alex will coordinate with the design team tonight P1."
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
