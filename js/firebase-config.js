// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD70hv-PgWJKDbK-tcxeRuB1FE1cVs-FBs",
  authDomain: "reservas-marina-park.firebaseapp.com",
  projectId: "reservas-marina-park",
  storageBucket: "reservas-marina-park.firebasestorage.app",
  messagingSenderId: "1048056704068",
  appId: "1:1048056704068:web:a2793d5db5e5e5573c6011",
  measurementId: "G-14GR64WXHS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
