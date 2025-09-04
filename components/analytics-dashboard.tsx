

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { githubStorage } from "@/lib/github-storage"

interface AnalyticsData {
  totalReports: number
  openReports: number
  closedReports: number
  topIssueTypes: [string, number][]
  topLocations: [string, number][]
  topUsers: [string, number][]
  generatedAt: string
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true)
        const data = await githubStorage.getAnalytics()
        if (data) {
          setAnalytics(data)
        } else {
          setError('No analytics data available')
        }
      } catch (err) {
        setError('Failed to load analytics')
        console.error('Analytics error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading analytics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-gray-600 mt-2">
          Analytics will be available once reports are stored in GitHub Issues
        </p>
      </div>
    )
  }

  if (!analytics) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Civic Issues Analytics</h2>
        <p className="text-gray-600 mt-2">
          Real-time insights from community reports
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Last updated: {new Date(analytics.generatedAt).toLocaleString('en-IN')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {analytics.totalReports.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Open Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {analytics.openReports.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Resolved Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics.closedReports.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Issue Types */}
      <Card>
        <CardHeader>
          <CardTitle>Most Common Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topIssueTypes.map(([type, count], index) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-700 capitalize">
                    {type.replace(/-/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(count / analytics.totalReports) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Most Active Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topLocations.slice(0, 10).map(([location, count], index) => (
              <div key={location} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-700">
                    {location}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {count} reports
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Users */}
      <Card>
        <CardHeader>
          <CardTitle>Most Active Citizens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topUsers.slice(0, 10).map(([user, count], index) => (
              <div key={user} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-700">
                    {user === 'anonymous' ? 'Anonymous User' : user}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {count} reports
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Source Info */}
      <div className="text-center text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p>
          Data sourced from GitHub Issues repository. 
          Reports are automatically stored when citizens generate certificates.
        </p>
        <p className="mt-1">
          This dashboard updates every 6 hours with the latest community data.
        </p>
      </div>
    </div>
  )
}
