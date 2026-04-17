import React, { useState } from 'react';
import styles from './MonPlaning.module.css';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Clock, User, MoreVertical, Plus, CheckCircle2 
} from 'lucide-react';

const MonPlaning = () => {
  const [selectedDate, setSelectedDate] = useState("Mardi, 18 Octobre 2025");

  const dailyStats = [
    { label: "Total RDV", value: 12, color: "#0096db" },
    { label: "Terminés", value: 5, color: "#10b981" },
    { label: "Restants", value: 7, color: "#f59e0b" },
  ];

  const appointments = [
    { id: 1, time: "08:00", patient: "Nichole Barnett", type: "Contrôle", status: "Confirmé", priority: "Normal" },
    { id: 2, time: "10:00", patient: "Patient Sersif", type: "Urgence", status: "En attente", priority: "Haute" },
    { id: 3, time: "11:30", patient: "Marie Durand", type: "Consultation", status: "Terminé", priority: "Normal" },
    { id: 4, time: "15:00", patient: "Rida Sersif", type: "Suivi", status: "Confirmé", priority: "Normal" },
  ];

  return (
    <div className={styles.container}>
      {/* Header avec Navigation */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.iconCircle}><CalendarIcon size={24} /></div>
          <div>
            <h1>Mon Planning</h1>
            <p>Gérez vos consultations du jour</p>
          </div>
        </div>

        <div className={styles.dateControls}>
          <button className={styles.navBtn}><ChevronLeft size={20} /></button>
          <div className={styles.currentDate}>{selectedDate}</div>
          <button className={styles.navBtn}><ChevronRight size={20} /></button>
        </div>


      </header>

      <div className={styles.contentGrid}>
        {/* Colonne du Planning Principal */}
        <div className={styles.scheduleColumn}>
          {appointments.map((apt) => (
            <div key={apt.id} className={`${styles.appointmentCard} ${styles[apt.status.replace(/\s+/g, '')]}`}>
              <div className={styles.timeInfo}>
                <span className={styles.timeText}>{apt.time}</span>
                <div className={styles.timeLine}></div>
              </div>
              
              <div className={styles.mainInfo}>
                <div className={styles.patientLine}>
                  <div className={styles.patientAvatar}>{apt.patient.charAt(0)}</div>
                  <div>
                    <h4>{apt.patient}</h4>
                    <span className={styles.aptType}>{apt.type}</span>
                  </div>
                </div>

                <div className={styles.statusTags}>
                  <span className={`${styles.statusBadge} ${styles[apt.status]}`}>
                    {apt.status === "Terminé" && <CheckCircle2 size={12} style={{marginRight: 4}} />}
                    {apt.status}
                  </span>
                  {apt.priority === "Haute" && <span className={styles.priorityBadge}>Urgent</span>}
                </div>

                <button className={styles.optionsBtn}><MoreVertical size={18} /></button>
              </div>
            </div>
          ))}
          
          {/* Créneau libre exemple */}
          <div className={styles.freeSlot}>
            <span className={styles.timeText}>12:30</span>
            <div className={styles.freeLine}>Pause déjeuner ou créneau disponible</div>
          </div>
        </div>

        {/* Colonne latérale Résumé */}
        <aside className={styles.summarySidebar}>
          <div className={styles.summaryCard}>
            <h3>Aperçu du jour</h3>
            <div className={styles.statsList}>
              {dailyStats.map((stat, i) => (
                <div key={i} className={styles.statItem}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue} style={{color: stat.color}}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoCard}>
            <h4>Notes du jour</h4>
            <textarea placeholder="Ajouter une note pour aujourd'hui..." className={styles.noteArea}></textarea>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MonPlaning;