"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Definir los idiomas disponibles
export type Language = "es" | "en"

// Definir el contexto
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navegación y UI general
    "app.title": "RetoTotal",
    "app.subtitle": "Desafíos",
    "category.random": "Aleatorio",
    "category.fitness": "Fitness",
    "category.reading": "Lectura",
    "category.creativity": "Creatividad",
    "category.mental": "Bienestar Mental",
    "category.fun": "Diversión",
    "category.daring": "Atrevido",
    "wheel.spin": "¡Gira la ruleta!",
    "challenge.title": "Tu Reto",
    "challenge.category": "Categoría",
    "challenge.category.random": "Aleatoria",
    "challenge.selecting": "Seleccionando un reto...",
    "challenge.instruction": "Gira la ruleta para obtener un reto",
    "button.spin": "Girar Ruleta",
    "button.spinning": "Girando...",
    "button.accept": "Aceptar Reto",
    "button.share": "Compartir",
    "challenge.accepted": "¡Has aceptado el reto! 🎉",
    "challenge.complete": "Complétalo y compártelo con tus amigos.",
    "menu.categories": "Categorías",
    "language.es": "Español",
    "language.en": "English",
    "language.select": "Idioma",
  },
  en: {
    // Navigation and general UI
    "app.title": "RetoTotal",
    "app.subtitle": "Challenges",
    "category.random": "Random",
    "category.fitness": "Fitness",
    "category.reading": "Reading",
    "category.creativity": "Creativity",
    "category.mental": "Mental Wellness",
    "category.fun": "Fun",
    "category.daring": "Daring",
    "wheel.spin": "Spin the wheel!",
    "challenge.title": "Your Challenge",
    "challenge.category": "Category",
    "challenge.category.random": "Random",
    "challenge.selecting": "Selecting a challenge...",
    "challenge.instruction": "Spin the wheel to get a challenge",
    "button.spin": "Spin Wheel",
    "button.spinning": "Spinning...",
    "button.accept": "Accept Challenge",
    "button.share": "Share",
    "challenge.accepted": "You've accepted the challenge! 🎉",
    "challenge.complete": "Complete it and share it with your friends.",
    "menu.categories": "Categories",
    "language.es": "Español",
    "language.en": "English",
    "language.select": "Language",
  },
}

// Traducciones de los retos
const challengeTranslations: Record<Language, Record<string, string>> = {
  es: {
    // Fitness
    "fitness.1": "Hacer 30 sentadillas.",
    "fitness.2": "Salir a correr por 15 minutos.",
    "fitness.3": "No consumir azúcar por 24 horas.",
    "fitness.4": "Hacer 20 flexiones.",
    "fitness.5": "Estirar durante 10 minutos.",
    "fitness.6": "Beber 2 litros de agua hoy.",
    "fitness.7": "Caminar 5000 pasos.",
    "fitness.8": "Hacer 3 series de 10 abdominales.",
    "fitness.9": "Mantener una posición de plancha durante 1 minuto.",
    "fitness.10": "Subir y bajar escaleras durante 5 minutos.",
    "fitness.11": "Hacer 15 burpees.",
    "fitness.12": "Saltar la cuerda durante 3 minutos.",
    "fitness.13": "Hacer 20 sentadillas con salto.",
    "fitness.14": "Realizar una caminata de 30 minutos.",
    "fitness.15": "Hacer yoga durante 15 minutos.",

    // Reading
    "reading.1": "Leer 10 páginas de un libro.",
    "reading.2": "Buscar una palabra nueva en el diccionario y usarla.",
    "reading.3": "Leer un artículo sobre un tema desconocido.",
    "reading.4": "Leer un poema en voz alta.",
    "reading.5": "Resumir el último libro que leíste.",
    "reading.6": "Recomendar un libro a un amigo.",
    "reading.7": "Leer un capítulo de un género literario que nunca lees.",
    "reading.8": "Escribir una reseña de un libro que hayas leído.",
    "reading.9": "Leer noticias de un país diferente al tuyo.",
    "reading.10": "Memorizar un poema corto.",
    "reading.11": "Leer en voz alta durante 10 minutos.",
    "reading.12": "Investigar sobre un autor que no conoces.",
    "reading.13": "Leer un cuento corto completo.",
    "reading.14": "Crear una lista de libros que quieres leer este año.",
    "reading.15": "Intercambiar recomendaciones de libros con un amigo.",

    // Creativity
    "creativity.1": "Dibuja algo en 5 minutos sin borrar.",
    "creativity.2": "Escribe una historia corta de 100 palabras.",
    "creativity.3": "Toma una foto artística con tu celular.",
    "creativity.4": "Crear un collage con materiales reciclados.",
    "creativity.5": "Escribir una carta a tu yo del futuro.",
    "creativity.6": "Inventar una receta nueva.",
    "creativity.7": "Diseñar un logo para un negocio imaginario.",
    "creativity.8": "Escribir un haiku (poema japonés de tres versos).",
    "creativity.9": "Crear una melodía con objetos cotidianos.",
    "creativity.10": "Dibujar un autorretrato sin mirar el papel.",
    "creativity.11": "Escribir una canción de 4 líneas.",
    "creativity.12": "Crear un mapa de un lugar imaginario.",
    "creativity.13": "Diseñar un tatuaje que te gustaría tener.",
    "creativity.14": "Hacer un video de 15 segundos sobre tu día.",
    "creativity.15": "Crear un personaje ficticio con historia completa.",

    // Mental
    "mental.1": "Meditar por 5 minutos.",
    "mental.2": "Escribir tres cosas por las que estás agradecido.",
    "mental.3": "Pasar 1 hora sin redes sociales.",
    "mental.4": "Practicar respiración profunda por 3 minutos.",
    "mental.5": "Hacer una actividad que te relaje.",
    "mental.6": "Organizar un espacio de tu casa.",
    "mental.7": "Escribir tus pensamientos durante 10 minutos sin parar.",
    "mental.8": "Llamar a un ser querido solo para saludar.",
    "mental.9": "Hacer una caminata consciente, prestando atención a cada paso.",
    "mental.10": "Desconectar todos los dispositivos electrónicos por 2 horas.",
    "mental.11": "Practicar afirmaciones positivas frente al espejo.",
    "mental.12": "Hacer algo amable por un extraño.",
    "mental.13": "Visualizar tus metas durante 5 minutos.",
    "mental.14": "Crear una lista de cosas que te hacen feliz.",
    "mental.15": "Perdonar a alguien que te haya lastimado.",

    // Fun
    "fun.1": "Hablar con un desconocido.",
    "fun.2": "Enviar un mensaje divertido a un amigo.",
    "fun.3": "Aprender un chiste nuevo y contarlo.",
    "fun.4": "Bailar tu canción favorita.",
    "fun.5": "Hacer una videollamada sorpresa a alguien.",
    "fun.6": "Probar una comida que nunca has probado.",
    "fun.7": "Cantar en la ducha a todo volumen.",
    "fun.8": "Hacer un karaoke improvisado.",
    "fun.9": "Jugar un juego de mesa con amigos o familia.",
    "fun.10": "Ver un video de comedia y reírte a carcajadas.",
    "fun.11": "Hacer una guerra de almohadas.",
    "fun.12": "Contar una historia exagerada (pero inofensiva).",
    "fun.13": "Imitar a un personaje famoso durante 5 minutos.",
    "fun.14": "Inventar un juego con objetos que tengas en casa.",
    "fun.15": "Hacer una búsqueda del tesoro para amigos o familia.",

    // Daring
    "daring.1": "Confiesa quién te gusta del grupo.",
    "daring.2": "Toma un shot o un trago (solo para mayores de edad).",
    "daring.3": "Cuenta una historia vergonzosa de tu vida.",
    "daring.4": "Muestra la última foto que tomaste con tu celular.",
    "daring.5": "Llama a la quinta persona de tus contactos y habla por 30 segundos.",
    "daring.6": "Deja que el grupo vea tus últimos mensajes.",
    "daring.7": "Imita a alguien del grupo hasta que adivinen quién es.",
    "daring.8": "Baila sin música por 30 segundos.",
    "daring.9": "Confiesa algo que nunca le has dicho a nadie.",
    "daring.10": "Deja que alguien publique algo en tus redes sociales.",
    "daring.11": "Envía un mensaje de texto a tu crush o ex.",
    "daring.12": "Haz 10 sentadillas mientras cantas tu canción favorita.",
    "daring.13": "Deja que alguien del grupo te ponga un peinado ridículo.",
    "daring.14": "Cuenta cuál ha sido tu mayor mentira.",
    "daring.15": "Haz una llamada telefónica con acento extranjero.",
    "daring.16": "Revela tu mayor miedo.",
    "daring.17": "Cuenta tu fantasía más extraña.",
    "daring.18": "Deja que alguien revise tu historial de búsqueda.",
    "daring.19": "Actúa como un animal durante 1 minuto.",
    "daring.20": "Cuenta tu sueño más extraño.",
  },
  en: {
    // Fitness
    "fitness.1": "Do 30 squats.",
    "fitness.2": "Go for a 15-minute run.",
    "fitness.3": "Don't consume sugar for 24 hours.",
    "fitness.4": "Do 20 push-ups.",
    "fitness.5": "Stretch for 10 minutes.",
    "fitness.6": "Drink 2 liters of water today.",
    "fitness.7": "Walk 5000 steps.",
    "fitness.8": "Do 3 sets of 10 sit-ups.",
    "fitness.9": "Hold a plank position for 1 minute.",
    "fitness.10": "Go up and down stairs for 5 minutes.",
    "fitness.11": "Do 15 burpees.",
    "fitness.12": "Jump rope for 3 minutes.",
    "fitness.13": "Do 20 jump squats.",
    "fitness.14": "Take a 30-minute walk.",
    "fitness.15": "Do yoga for 15 minutes.",

    // Reading
    "reading.1": "Read 10 pages of a book.",
    "reading.2": "Look up a new word in the dictionary and use it.",
    "reading.3": "Read an article about an unfamiliar topic.",
    "reading.4": "Read a poem out loud.",
    "reading.5": "Summarize the last book you read.",
    "reading.6": "Recommend a book to a friend.",
    "reading.7": "Read a chapter from a genre you never read.",
    "reading.8": "Write a review of a book you've read.",
    "reading.9": "Read news from a country different from yours.",
    "reading.10": "Memorize a short poem.",
    "reading.11": "Read aloud for 10 minutes.",
    "reading.12": "Research an author you don't know.",
    "reading.13": "Read a complete short story.",
    "reading.14": "Create a list of books you want to read this year.",
    "reading.15": "Exchange book recommendations with a friend.",

    // Creativity
    "creativity.1": "Draw something in 5 minutes without erasing.",
    "creativity.2": "Write a 100-word short story.",
    "creativity.3": "Take an artistic photo with your phone.",
    "creativity.4": "Create a collage with recycled materials.",
    "creativity.5": "Write a letter to your future self.",
    "creativity.6": "Invent a new recipe.",
    "creativity.7": "Design a logo for an imaginary business.",
    "creativity.8": "Write a haiku (Japanese three-line poem).",
    "creativity.9": "Create a melody with everyday objects.",
    "creativity.10": "Draw a self-portrait without looking at the paper.",
    "creativity.11": "Write a 4-line song.",
    "creativity.12": "Create a map of an imaginary place.",
    "creativity.13": "Design a tattoo you'd like to have.",
    "creativity.14": "Make a 15-second video about your day.",
    "creativity.15": "Create a fictional character with a complete backstory.",

    // Mental
    "mental.1": "Meditate for 5 minutes.",
    "mental.2": "Write down three things you're grateful for.",
    "mental.3": "Spend 1 hour without social media.",
    "mental.4": "Practice deep breathing for 3 minutes.",
    "mental.5": "Do an activity that relaxes you.",
    "mental.6": "Organize a space in your home.",
    "mental.7": "Write your thoughts for 10 minutes without stopping.",
    "mental.8": "Call a loved one just to say hello.",
    "mental.9": "Take a mindful walk, paying attention to each step.",
    "mental.10": "Disconnect all electronic devices for 2 hours.",
    "mental.11": "Practice positive affirmations in front of the mirror.",
    "mental.12": "Do something kind for a stranger.",
    "mental.13": "Visualize your goals for 5 minutes.",
    "mental.14": "Create a list of things that make you happy.",
    "mental.15": "Forgive someone who has hurt you.",

    // Fun
    "fun.1": "Talk to a stranger.",
    "fun.2": "Send a funny message to a friend.",
    "fun.3": "Learn a new joke and tell it.",
    "fun.4": "Dance to your favorite song.",
    "fun.5": "Make a surprise video call to someone.",
    "fun.6": "Try a food you've never had before.",
    "fun.7": "Sing loudly in the shower.",
    "fun.8": "Do an impromptu karaoke.",
    "fun.9": "Play a board game with friends or family.",
    "fun.10": "Watch a comedy video and laugh out loud.",
    "fun.11": "Have a pillow fight.",
    "fun.12": "Tell an exaggerated (but harmless) story.",
    "fun.13": "Imitate a famous character for 5 minutes.",
    "fun.14": "Invent a game with objects you have at home.",
    "fun.15": "Create a treasure hunt for friends or family.",

    // Daring
    "daring.1": "Confess who you like in the group.",
    "daring.2": "Take a shot or a drink (only for adults).",
    "daring.3": "Tell an embarrassing story from your life.",
    "daring.4": "Show the last photo you took with your phone.",
    "daring.5": "Call the fifth person in your contacts and talk for 30 seconds.",
    "daring.6": "Let the group see your recent messages.",
    "daring.7": "Imitate someone in the group until they guess who it is.",
    "daring.8": "Dance without music for 30 seconds.",
    "daring.9": "Confess something you've never told anyone.",
    "daring.10": "Let someone post something on your social media.",
    "daring.11": "Send a text message to your crush or ex.",
    "daring.12": "Do 10 squats while singing your favorite song.",
    "daring.13": "Let someone in the group give you a ridiculous hairstyle.",
    "daring.14": "Tell what your biggest lie has been.",
    "daring.15": "Make a phone call with a foreign accent.",
    "daring.16": "Reveal your biggest fear.",
    "daring.17": "Tell your strangest fantasy.",
    "daring.18": "Let someone check your search history.",
    "daring.19": "Act like an animal for 1 minute.",
    "daring.20": "Tell your weirdest dream.",
  },
}

// Proveedor del contexto
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para el idioma actual
  const [language, setLanguage] = useState<Language>("es")

  // Cargar el idioma guardado al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Guardar el idioma cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Función para obtener una traducción
  const t = (key: string): string => {
    // Primero buscar en traducciones generales
    if (translations[language][key]) {
      return translations[language][key]
    }

    // Luego buscar en traducciones de retos
    if (challengeTranslations[language][key]) {
      return challengeTranslations[language][key]
    }

    // Si no se encuentra, devolver la clave
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Hook para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Función para obtener los retos traducidos
export const getTranslatedChallenges = (categoryId: string, language: Language): string[] => {
  const challenges: string[] = []
  let i = 1

  while (challengeTranslations[language][`${categoryId}.${i}`]) {
    challenges.push(challengeTranslations[language][`${categoryId}.${i}`])
    i++
  }

  return challenges
}

