/**
 * Location and EXIF Data Processing
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

import * as exifr from "exifr"

export async function getLocationFromImageOrDevice(file: File): Promise<{
  coords?: { lat: number; lng: number }
  date?: Date
  pretty?: string
} | null> {
  try {
    const gps = await exifr.gps(file).catch(() => null as any)
    const exifDate = await exifr.parse(file, { pick: ["DateTimeOriginal", "CreateDate"] }).catch(() => null as any)

    let coords: { lat: number; lng: number } | undefined
    if (gps?.latitude && gps?.longitude) {
      coords = { lat: gps.latitude, lng: gps.longitude }
    }

    let date: Date | undefined
    const d = (exifDate?.DateTimeOriginal as Date) || (exifDate?.CreateDate as Date)
    if (d) date = new Date(d)

    // Removed device geolocation to avoid intrusive prompt; EXIF-only
    // if (!coords) {
    //   try {
    //     const device = await getDeviceLocation()
    //     if (device) coords = device
    //   } catch {
    //     // ignore
    //   }
    // }

    let pretty: string | undefined
    if (coords) {
      pretty = await coarseReverseGeocode(coords.lat, coords.lng)
    }

    return { coords, date, pretty }
  } catch {
    return null
  }
}

// Coarse reverse geocode placeholder
async function coarseReverseGeocode(lat: number, lng: number): Promise<string> {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}
