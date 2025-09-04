/**
 * Indian States and Chief Ministers Data
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

// States only (28); UTs excluded per your request.
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const

export type IndianState = (typeof INDIAN_STATES)[number]

export const CM_NAME_BY_STATE: Record<IndianState, string> = {
  "Andhra Pradesh": "Sri Nara Chandrababu Naidu",
  "Arunachal Pradesh": "Shri Pema Khandu",
  Assam: "Shri Himanta Biswa Sarma",
  Bihar: "Shri Nitish Kumar",
  Chhattisgarh: "Shri Vishnu Deo Sai",
  Goa: "Shri Pramod Sawant",
  Gujarat: "Shri Bhupendra Patel",
  Haryana: "Shri Nayab Singh Saini",
  "Himachal Pradesh": "Shri Sukhvinder Singh Sukhu",
  Jharkhand: "Shri Hemant Soren",
  Karnataka: "Shri Siddaramaiah",
  Kerala: "Shri Pinarayi Vijayan",
  "Madhya Pradesh": "Shri Mohan Yadav",
  Maharashtra: "Shri Devendra Fadnavis",
  Manipur: "-", // No CM currently
  Meghalaya: "Shri Conrad Kongkal Sangma",
  Mizoram: "Shri PU Lalduhoma",
  Nagaland: "Shri Neiphiu Rio",
  Odisha: "Shri Mohan Charan Majhi",
  Punjab: "Shri Bhagwant Singh Mann",
  Rajasthan: "Shri Bhajan Lal Sharma",
  Sikkim: "Shri Prem Singh Tamang (Golay)",
  "Tamil Nadu": "Shri M. K. Stalin",
  Telangana: "Shri A Revanth Reddy",
  Tripura: "Dr. Manik Saha",
  "Uttar Pradesh": "Shri Yogi Aditya Nath",
  Uttarakhand: "Shri Pushkar Singh Dhami",
  "West Bengal": "Km. Mamata Banerjee",
}

// Wikipedia titles (some differ from display names)
export const CM_WIKI_TITLE_BY_STATE: Record<IndianState, string> = {
  "Andhra Pradesh": "N._Chandrababu_Naidu",
  "Arunachal Pradesh": "Pema_Khandu",
  Assam: "Himanta_Biswa_Sarma",
  Bihar: "Nitish_Kumar",
  Chhattisgarh: "Vishnu_Deo_Sai",
  Goa: "Pramod_Sawant",
  Gujarat: "Bhupendra_Patel",
  Haryana: "Nayab_Singh_Saini",
  "Himachal Pradesh": "Sukhvinder_Singh_Sukhu",
  Jharkhand: "Hemant_Soren",
  Karnataka: "Siddaramaiah",
  Kerala: "Pinarayi_Vijayan",
  "Madhya Pradesh": "Mohan_Yadav_(politician)",
  Maharashtra: "Devendra_Fadnavis",
  Manipur: "Manipur_Government", // No specific CM page
  Meghalaya: "Conrad_Sangma", // Fixed: removed "Kongkal" as it's not in Wikipedia
  Mizoram: "Lalduhoma", // Fixed: removed "PU" prefix as it's not in Wikipedia
  Nagaland: "Neiphiu_Rio",
  Odisha: "Mohan_Charan_Majhi",
  Punjab: "Bhagwant_Singh_Mann",
  Rajasthan: "Bhajan_Lal_Sharma",
  Sikkim: "Prem_Singh_Tamang",
  "Tamil Nadu": "M._K._Stalin",
  Telangana: "A._Revanth_Reddy",
  Tripura: "Manik_Saha",
  "Uttar Pradesh": "Yogi_Adityanath",
  Uttarakhand: "Pushkar_Singh_Dhami",
  "West Bengal": "Mamata_Banerjee",
}

// Union Territories support: list + (partial) CM mappings and wiki titles
export const INDIAN_UNION_TERRITORIES = [
  "Delhi",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
] as const

export type IndianUT = (typeof INDIAN_UNION_TERRITORIES)[number]

// Only UTs that currently have a CM (others are administered differently)
export const CM_NAME_BY_UT: Partial<Record<IndianUT, string>> = {
  Delhi: "Smt. Rekha Gupta",
  Puducherry: "Shri N. Rangaswamy",
  "Jammu and Kashmir": "Shri Omar Abdullah",
}

export const CM_WIKI_TITLE_BY_UT: Partial<Record<IndianUT, string>> = {
  Delhi: "Rekha_Gupta_(politician)",
  Puducherry: "N._Rangaswamy",
  "Jammu and Kashmir": "Omar_Abdullah",
}
