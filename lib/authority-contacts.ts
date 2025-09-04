/**
 * Authority Contacts and RTI Templates
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

type AuthorityContact = {
  name: string
  email: string
  role: string
  jurisdiction: string
}

export type RTITemplate = {
  authority: string
  template: string
  steps: string[]
  onlineSteps: string[]
  offlineSteps: string[]
}

// Default authority contacts
export const authorityContacts: AuthorityContact[] = [
  {
    name: "Ministry of Road Transport & Highways",
    email: "transportminister@gov.in",
    role: "Road Infrastructure",
    jurisdiction: "National"
  },
  {
    name: "Central Public Works Department",
    email: "cpwd_dgw@nic.in",
    role: "Public Infrastructure",
    jurisdiction: "National"
  },
  {
    name: "Municipal Corporation",
    email: "commissioner.mcgm@mcgm.gov.in",
    role: "Local Infrastructure",
    jurisdiction: "Municipal"
  },
  {
    name: "Ministry of Urban Development",
    email: "secyurban@nic.in",
    role: "Urban Infrastructure",
    jurisdiction: "National"
  }
]

// RTI Templates for different issues
export const rtiTemplates: Record<string, RTITemplate> = {
  "Pothole": {
    authority: "Public Works Department / Municipal Corporation",
    template: `To,
The Public Information Officer
[Authority Name]
[Address]

Subject: RTI Application regarding unrepaired potholes in [Location]

Dear Sir/Madam,

Under the Right to Information Act 2005, I request the following information:

1. Number of complaints received regarding potholes at [Location] in the past 6 months
2. Budget allocated and utilized for road repairs in this area
3. Timeline and action plan for repairing the reported potholes
4. Name and designation of officials responsible for road maintenance in this area
5. Copy of any contracts/work orders issued for road repairs in this area
6. Standard operating procedure for addressing pothole complaints
7. Details of any quality checks performed after road repairs

Payment of RTI fee of Rs. 10/- is enclosed herewith.

Yours faithfully,
[Your Name]
[Address]
[Phone]
[Email]`,
    steps: [
      "1. Identify the correct Public Authority (Municipal Corporation for city roads, PWD for state highways)",
      "2. Fill the RTI application form or write your application on plain paper",
      "3. Attach proof of Indian citizenship (copy of Voter ID/Passport/Aadhar)",
      "4. Attach application fee of ₹10 (IPO/DD/Court Fee Stamp)",
      "5. Send by registered post or submit in person to the PIO",
      "6. Keep the acknowledgment/receipt safe",
      "7. Track your application using the registration number",
      "8. You should receive a response within 30 days"
    ],
    onlineSteps: [
      "1. Visit RTI Online Portal (rtionline.gov.in) - Official Government Portal",
      "2. Create account using your mobile number and email",
      "3. Select Ministry/Department (e.g., Ministry of Road Transport & Highways)",
      "4. Fill the online RTI application form",
      "5. Upload supporting documents (ID proof)",
      "6. Pay ₹10 fee online using credit/debit card, net banking, or UPI",
      "7. Submit application and note the registration number",
      "8. Track status online using the registration number"
    ],
    offlineSteps: [
      "1. Download RTI application form from rtionline.gov.in or write on plain paper",
      "2. Fill application clearly with your details and information requested",
      "3. Attach copy of ID proof (Voter ID/Passport/Aadhar)",
      "4. Purchase ₹10 Indian Postal Order (IPO) or Court Fee Stamp",
      "5. Submit in person to PIO or send via registered post",
      "6. Get acknowledgment receipt with registration number",
      "7. Keep receipt safe for tracking and follow-up",
      "8. Follow up after 30 days if no response received"
    ]
  },
  "Garbage": {
    authority: "Municipal Corporation - Solid Waste Management Department",
    template: `To,
The Public Information Officer
[Municipal Corporation Name]
[Address]

Subject: RTI Application regarding garbage disposal issues at [Location]

Dear Sir/Madam,

Under the Right to Information Act 2005, I request the following information:

1. Schedule and frequency of garbage collection in [Location]
2. Details of waste management contractors responsible for this area
3. Number of complaints received regarding garbage disposal in past 3 months
4. Action taken on these complaints
5. Copy of waste management contracts and service level agreements
6. Names of officials responsible for monitoring waste collection
7. Penalties imposed on contractors for service failures, if any

Payment of RTI fee of Rs. 10/- is enclosed herewith.

Yours faithfully,
[Your Name]
[Address]
[Phone]
[Email]`,
    steps: [
      "1. Identify your local Municipal Corporation",
      "2. Write application addressing the PIO of Solid Waste Management dept",
      "3. Attach proof of Indian citizenship (copy of Voter ID/Passport/Aadhar)",
      "4. Attach application fee of ₹10 (IPO/DD/Court Fee Stamp)",
      "5. Submit in person or send by registered post",
      "6. Keep acknowledgment/tracking number safe",
      "7. Follow up after 30 days if no response received"
    ],
    onlineSteps: [
      "1. Visit RTI Online Portal (rtionline.gov.in)",
      "2. Create account with mobile and email verification",
      "3. Select Ministry of Urban Development or your State Urban Development",
      "4. Fill online RTI form with specific garbage disposal queries",
      "5. Upload ID proof and any supporting documents",
      "6. Pay ₹10 fee online (card/net banking/UPI)",
      "7. Submit and save registration number",
      "8. Track application status online"
    ],
    offlineSteps: [
      "1. Write RTI application on plain paper or use downloaded form",
      "2. Address to PIO of your Municipal Corporation",
      "3. Clearly state information needed about garbage disposal",
      "4. Attach copy of ID proof (Voter ID/Passport/Aadhar)",
      "5. Purchase ₹10 IPO or Court Fee Stamp",
      "6. Submit in person to Municipal Corporation office",
      "7. Get acknowledgment with registration number",
      "8. Follow up after 30 days"
    ]
  },
  "default": {
    authority: "Municipal Corporation / Public Works Department",
    template: `To,
The Public Information Officer
[Authority Name]
[Address]

Subject: RTI Application regarding civic issue at [Location]

Dear Sir/Madam,

Under the Right to Information Act 2005, I request the following information:

1. Number of complaints received regarding [Issue Type] at [Location]
2. Details of officials responsible for maintaining this area
3. Budget allocated for addressing such issues
4. Timeline for resolving the reported issue
5. Copy of relevant contracts/work orders
6. Standard operating procedure for addressing such complaints
7. Details of action taken on previous complaints

Payment of RTI fee of Rs. 10/- is enclosed herewith.

Yours faithfully,
[Your Name]
[Address]
[Phone]
[Email]`,
    steps: [
      "1. Identify the appropriate Public Authority for your issue",
      "2. Write your RTI application clearly stating the information needed",
      "3. Attach proof of Indian citizenship (copy of Voter ID/Passport/Aadhar)",
      "4. Attach application fee of ₹10 (IPO/DD/Court Fee Stamp)",
      "5. Submit to PIO in person or via registered post",
      "6. Keep acknowledgment/tracking number",
      "7. Follow up if no response within 30 days",
      "8. You can file first appeal if unsatisfied with response"
    ],
    onlineSteps: [
      "1. Visit RTI Online Portal (rtionline.gov.in)",
      "2. Create account with mobile and email verification",
      "3. Select appropriate Ministry/Department for your issue",
      "4. Fill online RTI application form completely",
      "5. Upload required documents (ID proof)",
      "6. Pay ₹10 fee online using available payment methods",
      "7. Submit application and note registration number",
      "8. Track status online and follow up as needed"
    ],
    offlineSteps: [
      "1. Write RTI application on plain paper or use form",
      "2. Address to PIO of relevant authority",
      "3. Clearly specify information requested",
      "4. Attach copy of ID proof (Voter ID/Passport/Aadhar)",
      "5. Purchase ₹10 IPO or Court Fee Stamp",
      "6. Submit in person or via registered post",
      "7. Get acknowledgment with registration number",
      "8. Follow up after 30 days if no response"
    ]
  }
}
