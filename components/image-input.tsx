/**
 * Image Input Component
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"

import { useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ImageInput({
  label,
  onChange,
}: {
  label: string
  onChange: (file: File | null, previewUrl: string | null) => void
}) {
  const [error, setError] = useState<string | null>(null)

  // Hidden inputs for separate flows
  const cameraInputRef = useRef<HTMLInputElement | null>(null)
  const galleryInputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (file: File | null) => {
    if (!file) {
      onChange(null, null)
      return
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.")
      onChange(null, null)
      return
    }
    setError(null)
    const reader = new FileReader()
    reader.onload = () => {
      onChange(file, (reader.result as string) || null)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-2">
      <Label className="text-sm">{label}</Label>

      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        className="hidden"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        className="hidden"
      />

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => cameraInputRef.current?.click()}>
          Take photo
        </Button>
        <Button type="button" variant="secondary" onClick={() => galleryInputRef.current?.click()}>
          Choose from gallery
        </Button>
      </div>

      {/* Optional small helper text */}
      <p className="text-xs text-muted-foreground">
        On phones, “Take photo” opens the camera. “Choose from gallery” lets you browse files.
      </p>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
