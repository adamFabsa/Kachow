"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { AuthDialog } from "@/components/auth-dialog"

export default function HomePage() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#004878] to-[#E60012]">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">Kachow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#about">
              <Button variant="ghost">About</Button>
            </Link>
            <Button onClick={() => setAuthDialogOpen(true)} className="bg-[#004878] hover:bg-[#003557]">
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#004878]/10 via-[#E60012]/5 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-6xl px-6 text-center"
        >
          <h1 className="mb-6 text-balance text-6xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Drive Smarter.{" "}
            <span className="bg-gradient-to-r from-[#004878] to-[#E60012] bg-clip-text text-transparent">
              Spend Wiser.
            </span>
          </h1>

          <p className="mb-10 text-balance text-xl text-muted-foreground md:text-2xl">
            AI-powered car recommendations built around your finances.
          </p>

          <Button
            size="lg"
            onClick={() => setAuthDialogOpen(true)}
            className="h-14 bg-[#004878] px-8 text-lg hover:bg-[#003557]"
          >
            Login to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Animated Background Elements */}
          <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-[#004878]/5 blur-3xl" />
          <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-[#E60012]/5 blur-3xl" />
        </motion.div>

        {/* Feature Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#004878]/10">
              <Shield className="h-6 w-6 text-[#004878]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Real Financial Data</h3>
            <p className="text-sm text-muted-foreground">
              Connect your bank account securely to get personalized recommendations
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E60012]/10">
              <Zap className="h-6 w-6 text-[#E60012]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Smart APR Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Understand how interest rates affect your total cost of ownership
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#00A86B]/10">
              <TrendingUp className="h-6 w-6 text-[#00A86B]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Long-Term Savings</h3>
            <p className="text-sm text-muted-foreground">
              Factor in maintenance, reliability, and resale value for smart decisions
            </p>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">About Kachow</h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Kachow helps you find the right car for your budget by analyzing your real financial data. Our AI
              considers your income, APR, and long-term costs — so every decision feels confident and informed. We
              combine the trust of Capital One with the automotive precision of Toyota Financial Services to deliver
              personalized recommendations that fit your life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div>
              <div className="mb-2 text-4xl font-bold text-[#004878]">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-[#E60012]">$2.3k</div>
              <div className="text-sm text-muted-foreground">Avg. Savings</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-[#00A86B]">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-foreground">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-gradient-to-br from-[#004878]/5 to-[#E60012]/5 p-12"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to find your perfect car?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Connect your account and get personalized recommendations in seconds.
            </p>
            <Button
              size="lg"
              onClick={() => setAuthDialogOpen(true)}
              className="h-14 bg-[#E60012] px-8 text-lg hover:bg-[#C00000]"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  )
}
