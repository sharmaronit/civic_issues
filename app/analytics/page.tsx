"use client"

import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            View community analytics and civic issue insights
          </p>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 relative overflow-hidden">
          {/* New Feature Banner */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              ✨ NEW FEATURE
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              📊 Community Analytics Dashboard
            </h2>
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm font-medium animate-bounce">
              🎉 Just Launched!
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800 font-medium">
                  🚀 <strong>Brand New:</strong> Real-time community insights! 
                  Track civic issues, analyze trends, and monitor community impact - all automatically updated every 6 hours.
                </p>
              </div>
            </div>
          </div>
          
          <AnalyticsDashboard />
        </div>


      </div>
    </div>
  )
}
