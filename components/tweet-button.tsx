
"use client"

import { Button } from "@/components/ui/button"

export function TweetButton({
  imageDataUrl,
  text,
  url,
}: {
  imageDataUrl: string
  text: string
  url: string
}) {
  const onShare = async () => {
    try {
      const file = await dataUrlToFile(imageDataUrl)
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Civic Issue Certificate",
          text,
          url,
          files: [file],
        })
        return
      }
    } catch {
      // ignore and fallback to intent
    }
    const intent = new URL("https://twitter.com/intent/tweet")
    intent.searchParams.set("text", text)
    intent.searchParams.set("url", url)
    window.open(intent.toString(), "_blank", "noopener,noreferrer")
  }

  return (
    <Button className="bg-blue-600 hover:bg-blue-700" onClick={onShare}>
      Tweet / Share
    </Button>
  )
}

async function dataUrlToFile(dataUrl: string): Promise<File | null> {
  try {
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    return new File([blob], "certificate.png", { type: "image/png" })
  } catch {
    return null
  }
}
