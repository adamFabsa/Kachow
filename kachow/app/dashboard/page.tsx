"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Wallet, TrendingUp, CreditCard, BarChart3, Send, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Car {
  id: number
  name: string
  price: number
  monthlyPayment: number
  apr: number
  image: string
  mpg: string
  match: number
}

export default function DashboardPage() {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [spending, setSpending] = useState(0)
  const [available, setAvailable] = useState(0)

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  const cars: Car[] = [
    {
      id: 1,
      name: "2024 Toyota Corolla Hybrid",
      price: 26800,
      monthlyPayment: 425,
      apr: 5.2,
      image: "/2024-toyota-corolla-hybrid-silver.jpg",
      mpg: "53 city / 52 hwy",
      match: 94,
    },
    {
      id: 2,
      name: "2024 Honda Civic",
      price: 24500,
      monthlyPayment: 389,
      apr: 4.9,
      image: "/2024-honda-civic-blue.jpg",
      mpg: "31 city / 40 hwy",
      match: 91,
    },
    {
      id: 3,
      name: "2024 Mazda CX-30",
      price: 28200,
      monthlyPayment: 447,
      apr: 5.5,
      image: "/2024-mazda-cx-30-red.jpg",
      mpg: "25 city / 33 hwy",
      match: 87,
    },
  ]

  useEffect(() => {
    const animateValue = (setter: (v: number) => void, end: number, duration: number) => {
      const start = 0
      const increment = end / (duration / 16)
      let current = start
      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setter(end)
          clearInterval(timer)
        } else {
          setter(Math.floor(current))
        }
      }, 16)
    }

    animateValue(setBalance, 8247.82, 1000)
    animateValue(setIncome, 5800, 1000)
    animateValue(setSpending, 3950, 1000)
    animateValue(setAvailable, 1850, 1200)
  }, [])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setChatInput("")

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Based on your financial profile, I can see you have $1,850 available for car financing. With your monthly income of $5,800 and current spending of $3,950, I'd recommend keeping your car payment between $350-$450 per month. This ensures you maintain a healthy financial cushion. Would you like me to explain how APR affects your total payment, or would you prefer to see specific car recommendations in your budget?",
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="mb-2 inline-block">
                <Image src="/kachow-logo.png" alt="Kachow" width={150} height={50} className="h-12 w-auto" />
              </Link>
              {/* </CHANGE> */}
              <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
              <p className="text-sm text-muted-foreground">Your bank account is securely connected.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/preferences">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Cars
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Bank Account Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#004878] to-[#E60012] p-8 text-white shadow-2xl">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white overflow-hidden">
                  <Image
                    src="/capital-one-logo.jpg"
                    alt="Capital One"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium opacity-90">Capital One Checking</div>
                  <div className="text-xs opacity-75">****983</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="mb-1 text-sm font-medium opacity-90">Available Balance</div>
                <div className="text-5xl font-bold">
                  ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <div className="mb-1 text-sm opacity-75">Monthly Income</div>
                  <div className="text-2xl font-semibold">${income.toLocaleString()}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm opacity-75">Monthly Spending</div>
                  <div className="text-2xl font-semibold">${spending.toLocaleString()}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm opacity-75">Available for Car Financing</div>
                  <div className="text-2xl font-semibold text-[#00FF9F]">${available.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#004878]/10">
              <BarChart3 className="h-5 w-5 text-[#004878]" />
            </div>
            <div className="mb-1 text-sm text-muted-foreground">Monthly Budget Overview</div>
            <div className="text-2xl font-bold">${(income - spending).toLocaleString()}</div>
            <div className="mt-2 text-xs text-muted-foreground">Remaining this month</div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#00A86B]/10">
              <CreditCard className="h-5 w-5 text-[#00A86B]" />
            </div>
            <div className="mb-1 text-sm text-muted-foreground">Recommended Payment Range</div>
            <div className="text-2xl font-bold">$350-$450</div>
            <div className="mt-2 text-xs text-muted-foreground">Per month</div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#E60012]/10">
              <TrendingUp className="h-5 w-5 text-[#E60012]" />
            </div>
            <div className="mb-1 text-sm text-muted-foreground">Estimated APR Range</div>
            <div className="text-2xl font-bold">4.8-7.1%</div>
            <div className="mt-2 text-xs text-muted-foreground">Based on your profile</div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#004878]/10">
              <Wallet className="h-5 w-5 text-[#004878]" />
            </div>
            <div className="mb-1 text-sm text-muted-foreground">Credit Health Estimate</div>
            <div className="text-2xl font-bold">Good</div>
            <div className="mt-2 text-xs text-muted-foreground">700-750 range</div>
          </Card>
        </motion.div>

        {/* Chatbot */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 right-8 w-96 z-50"
            >
              <Card className="border-[#004878]/20 bg-card shadow-2xl">
                <div className="border-b border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#004878] to-[#E60012]">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">KaBot</div>
                        <div className="text-xs text-muted-foreground">Ask me about your finances or cars</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsChatOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="h-64 overflow-y-auto p-4">
                  {chatMessages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                      Ask me anything about your financial situation, APR rates, or car recommendations!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                              message.role === "user" ? "bg-[#004878] text-white" : "bg-muted text-foreground"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about finances or cars..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage} className="bg-[#004878] hover:bg-[#003557]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link href="/preferences" className="mt-3 block">
                    <Button className="w-full bg-[#004878] hover:bg-[#003557]">
                      Let's Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Chatbot Icon */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-8 right-8 z-40 flex items-center gap-3 rounded-full bg-gradient-to-br from-[#004878] to-[#E60012] px-6 py-4 text-white shadow-2xl transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="font-semibold">KaBot</span>
        </motion.button>
      </div>
    </div>
  )
}
