
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CertificateData } from "@/components/certificate-canvas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { LeaderPhotoInput } from "@/components/leader-photo-input"
import { ImageInput } from "@/components/image-input"
import { getLocationFromImageOrDevice } from "@/lib/location"
import { CertificateCanvas } from "@/components/certificate-canvas"
import { saveReport } from "@/lib/storage"
import { SocialShare } from "@/components/social-share"
import { EmailRTIOptions } from "@/components/email-rti-options"


// Utility function to generate UUID that works in all browsers
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

type IssueType = "Pothole" | "Garbage" | "Broken Streetlight" | "Illegal Dumping" | "Waterlogging" | "Other"

type LeaderOption = {
  key: string
  label: string
  imageUrl: string
}

const LEADER_OPTIONS: LeaderOption[] = [
  { key: "modi", label: "Hon' PM Narendra Modi", imageUrl: "/images/pm-modi.png" },
  { key: "gadkari", label: "Hon' Nitin Gadkari", imageUrl: "/images/nitin-gadkari.jpg" },
  { key: "cm", label: "Hon' State/UT CM", imageUrl: "/images/leader-default.png" }, // can be replaced with actual CM image
  { key: "custom", label: "Add Custom Leader/Officer", imageUrl: "/images/leader-default.png" },
]

export default function HomePage() {
  const [issueImage, setIssueImage] = useState<File | null>(null)
  const [issuePreview, setIssuePreview] = useState<string | null>(null)
  const [leaderImage, setLeaderImage] = useState<File | null>(null)
  const [leaderPreview, setLeaderPreview] = useState<string | null>("/images/leader-default.png")
  const [issueType, setIssueType] = useState<IssueType>("Pothole")
  const [issueNote, setIssueNote] = useState<string>("")
  const [creditName, setCreditName] = useState<string>("") // new optional field
  const [locText, setLocText] = useState<string>("")
  const [locationMapUrl, setLocationMapUrl] = useState<string>("")
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null })
  const [dateTime, setDateTime] = useState<Date | null>(null) // Initialize with null to prevent hydration mismatch
  const [localDateTime, setLocalDateTime] = useState<string>("")
  const [isLocLoading, setIsLocLoading] = useState(false)
  const [isClient, setIsClient] = useState(false) // Add client-side flag
  // For top right leaders
  const [selectedLeaders, setSelectedLeaders] = useState<string[]>([]) // Start with no leaders selected
  // For CM custom image
  const [cmImage, setCmImage] = useState<string>("/images/leader-default.png")
  const [selectedCMName, setSelectedCMName] = useState<string>("")
  // For custom leader/image (top-right custom entry)
  const [customImage, setCustomImage] = useState<string>("/images/leader-default.png")
  const [customName, setCustomName] = useState<string>("")
  // Control whether to include Modi photo
  const [includeModiPhoto, setIncludeModiPhoto] = useState<boolean>(true) // Default to true
  // Track if user has manually set a time
  const [userSetTime, setUserSetTime] = useState<boolean>(false)
  const [certData, setCertData] = useState<CertificateData | null>(null)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null) // data URL of canvas
  const [reportUrl, setReportUrl] = useState<string | null>(null) // app link used for QR / tweet
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentLanguage: t } = useLanguage()

  // Fix hydration: only run on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!issueImage) return
    ;(async () => {
      setIsLocLoading(true)
      const meta = await getLocationFromImageOrDevice(issueImage)
      if (meta?.coords) setCoords(meta.coords)
      // Only set date from image if user hasn't manually set one
      if (meta?.date && !userSetTime) setDateTime(meta.date)
      if (meta?.pretty) setLocText(meta.pretty)
      setIsLocLoading(false)
    })()
  }, [issueImage, userSetTime])

  // Fix hydration error: set local date/time only on client
  useEffect(() => {
    if (isClient) {
      const currentTime = dateTime ?? new Date()
      setLocalDateTime(currentTime.toLocaleString())
    }
  }, [dateTime, isClient])

  // Initialize with a stable date to prevent hydration mismatch
  useEffect(() => {
    if (isClient && !dateTime) {
      const now = new Date()
      setDateTime(now)
      setLocalDateTime(now.toLocaleString())
    }
  }, [isClient, dateTime])

  const canGenerate = useMemo(() => {
    return Boolean(issueImage && leaderPreview)
  }, [issueImage, leaderPreview, locText, coords])

  const handleGenerate = async () => {
    if (!issueImage) return;
    
    // Debug logging for issue image
    console.log('Generating certificate with issue image:', {
      name: issueImage.name,
      size: issueImage.size,
      type: issueImage.type,
      lastModified: issueImage.lastModified,
      exists: !!issueImage
    });
    
    const id = generateUUID();
    const url = `/report/${id}` // Just the path, domain handled in SocialShare;

    // Build top leaders array
    const topLeaders = selectedLeaders
      .filter((key) => key !== "modi") // exclude Modi from top, always at bottom
      .map((key) => {
  if (key === "cm") return { url: cmImage, name: selectedCMName || "Hon' Selected State/UT CM" };
  if (key === "custom") return { url: customImage, name: customName || "Hon' Selected Leader" };
        const found = LEADER_OPTIONS.find((opt) => opt.key === key);
        return found ? { url: found.imageUrl, name: found.label } : null;
      })
      .filter((leader): leader is { url: string; name: string } => Boolean(leader));

    // Conditionally include Modi at bottom left
    const modiImage = includeModiPhoto 
      ? (LEADER_OPTIONS.find((opt) => opt.key === "modi")?.imageUrl || "/images/pm-modi.png")
      : "/images/leader-default.png"; // Use placeholder if Modi photo is disabled

    const data = {
      id: id,
      issueType: issueType,
      note: issueNote,
      locationText:
        (locText && locText.trim()) ||
        (coords.lat && coords.lng ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : "Not provided"),
      coords: coords.lat && coords.lng ? { lat: coords.lat, lng: coords.lng } : undefined,
      capturedAt: (dateTime ?? new Date()).toISOString(),
      issueImageFile: issueImage,
      topLeaderImageUrls: topLeaders.map(l => l.url),
      topLeaderNames: topLeaders.map(l => l.name),
      modiImageUrl: modiImage,
      reportUrl: url,
      locationMapUrl: locationMapUrl || undefined,
      footerCreditName: creditName || undefined,
    };
    setCertData(data);
    setReportUrl(url);
  }

  // Capture the canvas image once drawn
  const handleCanvasRendered = (dataUrl: string | null) => {
    if (!dataUrl || !certData) return
    setGeneratedUrl(dataUrl)
    // persist a copy to localStorage for simple "admin/report" usage
    saveReport({
      ...certData,
      imageDataUrl: dataUrl,
    })
  }

  return (
    <main>
      <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-lg border-b border-grey/30">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-balance text-zinc-50">Civic Issue Certificates</h1>
          <div className="flex items-center gap-5">
            <LanguageSelector />
            <a className="text-sm text-red-400 hover:underline" href="/admin">
              Admin
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-4 py-4 space-y-6">
        <Card> 
          <CardHeader>
            <CardTitle className="text-base">1) {t.translations.uploadPhoto}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageInput
              label="Capture or Upload"
              onChange={(file, preview) => {
                setIssueImage(file)
                setIssuePreview(preview)
              }}
            />
            {issuePreview && (
              <img
                src={issuePreview || "/placeholder.svg"}
                alt="Issue preview"
                className="w-full h-auto rounded border"
              />
            )}
            <div className="text-sm text-gray-300">
              {isLocLoading
                ? "Extracting GPS from photo EXIF..."
                : locText
                  ? `Detected location: ${locText}`
                  : "Location not detected from photo metadata. You can still proceed."}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">2) {t.translations.selectIssueType}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <Label htmlFor="issue-type">{t.translations.issueLabel}</Label>
  
            {/* Wrapper for custom arrow */}
            <div className="relative">
              <select
                id="issue-type"
                className="appearance-none w-full bg-black border border-black rounded-md px-3 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-grey-90"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as IssueType)}
              >
                {/* These options will have a black background */}
                <option className="bg-gray-90 text-white">Pothole</option>
                <option className="bg-gray-90 text-white">Garbage</option>
                <option className="bg-gray-90 text-white">Broken Streetlight</option>
                <option className="bg-gray-90 text-white">Illegal Dumping</option>
                <option className="bg-gray-90 text-white">Waterlogging</option>
                <option className="bg-gray-90 text-white">Other</option>
              </select>
                
                {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-90">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
            </div>
  
            <p className="text-xs text-gray-00">Auto-tagging coming soon; choose a type for now.</p>
            </div>
              

            <div className="grid gap-2">
              <Label htmlFor="note">{t.translations.noteLabel}</Label>
              <Input
                id="note"
                placeholder="Short description"
                value={issueNote}
                onChange={(e) => setIssueNote(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location-text">{t.translations.locationLabel}</Label>
              <Input
                id="location-text"
                placeholder="e.g., GTB Road, New Delhi"
                value={locText}
                onChange={(e) => setLocText(e.target.value)}
              />
              <p className="text-xs text-gray-300">
                Optional. We try to read GPS from the photo’s EXIF; you can refine or leave blank.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maps-url">Google Maps Location (Optional)</Label>
              <Input
                id="maps-url"
                type="url"
                placeholder="Paste Google Maps URL"
                value={locationMapUrl}
                onChange={(e) => setLocationMapUrl(e.target.value)}
              />
              <p className="text-xs text-grey-60">
                If provided, the QR code will point to this Google Maps location instead of the dummy report URL.
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Capture Time</Label>
              {isClient && dateTime ? (
                <div className="space-y-2">
                  <Input
                    key="datetime-input"
                    type="datetime-local"
                    value={dateTime.toISOString().slice(0, 16)}
                    onChange={(e) => {
                      if (e.target.value) {
                        const newDateTime = new Date(e.target.value)
                        setDateTime(newDateTime)
                        setLocalDateTime(newDateTime.toLocaleString())
                        setUserSetTime(true) // Mark that user has set the time
                      }
                    }}
                    className="text-sm"
                  />
                  <div className="text-xs text-gray-300">
                    Current time: <span suppressHydrationWarning>{localDateTime}</span>
                    {userSetTime && (
                      <span className="ml-2 text-blue-600 font-medium">(User set)</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400">
                  {isClient ? "Loading time..." : "Loading..."}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="credit-name">Credit name (optional)</Label>
              <Input
                id="credit-name"
                placeholder="e.g., PM Narendra Modi or Nitin Gadkari"
                value={creditName}
                onChange={(e) => setCreditName(e.target.value)}
              />
              <p className="text-xs text-gray-300">If provided, the certificate footer will credit this person.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">3) {t.translations.chooseLeaders}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Select Leaders (Top Right)</Label>
              <div className="grid grid-cols-1 gap-2">
                {LEADER_OPTIONS.map((opt) => (
                  <label key={opt.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={selectedLeaders.includes(opt.key)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeaders((prev) => [...prev, opt.key]);
                        } else if (opt.key !== "modi") { // Don't unselect Modi
                          setSelectedLeaders((prev) => prev.filter((k) => k !== opt.key));
                        }
                      }}
                    />
                    <span className="text-sm">{opt.label}</span>
                    <div className="flex flex-col items-center ml-2">
                      <img 
                        src={opt.imageUrl} 
                        alt={opt.label}
                        className="h-8 w-8 rounded-full object-cover border"
                      />
                      {opt.key === "gadkari" && (
                        <span className="text-xs text-black font-medium">Nitin Gadkari</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

              {selectedLeaders.includes("cm") && (
              <div className="space-y-2">
                <Label className="text-sm">Select State/UT CM Photo</Label>
                <LeaderPhotoInput
                  defaultUrl="/images/leader-default.png"
                  onChange={(_: File | null, preview: string | null, name?: string) => {
                    setCmImage(preview || "/images/leader-default.png");
                    if (name) setSelectedCMName(name);
                  }}
                />
                {cmImage && (
                  <div className="space-y-1">
                    <img
                      src={cmImage}
                      alt="CM preview"
                      className="h-24 w-24 rounded object-cover border"
                    />
                    <div className="text-sm text-red-600 font-medium">Selected State/UT CM</div>
                  </div>
                )}
              </div>
            )}
            
            {/* Modi Photo Control */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-black-300"
                  checked={includeModiPhoto}
                  onChange={(e) => setIncludeModiPhoto(e.target.checked)}
                />
                <span>Include PM Modi's Photo (Bottom Left)</span>
              </Label>
              <p className="text-xs text-black-300">
                PM Modi's photo will appear at the bottom left of the certificate (4x larger) if enabled.
                Select additional leaders to appear at the top right.
              </p>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-4 p-3 bg-grey-500/10 border border-grey-500/20 rounded-lg">
              <p className="text-xs text-red-800 font-medium mb-2">⚠️ IMPORTANT DISCLAIMER ⚠️</p>
              <p className="text-xs text-red-700">
                This is <strong>NOT an official government document</strong>. This is a citizen-generated report for civic awareness purposes only. 
                The use of leader photos does not imply official endorsement or government affiliation. 
                No official action is guaranteed from this report.
              </p>
            </div>

            {selectedLeaders.includes("custom") && (
              <div className="space-y-2">
                <Label className="text-sm">Custom Leader / Officer</Label>
                <LeaderPhotoInput
                  defaultUrl="/images/leader-default.png"
                  onChange={(file: File | null, preview: string | null, name?: string) => {
                    setCustomImage(preview || "/images/leader-default.png");
                    if (name) setCustomName(name);
                  }}
                />
                {customImage && (
                  <div className="space-y-1">
                    <img
                      src={customImage}
                      alt="Custom leader preview"
                      className="h-24 w-24 rounded object-cover border"
                    />
                    <div className="text-sm text-red-600 font-medium">Custom Leader / Officer</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-black-800 to-black-60 hover:opacity-90 text-black"  onClick={handleGenerate}>
            {t.translations.generateCertificate}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIssueImage(null)
              setIssuePreview(null)
              setLeaderImage(null)
              setLeaderPreview("/images/leader-default.png")
              setIssueType("Pothole")
              setIssueNote("")
              setCreditName("") // reset credit name
              setLocText("")
              setLocationMapUrl("")
              setCoords({ lat: null, lng: null })
              const now = new Date()
              setDateTime(now)
              setLocalDateTime(now.toLocaleString())
              setSelectedLeaders([]) // reset selected leaders
              setCmImage("/images/leader-default.png") // reset CM image
              setSelectedCMName("") // reset CM name
              setCustomImage("/images/leader-default.png") // reset custom image
              setCustomName("") // reset custom name
              setIncludeModiPhoto(true) // reset to default (enabled)
              setUserSetTime(false) // reset user time flag
              setCertData(null)
              setGeneratedUrl(null)
              setReportUrl(null)
              // Note: isClient should not be reset as it's needed for hydration
            }}
          >
            Reset
          </Button>
        </div>

        {certData && (
          <>
            <Separator />
            <section className="space-y-3">
              <h2 className="text-base font-semibold">{t.translations.title}</h2>
              <CertificateCanvas ref={canvasRef} data={certData} onRendered={handleCanvasRendered} />
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-amber-500 hover:bg-amber-600"
                  onClick={() => {
                    const canvas = canvasRef.current
                    if (!canvas) return
                    const link = document.createElement("a")
                    link.download = `civic-certificate-${certData.id}.png`
                    link.href = canvas.toDataURL("image/png")
                    link.click()
                  }}
                >
                  Download PNG
                </Button>
                {generatedUrl && reportUrl && certData && (
                  <SocialShare
                    imageDataUrl={generatedUrl}
                    issueType={certData.issueType}
                    location={certData.locationText}
                    url={reportUrl}
                  />
                )}
              </div>
              {(reportUrl || locationMapUrl) && (
                <p className="text-xs text-gray-300">
                  QR links to:{" "}
                  {locationMapUrl ? (
                    <a className="text-blue-600 underline" href={locationMapUrl}>
                      Google Maps Location
                    </a>
                  ) : (
                    <a className="text-blue-600 underline" href={reportUrl || '#'}>
                      {reportUrl}
                    </a>
                  )}{" "}
                  — demo only, no backend yet.
                </p>
              )}
              
              {/* Email and RTI Options */}
              {certData && (
                <EmailRTIOptions 
                  issueType={certData.issueType}
                  location={certData.locationText}
                />
              )}
            </section>
          </>
        )}
      </div>



      {/* GitHub Contribution Section */}
      <div className="mx-auto max-w-xl px-4 py-4 text-center">
        <div className="bg-black-50 rounded-lg p-4 border border-red-500">
          <h3 className="text-base font-semibold text-white mb-2">
            🐛 Found An Issue? Want To Contribute?
          </h3>
          <p className="text-xs text-white mb-3">
            This is an open-source project. If you encounter any bugs or have suggestions, we'd love your help!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href="https://github.com/sharmaronit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              <span>📝</span>
              <span>Report An Issue</span>
            </a>
            <a
              href="https://github.com/sharmaronit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              <span>⭐</span>
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t bg-black/80 backdrop-blur border-gray-60">
        <div className="mx-auto max-w-xl px-4 text-center">
          <p className="text-sm text-white/80 mb-600">
            Made with ❤️ by{" "}
            <a 
              href="https://twitter.com/geminiproronit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
            >
              @geminiproronit
            </a>
            <span className="mx-2">|</span> {/* This is a separator */}
            <a 
              href="https://www.linkedin.com/in/ronit-sharma-039884356"  // <-- IMPORTANT: REPLACE WITH YOUR LINKEDIN URL
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 hover:underline font-large"
            >
              Connect on LinkedIn
          </a>
        </p>
      </div>
  </footer>
  </main>
  )
}
