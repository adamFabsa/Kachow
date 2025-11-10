"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Mic, Send } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export default function PreferencesPage() {
  const [budget, setBudget] = useState([400])
  const [carType, setCarType] = useState("sedan")
  const [maintenance, setMaintenance] = useState("medium")
  const [autoSelect, setAutoSelect] = useState(false)
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Alex! I'm here to help you find the perfect car. What are you looking for?" },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    setMessages([
      ...messages,
      { role: "user", text: inputValue },
      {
        role: "ai",
        text: "Got it. Based on your income, you qualify for roughly a 5.5% APR. That means a $20,000 car over 5 years fits comfortably. Would you prefer hybrid or gas?",
      },
    ])
    setInputValue("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Car Preferences</h1>
              <p className="text-sm text-muted-foreground">Tell us what you're looking for</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Preferences Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card className="p-8">
              <h2 className="mb-6 text-xl font-bold">Your Preferences</h2>

              {/* Car Type */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-medium">Car Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {["sedan", "suv", "ev", "hybrid"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setCarType(type)}
                      className={`rounded-xl border-2 p-4 text-left capitalize transition-all ${
                        carType === type ? "border-[#004878] bg-[#004878]/5" : "border-border hover:border-[#004878]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Budget */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-medium">
                  Monthly Budget: <span className="font-bold text-[#004878]">${budget[0]}</span>
                </label>
                <Slider value={budget} onValueChange={setBudget} max={1000} min={200} step={50} className="w-full" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>$200</span>
                  <span>$1,000</span>
                </div>
              </div>

              {/* Maintenance Priority */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-medium">Maintenance Priority</label>
                <div className="grid grid-cols-3 gap-3">
                  {["low", "medium", "high"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setMaintenance(level)}
                      className={`rounded-xl border-2 p-3 capitalize transition-all ${
                        maintenance === level
                          ? "border-[#E60012] bg-[#E60012]/5"
                          : "border-border hover:border-[#E60012]/50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-medium">Location</label>
                <div className="rounded-xl border-2 border-border bg-muted/50 p-4">
                  <div className="text-sm font-medium">Austin, TX</div>
                  <div className="text-xs text-muted-foreground">Auto-detected</div>
                </div>
              </div>

              {/* Auto Pick */}
              <div className="mb-8">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={autoSelect}
                    onChange={(e) => setAutoSelect(e.target.checked)}
                    className="h-5 w-5 rounded border-border accent-[#004878]"
                  />
                  <span className="text-sm font-medium">Pick for me automatically</span>
                </label>
              </div>

              {/* Find Button */}
              <Link href="/recommendations">
                <Button className="w-full bg-[#004878] py-6 text-lg hover:bg-[#003557]">
                  Find My Cars
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* AI Chat Interface */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#004878] to-[#E60012]">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">AI Assistant</div>
                  <div className="text-xs text-muted-foreground">Here to help you choose</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user" ? "bg-[#004878] text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.role === "ai" && idx > 0 && (
                        <div className="mt-2 text-xs opacity-75">💡 APR includes interest and fees</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message or preference..."
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[#004878] focus:ring-2 focus:ring-[#004878]/20"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-12 w-12 shrink-0 bg-[#004878] hover:bg-[#003557]"
                >
                  <Send className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" className="h-12 w-12 shrink-0 bg-transparent">
                  <Mic className="h-5 w-5" />
                </Button>
              </div>

              {/* Education Mode Badge */}
              <div className="mt-4 rounded-xl border border-[#00A86B]/20 bg-[#00A86B]/5 p-3 text-center text-sm text-[#00A86B]">
                💡 Educate Mode: Learn how APR affects total cost
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
