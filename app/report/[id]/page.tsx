"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getReport } from "@/lib/storage"
import { Button } from "@/components/ui/button"

export default function ReportPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [img, setImg] = useState<string | null>(null)

  useEffect(() => {
    const r = getReport(id)
    if (r?.imageDataUrl) setImg(r.imageDataUrl)
  }, [id])

  return (
    <main className="min-h-dvh bg-white">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Civic Issue Report</h1>
          <a className="text-sm text-blue-600 hover:underline" href="/">
            Home
          </a>
        </div>
      </header>
      <div className="mx-auto max-w-xl px-4 py-4 space-y-4">
        {img ? (
          <img
            src={img || "/placeholder.svg?height=600&width=900&query=certificate%20image"}
            alt="Certificate"
            className="w-full h-auto rounded border"
          />
        ) : (
          <p className="text-sm text-gray-700">
            This certificate is not available on this device. It will show after generation or if stored server-side.
          </p>
        )}
        <div className="flex gap-3">
          {img && (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                const a = document.createElement("a")
                a.href = img
                a.download = `civic-certificate-${id}.png`
                a.click()
              }}
            >
              Download
            </Button>
          )}
          <a className="text-sm text-blue-600 underline" href="/civic">
            Generate another
          </a>
        </div>
      </div>
    </main>
  )
}
