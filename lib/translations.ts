/**
 * Multi-language Translations for Civic Issue App
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

export type Language = {
  code: string
  name: string
  nativeName: string
  translations: {
    // Certificate texts
    title: string
    subtitle: string
    dateTimeLabel: string
    locationLabel: string
    issueLabel: string
    noteLabel: string
    footerText: string
    scanQrText: string
    slogan: string
    impactText: string
    // Form labels
    selectIssueType: string
    enterLocation: string
    addNote: string
    uploadPhoto: string
    chooseLeaders: string
    generateCertificate: string
    shareOnline: string
  }
}

export const languages: Language[] = [
  {
    code: 'en-hi',
    name: 'English + Hindi',
    nativeName: 'English + हिंदी',
    translations: {
      title: 'Civic Issue Certificate',
      subtitle: 'नागरिक समस्या प्रमाणपत्र',
      dateTimeLabel: 'Date & Time / दिनांक',
      locationLabel: 'Location / स्थान',
      issueLabel: 'Issue',
      noteLabel: 'Note',
      footerText: 'This certificate documents a civic issue reported by a citizen.',
      scanQrText: 'Scan to view report\nरिपोर्ट देखने हेतु स्कैन करें',
      slogan: 'Your Voice Matters / आपकी आवाज़ महत्वपूर्ण है',
      impactText: 'Together for Better Communities / बेहतर समुदाय के लिए एकजुट',
      selectIssueType: 'Select Issue Type / समस्या का चयन करें',
      enterLocation: 'Enter Location / स्थान दर्ज करें',
      addNote: 'Add Note (Optional) / नोट जोड़ें (वैकल्पिक)',
      uploadPhoto: 'Upload Photo / फोटो अपलोड करें',
      chooseLeaders: 'Choose Leaders / नेताओं का चयन करें',
      generateCertificate: 'Generate Certificate / प्रमाणपत्र बनाएं',
      shareOnline: 'Share Online / ऑनलाइन साझा करें'
    }
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    translations: {
      title: 'குடிமைப் பிரச்சனை சான்றிதழ்',
      subtitle: 'மக்கள் குரல்',
      dateTimeLabel: 'தேதி & நேரம்',
      locationLabel: 'இடம்',
      issueLabel: 'பிரச்சனை',
      noteLabel: 'குறிப்பு',
      footerText: 'இந்த சான்றிதழ் ஒரு குடிமகனால் புகாரளிக்கப்பட்ட குடிமைப் பிரச்சனையை ஆவணப்படுத்துகிறது.',
      scanQrText: 'அறிக்கையைப் பார்க்க ஸ்கேன் செய்யவும்',
      slogan: 'உங்கள் குரல் முக்கியம்',
      impactText: 'சிறந்த சமூகங்களுக்காக இணைந்து செயல்படுவோம்',
      selectIssueType: 'பிரச்சனை வகையைத் தேர்ந்தெடுக்கவும்',
      enterLocation: 'இடத்தை உள்ளிடவும்',
      addNote: 'குறிப்பு சேர்க்கவும் (விருப்பம்)',
      uploadPhoto: 'புகைப்படத்தை பதிவேற்றவும்',
      chooseLeaders: 'தலைவர்களைத் தேர்ந்தெடுக்கவும்',
      generateCertificate: 'சான்றிதழ் உருவாக்கவும்',
      shareOnline: 'ஆன்லைனில் பகிரவும்'
    }
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    translations: {
      title: 'పౌర సమస్య ధృవీకరణ పత్రం',
      subtitle: 'ప్రజా స్వరం',
      dateTimeLabel: 'తేదీ & సమయం',
      locationLabel: 'ప్రదేశం',
      issueLabel: 'సమస్య',
      noteLabel: 'గమనిక',
      footerText: 'ఈ ధృవీకరణ పత్రం ఒక పౌరుడు నివేదించిన పౌర సమస్యను దస్తావేజు చేస్తుంది.',
      scanQrText: 'నివేదికను చూడటానికి స్కాన్ చేయండి',
      slogan: 'మీ స్వరం విలువైనది',
      impactText: 'మెరుగైన సమాజం కోసం కలిసి పనిచేద్దాం',
      selectIssueType: 'సమస్య రకాన్ని ఎంచుకోండి',
      enterLocation: 'ప్రదేశాన్ని నమోదు చేయండి',
      addNote: 'గమనికను జోడించండి (ఐచ్ఛికం)',
      uploadPhoto: 'ఫోటోను అప్‌లోడ్ చేయండి',
      chooseLeaders: 'నాయకులను ఎంచుకోండి',
      generateCertificate: 'ధృవీకరణ పత్రాన్ని సృష్టించండి',
      shareOnline: 'ఆన్‌లైన్‌లో షేర్ చేయండి'
    }
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    translations: {
      title: 'নাগরিক সমস্যা সনদপত্র',
      subtitle: 'জনগণের কণ্ঠস্বর',
      dateTimeLabel: 'তারিখ ও সময়',
      locationLabel: 'স্থান',
      issueLabel: 'সমস্যা',
      noteLabel: 'নোট',
      footerText: 'এই সনদপত্রটি একজন নাগরিকের দ্বারা রিপোর্ট করা একটি নাগরিক সমস্যার দলিল।',
      scanQrText: 'রিপোর্ট দেখতে স্ক্যান করুন',
      slogan: 'আপনার কণ্ঠস্বর গুরুত্বপূর্ণ',
      impactText: 'উন্নত সমাজের জন্য একসাথে কাজ করি',
      selectIssueType: 'সমস্যার ধরন নির্বাচন করুন',
      enterLocation: 'স্থান লিখুন',
      addNote: 'নোট যোগ করুন (ঐচ্ছিক)',
      uploadPhoto: 'ছবি আপলোড করুন',
      chooseLeaders: 'নেতাদের বেছে নিন',
      generateCertificate: 'সনদপত্র তৈরি করুন',
      shareOnline: 'অনলাইনে শেয়ার করুন'
    }
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    translations: {
      title: 'नागरी समस्या प्रमाणपत्र',
      subtitle: 'लोकांचा आवाज',
      dateTimeLabel: 'दिनांक आणि वेळ',
      locationLabel: 'स्थान',
      issueLabel: 'समस्या',
      noteLabel: 'टीप',
      footerText: 'हे प्रमाणपत्र एका नागरिकाने नोंदवलेल्या नागरी समस्येचे दस्तऐवजीकरण करते.',
      scanQrText: 'अहवाल पाहण्यासाठी स्कॅन करा',
      slogan: 'तुमचा आवाज महत्त्वाचा आहे',
      impactText: 'चांगल्या समाजासाठी एकत्र',
      selectIssueType: 'समस्येचा प्रकार निवडा',
      enterLocation: 'स्थान प्रविष्ट करा',
      addNote: 'टीप जोडा (पर्यायी)',
      uploadPhoto: 'फोटो अपलोड करा',
      chooseLeaders: 'नेते निवडा',
      generateCertificate: 'प्रमाणपत्र तयार करा',
      shareOnline: 'ऑनलाईन शेअर करा'
    }
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    translations: {
      title: 'ನಾಗರಿಕ ಸಮಸ್ಯೆ ಪ್ರಮಾಣಪತ್ರ',
      subtitle: 'ಜನರ ಧ್ವನಿ',
      dateTimeLabel: 'ದಿನಾಂಕ ಮತ್ತು ಸಮಯ',
      locationLabel: 'ಸ್ಥಳ',
      issueLabel: 'ಸಮಸ್ಯೆ',
      noteLabel: 'ಟಿಪ್ಪಣಿ',
      footerText: 'ಈ ಪ್ರಮಾಣಪತ್ರವು ಒಬ್ಬ ನಾಗರಿಕನಿಂದ ವರದಿ ಮಾಡಲಾದ ನಾಗರಿಕ ಸಮಸ್ಯೆಯ ದಾಖಲೆ.',
      scanQrText: 'ವರದಿಯನ್ನು ನೋಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      slogan: 'ನಿಮ್ಮ ಧ್ವನಿ ಮುಖ್ಯವಾಗಿದೆ',
      impactText: 'ಉತ್ತಮ ಸಮುದಾಯಗಳಿಗಾಗಿ ಒಟ್ಟಿಗೆ',
      selectIssueType: 'ಸಮಸ್ಯೆಯ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      enterLocation: 'ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ',
      addNote: 'ಟಿಪ್ಪಣಿಯನ್ನು ಸೇರಿಸಿ (ಐಚ್ಛಿಕ)',
      uploadPhoto: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      chooseLeaders: 'ನಾಯಕರನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      generateCertificate: 'ಪ್ರಮಾಣಪತ್ರವನ್ನು ರಚಿಸಿ',
      shareOnline: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ'
    }
  },
  {
    code: 'bh',
    name: 'Bhojpuri',
    nativeName: 'भोजपुरी',
    translations: {
      title: 'नागरिक समस्या प्रमाणपत्र',
      subtitle: 'जनता के आवाज',
      dateTimeLabel: 'तारीख आउर समय',
      locationLabel: 'जगह',
      issueLabel: 'समस्या',
      noteLabel: 'नोट',
      footerText: 'ई प्रमाणपत्र एगो नागरिक द्वारा रिपोर्ट कइल गइल नागरिक समस्या के दस्तावेज करेला।',
      scanQrText: 'रिपोर्ट देखे खातिर स्कैन करीं',
      slogan: 'तहार आवाज महत्वपूर्ण बा',
      impactText: 'बेहतर समुदाय खातिर एक साथे',
      selectIssueType: 'समस्या के प्रकार चुनीं',
      enterLocation: 'जगह भरीं',
      addNote: 'नोट जोड़ीं (वैकल्पिक)',
      uploadPhoto: 'फोटो अपलोड करीं',
      chooseLeaders: 'नेता चुनीं',
      generateCertificate: 'प्रमाणपत्र बनावीं',
      shareOnline: 'ऑनलाइन साझा करीं'
    }
  }
]
