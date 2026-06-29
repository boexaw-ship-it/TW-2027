// ============================================
// TW Fantasy Official League
// Firebase Configuration — Central Config File
// ✨ NEW FIREBASE PROJECT 2027 KEYS (UPDATED)
// ============================================

// 🌟 CDN Links များကို အန်ကယ့် Project မူရင်းအတိုင်း သုံးထားပါတယ်ဗျာ
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ⚠️ အန်ကယ့်ရဲ့ Firebase အသစ်စက်စစ် Keys များ ဖြစ်ပါတယ်ဗျာ
const firebaseConfig = {
  apiKey: "AIzaSyD9seAqGe8PPkazn_f_hFEfY7JvIz3LHxo",
  authDomain: "tw-fantasy-2027.firebaseapp.com",
  projectId: "tw-fantasy-2027",
  storageBucket: "tw-fantasy-2027.firebasestorage.app",
  messagingSenderId: "625324670124",
  appId: "1:625324670124:web:0a270e40d916655ae8f309"
};

// Firebase Initialize
const app = initializeApp(firebaseConfig);

// Export — အခြား .js ဖိုင်များမှ လှမ်းယူသုံးစွဲနိုင်ရန်
export const auth = getAuth(app);
export const db = getFirestore(app);
