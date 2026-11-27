import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
});
const auth = getAuth(app);
const db = getFirestore(app);

const { user } = await signInAnonymously(auth);
console.log("Signed in:", user.uid);
await addDoc(collection(db, "drugs"), {
  userId: user.uid, name: "Test drug", dosage: "100mg",
  timesPerDay: 2, durationDays: 1, createdAt: serverTimestamp(),
});
console.log("Saved one record");
const snap = await getDocs(query(collection(db, "drugs"), where("userId", "==", user.uid)));
snap.forEach((d) => console.log("Read back:", d.id, d.data().name));
process.exit(0);
