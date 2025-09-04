/**
 * State UT CM Picker Component
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"
import { useState } from "react"
import { getWikipediaLeadImageUrl } from "@/lib/wiki"
import { INDIAN_STATES, INDIAN_UNION_TERRITORIES, CURRENT_CM_BY_REGION } from "@/lib/indian-regions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  onSelect: (opts: { src: string; creditName?: string }) => void
}

export function StateUtCMPicker({ onSelect }: Props) {
  const [scope, setScope] = useState<"state" | "ut">("state")
  const [region, setRegion] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<{ name: string; img?: string } | null>(null)
  const list = scope === "state" ? INDIAN_STATES : INDIAN_UNION_TERRITORIES

  async function loadCM() {
    setLoading(true)
    setPreview(null)
    try {
      const info = CURRENT_CM_BY_REGION[region] || null
      if (!info) {
        setPreview({ name: "No Chief Minister currently" })
        return
      }
      const img = await getWikipediaLeadImageUrl(info.wikiTitle, 512)
      setPreview({ name: info.name, img: img || undefined })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Label className="min-w-24">Scope</Label>
        <div className="flex gap-2">
          <Button type="button" variant={scope === "state" ? "default" : "outline"} onClick={() => setScope("state")}>
            States
          </Button>
          <Button type="button" variant={scope === "ut" ? "default" : "outline"} onClick={() => setScope("ut")}>
            Union Territories
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Label className="min-w-24">{scope === "state" ? "State" : "Union Territory"}</Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="min-w-[260px]">
            <SelectValue placeholder={`Select a ${scope === "state" ? "state" : "UT"}`} />
          </SelectTrigger>
          <SelectContent>
            {list.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" onClick={loadCM} disabled={!region || loading}>
          {loading ? "Loading…" : "Load CM"}
        </Button>
      </div>

      {preview && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-pretty">{preview.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            {preview.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.img || "/placeholder.svg"}
                alt="Leader portrait"
                className="h-24 w-24 rounded-md object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="h-24 w-24 rounded-md bg-muted/60 flex items-center justify-center text-xs text-muted-foreground">
                No image
              </div>
            )}
            <div className="flex-1">
              <Button
                type="button"
                onClick={() =>
                  onSelect({
                    src: preview.img || "",
                    creditName: preview.name.includes("No Chief Minister") ? undefined : preview.name,
                  })
                }
                disabled={!preview.img}
              >
                Use this leader
              </Button>
              {!preview.img && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Image not available or blocked. You can still pick Modi/Gadkari or upload your own.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Legal Disclaimer */}
      <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
        <strong>⚠️ DISCLAIMER:</strong> This is NOT an official government document. 
        The use of Chief Minister photos does not imply official endorsement or government affiliation.
      </div>
    </div>
  )
}
