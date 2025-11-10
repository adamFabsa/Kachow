"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, Info, Sparkles, ThumbsUp, ThumbsDown, Lightbulb, Target } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

const carRecommendations = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla Hybrid",
    year: 2024,
    image: "/2024-toyota-corolla-hybrid-silver.jpg",
    monthlyPayment: 349,
    aprRange: "5.2-5.8%",
    reliability: 98,
    maintenanceCost: "$320/yr",
    description: "Perfect balance of efficiency and reliability",
    purpose: "Daily commuter that maximizes fuel efficiency and minimizes long-term costs",
    positives: [
      "Outstanding fuel economy at 52 MPG combined",
      "Low maintenance costs and high reliability rating",
      "Monthly payment fits comfortably within your budget",
      "Strong resale value retains investment",
    ],
    negatives: [
      "Less powerful acceleration compared to non-hybrid models",
      "Compact size may feel cramped for taller passengers",
      "Battery replacement cost after warranty period",
    ],
    advice:
      "This car is an excellent financial choice for your situation. With $1,700 available monthly, the $349 payment leaves you with plenty of cushion. The hybrid technology will save you approximately $800/year in fuel costs compared to a traditional sedan. KaBot recommends this as your top choice for long-term value.",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2024,
    image: "/2024-honda-civic-blue.jpg",
    monthlyPayment: 365,
    aprRange: "5.4-6.0%",
    reliability: 96,
    maintenanceCost: "$380/yr",
    description: "Sporty and fuel-efficient",
    purpose: "Versatile sedan offering a balance of performance, efficiency, and practicality",
    positives: [
      "Fun-to-drive with responsive handling",
      "Spacious interior with modern technology features",
      "Strong reliability track record",
      "Good fuel economy at 35 MPG combined",
    ],
    negatives: [
      "Higher monthly payment than some alternatives",
      "Premium features require higher trim levels",
      "Slightly higher maintenance costs than Toyota",
    ],
    advice:
      "The Civic offers a great balance of performance and efficiency. At $365/month, it's still well within your budget. While maintenance costs are slightly higher than the Corolla, the driving experience and interior space make it worthwhile. KaBot suggests this if you value driving dynamics alongside practicality.",
  },
  {
    id: 3,
    make: "Mazda",
    model: "CX-30",
    year: 2024,
    image: "/2024-mazda-cx-30-red.jpg",
    monthlyPayment: 395,
    aprRange: "5.6-6.2%",
    reliability: 94,
    maintenanceCost: "$410/yr",
    description: "Compact SUV with premium feel",
    purpose: "Elevated driving position and cargo versatility in a compact, upscale package",
    positives: [
      "Premium interior quality and materials",
      "Higher seating position and better visibility",
      "All-wheel drive available for better traction",
      "Stylish design stands out from competitors",
    ],
    negatives: [
      "Higher monthly payment stretches your budget",
      "Lower fuel economy at 28 MPG",
      "Smaller cargo space than larger SUVs",
      "Higher maintenance and insurance costs",
    ],
    advice:
      "This SUV pushes the upper limit of your comfortable budget at $395/month. While it offers premium features and AWD capability, the higher payment and fuel costs mean less financial flexibility. KaBot recommends this only if you specifically need SUV features or AWD, otherwise stick with a sedan for better value.",
  },
  {
    id: 4,
    make: "Hyundai",
    model: "Elantra",
    year: 2024,
    image: "/2024-hyundai-elantra-white.jpg",
    monthlyPayment: 329,
    aprRange: "5.0-5.6%",
    reliability: 93,
    maintenanceCost: "$340/yr",
    description: "Value-packed sedan",
    purpose: "Affordable sedan with plenty of features and value for money",
    positives: [
      "High value for money with a wide range of features",
      "Reliable performance and good fuel economy",
      "Comfortable and spacious interior",
      "Affordable monthly payment of $329",
    ],
    negatives: [
      "Less premium interior compared to luxury sedans",
      "Standard features may not match higher-end trims",
      "Potentially lower resale value compared to premium brands",
    ],
    advice:
      "The Elantra is a solid choice for those looking for a reliable and affordable sedan. With a monthly payment of $329, it fits well within your budget. The car offers a good balance of features and performance, making it a practical choice for daily commuting.",
  },
  {
    id: 5,
    make: "Subaru",
    model: "Crosstrek",
    year: 2024,
    image: "/2024-subaru-crosstrek-orange.jpg",
    monthlyPayment: 385,
    aprRange: "5.5-6.1%",
    reliability: 95,
    maintenanceCost: "$420/yr",
    description: "AWD adventure ready",
    purpose: "AWD capability for reliable performance in various weather conditions",
    positives: [
      "All-wheel drive provides better traction in snow and rain",
      "Sturdy build and high reliability rating",
      "Good fuel economy at 27 MPG combined",
      "Compact SUV with easy handling",
    ],
    negatives: [
      "Higher monthly payment than some alternatives",
      "Smaller cargo space than larger SUVs",
      "Higher maintenance costs compared to sedans",
      "Potentially lower resale value due to higher depreciation",
    ],
    advice:
      "The Crosstrek is an excellent choice for those who require AWD capability for reliable performance in various weather conditions. With a monthly payment of $385, it fits well within your budget. The car offers a good balance of features and performance, making it a practical choice for daily commuting and occasional off-road adventures.",
  },
  {
    id: 6,
    make: "Kia",
    model: "Forte",
    year: 2024,
    image: "/2024-kia-forte-gray.jpg",
    monthlyPayment: 319,
    aprRange: "4.9-5.5%",
    reliability: 92,
    maintenanceCost: "$350/yr",
    description: "Affordable and feature-rich",
    purpose: "Compact sedan offering a wide range of features at an affordable price",
    positives: [
      "Affordable monthly payment of $319",
      "Feature-rich with modern technology options",
      "Reliable performance and good fuel economy",
      "Compact size for easy parking and maneuvering",
    ],
    negatives: [
      "Lower reliability rating compared to premium brands",
      "Higher maintenance costs over time",
      "Less premium interior compared to luxury sedans",
    ],
    advice:
      "The Forte is an excellent choice for those looking for an affordable and feature-rich compact sedan. With a monthly payment of $319, it fits well within your budget. The car offers a good balance of features and performance, making it a practical choice for daily commuting.",
  },
]

export default function RecommendationsPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedCar, setSelectedCar] = useState<(typeof carRecommendations)[0] | null>(null)
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)

  const handleLearnMore = (car: (typeof carRecommendations)[0]) => {
    setSelectedCar(car)
    setLearnMoreOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Your Personalized Recommendations</h1>
              <p className="text-sm text-muted-foreground">Based on your financial profile and preferences</p>
            </div>
            <Link href="/preferences">
              <Button variant="outline">Back to Preferences</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Summary Bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="mb-8 border-0 bg-gradient-to-r from-[#004878]/10 to-[#E60012]/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Bank Account:</span>
                <span className="font-semibold">Capital One Checking ****983</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Budget:</span>
                <span className="font-semibold text-[#00A86B]">$350/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">APR:</span>
                <span className="font-semibold text-[#004878]">~5.5%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="font-semibold">Austin, TX</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Car Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {carRecommendations.map((car, idx) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredCard(car.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card className="group overflow-hidden transition-all hover:shadow-xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {idx === 0 && (
                        <Badge className="absolute right-3 top-3 bg-[#00A86B] hover:bg-[#00A86B]">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Best Match
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">{car.description}</p>
                      </div>

                      <div className="mb-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Payment</span>
                          <span className="font-bold text-[#004878]">${car.monthlyPayment}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">APR Range</span>
                          <span className="font-semibold">{car.aprRange}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Reliability</span>
                          <span className="font-semibold text-[#00A86B]">{car.reliability}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Maintenance</span>
                          <span className="font-semibold">{car.maintenanceCost}</span>
                        </div>
                      </div>

                      {hoveredCard === car.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mb-4 rounded-xl border border-[#004878]/20 bg-[#004878]/5 p-3"
                        >
                          <div className="text-xs leading-relaxed text-muted-foreground">
                            💡 <strong>Total cost over 5 years:</strong> ${(car.monthlyPayment * 60).toLocaleString()}
                            <br />
                            Including estimated interest and maintenance
                          </div>
                        </motion.div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleLearnMore(car)}
                        >
                          Learn More
                        </Button>
                        <Button
                          className="flex-1 bg-[#E60012] hover:bg-[#C00000]"
                          onClick={() => router.push("/compare")}
                        >
                          Compare
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:sticky lg:top-6 lg:h-fit"
          >
            <Card className="border-[#004878]/20 bg-gradient-to-br from-[#004878]/5 to-[#E60012]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#004878] to-[#E60012]">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">KaBot</div>
                  <div className="text-xs text-muted-foreground">Your Financial Advisor</div>
                </div>
              </div>

              <div className="mb-4 rounded-xl border border-[#004878]/20 bg-background p-4">
                <p className="mb-3 text-sm leading-relaxed">
                  The <strong>Toyota Corolla Hybrid</strong> fits your budget perfectly — affordable, efficient, and
                  low-maintenance.
                </p>
                <p className="text-xs text-muted-foreground">
                  With your 5.5% APR, you'll pay approximately $21,000 total over 5 years.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#004878]" />
                  <div className="text-xs leading-relaxed">
                    <strong>APR Tip:</strong> APR includes both interest and fees. A lower APR saves you thousands over
                    the loan term.
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00A86B]" />
                  <div className="text-xs leading-relaxed">
                    <strong>Loan Term:</strong> Shorter loans mean higher monthly payments but less total interest paid.
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#E60012]" />
                  <div className="text-xs leading-relaxed">
                    <strong>Hybrid Savings:</strong> Consider hybrids for long-term fuel cost savings and lower
                    emissions.
                  </div>
                </div>
              </div>

              <Button className="mt-6 w-full bg-[#004878] hover:bg-[#003557]">
                Chat with KaBot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Learn More Dialog with detailed car analysis */}
      <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedCar.year} {selectedCar.make} {selectedCar.model}
                </DialogTitle>
                <DialogDescription>Deep analysis powered by KaBot - Your AI Financial Assistant</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Car Image */}
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src={selectedCar.image || "/placeholder.svg"}
                    alt={`${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Purpose Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#004878]/10">
                      <Target className="h-4 w-4 text-[#004878]" />
                    </div>
                    <h3 className="text-lg font-semibold">Purpose & Best For</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-10">{selectedCar.purpose}</p>
                </div>

                {/* Positives Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A86B]/10">
                      <ThumbsUp className="h-4 w-4 text-[#00A86B]" />
                    </div>
                    <h3 className="text-lg font-semibold">What's Great</h3>
                  </div>
                  <ul className="space-y-2 pl-10">
                    {selectedCar.positives.map((positive, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-[#00A86B] mt-1">✓</span>
                        <span>{positive}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Negatives Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E60012]/10">
                      <ThumbsDown className="h-4 w-4 text-[#E60012]" />
                    </div>
                    <h3 className="text-lg font-semibold">Considerations</h3>
                  </div>
                  <ul className="space-y-2 pl-10">
                    {selectedCar.negatives.map((negative, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-[#E60012] mt-1">⚠</span>
                        <span>{negative}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* KaBot's Advice */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#004878] to-[#E60012]">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">KaBot's Advice</h3>
                  </div>
                  <div className="pl-10 rounded-lg border border-[#004878]/20 bg-[#004878]/5 p-4">
                    <p className="text-sm leading-relaxed">{selectedCar.advice}</p>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="rounded-lg border border-border bg-muted p-4 space-y-2">
                  <h4 className="font-semibold mb-3">Financial Summary</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Monthly Payment:</span>
                      <div className="font-bold text-[#004878]">${selectedCar.monthlyPayment}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">APR Range:</span>
                      <div className="font-semibold">{selectedCar.aprRange}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reliability:</span>
                      <div className="font-semibold text-[#00A86B]">{selectedCar.reliability}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Maintenance:</span>
                      <div className="font-semibold">{selectedCar.maintenanceCost}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-[#E60012] hover:bg-[#C00000]"
                    onClick={() => {
                      setLearnMoreOpen(false)
                      router.push("/compare")
                    }}
                  >
                    Compare This Car
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setLearnMoreOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
