/**
 * Indian States and Union Territories Data
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

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
]

export const INDIAN_UNION_TERRITORIES = [
  "Delhi",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
]

export const CURRENT_CM_BY_REGION: Record<string, { name: string; wikiTitle: string } | null> = {
  // States (as-of 2024)
  "Andhra Pradesh": { name: "Sri Nara Chandrababu Naidu", wikiTitle: "N._Chandrababu_Naidu" },
  "Arunachal Pradesh": { name: "Shri Pema Khandu", wikiTitle: "Pema_Khandu" },
  Assam: { name: "Shri Himanta Biswa Sarma", wikiTitle: "Himanta_Biswa_Sarma" },
  Bihar: { name: "Shri Nitish Kumar", wikiTitle: "Nitish_Kumar" },
  Chhattisgarh: { name: "Shri Vishnu Deo Sai", wikiTitle: "Vishnu_Deo_Sai" },
  Goa: { name: "Shri Pramod Sawant", wikiTitle: "Pramod_Sawant" },
  Gujarat: { name: "Shri Bhupendra Patel", wikiTitle: "Bhupendra_Patel" },
  Haryana: { name: "Shri Nayab Singh Saini", wikiTitle: "Nayab_Singh_Saini" },
  "Himachal Pradesh": { name: "Shri Sukhvinder Singh Sukhu", wikiTitle: "Sukhvinder_Singh_Sukhu" },
  Jharkhand: { name: "Shri Hemant Soren", wikiTitle: "Hemant_Soren" },
  Karnataka: { name: "Shri Siddaramaiah", wikiTitle: "Siddaramaiah" },
  Kerala: { name: "Shri Pinarayi Vijayan", wikiTitle: "Pinarayi_Vijayan" },
  "Madhya Pradesh": { name: "Shri Mohan Yadav", wikiTitle: "Mohan_Yadav_(politician)" },
  Maharashtra: { name: "Shri Devendra Fadnavis", wikiTitle: "Devendra_Fadnavis" },
  Manipur: null, // No CM currently
  Meghalaya: { name: "Shri Conrad Kongkal Sangma", wikiTitle: "Conrad_Sangma" }, // Fixed Wikipedia title
  Mizoram: { name: "Shri PU Lalduhoma", wikiTitle: "Lalduhoma" }, // Fixed Wikipedia title
  Nagaland: { name: "Shri Neiphiu Rio", wikiTitle: "Neiphiu_Rio" },
  Odisha: { name: "Shri Mohan Charan Majhi", wikiTitle: "Mohan_Charan_Majhi" },
  Punjab: { name: "Shri Bhagwant Singh Mann", wikiTitle: "Bhagwant_Singh_Mann" },
  Rajasthan: { name: "Shri Bhajan Lal Sharma", wikiTitle: "Bhajan_Lal_Sharma" },
  Sikkim: { name: "Shri Prem Singh Tamang (Golay)", wikiTitle: "Prem_Singh_Tamang" },
  "Tamil Nadu": { name: "Shri M. K. Stalin", wikiTitle: "M._K._Stalin" },
  Telangana: { name: "Shri A Revanth Reddy", wikiTitle: "A._Revanth_Reddy" },
  Tripura: { name: "Dr. Manik Saha", wikiTitle: "Manik_Saha" },
  "Uttar Pradesh": { name: "Shri Yogi Aditya Nath", wikiTitle: "Yogi_Adityanath" },
  Uttarakhand: { name: "Shri Pushkar Singh Dhami", wikiTitle: "Pushkar_Singh_Dhami" },
  "West Bengal": { name: "Km. Mamata Banerjee", wikiTitle: "Mamata_Banerjee" },

  // Union Territories
  Delhi: { name: "Smt. Rekha Gupta", wikiTitle: "Rekha_Gupta_(politician)" },
  Puducherry: { name: "Shri N. Rangaswamy", wikiTitle: "N._Rangaswamy" },
  "Jammu and Kashmir": { name: "Shri Omar Abdullah", wikiTitle: "Omar_Abdullah" },

  // UTs with no CM currently
  Ladakh: null,
  Chandigarh: null,
  "Andaman and Nicobar Islands": null,
  "Dadra and Nagar Haveli and Daman and Diu": null,
  Lakshadweep: null,
}
