/**
 * Language Context Provider
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { Language, languages } from './translations'

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (code: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  const setLanguage = (code: string) => {
    const language = languages.find(lang => lang.code === code)
    if (language) {
      setCurrentLanguage(language)
    }
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
