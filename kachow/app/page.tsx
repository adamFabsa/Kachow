"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { AuthDialog } from "@/components/auth-dialog"
import Image from "next/image"

export default function HomePage() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/kachow-logo.png" alt="Kachow" width={180} height={60} className="h-14 w-auto" />
          </Link>
          {/* </CHANGE> */}
          <div className="flex items-center gap-4">
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto mt-16 max-w-6xl px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/2024-toyota-corolla-hybrid-silver.jpg"
                alt="Toyota Corolla Hybrid"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/2024-honda-civic-blue.jpg" alt="Honda Civic" fill className="object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
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
