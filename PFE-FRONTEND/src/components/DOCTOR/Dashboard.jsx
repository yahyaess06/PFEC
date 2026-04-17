import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
//---
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";//---

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from "recharts";
import { getDashboardMed } from "../../services/DashboardMedecinService.js";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardMed()
        .then((res) => setData(res.data))
        .catch((err) => console.error("Erreur dashboard :", err))
        .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Erreur chargement dashboard</p>;

  const dataPie = [
    { name: "Confirmés", value: data.rdvConfirme, color: "#0096db" },
    { name: "Terminés", value: data.rdvTermine, color: "#10b981" },
    { name: "En attente", value: data.rdvEnAttente, color: "#f59e0b" },
    { name: "Annulés", value: data.rdvAnnulee, color: "#ef4444" }
  ];
  //zadt
  const barData = {
    labels: ["Confirmés", "Terminés", "En attente", "Annulés"],
    datasets: [
      {
        label: "Rendez-vous",
        data: [
          data.rdvConfirme,
          data.rdvTermine,
          data.rdvEnAttente,
          data.rdvAnnulee
        ],
        backgroundColor: [
          "#0096db",
          "#10b981",
          "#f59e0b",
          "#ef4444"
        ],
        borderRadius: 8
      }
    ]
  };//-----

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Tableau de bord Analytique</h1>
            <p>Vue globale de votre activité</p>
          </div>
        </header>

        {/* ===== Stats Cards ===== */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.blue}`}>
              <Users size={22} />
            </div>
            <h3>{data.totalPatients}</h3>
            <p>Total Patients</p>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.teal}`}>
              <CheckCircle size={22} />
            </div>
            <h3>{data.rdvConfirme}</h3>
            <p>RDV Confirmés</p>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.green}`}>
              <CheckCircle size={22} />
            </div>
            <h3>{data.rdvTermine}</h3>
            <p>RDV Terminés</p>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.orange}`}>
              <Clock size={22} />
            </div>
            <h3>{data.rdvEnAttente}</h3>
            <p>En attente</p>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.red}`}>
              <XCircle size={22} />
            </div>
            <h3>{data.rdvAnnulee}</h3>
            <p>RDV Annulés</p>
          </div>
        </div>

        {/* ===== Pie Chart ===== */}
        <div className={styles.chartCard}>
          <h3>Répartition des Rendez-vous</h3>
          {/*<ResponsiveContainer width="100%" height={300}>*/}
          {/*  <PieChart>*/}
          {/*    <Pie*/}
          {/*        data={dataPie}*/}
          {/*        innerRadius={70}*/}
          {/*        outerRadius={100}*/}
          {/*        paddingAngle={4}*/}
          {/*        dataKey="value"*/}
          {/*    >*/}
          {/*      {dataPie.map((entry, index) => (*/}
          {/*          <Cell key={index} fill={entry.color} />*/}
          {/*      ))}*/}
          {/*    </Pie>*/}
          {/*    <Tooltip />*/}
          {/*  </PieChart>*/}
          {/*</ResponsiveContainer>*/}
          <div className={styles.chartFlex}>

            {/* PIE */}
            <div className={styles.pieWrapper}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                      data={dataPie}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                  >
                    {dataPie.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* BAR GRAPH */}
            <div className={styles.barWrapper}>
              <Bar data={barData} options={barOptions} />
            </div>

          </div>

          <div className={styles.legend}>
            {dataPie.map((item) => (
                <div key={item.name} className={styles.legendItem}>
                  <span style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;