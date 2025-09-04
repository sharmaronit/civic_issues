
## ✅ **Working Chief Ministers (Photos Available)**

| State | Chief Minister | Wikipedia Title | Status |
|-------|----------------|-----------------|---------|
| Andhra Pradesh | Sri Nara Chandrababu Naidu | `N._Chandrababu_Naidu` | ✅ Working |
| Arunachal Pradesh | Shri Pema Khandu | `Pema_Khandu` | ✅ Working |
| Assam | Shri Himanta Biswa Sarma | `Himanta_Biswa_Sarma` | ✅ Working |
| Bihar | Shri Nitish Kumar | `Nitish_Kumar` | ✅ Working |
| Chhattisgarh | Shri Vishnu Deo Sai | `Vishnu_Deo_Sai` | ✅ Working |
| Goa | Shri Pramod Sawant | `Pramod_Sawant` | ✅ Working |
| Gujarat | Shri Bhupendra Patel | `Bhupendra_Patel` | ✅ Working |
| Haryana | Shri Nayab Singh Saini | `Nayab_Singh_Saini` | ✅ Working |
| Himachal Pradesh | Shri Sukhvinder Singh Sukhu | `Sukhvinder_Singh_Sukhu` | ✅ Working |
| Jharkhand | Shri Hemant Soren | `Hemant_Soren` | ✅ Working |
| Karnataka | Shri Siddaramaiah | `Siddaramaiah` | ✅ Working |
| Kerala | Shri Pinarayi Vijayan | `Pinarayi_Vijayan` | ✅ Working |
| Madhya Pradesh | Shri Mohan Yadav | `Mohan_Yadav_(politician)` | ✅ Working |
| Maharashtra | Shri Devendra Fadnavis | `Devendra_Fadnavis` | ✅ Working |
| Meghalaya | Shri Conrad Kongkal Sangma | `Conrad_Sangma` | ✅ Working (Fixed) |
| Mizoram | Shri PU Lalduhoma | `Lalduhoma` | ✅ Working (Fixed) |
| Nagaland | Shri Neiphiu Rio | `Neiphiu_Rio` | ✅ Working |
| Odisha | Shri Mohan Charan Majhi | `Mohan_Charan_Majhi` | ✅ Working |
| Punjab | Shri Bhagwant Singh Mann | `Bhagwant_Singh_Mann` | ✅ Working |
| Rajasthan | Shri Bhajan Lal Sharma | `Bhajan_Lal_Sharma` | ✅ Working |
| Sikkim | Shri Prem Singh Tamang (Golay) | `Prem_Singh_Tamang` | ✅ Working |
| Tamil Nadu | Shri M. K. Stalin | `M._K._Stalin` | ✅ Working |
| Telangana | Shri A Revanth Reddy | `A._Revanth_Reddy` | ✅ Working |
| Tripura | Dr. Manik Saha | `Manik_Saha` | ✅ Working |
| Uttar Pradesh | Shri Yogi Aditya Nath | `Yogi_Adityanath` | ✅ Working |
| Uttarakhand | Shri Pushkar Singh Dhami | `Pushkar_Singh_Dhami` | ✅ Working |
| West Bengal | Km. Mamata Banerjee | `Mamata_Banerjee` | ✅ Working |

## 🏛️ **Union Territories with Chief Ministers**

| UT | Chief Minister | Wikipedia Title | Status |
|----|----------------|-----------------|---------|
| Delhi | Smt. Rekha Gupta | `Rekha_Gupta_(politician)` | ✅ Working |
| Puducherry | Shri N. Rangaswamy | `N._Rangaswamy` | ✅ Working |
| Jammu and Kashmir | Shri Omar Abdullah | `Omar_Abdullah` | ✅ Working |

## ⚠️ **Special Cases**

| State | Status | Notes |
|-------|--------|-------|
| Manipur | ❌ No CM | Currently under President's Rule, no Chief Minister |

## 🔧 **How Photos Are Fetched**

1. **Wikipedia API Integration**: Uses `lib/wiki.ts` to fetch images
2. **Automatic Fallback**: If direct title fails, searches Wikipedia for alternatives
3. **Error Handling**: Shows "No image" placeholder if image can't be loaded
4. **Image Quality**: Fetches high-quality images (600px default, configurable)

## 📱 **User Experience**

- Users select their state/UT from dropdown
- Click "Load CM" button
- App automatically fetches current Chief Minister's photo from Wikipedia
- If photo loads successfully, user can use it in their civic issue report
- If photo fails to load, user sees helpful error message

## 🚀 **Technical Implementation**

```typescript
// Example of how photos are fetched
const { imageUrl, pageUrl } = await fetchWikiLeadImage(wikiTitle, 700)
```

## 📊 **Success Rate**

- **States**: 27/28 (96.4%) - All working except Manipur (no CM)
- **Union Territories**: 3/3 (100%) - All working
- **Overall**: 30/31 (96.8%) - Excellent coverage

## 🔄 **Maintenance**

- Wikipedia titles are updated as needed
- New Chief Ministers are added when they take office
- API automatically handles Wikipedia redirects and updates
- No manual image management required

---

**Note:** All Chief Minister data is current as of 2024. The app automatically fetches the latest images from Wikipedia, ensuring users always see current official photos.
