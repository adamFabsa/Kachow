"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Send, Search, Check, MessageCircle, Info } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Car {
  id: number
  name: string
  brand: string
  price: number
  monthlyPayment: number
  apr: number
  image: string
  mpg: string
  match: number
  logo: string
  condition: "new" | "pre-owned"
  type: "sedan" | "suv" | "ev" | "hybrid" | "truck"
}

const allCars: Car[] = [
  // Toyota Cars - Realistic 2024 pricing
  {
    id: 1,
    name: "2024 Toyota Corolla Hybrid",
    brand: "Toyota",
    price: 28150,
    monthlyPayment: 489,
    apr: 6.49,
    image: "/2024-toyota-corolla-hybrid-silver.jpg",
    mpg: "53 city / 52 hwy",
    match: 94,
    logo: "🚗",
    condition: "new",
    type: "hybrid",
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
    match: 96,
    logo: "🚗",
    condition: "pre-owned",
    type: "hybrid",
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
    match: 90,
    logo: "🚗",
    condition: "new",
    type: "sedan",
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
    match: 92,
    logo: "🚗",
    condition: "pre-owned",
    type: "sedan",
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
    match: 86,
    logo: "🚗",
    condition: "new",
    type: "suv",
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
    match: 89,
    logo: "🚗",
    condition: "pre-owned",
    type: "suv",
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
    match: 78,
    logo: "🚗",
    condition: "new",
    type: "suv",
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
    match: 82,
    logo: "🚗",
    condition: "pre-owned",
    type: "suv",
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
    match: 96,
    logo: "🚗",
    condition: "new",
    type: "hybrid",
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
    match: 97,
    logo: "🚗",
    condition: "pre-owned",
    type: "hybrid",
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
    match: 75,
    logo: "🚗",
    condition: "new",
    type: "truck",
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
    match: 78,
    logo: "🚗",
    condition: "pre-owned",
    type: "truck",
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
    match: 68,
    logo: "🚗",
    condition: "new",
    type: "suv",
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
    match: 84,
    logo: "🚗",
    condition: "new",
    type: "hybrid",
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
    match: 79,
    logo: "🚗",
    condition: "new",
    type: "sedan",
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
    match: 72,
    logo: "🚗",
    condition: "new",
    type: "sedan",
  },
  // Sedans - Realistic 2024 pricing
  {
    id: 11,
    name: "2024 Honda Civic",
    brand: "Honda",
    price: 26050,
    monthlyPayment: 453,
    apr: 6.24,
    image: "/2024-honda-civic-blue.jpg",
    mpg: "31 city / 40 hwy",
    match: 92,
    logo: "🚙",
    condition: "new",
    type: "sedan",
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
    match: 94,
    logo: "🚙",
    condition: "pre-owned",
    type: "sedan",
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
    match: 94,
    logo: "🚗",
    condition: "new",
    type: "sedan",
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
    match: 95,
    logo: "🚗",
    condition: "pre-owned",
    type: "sedan",
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
    match: 89,
    logo: "🚘",
    condition: "new",
    type: "sedan",
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
    match: 91,
    logo: "🚘",
    condition: "pre-owned",
    type: "sedan",
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
    match: 93,
    logo: "🚗",
    condition: "new",
    type: "sedan",
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
    match: 95,
    logo: "🚗",
    condition: "pre-owned",
    type: "sedan",
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
    match: 88,
    logo: "🚙",
    condition: "new",
    type: "sedan",
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
    match: 90,
    logo: "🚙",
    condition: "pre-owned",
    type: "sedan",
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
    match: 86,
    logo: "🚘",
    condition: "new",
    type: "sedan",
  },
  // SUVs - Realistic 2024 pricing
  {
    id: 17,
    name: "2024 Mazda CX-30",
    brand: "Mazda",
    price: 26150,
    monthlyPayment: 455,
    apr: 6.24,
    image: "/2024-mazda-cx-30-red.jpg",
    mpg: "25 city / 33 hwy",
    match: 91,
    logo: "🚘",
    condition: "new",
    type: "suv",
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
    match: 93,
    logo: "🚘",
    condition: "pre-owned",
    type: "suv",
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
    match: 87,
    logo: "🚙",
    condition: "new",
    type: "suv",
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
    match: 90,
    logo: "🚙",
    condition: "pre-owned",
    type: "suv",
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
    match: 85,
    logo: "🚙",
    condition: "new",
    type: "suv",
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
    match: 88,
    logo: "🚙",
    condition: "pre-owned",
    type: "suv",
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
    match: 88,
    logo: "🚙",
    condition: "new",
    type: "suv",
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
    match: 91,
    logo: "🚙",
    condition: "pre-owned",
    type: "suv",
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
    match: 86,
    logo: "🚘",
    condition: "new",
    type: "suv",
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
    match: 87,
    logo: "🚗",
    condition: "new",
    type: "suv",
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
    match: 86,
    logo: "🚘",
    condition: "new",
    type: "suv",
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
    match: 71,
    logo: "🚙",
    condition: "new",
    type: "suv",
  },
  // Electric Vehicles (EVs) - Realistic 2024 pricing
  {
    id: 25,
    name: "2024 Tesla Model 3",
    brand: "Tesla",
    price: 42990,
    monthlyPayment: 748,
    apr: 7.09,
    image: "/2024-tesla-model-3-electric-car.jpg",
    mpg: "Electric - 140 MPGe",
    match: 81,
    logo: "⚡",
    condition: "new",
    type: "ev",
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
    match: 84,
    logo: "⚡",
    condition: "pre-owned",
    type: "ev",
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
    match: 92,
    logo: "⚡",
    condition: "new",
    type: "ev",
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
    match: 94,
    logo: "⚡",
    condition: "pre-owned",
    type: "ev",
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
    match: 90,
    logo: "⚡",
    condition: "new",
    type: "ev",
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
    match: 92,
    logo: "⚡",
    condition: "pre-owned",
    type: "ev",
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
    match: 78,
    logo: "⚡",
    condition: "new",
    type: "ev",
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
    match: 77,
    logo: "⚡",
    condition: "new",
    type: "ev",
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
    match: 74,
    logo: "⚡",
    condition: "new",
    type: "ev",
  },
  // Hybrid Vehicles - Realistic 2024 pricing
  {
    id: 31,
    name: "2024 Honda Accord Hybrid",
    brand: "Honda",
    price: 32945,
    monthlyPayment: 573,
    apr: 6.74,
    image: "/2024-honda-accord-hybrid.jpg",
    mpg: "48 city / 47 hwy",
    match: 90,
    logo: "🔋",
    condition: "new",
    type: "hybrid",
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
    match: 92,
    logo: "🔋",
    condition: "pre-owned",
    type: "hybrid",
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
    match: 91,
    logo: "🔋",
    condition: "new",
    type: "hybrid",
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
    match: 93,
    logo: "🔋",
    condition: "pre-owned",
    type: "hybrid",
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
    match: 87,
    logo: "🔋",
    condition: "new",
    type: "hybrid",
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
    match: 90,
    logo: "🔋",
    condition: "pre-owned",
    type: "hybrid",
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
    match: 88,
    logo: "🔋",
    condition: "new",
    type: "hybrid",
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
    match: 87,
    logo: "🔋",
    condition: "new",
    type: "hybrid",
  },
  // Trucks - Realistic 2024 pricing
  {
    id: 36,
    name: "2024 Ford F-150",
    brand: "Ford",
    price: 44280,
    monthlyPayment: 771,
    apr: 7.14,
    image: "/2024-ford-f-150-truck.jpg",
    mpg: "20 city / 26 hwy",
    match: 72,
    logo: "🚐",
    condition: "new",
    type: "truck",
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
    match: 76,
    logo: "🚐",
    condition: "pre-owned",
    type: "truck",
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
    match: 70,
    logo: "🚚",
    condition: "new",
    type: "truck",
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
    match: 74,
    logo: "🚚",
    condition: "pre-owned",
    type: "truck",
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
    match: 71,
    logo: "🚚",
    condition: "new",
    type: "truck",
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
    match: 75,
    logo: "🚚",
    condition: "pre-owned",
    type: "truck",
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
    match: 69,
    logo: "🚐",
    condition: "new",
    type: "truck",
  },
  {
    id: 40,
    name: "2024 Nissan Titan",
    brand: "Nissan",
    price: 41265,
    monthlyPayment: 718,
    apr: 7.04,
    image: "/2024-nissan-titan-truck.jpg",
    mpg: "17 city / 22 hwy",
    match: 70,
    logo: "🚚",
    condition: "new",
    type: "truck",
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
    match: 74,
    logo: "🚚",
    condition: "pre-owned",
    type: "truck",
  },
]

export default function PreferencesPage() {
  const router = useRouter()
  const [budget, setBudget] = useState([400])
  const [zipCode, setZipCode] = useState("")
  const [carType, setCarType] = useState("all")
  const [condition, setCondition] = useState<"all" | "new" | "pre-owned">("all")
  const [longTermGoal, setLongTermGoal] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState([3])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCars, setSelectedCars] = useState<number[]>([])
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm KaBot, here to help you find the perfect car. What are you looking for?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [learnMoreCar, setLearnMoreCar] = useState<Car | null>(null)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    setMessages([
      ...messages,
      { role: "user", text: inputValue },
      {
        role: "ai",
        text: `Got it! Based on your zipcode ${zipCode || "78701"}, gas prices in your area are around $3.15/gallon. With your ${daysPerWeek[0]} days/week usage and ${longTermGoal || "your goals"}, I can help you find the most cost-effective option. Would you prefer hybrid or gas?`,
      },
    ])
    setInputValue("")
  }

  const filteredCars = allCars.filter((car) => {
    const matchesSearch =
      searchQuery === "" ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = carType === "all" || car.type === carType
    const matchesCondition = condition === "all" || car.condition === condition
    return matchesSearch && matchesType && matchesCondition
  })

  const handleCarSelect = (carId: number) => {
    setSelectedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId)
      } else {
        if (prev.length < 3) {
          return [...prev, carId]
        } else {
          return prev
        }
      }
    })
  }

  const handleCompare = () => {
    if (selectedCars.length >= 2) {
      router.push(`/compare?cars=${selectedCars.join(",")}`)
    }
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
              <h1 className="text-2xl font-bold">Car Preferences</h1>
              <p className="text-sm text-muted-foreground">Find and compare cars that fit your budget</p>
            </div>
            <div className="flex gap-3">
              {selectedCars.length >= 2 && (
                <Button onClick={handleCompare} className="gap-2 bg-[#E60012] hover:bg-[#C00000]">
                  Compare ({selectedCars.length})
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <Link href="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold">Your Preferences</h2>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium">Zip Code</label>
                <Input
                  placeholder="Enter your zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full"
                />
                <p className="mt-1 text-xs text-muted-foreground">Used to calculate gas costs in your area</p>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium">Long-Term Goal</label>
                <Input
                  placeholder="e.g., Commuting, family trips, work travel"
                  value={longTermGoal}
                  onChange={(e) => setLongTermGoal(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium">
                  Days Per Week: <span className="font-bold text-[#004878]">{daysPerWeek[0]}</span>
                </label>
                <Slider
                  value={daysPerWeek}
                  onValueChange={setDaysPerWeek}
                  max={7}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>1 day</span>
                  <span>7 days</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium">
                  Monthly Budget: <span className="font-bold text-[#004878]">${budget[0]}</span>
                </label>
                <Slider value={budget} onValueChange={setBudget} max={1000} min={200} step={50} className="w-full" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>$200</span>
                  <span>$1,000</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium">Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["all", "new", "pre-owned"] as const).map((cond) => (
                    <button
                      key={cond}
                      onClick={() => setCondition(cond)}
                      className={`rounded-xl border-2 p-3 text-center text-sm capitalize transition-all ${
                        condition === cond
                          ? "border-[#004878] bg-[#004878]/5"
                          : "border-border hover:border-[#004878]/50"
                      }`}
                    >
                      {cond === "pre-owned" ? "Pre-Owned" : cond}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium">Car Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {["all", "sedan", "suv", "ev", "hybrid", "truck"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setCarType(type)}
                      className={`rounded-xl border-2 p-3 text-left capitalize transition-all ${
                        carType === type ? "border-[#004878] bg-[#004878]/5" : "border-border hover:border-[#004878]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by car name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {selectedCars.length > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {selectedCars.length} car{selectedCars.length > 1 ? "s" : ""} selected (max 3)
                </p>
                <Button variant="outline" size="sm" onClick={() => setSelectedCars([])}>
                  Clear Selection
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Card
                    className={`group relative overflow-hidden transition-all hover:shadow-xl ${
                      selectedCars.includes(car.id) ? "ring-2 ring-[#004878]" : ""
                    }`}
                  >
                    <div className="absolute left-4 top-4 z-10">
                      <div
                        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded border-2 transition-all ${
                          selectedCars.includes(car.id)
                            ? "border-[#004878] bg-[#004878]"
                            : "border-gray-400 bg-white hover:border-[#004878]"
                        }`}
                        onClick={() => handleCarSelect(car.id)}
                      >
                        {selectedCars.includes(car.id) && <Check className="h-4 w-4 text-white" />}
                      </div>
                    </div>

                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute right-3 top-3 rounded-full bg-[#00A86B] px-3 py-1 text-xs font-semibold text-white">
                        {car.match}% Match
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-2xl">{car.logo}</span>
                        <h3 className="text-lg font-bold">{car.name}</h3>
                      </div>

                      <div className="mb-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-semibold">${car.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly:</span>
                          <span className="font-semibold text-[#004878]">${car.monthlyPayment}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">APR:</span>
                          <span className="font-semibold">{car.apr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MPG:</span>
                          <span className="font-semibold">{car.mpg}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full gap-2 bg-transparent"
                        onClick={() => setLearnMoreCar(car)}
                      >
                        <Info className="h-4 w-4" />
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No cars found matching your search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl border bg-card shadow-2xl"
          >
            <div className="flex h-[500px] flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#004878] to-[#E60012]">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">KaBot</div>
                    <div className="text-xs text-muted-foreground">Financial Assistant</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                  ✕
                </Button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === "user" ? "bg-[#004878] text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about finances..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-[#004878] hover:bg-[#003557]">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-[#004878] to-[#E60012] px-6 py-4 text-white shadow-2xl transition-all hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-semibold">KaBot</span>
      </motion.button>

      <Dialog open={!!learnMoreCar} onOpenChange={() => setLearnMoreCar(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <span>{learnMoreCar?.logo}</span>
              {learnMoreCar?.name}
            </DialogTitle>
            <DialogDescription>Deep dive into whether this car is the right fit for you</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Purpose */}
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-[#004878]">
                <span>🎯</span> Purpose & Best Use Case
              </h3>
              <p className="text-sm text-muted-foreground">
                {learnMoreCar?.brand === "Toyota" && learnMoreCar?.name.includes("Corolla")
                  ? "Perfect for daily commuters seeking excellent fuel economy and reliability. Ideal for urban driving with occasional highway trips."
                  : learnMoreCar?.brand === "Toyota" && learnMoreCar?.name.includes("RAV4")
                    ? "Great for families needing space and versatility. Excellent for weekend adventures and daily family errands."
                    : "A well-rounded vehicle suitable for various driving needs, from commuting to weekend getaways."}
              </p>
            </div>

            {/* Positives */}
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-[#00A86B]">
                <span>✓</span> What Makes This Car Great
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Outstanding fuel efficiency saves you money on gas</li>
                <li>• Strong resale value protects your investment</li>
                <li>• Low maintenance costs reduce long-term expenses</li>
                <li>• Reliable performance with proven track record</li>
              </ul>
            </div>

            {/* Negatives */}
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-[#E60012]">
                <span>⚠</span> Considerations & Trade-offs
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Higher upfront cost compared to non-hybrid alternatives</li>
                <li>• Limited cargo space may not suit large families</li>
                <li>• Modest acceleration for highway merging</li>
              </ul>
            </div>

            {/* KaBot Advice */}
            <div className="rounded-lg bg-gradient-to-r from-[#004878]/10 to-[#E60012]/10 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <MessageCircle className="h-5 w-5 text-[#004878]" />
                KaBot's Financial Advice
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your ${budget[0]}/month budget and {daysPerWeek[0]} days/week usage, this car{" "}
                {(learnMoreCar?.monthlyPayment || 0) <= budget[0] ? (
                  <span className="font-semibold text-[#00A86B]">fits comfortably within your budget</span>
                ) : (
                  <span className="font-semibold text-[#E60012]">
                    exceeds your budget by ${(learnMoreCar?.monthlyPayment || 0) - budget[0]}/month
                  </span>
                )}
                . {zipCode && `With gas prices around $3.18/gallon in your area (${zipCode}), `}
                {learnMoreCar?.mpg.includes("Electric") ? (
                  <>
                    this electric vehicle eliminates gas costs entirely, saving you approximately $150-200/month
                    compared to gas vehicles.
                  </>
                ) : (
                  <>
                    the {learnMoreCar?.mpg} efficiency will save you approximately $
                    {Math.round(
                      (30 - Number.parseInt(learnMoreCar?.mpg.split(" ")[0] || "30")) * 3.18 * daysPerWeek[0] * 4.33,
                    )}
                    /month compared to less efficient vehicles.
                  </>
                )}
                {longTermGoal && ` For your goal of "${longTermGoal}", this vehicle aligns well with your needs.`}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
