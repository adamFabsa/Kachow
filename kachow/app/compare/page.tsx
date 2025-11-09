"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

const allCars = [
  {
    id: 1,
    name: "2024 Toyota Corolla Hybrid",
    brand: "Toyota",
    price: 28150,
    monthlyPayment: 489,
    apr: 6.49,
    image: "/2024-toyota-corolla-hybrid-silver.jpg",
    mpg: "53 city / 52 hwy",
    mpgCombined: 52,
    financialFit: 94,
  },
  {
    id: 2,
    name: "2024 Toyota Camry",
    brand: "Toyota",
    price: 29980,
    monthlyPayment: 521,
    apr: 6.49,
    image: "/2024-toyota-camry-sedan.jpg",
    mpg: "28 city / 39 hwy",
    mpgCombined: 33,
    financialFit: 90,
  },
  {
    id: 3,
    name: "2024 Toyota RAV4",
    brand: "Toyota",
    price: 34580,
    monthlyPayment: 601,
    apr: 6.74,
    image: "/2024-toyota-rav4-suv.jpg",
    mpg: "27 city / 35 hwy",
    mpgCombined: 31,
    financialFit: 86,
  },
  {
    id: 4,
    name: "2024 Toyota Highlander",
    brand: "Toyota",
    price: 42950,
    monthlyPayment: 747,
    apr: 7.09,
    image: "/2024-toyota-highlander-suv.jpg",
    mpg: "21 city / 29 hwy",
    mpgCombined: 25,
    financialFit: 78,
  },
  {
    id: 5,
    name: "2024 Toyota Prius",
    brand: "Toyota",
    price: 28545,
    monthlyPayment: 496,
    apr: 6.49,
    image: "/2024-toyota-prius-hybrid.jpg",
    mpg: "57 city / 56 hwy",
    mpgCombined: 56,
    financialFit: 96,
  },
  {
    id: 6,
    name: "2024 Toyota Tacoma",
    brand: "Toyota",
    price: 38290,
    monthlyPayment: 666,
    apr: 6.99,
    image: "/2024-toyota-tacoma-truck.jpg",
    mpg: "20 city / 24 hwy",
    mpgCombined: 22,
    financialFit: 75,
  },
  {
    id: 7,
    name: "2024 Toyota 4Runner",
    brand: "Toyota",
    price: 47470,
    monthlyPayment: 826,
    apr: 7.24,
    image: "/2024-toyota-4runner-suv.jpg",
    mpg: "16 city / 19 hwy",
    mpgCombined: 17,
    financialFit: 68,
  },
  {
    id: 8,
    name: "2024 Toyota Sienna",
    brand: "Toyota",
    price: 39775,
    monthlyPayment: 692,
    apr: 7.04,
    image: "/2024-toyota-sienna-minivan.jpg",
    mpg: "36 city / 36 hwy",
    mpgCombined: 36,
    financialFit: 84,
  },
  {
    id: 9,
    name: "2024 Toyota Crown",
    brand: "Toyota",
    price: 41775,
    monthlyPayment: 726,
    apr: 7.09,
    image: "/2024-toyota-crown-sedan.jpg",
    mpg: "29 city / 37 hwy",
    mpgCombined: 33,
    financialFit: 79,
  },
  {
    id: 10,
    name: "2024 Toyota GR86",
    brand: "Toyota",
    price: 30795,
    monthlyPayment: 536,
    apr: 6.64,
    image: "/2024-toyota-gr86-sports-car.jpg",
    mpg: "20 city / 30 hwy",
    mpgCombined: 25,
    financialFit: 72,
  },
  {
    id: 11,
    name: "2024 Honda Civic",
    brand: "Honda",
    price: 26050,
    monthlyPayment: 453,
    apr: 6.24,
    image: "/2024-honda-civic-blue.jpg",
    mpg: "31 city / 40 hwy",
    mpgCombined: 35,
    financialFit: 92,
  },
  {
    id: 12,
    name: "2024 Hyundai Elantra",
    brand: "Hyundai",
    price: 23800,
    monthlyPayment: 414,
    apr: 5.99,
    image: "/2024-hyundai-elantra-sedan.jpg",
    mpg: "33 city / 43 hwy",
    mpgCombined: 38,
    financialFit: 94,
  },
  {
    id: 13,
    name: "2024 Nissan Altima",
    brand: "Nissan",
    price: 27840,
    monthlyPayment: 484,
    apr: 6.49,
    image: "/2024-nissan-altima-sedan.jpg",
    mpg: "28 city / 39 hwy",
    mpgCombined: 33,
    financialFit: 89,
  },
  {
    id: 14,
    name: "2024 Volkswagen Jetta",
    brand: "Volkswagen",
    price: 22995,
    monthlyPayment: 400,
    apr: 5.99,
    image: "/2024-volkswagen-jetta-sedan.jpg",
    mpg: "30 city / 41 hwy",
    mpgCombined: 35,
    financialFit: 93,
  },
  {
    id: 15,
    name: "2024 Honda Accord",
    brand: "Honda",
    price: 30895,
    monthlyPayment: 537,
    apr: 6.64,
    image: "/2024-honda-accord-sedan.jpg",
    mpg: "30 city / 38 hwy",
    mpgCombined: 34,
    financialFit: 88,
  },
  {
    id: 16,
    name: "2024 Mazda6",
    brand: "Mazda",
    price: 28225,
    monthlyPayment: 491,
    apr: 6.49,
    image: "/2024-mazda6-sedan.jpg",
    mpg: "26 city / 35 hwy",
    mpgCombined: 30,
    financialFit: 86,
  },
  {
    id: 17,
    name: "2024 Mazda CX-30",
    brand: "Mazda",
    price: 26150,
    monthlyPayment: 455,
    apr: 6.24,
    image: "/2024-mazda-cx-30-red.jpg",
    mpg: "25 city / 33 hwy",
    mpgCombined: 29,
    financialFit: 91,
  },
  {
    id: 18,
    name: "2024 Kia Sportage",
    brand: "Kia",
    price: 29390,
    monthlyPayment: 511,
    apr: 6.54,
    image: "/2024-kia-sportage-suv.jpg",
    mpg: "23 city / 30 hwy",
    mpgCombined: 26,
    financialFit: 87,
  },
  {
    id: 19,
    name: "2024 Subaru Outback",
    brand: "Subaru",
    price: 31420,
    monthlyPayment: 546,
    apr: 6.69,
    image: "/2024-subaru-outback-wagon.jpg",
    mpg: "26 city / 33 hwy",
    mpgCombined: 29,
    financialFit: 85,
  },
  {
    id: 20,
    name: "2024 Honda CR-V",
    brand: "Honda",
    price: 33615,
    monthlyPayment: 585,
    apr: 6.79,
    image: "/2024-honda-crv-suv.jpg",
    mpg: "28 city / 34 hwy",
    mpgCombined: 31,
    financialFit: 88,
  },
  {
    id: 21,
    name: "2024 Mazda CX-5",
    brand: "Mazda",
    price: 30265,
    monthlyPayment: 526,
    apr: 6.59,
    image: "/2024-mazda-cx5-suv.jpg",
    mpg: "24 city / 30 hwy",
    mpgCombined: 27,
    financialFit: 86,
  },
  {
    id: 22,
    name: "2024 Hyundai Tucson",
    brand: "Hyundai",
    price: 29950,
    monthlyPayment: 521,
    apr: 6.54,
    image: "/2024-hyundai-tucson-suv.jpg",
    mpg: "26 city / 32 hwy",
    mpgCombined: 29,
    financialFit: 87,
  },
  {
    id: 23,
    name: "2024 Nissan Rogue",
    brand: "Nissan",
    price: 31880,
    monthlyPayment: 554,
    apr: 6.69,
    image: "/2024-nissan-rogue-suv.jpg",
    mpg: "27 city / 35 hwy",
    mpgCombined: 31,
    financialFit: 86,
  },
  {
    id: 24,
    name: "2024 Jeep Grand Cherokee",
    brand: "Jeep",
    price: 45630,
    monthlyPayment: 794,
    apr: 7.19,
    image: "/2024-jeep-grand-cherokee-suv.jpg",
    mpg: "19 city / 26 hwy",
    mpgCombined: 22,
    financialFit: 71,
  },
  {
    id: 25,
    name: "2024 Tesla Model 3",
    brand: "Tesla",
    price: 42990,
    monthlyPayment: 748,
    apr: 7.09,
    image: "/2024-tesla-model-3-electric-car.jpg",
    mpg: "Electric - 140 MPGe",
    mpgCombined: 140,
    financialFit: 81,
  },
  {
    id: 26,
    name: "2024 Chevrolet Bolt EV",
    brand: "Chevrolet",
    price: 27495,
    monthlyPayment: 478,
    apr: 6.44,
    image: "/2024-chevrolet-bolt-ev.jpg",
    mpg: "Electric - 120 MPGe",
    mpgCombined: 120,
    financialFit: 92,
  },
  {
    id: 27,
    name: "2024 Nissan Leaf",
    brand: "Nissan",
    price: 29280,
    monthlyPayment: 509,
    apr: 6.54,
    image: "/2024-nissan-leaf-ev.jpg",
    mpg: "Electric - 123 MPGe",
    mpgCombined: 123,
    financialFit: 90,
  },
  {
    id: 28,
    name: "2024 Hyundai Ioniq 5",
    brand: "Hyundai",
    price: 43975,
    monthlyPayment: 765,
    apr: 7.14,
    image: "/2024-hyundai-ioniq5-ev.jpg",
    mpg: "Electric - 114 MPGe",
    mpgCombined: 114,
    financialFit: 78,
  },
  {
    id: 29,
    name: "2024 Ford Mustang Mach-E",
    brand: "Ford",
    price: 43895,
    monthlyPayment: 764,
    apr: 7.14,
    image: "/2024-ford-mustang-mache-ev.jpg",
    mpg: "Electric - 105 MPGe",
    mpgCombined: 105,
    financialFit: 77,
  },
  {
    id: 30,
    name: "2024 Kia EV6",
    brand: "Kia",
    price: 47795,
    monthlyPayment: 832,
    apr: 7.24,
    image: "/2024-kia-ev6-electric.jpg",
    mpg: "Electric - 117 MPGe",
    mpgCombined: 117,
    financialFit: 74,
  },
  {
    id: 31,
    name: "2024 Honda Accord Hybrid",
    brand: "Honda",
    price: 32945,
    monthlyPayment: 573,
    apr: 6.74,
    image: "/2024-honda-accord-hybrid.jpg",
    mpg: "48 city / 47 hwy",
    mpgCombined: 47,
    financialFit: 90,
  },
  {
    id: 32,
    name: "2024 Hyundai Sonata Hybrid",
    brand: "Hyundai",
    price: 30250,
    monthlyPayment: 526,
    apr: 6.59,
    image: "/2024-hyundai-sonata-hybrid.jpg",
    mpg: "45 city / 51 hwy",
    mpgCombined: 48,
    financialFit: 91,
  },
  {
    id: 33,
    name: "2024 Toyota RAV4 Hybrid",
    brand: "Toyota",
    price: 37230,
    monthlyPayment: 648,
    apr: 6.94,
    image: "/2024-toyota-rav4-hybrid.jpg",
    mpg: "41 city / 38 hwy",
    mpgCombined: 39,
    financialFit: 87,
  },
  {
    id: 34,
    name: "2024 Kia Sportage Hybrid",
    brand: "Kia",
    price: 33265,
    monthlyPayment: 579,
    apr: 6.74,
    image: "/2024-kia-sportage-hybrid.jpg",
    mpg: "43 city / 37 hwy",
    mpgCombined: 40,
    financialFit: 88,
  },
  {
    id: 35,
    name: "2024 Ford Escape Hybrid",
    brand: "Ford",
    price: 35295,
    monthlyPayment: 614,
    apr: 6.84,
    image: "/2024-ford-escape-hybrid.jpg",
    mpg: "44 city / 37 hwy",
    mpgCombined: 40,
    financialFit: 87,
  },
  {
    id: 36,
    name: "2024 Ford F-150",
    brand: "Ford",
    price: 44280,
    monthlyPayment: 771,
    apr: 7.14,
    image: "/2024-ford-f-150-truck.jpg",
    mpg: "20 city / 26 hwy",
    mpgCombined: 23,
    financialFit: 72,
  },
  {
    id: 37,
    name: "2024 Chevrolet Silverado",
    brand: "Chevrolet",
    price: 42225,
    monthlyPayment: 735,
    apr: 7.09,
    image: "/2024-chevrolet-silverado-truck.jpg",
    mpg: "17 city / 24 hwy",
    mpgCombined: 20,
    financialFit: 70,
  },
  {
    id: 38,
    name: "2024 Ram 1500",
    brand: "Ram",
    price: 45750,
    monthlyPayment: 796,
    apr: 7.19,
    image: "/2024-ram-1500-truck.jpg",
    mpg: "18 city / 25 hwy",
    mpgCombined: 21,
    financialFit: 71,
  },
  {
    id: 39,
    name: "2024 GMC Sierra",
    brand: "GMC",
    price: 46895,
    monthlyPayment: 817,
    apr: 7.24,
    image: "/2024-gmc-sierra-truck.jpg",
    mpg: "16 city / 23 hwy",
    mpgCombined: 19,
    financialFit: 69,
  },
  {
    id: 40,
    name: "2024 Nissan Titan",
    brand: "Nissan",
    price: 39775,
    monthlyPayment: 692,
    apr: 7.04,
    image: "/2024-nissan-titan-truck.jpg",
    mpg: "36 city / 36 hwy",
    mpgCombined: 36,
    financialFit: 84,
  },
  {
    id: 41,
    name: "2022 Toyota Corolla Hybrid",
    brand: "Toyota",
    price: 22450,
    monthlyPayment: 391,
    apr: 7.24,
    image: "/2024-toyota-corolla-hybrid-silver.jpg",
    mpg: "53 city / 52 hwy",
    mpgCombined: 52,
    financialFit: 96,
  },
  {
    id: 42,
    name: "2021 Toyota Camry",
    brand: "Toyota",
    price: 23150,
    monthlyPayment: 403,
    apr: 7.49,
    image: "/2024-toyota-camry-sedan.jpg",
    mpg: "28 city / 39 hwy",
    mpgCombined: 33,
    financialFit: 92,
  },
  {
    id: 43,
    name: "2021 Toyota RAV4",
    brand: "Toyota",
    price: 26890,
    monthlyPayment: 468,
    apr: 7.74,
    image: "/2024-toyota-rav4-suv.jpg",
    mpg: "27 city / 35 hwy",
    mpgCombined: 31,
    financialFit: 89,
  },
  {
    id: 44,
    name: "2020 Toyota Highlander",
    brand: "Toyota",
    price: 32650,
    monthlyPayment: 569,
    apr: 7.99,
    image: "/2024-toyota-highlander-suv.jpg",
    mpg: "21 city / 29 hwy",
    mpgCombined: 25,
    financialFit: 82,
  },
  {
    id: 45,
    name: "2022 Toyota Prius",
    brand: "Toyota",
    price: 24190,
    monthlyPayment: 421,
    apr: 7.24,
    image: "/2024-toyota-prius-hybrid.jpg",
    mpg: "57 city / 56 hwy",
    mpgCombined: 56,
    financialFit: 97,
  },
  {
    id: 46,
    name: "2021 Toyota Tacoma",
    brand: "Toyota",
    price: 31450,
    monthlyPayment: 548,
    apr: 7.74,
    image: "/2024-toyota-tacoma-truck.jpg",
    mpg: "20 city / 24 hwy",
    mpgCombined: 22,
    financialFit: 78,
  },
  {
    id: 47,
    name: "2021 Honda Civic",
    brand: "Honda",
    price: 19850,
    monthlyPayment: 346,
    apr: 7.49,
    image: "/2024-honda-civic-blue.jpg",
    mpg: "31 city / 40 hwy",
    mpgCombined: 35,
    financialFit: 94,
  },
  {
    id: 48,
    name: "2022 Hyundai Elantra",
    brand: "Hyundai",
    price: 18450,
    monthlyPayment: 322,
    apr: 7.24,
    image: "/2024-hyundai-elantra-sedan.jpg",
    mpg: "33 city / 43 hwy",
    mpgCombined: 38,
    financialFit: 95,
  },
  {
    id: 49,
    name: "2021 Nissan Altima",
    brand: "Nissan",
    price: 21650,
    monthlyPayment: 377,
    apr: 7.74,
    image: "/2024-nissan-altima-sedan.jpg",
    mpg: "28 city / 39 hwy",
    mpgCombined: 33,
    financialFit: 91,
  },
  {
    id: 50,
    name: "2022 Volkswagen Jetta",
    brand: "Volkswagen",
    price: 18750,
    monthlyPayment: 327,
    apr: 7.24,
    image: "/2024-volkswagen-jetta-sedan.jpg",
    mpg: "30 city / 41 hwy",
    mpgCombined: 35,
    financialFit: 95,
  },
  {
    id: 51,
    name: "2021 Honda Accord",
    brand: "Honda",
    price: 24190,
    monthlyPayment: 421,
    apr: 7.74,
    image: "/2024-honda-accord-sedan.jpg",
    mpg: "30 city / 38 hwy",
    mpgCombined: 34,
    financialFit: 90,
  },
  {
    id: 52,
    name: "2021 Mazda CX-30",
    brand: "Mazda",
    price: 20850,
    monthlyPayment: 363,
    apr: 7.49,
    image: "/2024-mazda-cx-30-red.jpg",
    mpg: "25 city / 33 hwy",
    mpgCombined: 29,
    financialFit: 93,
  },
  {
    id: 53,
    name: "2021 Kia Sportage",
    brand: "Kia",
    price: 22950,
    monthlyPayment: 400,
    apr: 7.74,
    image: "/2024-kia-sportage-suv.jpg",
    mpg: "23 city / 30 hwy",
    mpgCombined: 26,
    financialFit: 90,
  },
  {
    id: 54,
    name: "2020 Subaru Outback",
    brand: "Subaru",
    price: 24650,
    monthlyPayment: 429,
    apr: 7.99,
    image: "/2024-subaru-outback-wagon.jpg",
    mpg: "26 city / 33 hwy",
    mpgCombined: 29,
    financialFit: 88,
  },
  {
    id: 55,
    name: "2021 Honda CR-V",
    brand: "Honda",
    price: 26350,
    monthlyPayment: 459,
    apr: 7.74,
    image: "/2024-honda-crv-suv.jpg",
    mpg: "28 city / 34 hwy",
    mpgCombined: 31,
    financialFit: 91,
  },
  {
    id: 56,
    name: "2022 Tesla Model 3",
    brand: "Tesla",
    price: 35450,
    monthlyPayment: 618,
    apr: 7.84,
    image: "/2024-tesla-model-3-electric-car.jpg",
    mpg: "Electric - 140 MPGe",
    mpgCombined: 140,
    financialFit: 84,
  },
  {
    id: 57,
    name: "2022 Chevrolet Bolt EV",
    brand: "Chevrolet",
    price: 22150,
    monthlyPayment: 386,
    apr: 7.24,
    image: "/2024-chevrolet-bolt-ev.jpg",
    mpg: "Electric - 120 MPGe",
    mpgCombined: 120,
    financialFit: 94,
  },
  {
    id: 58,
    name: "2021 Nissan Leaf",
    brand: "Nissan",
    price: 21750,
    monthlyPayment: 379,
    apr: 7.74,
    image: "/2024-nissan-leaf-ev.jpg",
    mpg: "Electric - 123 MPGe",
    mpgCombined: 123,
    financialFit: 92,
  },
  {
    id: 59,
    name: "2021 Honda Accord Hybrid",
    brand: "Honda",
    price: 25850,
    monthlyPayment: 450,
    apr: 7.74,
    image: "/2024-honda-accord-hybrid.jpg",
    mpg: "48 city / 47 hwy",
    mpgCombined: 47,
    financialFit: 92,
  },
  {
    id: 60,
    name: "2021 Hyundai Sonata Hybrid",
    brand: "Hyundai",
    price: 23650,
    monthlyPayment: 412,
    apr: 7.74,
    image: "/2024-hyundai-sonata-hybrid.jpg",
    mpg: "45 city / 51 hwy",
    mpgCombined: 48,
    financialFit: 93,
  },
  {
    id: 61,
    name: "2021 Toyota RAV4 Hybrid",
    brand: "Toyota",
    price: 29150,
    monthlyPayment: 508,
    apr: 7.74,
    image: "/2024-toyota-rav4-hybrid.jpg",
    mpg: "41 city / 38 hwy",
    mpgCombined: 39,
    financialFit: 90,
  },
  {
    id: 62,
    name: "2021 Ford F-150",
    brand: "Ford",
    price: 34650,
    monthlyPayment: 604,
    apr: 7.99,
    image: "/2024-ford-f-150-truck.jpg",
    mpg: "20 city / 26 hwy",
    mpgCombined: 23,
    financialFit: 76,
  },
  {
    id: 63,
    name: "2021 Chevrolet Silverado",
    brand: "Chevrolet",
    price: 33450,
    monthlyPayment: 583,
    apr: 7.99,
    image: "/2024-chevrolet-silverado-truck.jpg",
    mpg: "17 city / 24 hwy",
    mpgCombined: 20,
    financialFit: 74,
  },
  {
    id: 64,
    name: "2020 Ram 1500",
    brand: "Ram",
    price: 35850,
    monthlyPayment: 625,
    apr: 7.99,
    image: "/2024-ram-1500-truck.jpg",
    mpg: "18 city / 25 hwy",
    mpgCombined: 21,
    financialFit: 75,
  },
  {
    id: 65,
    name: "2020 Nissan Titan",
    brand: "Nissan",
    price: 32450,
    monthlyPayment: 566,
    apr: 7.99,
    image: "/2024-nissan-titan-truck.jpg",
    mpg: "17 city / 22 hwy",
    mpgCombined: 19,
    financialFit: 74,
  },
]

export default function ComparePage() {
  const searchParams = useSearchParams()
  const carIdsParam = searchParams.get("cars")
  const selectedCarIds = carIdsParam ? carIdsParam.split(",").map(Number) : []

  const selectedCarData = allCars.filter((car) => selectedCarIds.includes(car.id))

  const bestCar = selectedCarData.reduce(
    (best, car) => (car.financialFit > best.financialFit ? car : best),
    selectedCarData[0],
  )

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
              <h1 className="text-2xl font-bold">Compare Cars</h1>
              <p className="text-sm text-muted-foreground">See how different cars fit your financial situation</p>
            </div>
            <Link href="/preferences">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back to Cars
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {selectedCarData.length > 0 ? (
          <>
            {/* Financial Fit Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold">Financial Fit Score</h2>
                <div className="space-y-6">
                  {selectedCarData.map((car) => (
                    <div key={car.id}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium">{car.name}</span>
                        <span
                          className={`text-2xl font-bold ${car.id === bestCar?.id ? "text-[#00A86B]" : "text-[#004878]"}`}
                        >
                          {car.financialFit}%
                          {car.id === bestCar?.id && <span className="ml-2 text-sm">✓ Best Match</span>}
                        </span>
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
                {selectedCarData.map((car) => (
                  <Card key={car.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                      {car.id === bestCar?.id && (
                        <div className="absolute right-3 top-3 rounded-full bg-[#00A86B] px-3 py-1 text-xs font-semibold text-white">
                          Best Match
                        </div>
                      )}
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
                          <span className="font-semibold">${car.monthlyPayment}/mo</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Total Cost (60mo)</span>
                          </div>
                          <span className="font-semibold">${(car.monthlyPayment * 60).toLocaleString()}</span>
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
                          {car.monthlyPayment <= 550 ? (
                            <>
                              <TrendingDown className="h-5 w-5 text-[#00A86B]" />
                              <span className="text-sm font-medium text-[#00A86B]">
                                Excellent fit - Well within budget
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingUp className="h-5 w-5 text-[#E60012]" />
                              <span className="text-sm font-medium text-[#E60012]">
                                Tight fit - Higher monthly cost
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

            {/* Monthly Payment and MPG Comparison Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              {/* Monthly Payment Comparison Chart */}
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold">Monthly Payment Comparison</h2>
                <div className="space-y-4">
                  {selectedCarData.map((car) => (
                    <div key={car.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{car.brand}</span>
                        <span className="text-lg font-bold">${car.monthlyPayment}/mo</span>
                      </div>
                      <div className="relative h-12 w-full overflow-hidden rounded-lg bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(car.monthlyPayment / Math.max(...selectedCarData.map((c) => c.monthlyPayment))) * 100}%`,
                          }}
                          transition={{ delay: 0.8, duration: 1 }}
                          className="flex h-full items-center justify-end bg-gradient-to-r from-[#004878] to-[#E60012] px-4 text-sm font-semibold text-white"
                        >
                          ${car.monthlyPayment}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* MPG Comparison Chart */}
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold">Fuel Efficiency Comparison</h2>
                <div className="space-y-4">
                  {selectedCarData.map((car) => (
                    <div key={car.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{car.brand}</span>
                        <span className="text-lg font-bold">{car.mpgCombined} MPG</span>
                      </div>
                      <div className="relative h-12 w-full overflow-hidden rounded-lg bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(car.mpgCombined / Math.max(...selectedCarData.map((c) => c.mpgCombined))) * 100}%`,
                          }}
                          transition={{ delay: 1, duration: 1 }}
                          className="flex h-full items-center justify-end bg-gradient-to-r from-[#00A86B] to-[#004878] px-4 text-sm font-semibold text-white"
                        >
                          {car.mpgCombined}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </>
        ) : (
          <Card className="p-12 text-center">
            <h2 className="mb-2 text-xl font-semibold">No Cars Selected</h2>
            <p className="mb-6 text-muted-foreground">Please select 2-3 cars from the preferences page to compare.</p>
            <Link href="/preferences">
              <Button className="bg-[#004878] hover:bg-[#003557]">Go to Car Selection</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
