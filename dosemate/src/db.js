import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db, ensureSignedIn } from "./firebase";

export async function addDrug(drug) {
  const user = await ensureSignedIn();
  return addDoc(collection(db, "drugs"), {
    userId: user.uid,
    name: drug.name,
    dosage: drug.dosage,
    timesPerDay: Number(drug.timesPerDay),
    durationDays: Number(drug.durationDays),
    startDate: new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
  });
}

export async function getDrugs() {
  const user = await ensureSignedIn();
  const q = query(collection(db, "drugs"), where("userId", "==", user.uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
