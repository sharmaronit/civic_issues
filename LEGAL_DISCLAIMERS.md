
## 📍 **Disclaimer Locations**

### 1. **Certificate Canvas Component** (`components/certificate-canvas.tsx`)
- **Location**: Footer of generated certificates
- **Content**: 
  ```
  DISCLAIMER: This is NOT an official government document. This is a citizen-generated
  report for civic awareness purposes only. No official action is guaranteed.
  ```
- **Style**: Small, light gray text at bottom of certificate
- **Purpose**: Ensures every generated certificate has legal protection

### 2. **Main Page Component** (`app/page.tsx`)
- **Location**: Leader selection section
- **Content**: 
  ```
  ⚠️ IMPORTANT DISCLAIMER
  This is NOT an official government document. This is a citizen-generated report for civic awareness purposes only. 
  The use of leader photos does not imply official endorsement or government affiliation. 
  No official action is guaranteed from this report.
  ```
- **Style**: Amber warning box with prominent styling
- **Purpose**: Warns users before they select leaders/photos

### 3. **State CM Picker Component** (`components/state-cm-picker.tsx`)
- **Location**: Below Chief Minister selection results
- **Content**: 
  ```
  ⚠️ DISCLAIMER: This is NOT an official government document. 
  The use of Chief Minister photos does not imply official endorsement or government affiliation.
  ```
- **Style**: Amber warning box below CM selection
- **Purpose**: Warns users when selecting state Chief Ministers

### 4. **State UT CM Picker Component** (`components/state-ut-cm-picker.tsx`)
- **Location**: Bottom of component
- **Content**: 
  ```
  ⚠️ DISCLAIMER: This is NOT an official government document. 
  The use of Chief Minister photos does not imply official endorsement or government affiliation.
  ```
- **Style**: Amber warning box at bottom
- **Purpose**: Warns users when selecting UT Chief Ministers

### 5. **Social Share Component** (`components/social-share.tsx`)
- **Location**: Above social media sharing buttons
- **Content**: 
  ```
  ⚠️ IMPORTANT DISCLAIMER
  This is NOT an official government document. This is a citizen-generated report for civic awareness purposes only. 
  Sharing this report does not imply official endorsement or government affiliation.
  ```
- **Style**: Amber warning box above share buttons
- **Purpose**: Warns users before sharing reports on social media

## 🎨 **Visual Design**

All disclaimers use consistent styling:
- **Background**: `bg-amber-50` (light amber)
- **Border**: `border-amber-200` (amber border)
- **Text**: `text-amber-800` (dark amber text)
- **Icon**: ⚠️ Warning emoji
- **Typography**: Small text (`text-xs`) for subtle but clear visibility

## ⚖️ **Legal Protection Benefits**

1. **Clear User Understanding**: Users know this is not official
2. **No Misrepresentation**: Prevents claims of government affiliation
3. **Reduced Liability**: Clear disclaimers reduce legal risk
4. **User Consent**: Users acknowledge the nature of the app
5. **Social Media Safety**: Warns before sharing on platforms

## 📱 **User Experience**

- **Non-intrusive**: Disclaimers don't block functionality
- **Consistent**: Same style across all components
- **Clear**: Easy to read and understand
- **Prominent**: Visible but not overwhelming
- **Contextual**: Placed where most relevant

## 🔒 **Risk Mitigation**

- **Government Misrepresentation**: Clear statements prevent confusion
- **Photo Usage**: Clarifies leader photos are not official endorsements
- **Social Sharing**: Warns users about sharing implications
- **Certificate Generation**: Every output has legal protection
- **Chief Minister Selection**: Clear about photo usage rights

## 📋 **Implementation Notes**

- Disclaimers are **frontend-only** (not in backend code)
- Use consistent amber color scheme for warning appearance
- Text is concise but comprehensive
- Placed strategically where users make key decisions
- Responsive design ensures visibility on all devices

---

**Note:** These disclaimers provide legal protection while maintaining a good user experience. They clearly communicate the app's purpose and limitations without being overly intrusive.
