"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, BookOpen, Paintbrush, Brain, PartyPopper, Shuffle, Flame } from "lucide-react"

// Challenge categories and their respective challenges
const categories = [
  {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    color: "bg-red-500",
    challenges: [
      "Hacer 30 sentadillas.",
      "Salir a correr por 15 minutos.",
      "No consumir azúcar por 24 horas.",
      "Hacer 20 flexiones.",
      "Estirar durante 10 minutos.",
      "Beber 2 litros de agua hoy.",
      "Caminar 5000 pasos.",
      "Hacer 3 series de 10 abdominales.",
      "Mantener una posición de plancha durante 1 minuto.",
      "Subir y bajar escaleras durante 5 minutos.",
      "Hacer 15 burpees.",
      "Saltar la cuerda durante 3 minutos.",
      "Hacer 20 sentadillas con salto.",
      "Realizar una caminata de 30 minutos.",
      "Hacer yoga durante 15 minutos.",
    ],
  },
  {
    id: "reading",
    name: "Lectura",
    icon: BookOpen,
    color: "bg-blue-500",
    challenges: [
      "Leer 10 páginas de un libro.",
      "Buscar una palabra nueva en el diccionario y usarla.",
      "Leer un artículo sobre un tema desconocido.",
      "Leer un poema en voz alta.",
      "Resumir el último libro que leíste.",
      "Recomendar un libro a un amigo.",
      "Leer un capítulo de un género literario que nunca lees.",
      "Escribir una reseña de un libro que hayas leído.",
      "Leer noticias de un país diferente al tuyo.",
      "Memorizar un poema corto.",
      "Leer en voz alta durante 10 minutos.",
      "Investigar sobre un autor que no conoces.",
      "Leer un cuento corto completo.",
      "Crear una lista de libros que quieres leer este año.",
      "Intercambiar recomendaciones de libros con un amigo.",
    ],
  },
  {
    id: "creativity",
    name: "Creatividad",
    icon: Paintbrush,
    color: "bg-purple-500",
    challenges: [
      "Dibuja algo en 5 minutos sin borrar.",
      "Escribe una historia corta de 100 palabras.",
      "Toma una foto artística con tu celular.",
      "Crear un collage con materiales reciclados.",
      "Escribir una carta a tu yo del futuro.",
      "Inventar una receta nueva.",
      "Diseñar un logo para un negocio imaginario.",
      "Escribir un haiku (poema japonés de tres versos).",
      "Crear una melodía con objetos cotidianos.",
      "Dibujar un autorretrato sin mirar el papel.",
      "Escribir una canción de 4 líneas.",
      "Crear un mapa de un lugar imaginario.",
      "Diseñar un tatuaje que te gustaría tener.",
      "Hacer un video de 15 segundos sobre tu día.",
      "Crear un personaje ficticio con historia completa.",
    ],
  },
  {
    id: "mental",
    name: "Bienestar Mental",
    icon: Brain,
    color: "bg-green-500",
    challenges: [
      "Meditar por 5 minutos.",
      "Escribir tres cosas por las que estás agradecido.",
      "Pasar 1 hora sin redes sociales.",
      "Practicar respiración profunda por 3 minutos.",
      "Hacer una actividad que te relaje.",
      "Organizar un espacio de tu casa.",
      "Escribir tus pensamientos durante 10 minutos sin parar.",
      "Llamar a un ser querido solo para saludar.",
      "Hacer una caminata consciente, prestando atención a cada paso.",
      "Desconectar todos los dispositivos electrónicos por 2 horas.",
      "Practicar afirmaciones positivas frente al espejo.",
      "Hacer algo amable por un extraño.",
      "Visualizar tus metas durante 5 minutos.",
      "Crear una lista de cosas que te hacen feliz.",
      "Perdonar a alguien que te haya lastimado.",
    ],
  },
  {
    id: "fun",
    name: "Diversión",
    icon: PartyPopper,
    color: "bg-yellow-500",
    challenges: [
      "Hablar con un desconocido.",
      "Enviar un mensaje divertido a un amigo.",
      "Aprender un chiste nuevo y contarlo.",
      "Bailar tu canción favorita.",
      "Hacer una videollamada sorpresa a alguien.",
      "Probar una comida que nunca has probado.",
      "Cantar en la ducha a todo volumen.",
      "Hacer un karaoke improvisado.",
      "Jugar un juego de mesa con amigos o familia.",
      "Ver un video de comedia y reírte a carcajadas.",
      "Hacer una guerra de almohadas.",
      "Contar una historia exagerada (pero inofensiva).",
      "Imitar a un personaje famoso durante 5 minutos.",
      "Inventar un juego con objetos que tengas en casa.",
      "Hacer una búsqueda del tesoro para amigos o familia.",
    ],
  },
  {
    id: "daring",
    name: "Atrevido",
    icon: Flame,
    color: "bg-orange-500",
    challenges: [
      "Confiesa quién te gusta del grupo.",
      "Toma un shot o un trago (solo para mayores de edad).",
      "Cuenta una historia vergonzosa de tu vida.",
      "Muestra la última foto que tomaste con tu celular.",
      "Llama a la quinta persona de tus contactos y habla por 30 segundos.",
      "Deja que el grupo vea tus últimos mensajes.",
      "Imita a alguien del grupo hasta que adivinen quién es.",
      "Baila sin música por 30 segundos.",
      "Confiesa algo que nunca le has dicho a nadie.",
      "Deja que alguien publique algo en tus redes sociales.",
      "Envía un mensaje de texto a tu crush o ex.",
      "Haz 10 sentadillas mientras cantas tu canción favorita.",
      "Deja que alguien del grupo te ponga un peinado ridículo.",
      "Cuenta cuál ha sido tu mayor mentira.",
      "Haz una llamada telefónica con acento extranjero.",
      "Revela tu mayor miedo.",
      "Cuenta tu fantasía más extraña.",
      "Deja que alguien revise tu historial de búsqueda.",
      "Actúa como un animal durante 1 minuto.",
      "Cuenta tu sueño más extraño.",
    ],
  },
]

export default function ChallengePage() {
  const [selectedCategory, setSelectedCategory] = useState("random")
  const [spinning, setSpinning] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState("")
  const [wheelRotation, setWheelRotation] = useState(0)
  const [challengeAccepted, setChallengeAccepted] = useState(false)
  const wheelRef = useRef(null)

  // Get challenges based on selected category
  const getChallenges = () => {
    if (selectedCategory === "random") {
      // Combine all challenges from all categories
      const allChallenges = categories.flatMap((category) => category.challenges)
      return allChallenges
    } else {
      const category = categories.find((cat) => cat.id === selectedCategory)
      return category ? category.challenges : []
    }
  }

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setChallengeAccepted(false)
    setSelectedChallenge("")

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
        title: "¡Mi Reto de Hoy!",
        text: `Mi reto de hoy es: ${selectedChallenge}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`Comparte este reto: ${selectedChallenge}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">🎯 RetoTotal </h1>

      <Tabs defaultValue="random" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2">
          <TabsTrigger value="random" className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            <span className="hidden md:inline">Aleatorio</span>
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden md:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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
                  ? categories[index % categories.length].color
                  : categories.find((cat) => cat.id === selectedCategory)?.color || "bg-gray-500"

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
              <span className="font-bold text-lg">¡Gira la ruleta!</span>
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-600 z-10" />
        </div>

        <div className="flex-1">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Tu Reto</CardTitle>
              <CardDescription>
                {selectedCategory === "random"
                  ? "Categoría: Aleatoria"
                  : `Categoría: ${categories.find((cat) => cat.id === selectedCategory)?.name || ""}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedChallenge ? (
                <p className="text-xl font-medium min-h-[80px] flex items-center">{selectedChallenge}</p>
              ) : (
                <p className="text-muted-foreground min-h-[80px] flex items-center">
                  {spinning ? "Seleccionando un reto..." : "Gira la ruleta para obtener un reto"}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button onClick={spinWheel} disabled={spinning} className="flex-1">
                {spinning ? "Girando..." : "Girar Ruleta"}
              </Button>
              {selectedChallenge && !challengeAccepted && (
                <Button onClick={acceptChallenge} variant="outline" className="flex-1">
                  Aceptar Reto
                </Button>
              )}
              {selectedChallenge && (
                <Button onClick={shareChallenge} variant="secondary" className="flex-1">
                  Compartir
                </Button>
              )}
            </CardFooter>
          </Card>

          {challengeAccepted && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <p className="font-medium">¡Has aceptado el reto! 🎉</p>
              <p className="text-sm mt-2">Complétalo y compártelo con tus amigos.</p>
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

