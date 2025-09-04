"use client"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import QRCode from "qrcode"
export type CertificateData = {
  id: string
  issueType: string
  note?: string
  locationText: string
  coords?: { lat: number; lng: number }
  locationMapUrl?: string // Optional Google Maps URL
  capturedAt: string // ISO
  issueImageFile: File
  topLeaderImageUrls: string[] // array of leader images for top right
  topLeaderNames: string[] // array of leader names matching the images
  modiImageUrl: string // always present, bottom left
  reportUrl: string
  footerCreditName?: string // optional credit line in footer
}
export type PersistedReport = CertificateData & { imageDataUrl?: string }
import { useLanguage } from '@/lib/language-context'
export const CertificateCanvas = forwardRef<
  HTMLCanvasElement,
  {
    data: CertificateData
    onRendered?: (dataUrl: string | null) => void
    logoScale?: number
  }
>(({ data, onRendered, logoScale }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useImperativeHandle(ref, () => canvasRef.current!)
  const { currentLanguage: t } = useLanguage()
  useEffect(() => {
    let revoked: string | null = null
    const draw = async () => {
      try {
        const canvas = canvasRef.current
        if (!canvas) return
        const width = 900
        const height = 1273
        canvas.width = width
        canvas.height = height
        // Force non-transparent context
        const ctx = canvas.getContext('2d', {
          alpha: false,
          willReadFrequently: true
        })
        if (!ctx) return
        // Ensure white background
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, width, height)
        const primary = "#000000" // Changed to black
        const textColor = "#111827"
        const subText = "#374151"
        const border = "#E5E7EB"
        // Border
        ctx.strokeStyle = border
        ctx.lineWidth = 4
        ctx.strokeRect(20, 20, width - 40, height - 40)
        const headerH = 140
        const headerTop = 20
        const headerLeft = 20
        const headerWidth = width - 40
        const headerDelta = headerH - 80 // shift content below by this delta
        // Header
        ctx.fillStyle = primary // Changed to black
        ctx.fillRect(headerLeft, headerTop, headerWidth, headerH)
        try {
          const sealImg = await loadImage("/images/gov-seal.png")
          const scale = logoScale && logoScale > 0 ? logoScale : 2.2
          const sealSize = Math.min(Math.round(56 * scale), headerH - 16)
          const sealX = headerLeft + 20
          const sealY = headerTop + (headerH - sealSize) / 2
          // Badge behind seal for contrast
          const cx = sealX + sealSize / 2
          const cy = sealY + sealSize / 2
          ctx.save()
          ctx.beginPath()
          ctx.fillStyle = "#FFFFFF"
          ctx.shadowColor = "rgba(0,0,0,0.08)"
          ctx.shadowBlur = 12
          ctx.fill()
          ctx.restore()
          ctx.drawImage(sealImg, sealX, sealY, sealSize, sealSize)
        } catch {}
        // Center the header text so it doesn't get covered by the logo
        ctx.fillStyle = "#FFFFFF"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        const centerX = headerLeft + headerWidth / 2
        ctx.font = "bold 28px 'Times New Roman', serif" // Changed font style
        const headerTextY1 = headerTop + Math.floor(headerH / 2) - 12
        ctx.fillText(t.translations.title, centerX, headerTextY1)
        ctx.font = "600 20px 'Times New Roman', serif" // Changed font style
        const headerTextY2 = headerTextY1 + 28
        ctx.fillText(t.translations.subtitle, centerX, headerTextY2)
        // Restore left alignment for the rest of the canvas drawing
        ctx.textAlign = "left"
        ctx.textBaseline = "alphabetic"
        // Title (shifted down by headerDelta)
        ctx.fillStyle = textColor
        ctx.font = "bold 30px 'Times New Roman', serif" // Changed font style
        ctx.fillText(t.translations.title, 40, 140 + headerDelta)
        ctx.font = "600 22px 'Times New Roman', serif" // Changed font style
        ctx.fillText(t.translations.subtitle, 40, 170 + headerDelta)
        // Top right: multiple leader photos side by side
        const topLeaderW = 110  // Increased width for photo container
        const topLeaderH = 120
        const topLeaderGap = 24  // Increased gap between photos
        const topStartX = width - 40 - (data.topLeaderImageUrls.length * (topLeaderW + topLeaderGap)) + topLeaderGap
        const topY = 110 + headerDelta
        for (let i = 0; i < data.topLeaderImageUrls.length; i++) {
          const imageUrl = data.topLeaderImageUrls[i]
          const x = topStartX + i * (topLeaderW + topLeaderGap)
          ctx.strokeStyle = border
          ctx.lineWidth = 2
          ctx.strokeRect(x, topY, topLeaderW, topLeaderH)
          try {
            const leaderImg = await loadImage(imageUrl)
            ctx.drawImage(leaderImg, x + 5, topY + 5, topLeaderW - 10, topLeaderH - 20)
            // Add name under photo in red
            if (imageUrl.includes("gadkari")) {
              ctx.fillStyle = "#DC2626" // red-600
              ctx.font = "600 14px 'Times New Roman', serif" // Changed font style
              ctx.textAlign = "center"
              ctx.fillText("Hon' Nitin Gadkari", x + topLeaderW/2, topY + topLeaderH - 6) // Adjusted position
              ctx.textAlign = "left"
            } else if (data.topLeaderNames?.[i]) { // Use name from data if available
              ctx.fillStyle = "#DC2626" // red-600
              ctx.font = "600 14px 'Times New Roman', serif" // Changed font style
              ctx.textAlign = "center"
              ctx.fillText(data.topLeaderNames[i], x + topLeaderW/2, topY + topLeaderH - 6) // Adjusted position
              ctx.textAlign = "left"
            }
          } catch {
            ctx.fillStyle = "#F3F4F6"
            ctx.fillRect(x + 5, topY + 5, topLeaderW - 10, topLeaderH - 10)
            ctx.fillStyle = subText
            ctx.font = "600 14px 'Times New Roman', serif" // Changed font style
            ctx.fillText("Leader", x + 22, topY + 60)
          }
        }
        // Meta (shifted down by headerDelta)
        ctx.fillStyle = subText
        ctx.font = "500 16px 'Times New Roman', serif" // Changed font style
        const when = new Date(data.capturedAt).toLocaleString()
        const where = data.locationText
        ctx.fillText(`${t.translations.dateTimeLabel}: ${when}`, 40, 210 + headerDelta)
        ctx.fillText(`${t.translations.locationLabel}: ${where}`, 40, 235 + headerDelta)
        // Issue (shifted down by headerDelta)
        ctx.fillStyle = textColor
        ctx.font = "600 20px 'Times New Roman', serif" // Changed font style
        ctx.fillText(`${t.translations.issueLabel}: ${data.issueType}`, 40, 270 + headerDelta)
        if (data.note) {
          ctx.font = "500 16px 'Times New Roman', serif" // Changed font style
          wrapText(ctx, `${t.translations.noteLabel}: ${data.note}`, 40, 298 + headerDelta, width - 80)
        }
        // Slogans between issue details and photo
        const sloganY = data.note ? 340 + headerDelta : 320 + headerDelta
        ctx.fillStyle = "#2563EB" // blue-600
        ctx.font = "italic 600 18px 'Times New Roman', serif" // Changed font style
        ctx.textAlign = "center"
        ctx.fillText(t.translations.slogan, width/2, sloganY)
        ctx.font = "italic 600 16px 'Times New Roman', serif" // Changed font style
        ctx.fillText(t.translations.impactText, width/2, sloganY + 26)
        ctx.textAlign = "left"
        // Issue image (shifted down by headerDelta)
        const photoX = 40
        const photoY = sloganY + 60 // Adjust photo position to account for slogans
        const photoW = width - 80
        ctx.strokeStyle = border
        ctx.lineWidth = 2
        // Enhanced issue photo loading with better error handling
        let issuePhotoLoaded = false
        let photoH = 300 // Default height for fallback
        if (data.issueImageFile && data.issueImageFile instanceof File && data.issueImageFile.size > 0) {
          try {
            console.log('Loading issue image:', {
              name: data.issueImageFile.name,
              size: data.issueImageFile.size,
              type: data.issueImageFile.type
            })
            const issueUrl = URL.createObjectURL(data.issueImageFile)
            revoked = issueUrl
            // Add timeout for image loading
            const imageLoadPromise = loadImage(issueUrl)
            const timeoutPromise = new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Image loading timeout')), 10000)
            )
            const issueImg = await Promise.race([imageLoadPromise, timeoutPromise])
            if (issueImg && 'width' in issueImg && 'height' in issueImg && 
                typeof issueImg.width === 'number' && typeof issueImg.height === 'number' &&
                issueImg.width > 0 && issueImg.height > 0) {
              const aspect = issueImg.width / issueImg.height
              photoH = Math.min(420, Math.round(photoW / Math.max(aspect, 1e-6)))
              ctx.strokeRect(photoX - 1, photoY - 1, photoW + 2, photoH + 2)
              ctx.drawImage(issueImg as CanvasImageSource, photoX, photoY, photoW, photoH)
              issuePhotoLoaded = true
              console.log('Issue image loaded successfully:', {
                width: issueImg.width,
                height: issueImg.height,
                aspect: aspect,
                photoH: photoH
              })
            } else {
              throw new Error('Invalid image dimensions')
            }
            // Divider
            ctx.strokeStyle = border
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(40, photoY + photoH + 20)
            ctx.lineTo(width - 40, photoY + photoH + 20)
            ctx.stroke()
          } catch (error) {
            console.error('Failed to load issue image:', error)
            console.error('Image file details:', {
              name: data.issueImageFile?.name,
              size: data.issueImageFile?.size,
              type: data.issueImageFile?.type,
              lastModified: data.issueImageFile?.lastModified
            })
            // Fallback to placeholder
            ctx.strokeRect(photoX - 1, photoY - 1, photoW + 2, photoH + 2)
            ctx.fillStyle = "#F3F4F6"
            ctx.fillRect(photoX, photoY, photoW, photoH)
            ctx.fillStyle = subText
            ctx.font = "600 16px 'Times New Roman', serif" // Changed font style
            ctx.fillText("Issue photo unavailable", photoX + 20, photoY + 40)
            ctx.fillText("Error: " + (error instanceof Error ? error.message : 'Unknown error'), photoX + 20, photoY + 70)
            // Divider
            ctx.strokeStyle = border
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(40, photoY + photoH + 20)
            ctx.lineTo(width - 40, photoY + photoH + 20)
            ctx.stroke()
          }
        } else {
          // No valid image file provided
          console.warn('No valid issue image file provided:', data.issueImageFile)
          ctx.strokeRect(photoX - 1, photoY - 1, photoW + 2, photoH + 2)
          ctx.fillStyle = "#F3F4F6"
          ctx.fillRect(photoX, photoY, photoW, photoH)
          ctx.fillStyle = subText
          ctx.font = "600 16px 'Times New Roman', serif" // Changed font style
          ctx.fillText("No issue photo provided", photoX + 20, photoY + 40)
          ctx.fillText("Please upload a photo to continue", photoX + 20, photoY + 70)
          // Divider
          ctx.strokeStyle = border
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(40, photoY + photoH + 20)
          ctx.lineTo(width - 40, photoY + photoH + 20)
          ctx.stroke()
        }
        // Bottom section layout constants
        const bottomSectionY = height - 360 // Fixed Y position for bottom section
        const bottomPadding = 40
        const spaceBetween = 40 // Space between Modi photo and QR code
        // Modi photo at bottom left, 4x bigger (only if not default placeholder)
        if (data.modiImageUrl && !data.modiImageUrl.includes("leader-default.png")) {
          try {
            const modiImg = await loadImage(data.modiImageUrl)
            const modiW = 280 // Increased width
            const modiH = 320 // Increased height
            const modiX = bottomPadding
            const modiY = bottomSectionY
            // Draw border
            ctx.save()
            ctx.strokeStyle = border
            ctx.lineWidth = 4
            ctx.strokeRect(modiX, modiY, modiW, modiH)
            // Draw image with padding
            ctx.drawImage(modiImg, modiX + 8, modiY + 8, modiW - 16, modiH - 16)
            ctx.restore()
          } catch {
            const modiW = 280
            const modiH = 320
            const modiX = bottomPadding
            const modiY = bottomSectionY
            ctx.fillStyle = "#DC2626" // red-600
            ctx.fillRect(modiX, modiY, modiW, modiH)
            ctx.fillStyle = subText
            ctx.font = "600 18px 'Times New Roman', serif" // Changed font style
            ctx.fillText("PM Modi", modiX + 80, modiY + 160)
          }
        }
        // Removed QR code section
        // Original QR code code has been removed
        
        // Footer
        ctx.fillStyle = subText
        ctx.font = "500 13px 'Times New Roman', serif" // Changed font style
        const footerY = height - 40
        // Credit and footer text
        if (data.footerCreditName) {
          ctx.font = "600 13px 'Times New Roman', serif" // Changed font style
          ctx.fillText(`Credit: ${data.footerCreditName}`, 40, footerY - 22)
          ctx.font = "500 13px 'Times New Roman', serif" // Changed font style
        }
        ctx.fillText(t.translations.footerText, 40, footerY)
        // Legal Disclaimer
        ctx.font = "400 11px 'Times New Roman', serif" // Changed font style
        ctx.fillStyle = "#6B7280" // Lighter color for disclaimer
        ctx.fillText("DISCLAIMER: This is NOT an official government document. This is a citizen-generated", 40, footerY + 15)
        ctx.fillText("report for civic awareness purposes only. No official action is guaranteed.", 40, footerY + 30)
        try {
          // Set quality to 1 and ensure background is preserved
          onRendered?.(canvas.toDataURL("image/png"))
        } catch {
          onRendered?.(null)
        }
      } catch {
        onRendered?.(null)
      } finally {
        if (revoked) URL.revokeObjectURL(revoked)
      }
    }
    void draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), logoScale])
  return (
    <div style={{ backgroundColor: "white" }}>
      <canvas 
        ref={canvasRef}
        className="w-full h-auto rounded border"
        aria-label="Generated certificate"
        style={{ backgroundColor: "white" }}
      />
    </div>
  )
})
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}
// Convert canvas to PNG with white background
function canvasToPng(canvas: HTMLCanvasElement): string {
  const { width, height } = canvas
  // Create a new canvas with white background
  const whiteCanvas = document.createElement('canvas')
  whiteCanvas.width = width
  whiteCanvas.height = height
  const whiteCtx = whiteCanvas.getContext('2d', { alpha: false })
  if (!whiteCtx) return canvas.toDataURL()
  // Fill with white
  whiteCtx.fillStyle = '#FFFFFF'
  whiteCtx.fillRect(0, 0, width, height)
  // Draw original canvas on top
  whiteCtx.drawImage(canvas, 0, 0)
  // Convert to PNG
  return whiteCanvas.toDataURL('image/png')
}
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number) {
  const words = text.split(" ")
  let line = ""
  const lineHeight = 22
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " "
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y)
      line = words[n] + " "
      y += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, y)
}