import React, { useEffect, useState } from "react";
import { LogOut, Pencil } from "lucide-react";
import { getPatientProfile, putPatient } from "../services/patientService.js";
import { useNavigate } from "react-router-dom";
import {logout} from "../services/authService.js";

export default function ProfilPatient() {
  const navigate = useNavigate();

  const [photoProfil, setPhotoProfil] = useState(
      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );

  const [patient, setPatient] = useState({
    cin: "",
    prenom: "",
    nom: "",
    age: "",
    telephone: "",
    email: "",
    sexe: "",
    adresse: "",
  });

  const [editField, setEditField] = useState(null);

  const afficherdonneePatient = async () => {
    try {
      const res = await getPatientProfile();
      // ✅ sécuriser au cas où res.data est undefined
      setPatient((prev) => ({ ...prev, ...(res?.data || {}) }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    afficherdonneePatient();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoProfil(URL.createObjectURL(file));
  };

  const handleChange = (field, value) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const misajoutP = async () => {
    try {
      const res = await putPatient(patient);
      console.log("Patient modifié :", res.data);
      setEditField(null);
    } catch (error) {
      console.error("Erreur modification patient", error);
    }
  };

  // ✅ Déconnexion propre
  const handleLogout = () => {
    try {
      logout();
    } catch (e) {
      console.error(e);
    }
    navigate("/login"); // adapte ta route
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 flex justify-center py-16 overflow-y-auto">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
            Profil du Patient
          </h1>


          {/* GRID 2 COLONNES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoBox
                label="Carte d'identité nationale"
                field="cin"
                value={patient.cin}
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="Prénom"
                field="prenom"
                value={patient.prenom}
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="Nom"
                field="nom"
                value={patient.nom}
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="Âge"
                field="age"
                value={patient.age}
                type="number"
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="Téléphone"
                field="telephone"
                value={patient.telephone}
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="E-mail"
                field="email"
                value={patient.email}
                type="email"
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="Sexe"
                field="sexe"
                value={patient.sexe}
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />

            <InfoBox
                label="Adresse"
                field="adresse"
                value={patient.adresse}
                editField={editField}
                setEditField={setEditField}
                handleChange={handleChange}
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <button
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
                onClick={misajoutP}
            >
              Sauvegarder
            </button>

            <button
                className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-md transition duration-200 flex items-center justify-center gap-2"
                onClick={handleLogout}
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
  );
}

/* ------------------------
   COMPONENT INFOBOX
------------------------ */
function InfoBox({
                   label,
                   field,
                   value,
                   type = "text",
                   editField,
                   setEditField,
                   handleChange,
                 }) {
  return (
      <div className="bg-white p-4 rounded-xl shadow border border-blue-100 flex justify-between items-center">
        <div>
          <p className="text-gray-700 font-semibold">{label}</p>

          {editField === field ? (
              <input
                  type={type}
                  className="mt-1 px-3 py-2 border border-blue-300 rounded-lg w-56 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  value={value ?? ""} // ✅ évite warning uncontrolled
                  onChange={(e) => handleChange(field, e.target.value)}
                  onBlur={() => setEditField(null)}
                  autoFocus
              />
          ) : (
              <p className="text-gray-600">{value ?? "-"}</p>
          )}
        </div>

        <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setEditField(field)}
            type="button"
        >
          <Pencil size={20} />
        </button>
      </div>
  );
}