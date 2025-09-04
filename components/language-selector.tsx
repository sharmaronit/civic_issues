/**
 * Language Selector Component
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"

import { languages } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <Select value={currentLanguage.code} onValueChange={setLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.nativeName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
