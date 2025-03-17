"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, BookOpen, Paintbrush, Brain, PartyPopper, Shuffle, Flame } from "lucide-react"
import { useLanguage, getTranslatedChallenges } from "@/contexts/language-context"

// Challenge categories structure
const categoryStructure = [
  {
    id: "fitness",
    name: "category.fitness",
    icon: Dumbbell,
    color: "bg-red-500",
  },
  {
    id: "reading",
    name: "category.reading",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    id: "creativity",
    name: "category.creativity",
    icon: Paintbrush,
    color: "bg-purple-500",
  },
  {
    id: "mental",
    name: "category.mental",
    icon: Brain,
    color: "bg-green-500",
  },
  {
    id: "fun",
    name: "category.fun",
    icon: PartyPopper,
    color: "bg-yellow-500",
  },
  {
    id: "daring",
    name: "category.daring",
    icon: Flame,
    color: "bg-orange-500",
  },
]

export default function ChallengePage() {
  const { language, t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("random")
  const [spinning, setSpinning] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState("")
  const [wheelRotation, setWheelRotation] = useState(0)
  const [challengeAccepted, setChallengeAccepted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [spinCount, setSpinCount] = useState(0)
  const wheelRef = useRef(null)

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Get challenges based on selected category
  const getChallenges = () => {
    if (selectedCategory === "random") {
      // Combine all challenges from all categories
      const allChallenges = categoryStructure.flatMap((category) => getTranslatedChallenges(category.id, language))
      return allChallenges
    } else {
      return getTranslatedChallenges(selectedCategory, language)
    }
  }

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setChallengeAccepted(false)
    setSelectedChallenge("")

    // Incrementar el contador de giros
    const newSpinCount = spinCount + 1
    setSpinCount(newSpinCount)

    // Abrir el enlace automáticamente cada 5 giros
    if (newSpinCount % 5 === 0) {
      // Esperar a que termine la animación antes de abrir el enlace
      setTimeout(() => {
        window.open("https://filthygracefulspinach.com/ru18pqyk?key=33de50b5b7be9aa3bd1ee46b7459e9e5", "_blank")
      }, 3500) // 3.5 segundos después de girar (un poco después de que se muestre el reto)
    }

    const challenges = getChallenges()
    const randomIndex = Math.floor(Math.random() * challenges.length)
    const randomRotation = 1800 + randomIndex * (360 / challenges.length)

    // Set new rotation
    setWheelRotation((prevRotation) => prevRotation + randomRotation)

    // After animation completes, show the challenge
    setTimeout(() => {
      setSelectedChallenge(challenges[randomIndex])
      setSpinning(false)
    }, 3000)
  }

  const acceptChallenge = () => {
    setChallengeAccepted(true)
  }

  const shareChallenge = () => {
    if (navigator.share && selectedChallenge) {
      navigator.share({
        title: t("app.title"),
        text: `${t("challenge.title")}: ${selectedChallenge}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`${t("button.share")}: ${selectedChallenge}`)
    }
  }

  // Mobile menu component
  const MobileMenu = () => (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-background/80 backdrop-blur-sm border-r border-border text-foreground transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4 pt-12">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 border-border">{t("menu.categories")}</h2>
        <button
          className="block w-full text-left py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md mb-2 transition-colors"
          onClick={() => {
            setSelectedCategory("random")
            toggleMenu()
          }}
        >
          <div className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            <span>{t("category.random")}</span>
          </div>
        </button>
        {categoryStructure.map((category) => (
          <button
            key={category.id}
            className="block w-full text-left py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md mb-2 transition-colors"
            onClick={() => {
              setSelectedCategory(category.id)
              toggleMenu()
            }}
          >
            <div className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span>{t(category.name)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background/50 backdrop-blur-sm text-foreground rounded-lg border border-border/50"
        aria-label="Menu"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile menu */}
      <MobileMenu />

      <h1 className="text-4xl font-bold text-center mb-8">🎯 {t("app.title")}</h1>

      {/* Desktop tabs */}
      <Tabs
        defaultValue="random"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="mb-8 hidden md:block"
      >
        <TabsList className="grid grid-cols-7 gap-2">
          <TabsTrigger value="random" className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            <span className="hidden md:inline">{t("category.random")}</span>
          </TabsTrigger>
          {categoryStructure.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden md:inline">{t(category.name)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Mobile category indicator */}
      <div className="md:hidden mb-4 text-center">
        <span className="font-medium">{t("challenge.category")}: </span>
        <span>
          {selectedCategory === "random"
            ? t("challenge.category.random")
            : t(categoryStructure.find((cat) => cat.id === selectedCategory)?.name || "")}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Wheel */}
          <div
            ref={wheelRef}
            className="absolute inset-0 rounded-full border-4 border-gray-300 overflow-hidden transition-transform duration-3000 ease-out"
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            {getChallenges().map((challenge, index) => {
              const segmentAngle = 360 / getChallenges().length
              const rotation = index * segmentAngle
              const categoryColor =
                selectedCategory === "random"
                  ? categoryStructure[index % categoryStructure.length].color
                  : categoryStructure.find((cat) => cat.id === selectedCategory)?.color || "bg-gray-500"

              return (
                <div
                  key={index}
                  className={`absolute w-full h-full ${categoryColor} opacity-80`}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`,
                  }}
                />
              )
            })}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-center p-4">
              <span className="font-bold text-lg">{t("wheel.spin")}</span>
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-600 z-10" />
        </div>

        <div className="flex-1">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t("challenge.title")}</CardTitle>
              <CardDescription>
                {selectedCategory === "random"
                  ? `${t("challenge.category")}: ${t("challenge.category.random")}`
                  : `${t("challenge.category")}: ${t(categoryStructure.find((cat) => cat.id === selectedCategory)?.name || "")}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedChallenge ? (
                <p className="text-xl font-medium min-h-[80px] flex items-center">{selectedChallenge}</p>
              ) : (
                <p className="text-muted-foreground min-h-[80px] flex items-center">
                  {spinning ? t("challenge.selecting") : t("challenge.instruction")}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button onClick={spinWheel} disabled={spinning} className="flex-1">
                {spinning ? t("button.spinning") : t("button.spin")}
              </Button>
              {selectedChallenge && !challengeAccepted && (
                <Button onClick={acceptChallenge} variant="outline" className="flex-1">
                  {t("button.accept")}
                </Button>
              )}
              {selectedChallenge && (
                <Button onClick={shareChallenge} variant="secondary" className="flex-1">
                  {t("button.share")}
                </Button>
              )}
            </CardFooter>
          </Card>

          {challengeAccepted && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <p className="font-medium">{t("challenge.accepted")}</p>
              <p className="text-sm mt-2">{t("challenge.complete")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div className="fixed bottom-2 right-2 opacity-50 text-lg font-bold rotate-[-15deg] select-none pointer-events-none">
        LEOJHONV
      </div>
    </div>
  )
}

