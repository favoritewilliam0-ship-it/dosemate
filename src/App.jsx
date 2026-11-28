
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./FireBase";

export default function App() {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [times, setTimes] = useState(1);
  const [duration, setDuration] = useState(1);
  const [medicines, setMedicines] = useState([]);
  const[error, setError] = useState("");
  const[saving,setSaving] = useState(false);

  const medicineRef = collection(db, "medications");

  async function loadMedicines() {
    const snapshot = await getDocs(medicineRef);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMedicines(data);
  }

  
async function addMedicine(e) {
  e.preventDefault();
  setSaving(true);
  setError("");

  try {
    await addDoc(medicineRef, {
      name,
      dosage,
      timesPerDay: Number(times),
      durationDays: Number(duration),
      createdAt: new Date().toISOString(),
    });

    setName("");
    setDosage("");

    await loadMedicines();
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
  finally {
    setSaving(false);
  }
}


  useEffect(() => {
    loadMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-offwhite p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-teal">
          DoseMate
        </h1>
        <p className="text-slate">
          Your personal medication tracker
        </p>
      </header>

      <div className="mx-auto max-w-xl">
        <form
          onSubmit={addMedicine}
          className="rounded-2xl bg-white p-6 shadow"
        >
          <h2 className="mb-4 text-xl font-bold">
            Add medication
          </h2>
          {error && (
  <p className="mb-3 text-red-600">
    Error: {error}
  </p>
)}

          <input
            className="mb-3 w-full rounded-lg border p-3"
            placeholder="Drug name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="mb-3 w-full rounded-lg border p-3"
            placeholder="Dosage (e.g. 500 mg)"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />

          <label className="block mb-2">
            Times per day
          </label>

          <input
            type="number"
            min="1"
            max="10"
            className="mb-3 w-full rounded-lg border p-3"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
          />

          <label className="block mb-2">
            Duration (days)
          </label>

          <input
            type="number"
            min="1"
            className="mb-4 w-full rounded-lg border p-3"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

         <button
  type="submit"
  disabled={saving}
  className="w-full rounded-lg bg-teal p-3 font-bold text-white disabled:opacity-50"
>
  {saving ? "Saving..." : "Save medication"}
</button>
        </form>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            My medications
          </h2>

          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="mb-3 rounded-xl bg-mint p-4"
            >
              <h3 className="font-bold text-slate">
                {medicine.name}
              </h3>

              <p>{medicine.dosage}</p>

              <p>
                {medicine.timesPerDay} times daily
              </p>

              <p>
                {medicine.durationDays} days
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
