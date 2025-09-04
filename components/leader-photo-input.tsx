/**
 * Leader Photo Input Component
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { StateCMPicker } from "@/components/state-cm-picker"

export function LeaderPhotoInput({
  defaultUrl,
  onChange,
}: {
  defaultUrl: string
  onChange: (file: File | null, previewUrl: string | null, name?: string) => void
}) {
  // three choices: 'custom' | 'url' | 'statecm'
  const [choice, setChoice] = useState<"custom" | "url" | "statecm">("statecm")
  const [url, setUrl] = useState<string>("")

  // reflect current choice into preview (statecm is handled by the picker)
  useEffect(() => {
    if (choice === "url") {
      onChange(null, url || defaultUrl)
    } else if (choice === "custom") {
      // Do nothing here; handled by file input.
    } else if (choice === "statecm") {
      // Do nothing here; the StateCMPicker below will call onChange when the user selects a CM.
    } else {
      onChange(null, defaultUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choice, defaultUrl, url])

  const handleFile = (file: File | null) => {
    if (choice !== "custom") return
    if (!file || !file.type.startsWith("image/")) {
      onChange(null, defaultUrl)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      onChange(file, (reader.result as string) || defaultUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-2">
      <Label className="text-sm">Leader Photo</Label>

      <div className="flex flex-col gap-2 text-sm">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="leader-choice"
            value="statecm"
            checked={choice === "statecm"}
            onChange={() => setChoice("statecm")}
          />
          <span>Hon' State/UT CM</span>
          <img src="/images/leader-default.png" alt="State CM" className="h-8 w-8 rounded-full object-cover" />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="leader-choice"
            value="custom"
            checked={choice === "custom"}
            onChange={() => setChoice("custom")}
          />
          <span>Add Custom Leader/Officer</span>
          <img src="/images/leader-default.png" alt="Custom Leader" className="h-8 w-8 rounded-full object-cover" />
        </label>
      </div>

      {/* URL input (enabled only when 'url' is selected) */}
      {choice === "url" && (
        <input
          type="url"
          placeholder="https://example.com/leader.jpg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="block w-full rounded border px-3 py-2 text-sm"
        />
      )}

      {/* State CM picker (enabled only when 'statecm' is selected) */}
      {choice === "statecm" && (
        <StateCMPicker
          className="mt-1"
          onSelect={(imageSrc: string, previewUrl?: string | null, name?: string) => {
            // Pass both image URL and CM name with Hon' prefix
            onChange(null, imageSrc, name ? `Hon' ${name}` : undefined)
          }}
        />
      )}

      {/* Custom upload section (enabled only when 'custom' is selected) */}
      {choice === "custom" && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter leader/officer name"
            className="block w-full rounded border px-3 py-2 text-sm"
            onChange={(e) => {
              // Update the name when file is already selected
              const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
              const file = fileInput?.files?.[0];
              if (file) {
                handleFile(file);
                onChange(file, null, `Hon' ${e.target.value}`);
              }
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const nameInput = e.target.previousElementSibling as HTMLInputElement;
                handleFile(file);
                if (nameInput?.value) {
                  onChange(file, null, `Hon' ${nameInput.value}`);
                }
              }
            }}
            className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        </div>
      )}

      {/* Show file input for non-custom choices (disabled) */}
      {choice !== "custom" && (
        <input
          type="file"
          accept="image/*"
          disabled
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
        />
      )}

      <p className="text-xs text-gray-600">
        Choose a default, pick a State/UT CM, paste a URL, or switch to Custom to upload your own photo and add leader/officer name. Note: Some remote
        URLs may block cross-origin loading; Wikipedia images usually work with canvas.
      </p>
    </div>
  )
}
