/**
 * State CM Picker Component
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"

import * as React from "react"
import {
  INDIAN_STATES,
  type IndianState,
  CM_NAME_BY_STATE,
  CM_WIKI_TITLE_BY_STATE,
  INDIAN_UNION_TERRITORIES,
  type IndianUT,
  CM_NAME_BY_UT,
  CM_WIKI_TITLE_BY_UT,
} from "@/lib/indian-states"
import { fetchWikiLeadImage } from "@/lib/wiki"

type Props = {
  onSelect: (imageSrc: string, previewUrl?: string | null, name?: string) => void
  className?: string
}

export function StateCMPicker({ onSelect, className }: Props) {
  const [scope, setScope] = React.useState<"state" | "ut">("state")
  const [region, setRegion] = React.useState<string>(INDIAN_STATES[0])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<{ name: string; imageUrl?: string; pageUrl?: string } | null>(null)

  const list = scope === "state" ? INDIAN_STATES : INDIAN_UNION_TERRITORIES

  async function handleLoad() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      let cmName: string | undefined
      let wikiTitle: string | undefined

      if (scope === "state") {
        cmName = CM_NAME_BY_STATE[region as IndianState]
        wikiTitle = CM_WIKI_TITLE_BY_STATE[region as IndianState]
      } else {
        cmName = CM_NAME_BY_UT[region as IndianUT]
        wikiTitle = CM_WIKI_TITLE_BY_UT[region as IndianUT]
      }

      if (!cmName || !wikiTitle) {
        setResult({ name: "No Chief Minister currently" })
        return
      }

      const { imageUrl, pageUrl } = await fetchWikiLeadImage(wikiTitle, 700)
      setResult({ name: cmName, imageUrl, pageUrl })
      if (!imageUrl) setError("Could not find an official image on Wikipedia for this CM.")
    } catch {
      setError("Failed to load CM image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <div className="mb-2 flex items-center gap-3">
        <span className="text-sm font-medium">Scope</span>
        <label className="inline-flex items-center gap-1 text-sm">
          <input
            type="radio"
            name="cm-scope"
            value="state"
            checked={scope === "state"}
            onChange={() => {
              setScope("state")
              setRegion(INDIAN_STATES[0])
              setResult(null)
              setError(null)
            }}
          />
          <span>State</span>
        </label>
        <label className="inline-flex items-center gap-1 text-sm">
          <input
            type="radio"
            name="cm-scope"
            value="ut"
            checked={scope === "ut"}
            onChange={() => {
              setScope("ut")
              setRegion(INDIAN_UNION_TERRITORIES[0])
              setResult(null)
              setError(null)
            }}
          />
          <span>Union Territory</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">{scope === "state" ? "State" : "Union Territory"}</label>
        <select
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {list.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleLoad}
          disabled={loading}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "Loading…" : "Load CM"}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 rounded-lg border p-3">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded bg-muted">
              {result.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result.imageUrl || "/placeholder.svg"} alt={result.name} className="h-16 w-16 object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center text-xs text-muted-foreground">No image</div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{result.name}</p>
              <p className="text-xs text-muted-foreground">
                {result.name === "No Chief Minister currently"
                  ? "This UT does not currently have a Chief Minister."
                  : `${scope === "state" ? "State" : "UT"}: ${region}`}
              </p>
              {result.pageUrl && (
                <a href={result.pageUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">
                  Wikipedia source
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => result.imageUrl && onSelect(result.imageUrl, undefined, result.name)}
              disabled={!result.imageUrl}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Use this leader
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Images are fetched from Wikipedia (upload.wikimedia.org) and are generally CORS‑safe for canvas rendering.
          </p>
          
          {/* Legal Disclaimer */}
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
            <strong>⚠️ DISCLAIMER:</strong> This is NOT an official government document. 
            The use of Chief Minister photos does not imply official endorsement or government affiliation.
          </div>
        </div>
      )}
    </div>
  )
}
