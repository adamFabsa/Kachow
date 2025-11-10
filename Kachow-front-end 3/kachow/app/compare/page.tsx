"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

// Sample car data
const availableCars = [
  {
    id: 1,
    name: "2024 Toyota Corolla Hybrid",
    price: 28500,
    image: "/2024-toyota-corolla-hybrid-silver.jpg",
    mpg: 52,
    monthlyPayment: 425,
    totalCost: 30240,
    apr: 5.2,
    term: 60,
    downPayment: 3000,
    financialFit: 92,
  },
  {
    id: 2,
    name: "2024 Honda Civic",
    price: 26500,
    image: "/2024-honda-civic-blue.jpg",
    mpg: 35,
    monthlyPayment: 390,
    totalCost: 28200,
    apr: 4.9,
    term: 60,
    downPayment: 3000,
    financialFit: 95,
  },
  {
    id: 3,
    name: "2024 Mazda CX-30",
    price: 32000,
    image: "/2024-mazda-cx-30-red.jpg",
    mpg: 28,
    monthlyPayment: 475,
    totalCost: 33750,
    apr: 5.8,
    term: 60,
    downPayment: 3000,
    financialFit: 85,
  },
]

export default function ComparePage() {
  const [selectedCars, setSelectedCars] = useState<number[]>([1, 2])

  const toggleCarSelection = (carId: number) => {
    if (selectedCars.includes(carId)) {
      setSelectedCars(selectedCars.filter((id) => id !== carId))
    } else {
      if (selectedCars.length < 3) {
        setSelectedCars([...selectedCars, carId])
      }
    }
  }

  const selectedCarData = availableCars.filter((car) => selectedCars.includes(car.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Compare Cars</h1>
              <p className="text-sm text-muted-foreground">See how different cars fit your financial situation</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Car Selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Select Cars to Compare (up to 3)</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {availableCars.map((car) => (
                <div
                  key={car.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                    selectedCars.includes(car.id) ? "border-[#004878] bg-[#004878]/5" : "border-border"
                  }`}
                  onClick={() => toggleCarSelection(car.id)}
                >
                  <Checkbox checked={selectedCars.includes(car.id)} />
                  <div className="flex-1">
                    <div className="font-medium">{car.name}</div>
                    <div className="text-sm text-muted-foreground">${car.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {selectedCarData.length > 0 && (
          <>
            {/* Financial Fit Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8"
            >
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold">Financial Fit Score</h2>
                <div className="space-y-6">
                  {selectedCarData.map((car) => (
                    <div key={car.id}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium">{car.name}</span>
                        <span className="text-2xl font-bold text-[#004878]">{car.financialFit}%</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${car.financialFit}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className={`h-full rounded-full ${
                            car.financialFit >= 90
                              ? "bg-[#00A86B]"
                              : car.financialFit >= 80
                                ? "bg-[#004878]"
                                : "bg-[#E60012]"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Detailed Comparison Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {selectedCarData.map((car, index) => (
                  <Card key={car.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold">{car.name}</h3>
                      <div className="mb-4 text-2xl font-bold text-[#004878]">${car.price.toLocaleString()}</div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Monthly Payment</span>
                          </div>
                          <span className="font-semibold">${car.monthlyPayment}</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Total Cost</span>
                          </div>
                          <span className="font-semibold">${car.totalCost.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">APR</span>
                          </div>
                          <span className="font-semibold">{car.apr}%</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">MPG</span>
                          </div>
                          <span className="font-semibold">{car.mpg}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 text-sm text-muted-foreground">Impact on Monthly Budget</div>
                        <div className="flex items-center gap-2">
                          {car.monthlyPayment <= 400 ? (
                            <>
                              <TrendingDown className="h-5 w-5 text-[#00A86B]" />
                              <span className="text-sm font-medium text-[#00A86B]">
                                Excellent fit - Leaves ${1700 - car.monthlyPayment} available
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingUp className="h-5 w-5 text-[#E60012]" />
                              <span className="text-sm font-medium text-[#E60012]">
                                Tight fit - Leaves ${1700 - car.monthlyPayment} available
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Monthly Payment Comparison Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8"
            >
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold">Monthly Payment Comparison</h2>
                <div className="space-y-4">
                  {selectedCarData.map((car) => (
                    <div key={car.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{car.name}</span>
                        <span className="text-lg font-bold">${car.monthlyPayment}/mo</span>
                      </div>
                      <div className="relative h-12 w-full overflow-hidden rounded-lg bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(car.monthlyPayment / 500) * 100}%` }}
                          transition={{ delay: 0.8, duration: 1 }}
                          className="flex h-full items-center justify-end bg-gradient-to-r from-[#004878] to-[#E60012] px-4 text-sm font-semibold text-white"
                        >
                          {((car.monthlyPayment / 1700) * 100).toFixed(1)}% of budget
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg bg-[#004878]/5 p-4">
                  <div className="text-sm text-muted-foreground">Your Available Monthly Budget</div>
                  <div className="text-2xl font-bold text-[#004878]">$1,700</div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
