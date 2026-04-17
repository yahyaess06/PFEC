"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/registerService.js";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cin: "",
    nom: "",
    prenom: "",
    email: "",
    age: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    sexe: "",
    adresse: ""
  });

  const [errors, setErrors] = useState({
    nom: null,
    prenom: null,
    adresse: null,
    email: null,
    age: null,
    telephone: null,
    password: null,
    confirmPassword: null,
  });

  const [isloaded, setisloaded] = useState(false);

  const inputClass = (field) =>
      `w-full mt-1 px-3 py-1.5 border rounded-lg focus:ring-2 outline-none bg-gray-50 text-black text-sm transition ${
          errors[field] === null
              ? "border-gray-300 focus:ring-blue-400"
              : errors[field]
                  ? "border-green-500 focus:ring-green-400"
                  : "border-red-500 focus:ring-red-400"
      }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valid = true;

    if (["nom", "prenom"].includes(name)) {
      valid = /^[A-Za-z\s]+$/.test(value);
    }

    if (name === "adresse") {
      valid = /^[A-Za-z0-9\s]+$/.test(value);
    }

    if (["telephone", "age"].includes(name)) {
      valid = /^[0-9]*$/.test(value);
    }

    if (name === "email") {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (name === "password") {
      valid = value.length >= 6;
    }

    if (name === "confirmPassword") {
      valid = value === form.password;
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: valid });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allValid = Object.values(errors).every((v) => v === true);

    if (!allValid) {
      alert("Veuillez remplir correctement tous les champs.");
      return;
    }

    setisloaded(true);

    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    } finally {
      setisloaded(false);
    }
  };

  return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-white px-4">
          <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-8 border flex gap-6">

            <div className="flex-1 text-center flex flex-col gap-2 justify-center">
              <img
                  src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
                  alt="Logo Hopital"
                  className="w-24 mx-auto animate-bounce"
              />
              <h1 className="text-2xl font-bold text-blue-700">Créer un compte</h1>
              <p className="text-gray-600 text-sm">
                Accédez à votre espace santé sécurisé
              </p>
            </div>

            <form className="flex-1 grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
              {["nom", "prenom", "cin", "adresse"].map((field) => (
                  <div key={field}>
                    <label className="text-gray-700 font-medium capitalize text-sm">{field}</label>
                    <input
                        name={field}
                        placeholder={field.toUpperCase()}
                        value={form[field]}
                        onChange={handleChange}
                        className={inputClass(field)}
                    />
                  </div>
              ))}

              <div>
                <label className="text-gray-700 font-medium text-sm">Sexe</label>
                <select
                    name="sexe"
                    value={form.sexe}
                    onChange={handleChange}
                    className={inputClass("sexe")}
                >
                  <option value="">Sélectionner...</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm">Âge</label>
                <input
                    type="text"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className={inputClass("age")}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm">Téléphone</label>
                <input
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className={inputClass("telephone")}
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-700 font-medium text-sm">Email</label>
                <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                    placeholder="exemple@gmail.com"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={inputClass("password")}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium text-sm">Confirmer</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={inputClass("confirmPassword")}
                />
              </div>

              <button
                  type="submit"
                  className="col-span-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                S’inscrire
              </button>

              <div className="col-span-2 text-center mt-2">
                <p className="text-gray-600 text-sm">
                  Vous avez déjà un compte ?{" "}
                  <span
                      className="text-blue-600 font-medium hover:underline cursor-pointer"
                      onClick={() => navigate("/login")}
                  >
                  Se connecter
                </span>
                </p>
              </div>
            </form>
          </div>
        </div>

        {isloaded && (
            <div className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Chargement...</p>
              </div>
            </div>
        )}
      </>
  );
}