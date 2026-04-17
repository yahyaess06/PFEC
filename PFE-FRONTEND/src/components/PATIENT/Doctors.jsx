import React, { useEffect, useState } from 'react';
import styles from './Doctors.module.css';
import {
    getAllMedecins, getAllSpecialites,
    getMedecinById,
    getMedecinsBySpec
} from '../../services/medecinService';

import {
    FaUserMd,
    FaSearch,
    FaEye,
    FaEnvelope,
    FaPhoneAlt,
    FaBirthdayCake,
    FaStethoscope,
    FaFileAlt,
    FaHospital
} from 'react-icons/fa';

const DoctorCard = ({ doctor, onViewProfile }) => {
    return (
        <div className="group bg-white border border-green-100 rounded-2xl shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 border border-green-200">
                    <FaUserMd className="text-green-600 text-xl" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Dr. {doctor.prenom} {doctor.nom}
                    </h3>

                    <p className="flex items-center gap-2 text-sm text-green-700 mt-1">
                        <FaStethoscope className="text-green-600" />
                        {doctor.nomspec}
                    </p>
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
                {doctor.description}
            </p>

            <div className="mt-5 border-t border-gray-100"></div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => onViewProfile(doctor.id)}
                    className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 transition"
                >
                    <FaEye size={14} />
                    Voir profil
                </button>
            </div>
        </div>
    );
};

const DoctorModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[430px] max-w-[92%] rounded-2xl bg-white shadow-2xl border border-green-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-5">
                    <h2 className="text-2xl font-bold text-white text-center">
                        Profil du Médecin
                    </h2>
                </div>

                <div className="px-6 py-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 border border-green-200">
                            <FaUserMd className="text-3xl text-green-600" />
                        </div>

                        <h3 className="mt-4 text-xl font-semibold text-gray-800">
                            Dr. {doctor.prenom} {doctor.nom}
                        </h3>

                        <span className="mt-2 flex items-center gap-2 rounded-full bg-green-50 px-4 py-1 text-sm font-medium text-green-700 border border-green-200">
              <FaStethoscope />
                            {doctor.nomspec}
            </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <FaEnvelope className="text-green-600 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Email</p>
                                <p className="text-sm text-gray-800">{doctor.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <FaPhoneAlt className="text-green-600 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Téléphone</p>
                                <p className="text-sm text-gray-800">{doctor.telephone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <FaBirthdayCake className="text-green-600 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Âge</p>
                                <p className="text-sm text-gray-800">{doctor.age}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <FaFileAlt className="text-green-600 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Description</p>
                                <p className="text-sm text-gray-800 mt-1">
                                    {doctor.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <FaHospital className="text-green-600 text-lg" />
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Hôpital</p>
                                <p className="text-sm text-gray-800">{doctor.nomHospital}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('Tous');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //--
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);//--

    // useEffect(() => {
    //     loadAllDoctors();
    // }, []);

    // useEffect(() => {
    //     loadAllDoctors(currentPage);
    // }, [currentPage]);
    useEffect(() => {
        loadAllDoctors(0);
    }, []);

    useEffect(() => {
        if (selectedSpecialty === 'Tous') {
            loadAllDoctors(currentPage);
        } else {
            loadDoctorsBySpec(selectedSpecialty, currentPage);
        }
    }, [currentPage, selectedSpecialty]);
    const loadDoctorsBySpec = async (spec, page = 0) => {
        setIsLoading(true);
        try {
            const res = await getMedecinsBySpec(spec, page);

            setDoctors(res.data.meds);
            setTotalPages(res.data.totalPages);

            // const specs = [...new Set(res.data.meds.map(d => d.nomspec).filter(Boolean))];
            // // setSpecialties(specs);

        } catch (err) {
            console.error('Erreur filtre spécialité', err);
        } finally {
            setIsLoading(false);
        }
    };

    // const loadAllDoctors = async () => {
    //     setIsLoading(true);
    //     try {
    //         const res = await getAllMedecins();
    //         // setDoctors(res.data);
    //         setDoctors(res.data.meds);
    //
    //         const specs = [...new Set(res.data.map((d) => d.nomspec).filter(Boolean))];
    //         setSpecialties(specs);
    //     } catch (err) {
    //         console.error('Erreur chargement médecins', err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    useEffect(() => {
        loadSpecialties();
    }, []);

    const loadSpecialties = async () => {
        try {
            const res = await getAllSpecialites();
            setSpecialties(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadAllDoctors = async (page = 0) => {
        setIsLoading(true);
        try {
            const res = await getAllMedecins(page);

            setDoctors(res.data.meds);
            setTotalPages(res.data.totalPages);
            // setCurrentPage(page);

            // const specs = [...new Set(res.data.meds.map(d => d.nomspec).filter(Boolean))];
            // setSpecialties(specs);

        } catch (err) {
            console.error('Erreur chargement médecins', err);
        } finally {
            setIsLoading(false);
        }
    };
    // const handleSpecialtyChange = async (value) => {
    //     setSelectedSpecialty(value);
    //     setIsLoading(true);
    //
    //     try {
    //         if (value === 'Tous') {
    //             await loadAllDoctors();
    //         } else {
    //             const res = await getMedecinsBySpec(value);
    //             setDoctors(res.data);
    //         }
    //     } catch (err) {
    //         console.error('Erreur filtre spécialité', err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const handleSpecialtyChange = (value) => {
        setSelectedSpecialty(value);
        setCurrentPage(0);
    };

    const handleViewProfile = async (doctorId) => {
        setIsLoading(true);
        try {
            const res = await getMedecinById(doctorId);
            setSelectedDoctor(res.data);
            setIsModalOpen(true);
        } catch (err) {
            console.error('Erreur chargement profil médecin', err);
        } finally {
            setIsLoading(false);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>
                    <FaUserMd size={30} /> Nos Docteurs
                </h1>
                <p className={styles.subtitle}>
                    Trouvez facilement le spécialiste qui correspond à vos besoins
                </p>
            </div>

            <div className={styles.filterPanel}>
                <div className={styles.filterHeader}>
                    <FaSearch /> <h2>Filtrer par Spécialité</h2>
                </div>

                <select
                    className={styles.selectField}
                    value={selectedSpecialty}
                    onChange={(e) => handleSpecialtyChange(e.target.value)}
                >
                    <option value="Tous">Toutes les spécialités</option>
                    {specialties.map((spec) => (
                        <option key={spec} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.doctorsGrid}>
                {doctors.map((doctor) => (
                    <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onViewProfile={handleViewProfile}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-10">

                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                >
                    ← Précédent
                </button>

                <span className="font-semibold text-gray-700">
        {totalPages === 0 ? "0 / 0" : `${currentPage + 1} / ${totalPages}`}
    </span>

                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                >
                    Suivant →
                </button>

            </div>

            {doctors.length === 0 && !isLoading && (
                <p className={styles.noResults}>Aucun docteur trouvé.</p>
            )}

            {isModalOpen && (
                <DoctorModal
                    doctor={selectedDoctor}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {isLoading && (
                <div className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                        <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">Chargement...</p>
                    </div>
                </div>

            )}
        </div>

    );

};

export default Doctors;