// firebase-config.js

// Configuração do Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD70hv-PgWJKDbK-tcxeRuB1FE1cVs-FBs",
  authDomain: "reservas-marina-park.firebaseapp.com",
  projectId: "reservas-marina-park",
  storageBucket: "reservas-marina-park.firebasestorage.app",
  messagingSenderId: "1048056704068",
  appId: "1:1048056704068:web:a2793d5db5e5e5573c6011",
  measurementId: "G-14GR64WXHS"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();
