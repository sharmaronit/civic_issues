/**
 * Local Storage Management for Civic Reports
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

import type { PersistedReport } from "@/components/certificate-canvas"

const KEY = "civic_reports_v1"

export function saveReport(report: PersistedReport) {
  if (typeof window === "undefined") return
  const all = getAllReports()
  all[report.id] = report
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getReport(id: string): PersistedReport | null {
  if (typeof window === "undefined") return null
  const all = getAllReports()
  return all[id] ?? null
}

export function getAllReports(): Record<string, PersistedReport> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, PersistedReport>
  } catch {
    return {}
  }
}

export function listReports(): PersistedReport[] {
  const map = getAllReports()
  return Object.values(map).sort((a, b) => {
    const da = new Date(a.capturedAt).getTime()
    const db = new Date(b.capturedAt).getTime()
    return db - da
  })
}

export function deleteReport(id: string) {
  const all = getAllReports()
  delete all[id]
  localStorage.setItem(KEY, JSON.stringify(all))
}
