
"use client"

import { Button } from "@/components/ui/button"

type SocialShareProps = {
  imageDataUrl: string
  issueType: string
  location: string
  url: string
}

export function SocialShare({ imageDataUrl, issueType, location, url }: SocialShareProps) {
  // Just use the ID from the URL path to construct the reportcard.fun URL
  const id = url.split('/').pop() // Get the last part of the path (the ID)
  const shareUrl = `https://civic-issues-6ep5.vercel.app/`
  
  // Common share text template
  const getShareText = (platform: string) => {
    const locationText = location && location !== "Not provided" ? ` in ${location}` : ""
    const baseText = `🚨 Attention needed: ${issueType} issue reported${locationText}. Our infrastructure needs immediate attention!`
    const tags = "#FixOurRoads #SwachhBharat #SmartCities"
    
    switch (platform) {
      case 'twitter':
        return encodeURIComponent(
          `${baseText}\n\n@narendramodi Please take action!\n\nMake your voice heard at civic_issues\n\n${tags}`
        )
      case 'whatsapp':
        return encodeURIComponent(
          `${baseText}\n\n📍 Help improve our city!\n Join the movement at civic_issues\n\n#CitizenAction`
        )
      case 'facebook':
      case 'linkedin':
        return encodeURIComponent(
          `${baseText}\n\nJoin me in bringing attention to civic issues. Together, we can make our cities better!\n\nCreate your report at civic_issues\n\n${tags}`
        )
      case 'instagram':
        return encodeURIComponent(
          `${baseText}\n\n📸 Taking action for better infrastructure\n🏛️ Making our voice heard\n🔗 Join us: civic_issues\n\n${tags}\n#CitizenAction #VocalForLocal`
        )
      default:
        return encodeURIComponent(
          `${baseText}\n\nJoin the movement: civic_issues\n\n${tags}`
        )
    }
  }

  const handleShare = async (platform: string) => {
    // Convert data URL to Blob for native sharing
    const getImageBlob = async () => {
      const response = await fetch(imageDataUrl)
      const blob = await response.blob()
      return new File([blob], 'civic-issue-certificate.png', { type: 'image/png' })
    }

    switch (platform) {
      case 'twitter':
        const tweetUrl = `https://twitter.com/intent/tweet?text=${getShareText('twitter')}`
        window.open(tweetUrl, '_blank')
        break
        
      case 'whatsapp':
        const waUrl = `https://wa.me/?text=${getShareText('whatsapp')}`
        window.open(waUrl, '_blank')
        break
        
      case 'facebook':
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${getShareText('facebook')}`
        window.open(fbUrl, '_blank')
        break
        
      case 'linkedin':
        const liUrl = `https://www.linkedin.com/sharing/share-offsite/?text=${getShareText('linkedin')}`
        window.open(liUrl, '_blank')
        break
        
      case 'instagram':
        // Instagram sharing needs to be handled through native share API
        if (navigator.share) {
          try {
            const file = await getImageBlob()
            await navigator.share({
              files: [file],
              text: getShareText('instagram')
            })
          } catch (err) {
            console.error('Error sharing to Instagram:', err)
            alert('To share on Instagram, please save the image and share it manually.')
          }
        } else {
          alert('To share on Instagram, please save the image and share it manually.')
        }
        break
        
      case 'native':
        if (navigator.share) {
          try {
            const file = await getImageBlob()
            await navigator.share({
              files: [file],
              text: getShareText('native')
            })
          } catch (err) {
            console.error('Error using native share:', err)
          }
        }
        break
    }
  }

  return (
    <div className="space-y-3">
      {/* Legal Disclaimer */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-800 font-medium mb-1">⚠️ IMPORTANT DISCLAIMER</p>
        <p className="text-xs text-amber-700">
          This is <strong>NOT an official government document</strong>. This is a citizen-generated report for civic awareness purposes only. 
          Sharing this report does not imply official endorsement or government affiliation.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
          onClick={() => handleShare('twitter')}
        >
          Share on Twitter
        </Button>
        
        <Button
          className="bg-[#25D366] hover:bg-[#128C7E] text-white"
          onClick={() => handleShare('whatsapp')}
        >
          Share on WhatsApp
        </Button>
        
        <Button
          className="bg-[#4267B2] hover:bg-[#365899] text-white"
          onClick={() => handleShare('facebook')}
        >
          Share on Facebook
        </Button>
        
        <Button
          className="bg-[#0077b5] hover:bg-[#006399] text-white"
          onClick={() => handleShare('linkedin')}
        >
          Share on LinkedIn
        </Button>
        
        <Button
          className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white"
          onClick={() => handleShare('instagram')}
        >
          Share on Instagram
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleShare('native')}
        >
          Share...
        </Button>
      </div>
    </div>
  )
}
