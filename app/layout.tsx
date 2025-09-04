import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { cn } from "@/lib/utils" // Import the cn utility
import './globals.css'

export const metadata: Metadata = {
  title: 'Civic Issue Reporting App',
  description: 'A modern web application for reporting and tracking civic issues in your community. Created by Chandravijay Agrawal.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen font-sans antialiased", GeistSans.variable, GeistMono.variable)}>
        
        {/* BACKGROUND IMAGE CONTAINER */}
        <div className="fixed top-0 left-0 w-full h-full bg-[url('/images/latest.jpg')] bg-cover bg-center bg-no-repeat z-[-1]" />
        
        {/* DARK OVERLAY */}
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-[-1]" />

        {/* PAGE CONTENT */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}