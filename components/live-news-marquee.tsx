/**
 * Live News Marquee Component
 * 
 * Displays top issue types and locations in a breaking news format
 * @author Chandravijay Agrawal
 */

"use client"

import { useEffect, useState } from "react"
import { githubStorage } from "@/lib/github-storage"

export function LiveNewsMarquee() {
  const [topIssueTypes, setTopIssueTypes] = useState<[string, number][]>([])
  const [topLocations, setTopLocations] = useState<[string, number][]>([])
  const [isMarqueeLoading, setIsMarqueeLoading] = useState(true)

  useEffect(() => {
    async function fetchMarqueeData() {
      try {
        setIsMarqueeLoading(true)
        const issues = await githubStorage.getGitHubIssues()
        if (issues && issues.length > 0) {
          // Parse issue data to extract issue types and locations
          const issueTypes: Record<string, number> = {}
          const locations: Record<string, number> = {}
          
          issues.forEach(issue => {
            const body = issue.body || ''
            
            // Extract issue type
            const issueTypeMatch = body.match(/\*\*Issue Type:\*\*\s*([^\n]+)/)
            if (issueTypeMatch) {
              const issueType = issueTypeMatch[1].trim()
              issueTypes[issueType] = (issueTypes[issueType] || 0) + 1
            }
            
            // Extract location
            const locationMatch = body.match(/\*\*Location:\*\*\s*([^\n]+)/)
            if (locationMatch) {
              const location = locationMatch[1].trim()
              locations[location] = (locations[location] || 0) + 1
            }
          })
          
          // Convert to sorted arrays
          const sortedIssueTypes = Object.entries(issueTypes)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
          
          const sortedLocations = Object.entries(locations)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
          
          setTopIssueTypes(sortedIssueTypes)
          setTopLocations(sortedLocations)
        }
      } catch (error) {
        console.error('Error fetching marquee data:', error)
      } finally {
        setIsMarqueeLoading(false)
      }
    }
    
    fetchMarqueeData()
  }, [])

  if (isMarqueeLoading || (topIssueTypes.length === 0 && topLocations.length === 0)) {
    return null
  }

  return (
    <div className="bg-blue-600 border-b border-blue-700">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <div className="flex items-center gap-8 px-4 py-3 text-sm">
            <span className="font-bold text-white bg-red-600 px-2 py-1 rounded text-xs">🚨 BREAKING NEWS</span>
            <span className="text-blue-100 font-medium">Community Alert:</span>
            {topIssueTypes.map(([type, count], index) => (
              <span key={index} className="text-white">
                <span className="font-semibold">{type}</span> crisis reported <span className="font-bold text-yellow-300">{count} times</span>
              </span>
            ))}
            <span className="text-blue-100 font-medium">| Hotspots:</span>
            {topLocations.map(([location, count], index) => (
              <span key={index} className="text-white">
                <span className="font-semibold">{location}</span> needs attention <span className="font-bold text-yellow-300">({count} reports)</span>
              </span>
            ))}
            <span className="text-blue-100 font-medium">| Citizens Demand Action:</span>
            {topIssueTypes.map(([type, count], index) => (
              <span key={index} className="text-white">
                <span className="font-semibold">{type}</span> crisis reported <span className="font-bold text-yellow-300">{count} times</span>
              </span>
            ))}
            <span className="text-blue-100 font-medium">| Critical Areas:</span>
            {topLocations.map(([location, count], index) => (
              <span key={index} className="text-white">
                <span className="font-semibold">{location}</span> needs attention <span className="font-bold text-yellow-300">({count} reports)</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
