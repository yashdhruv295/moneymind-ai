import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByE90_Wqz16P5F-zxZ8YqvVyz30BDI_Wo",
  authDomain: "moneymind-ai-9abc1.firebaseapp.com",
  projectId: "moneymind-ai-9abc1",
  storageBucket: "moneymind-ai-9abc1.firebasestorage.app",
  messagingSenderId: "380555970282",
  appId: "1:380555970282:web:f0360faa7091c689e27993",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;