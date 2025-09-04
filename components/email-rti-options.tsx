/**
 * Email RTI Options Component
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authorityContacts, rtiTemplates } from "@/lib/authority-contacts"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type EmailRTIOptionsProps = {
  issueType: string
  location: string
}

export function EmailRTIOptions({ issueType, location }: EmailRTIOptionsProps) {
  const [selectedAuthority, setSelectedAuthority] = useState(authorityContacts[0].email)
  const [showRTI, setShowRTI] = useState(false)

  // Get RTI template based on issue type
  const rtiTemplate = rtiTemplates[issueType] || rtiTemplates.default
  
  // Replace placeholders in template
  const filledTemplate = rtiTemplate.template
    .replace("[Location]", location || "[Location]")
    .replace("[Issue Type]", issueType)

  const emailSubject = `Urgent Action Required: ${issueType} issue reported at ${location}`
  const emailBody = `Dear Sir/Madam,

I am writing to bring to your attention a civic issue that requires immediate action.

Issue Type: ${issueType}
Location: ${location}

This issue poses significant inconvenience and potential safety hazards to citizens. I have documented this issue and request your prompt intervention to resolve it.

Key requests:
1. Immediate inspection of the site
2. Timeline for resolving this issue
3. Preventive measures to avoid similar issues
4. Regular updates on the progress

You can view the detailed report here: [URL will be added]

Looking forward to your swift action on this matter.

Regards,
[Your name]`

  return (
    <div className="space-y-4 pt-4">
      {/* Email Authority Option */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Email to Authorities</h3>
        <div className="space-y-4">
          <div>
            <Label>Select Authority</Label>
            <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
              <SelectTrigger>
                <SelectValue placeholder="Choose authority to email" />
              </SelectTrigger>
              <SelectContent>
                {authorityContacts.map(contact => (
                  <SelectItem key={contact.email} value={contact.email}>
                    {contact.name} ({contact.jurisdiction})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              const mailtoUrl = `mailto:${selectedAuthority}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
              window.open(mailtoUrl, '_blank')
            }}
          >
            Compose Email
          </Button>
        </div>
      </Card>

      {/* RTI Option */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Want to file RTI for this?</h3>
        <p className="text-sm text-gray-600 mb-3">
          Use Right to Information (RTI) Act to get official information about this issue
        </p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setShowRTI(!showRTI)}
        >
          {showRTI ? "Hide RTI Template" : "Show RTI Template"}
        </Button>
        
        {showRTI && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium mb-2">RTI Application Template</h4>
              <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded text-sm font-mono">
                {filledTemplate}
              </pre>
              <Button
                variant="secondary"
                className="mt-2"
                onClick={() => {
                  navigator.clipboard.writeText(filledTemplate)
                }}
              >
                Copy Template
              </Button>
            </div>
            
            {/* Online RTI Filing Steps */}
            <div>
              <h4 className="font-medium mb-2">📱 Online RTI Filing Steps</h4>
              <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-3">
                <p className="text-sm text-blue-800 font-medium mb-2">🌐 Popular Online RTI Portals:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>rtionline.gov.in</strong> - Official Government Portal (Recommended)</li>
                  <li>• <strong>rti.gov.in</strong> - RTI Online Filing System</li>
                  <li>• <strong>rti.india.gov.in</strong> - Central RTI Portal</li>
                  <li>• <strong>rti.maharashtra.gov.in</strong> - Maharashtra RTI Portal</li>
                  <li>• <strong>rti.karnataka.gov.in</strong> - Karnataka RTI Portal</li>
                  <li>• <strong>rti.delhi.gov.in</strong> - Delhi RTI Portal</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  💡 Tip: Check your state's official RTI portal for faster processing of local issues
                </p>
              </div>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                {rtiTemplate.onlineSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Offline RTI Filing Steps */}
            <div>
              <h4 className="font-medium mb-2">📄 Offline RTI Filing Steps</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                {rtiTemplate.offlineSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Traditional Steps (Legacy) */}
            <div>
              <h4 className="font-medium mb-2">📋 General RTI Filing Information</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                {rtiTemplate.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div className="bg-amber-50 p-3 rounded border border-amber-200">
              <p className="text-sm text-amber-800 font-medium mb-2">💡 Pro Tips:</p>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• <strong>Online filing is faster</strong> and provides instant tracking</li>
                <li>• <strong>Keep all receipts</strong> and acknowledgment numbers safe</li>
                <li>• <strong>Follow up after 30 days</strong> if no response received</li>
                <li>• <strong>File first appeal</strong> if unsatisfied with the response</li>
                <li>• <strong>Be specific</strong> in your information requests</li>
              </ul>
            </div>

            {/* RTI Fees and Requirements */}
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm text-green-800 font-medium mb-2">💰 RTI Filing Requirements:</p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>Application Fee:</strong> ₹10 (₹5 for BPL families)</li>
                <li>• <strong>ID Proof Required:</strong> Voter ID, Passport, Aadhar, or Driving License</li>
                <li>• <strong>Response Time:</strong> 30 days (45 days for complex queries)</li>
                <li>• <strong>Appeal Deadline:</strong> 30 days from response date</li>
                <li>• <strong>Language:</strong> Hindi, English, or local language</li>
              </ul>
            </div>

            {/* Additional Resources */}
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm text-purple-800 font-medium mb-2">📚 Additional Resources:</p>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>RTI Act 2005:</strong> Complete text available on rti.gov.in</li>
                <li>• <strong>Sample Applications:</strong> Templates for common issues</li>
                <li>• <strong>Appeal Process:</strong> How to file first and second appeals</li>
                <li>• <strong>RTI Activists:</strong> Local groups that can help with filing</li>
                <li>• <strong>Helpline:</strong> 1800-180-1111 (RTI Helpline)</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-600">
              Note: For faster resolution, try the email option first. Use RTI if you don&apos;t receive a satisfactory response.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
