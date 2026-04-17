package com.pfe.backend_pfe;

import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Entities.Enumerations.G_Sanguin;
import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Enumerations.User_Role;
import com.pfe.backend_pfe.reposetory.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.Normalizer;
import java.util.*;

@SpringBootApplication
public class BackendPfeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendPfeApplication.class, args);
    }

    @Bean
   // @Order(3)
    CommandLineRunner start(
            Hopitalrepo hoprepo,
            PatientRepo patientRepo,
            RendezVousRepo rdvr,
            MedcineRepo med,
            InfermierRepo ir
    ){
        return args -> {
            Hopital hopital = hoprepo.findHopitalByRegions(Regions.L_ORIENTAL).get(0);
            List<Patient> patients = patientRepo.findAll();
            Medecin me=med.findByMHopitalID(hopital.getId_hopital()).get(0);
            Infermier inf=ir.findByMHopitalIDAndSpecialite(hopital.getId_hopital(),"Soins").get(0);
            System.out.println("bjr :"+me.getEmail()+" "+me.getNom());
            System.out.println("bjrinf :"+inf.getEmail()+" "+inf.getNom());
            List<Rendez_Vous> rendezVous = new ArrayList<>();
            rdvr.deleteAll();
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);

            Date dateSansHeure = calendar.getTime();

            List<Patient> femmesPatients=patientRepo.findBySexe("female");
            Medecin medecingeny=med.findByHopitalIdAndSpecialite(hopital.getId_hopital(),"Gynécologie").get(0);

            //long numrdvgeny=1L;
            long numPriority = 1L;
            long numNormal = 1L;
            long numrdv = 1L;
            long numrdvinf = 1L;

            for (Patient patient : patients) {
                Rendez_Vous rdv = Rendez_Vous.builder()
                        .hopital(hopital)
                        .staus(Staus.Valide)
                        .medecin(me)
                        .date_rendez_vous(dateSansHeure)
                        .numrdv(numrdv++)
                        .description("Rendez-vous de test")
                        .patient(patient)
                        .dureerendezvous("apres_midi")
//                        .dureerendezvous("matin")
                        .build();

                rdv.setHeurerendezvous(15);

                rendezVous.add(rdv);
            }
            for (Patient patient : patients) {
                Rendez_Vous rdv = Rendez_Vous.builder()
                        .hopital(hopital)
                        .staus(Staus.Valide)
                        .medecin(me)
                        .date_rendez_vous(dateSansHeure)
                        .numrdv(numrdv++)
                        .description("Rendez-vous de test")
                        .patient(patient)
                        .dureerendezvous("matin")
//                        .dureerendezvous("matin")
                        .build();

                rdv.setHeurerendezvous(15);

                rendezVous.add(rdv);
            }
            for (Patient patient : patients) {
                Rendez_Vous rdv = Rendez_Vous.builder()
                        .hopital(hopital)
                        .staus(Staus.Valide)
                        .infermier(inf)
                        .date_rendez_vous(dateSansHeure)
                        .numrdv(numrdvinf++)
                        .description("Rendez-vous de test")
                        .patient(patient)
                        .dureerendezvous("apres_midi")
//                        .dureerendezvous("matin")
                        .build();

                rdv.setHeurerendezvous(15);

                rendezVous.add(rdv);
            }
            Random r=new Random();
            for (Patient patient : femmesPatients) {
                int mois = r.nextInt(10);
                boolean isPriority = (mois >= 8);
                //--
                Rendez_Vous rdv = Rendez_Vous.builder()
                        .hopital(hopital)
                        .staus(Staus.Valide)
                        .medecin(medecingeny)
                        .date_rendez_vous(dateSansHeure)
//                        .nbMoins(r.nextInt(0,9))
                        .nbMoins(mois)
                        .priority(isPriority)
//                        .numrdv(numrdvgeny++)
                        .numrdv(isPriority ? numPriority++ : numNormal++)
                        .description("Rendez-vous pour check in enseint")
                        .patient(patient)
                        .dureerendezvous("apres_midi")
//                        .dureerendezvous("matin")
                        .build();

                rdv.setHeurerendezvous(15);

                rendezVous.add(rdv);
            }

            rdvr.saveAll(rendezVous);
        };
    }

  //  @Bean
   //  @Order(2)
    CommandLineRunner start1(
            PatientRepo pr,DossierRepo dr,
            PasswordEncoder pE
    )        {
        return args -> {
            Patient p13 = new Patient();
            p13.setCin("UV66778");
            p13.setNom("Alaoui");
            p13.setPrenom("Youssef");
            p13.setAge(31);
            p13.setVerified(true);
            p13.setEmail("youssef@gmail.com");
            p13.setTelephone("0611122233");
            p13.setPassword(pE.encode("password123"));
            p13.setSexe("male");
            p13.setAdresse("Nador");
            p13.setRole(User_Role.PATIENT);
            pr.save(p13);
            Patient p14 = new Patient();
            p14.setCin("WX88991");
            p14.setNom("Ziani");
            p14.setPrenom("Hajar");
            p14.setAge(23);
            p14.setVerified(true);
            p14.setEmail("hajar@gmail.com");
            p14.setTelephone("0622233344");
            p14.setPassword(pE.encode("password123"));
            p14.setSexe("female");
            p14.setAdresse("Oujda");
            p14.setRole(User_Role.PATIENT);
            pr.save(p14);
            Patient p15 = new Patient();
            p15.setCin("YZ11224");
            p15.setNom("Fadili");
            p15.setPrenom("Mehdi");
            p15.setAge(36);
            p15.setVerified(true);
            p15.setEmail("mehdi@gmail.com");
            p15.setTelephone("0633344455");
            p15.setPassword(pE.encode("password123"));
            p15.setSexe("male");
            p15.setAdresse("Rabat");
            p15.setRole(User_Role.PATIENT);
            pr.save(p15);
            Patient p16 = new Patient();
            p16.setCin("AA44557");
            p16.setNom("Karimi");
            p16.setPrenom("Salim");
            p16.setAge(27);
            p16.setVerified(true);
            p16.setEmail("salim@gmail.com");
            p16.setTelephone("0644455566");
            p16.setPassword(pE.encode("password123"));
            p16.setSexe("male");
            p16.setAdresse("Casablanca");
            p16.setRole(User_Role.PATIENT);
            pr.save(p16);
            Patient p17 = new Patient();
            p17.setCin("BB77880");
            p17.setNom("Amrani");
            p17.setPrenom("Khadija");
            p17.setAge(25);
            p17.setVerified(true);
            p17.setEmail("khadija@gmail.com");
            p17.setTelephone("0655566677");
            p17.setPassword(pE.encode("password123"));
            p17.setSexe("female");
            p17.setAdresse("Fes");
            p17.setRole(User_Role.PATIENT);
            pr.save(p17);

            Patient p18 = new Patient();
            p18.setCin("CC99002");
            p18.setNom("Berrada");
            p18.setPrenom("Omar");
            p18.setAge(38);
            p18.setVerified(true);
            p18.setEmail("omar@gmail.com");
            p18.setTelephone("0666677788");
            p18.setPassword(pE.encode("password123"));
            p18.setSexe("male");
            p18.setAdresse("Tanger");
            p18.setRole(User_Role.PATIENT);
            pr.save(p18);
            Patient p19 = new Patient();
            p19.setCin("DD22335");
            p19.setNom("Saidi");
            p19.setPrenom("Nour");
            p19.setAge(21);
            p19.setVerified(true);
            p19.setEmail("nour@gmail.com");
            p19.setTelephone("0677788899");
            p19.setPassword(pE.encode("password123"));
            p19.setSexe("female");
            p19.setAdresse("Agadir");
            p19.setRole(User_Role.PATIENT);
            pr.save(p19);
            Patient p20 = new Patient();
            p20.setCin("EE55668");
            p20.setNom("Tazi");
            p20.setPrenom("Bilal");
            p20.setAge(34);
            p20.setVerified(true);
            p20.setEmail("bilal@gmail.com");
            p20.setTelephone("0688899900");
            p20.setPassword(pE.encode("password123"));
            p20.setSexe("male");
            p20.setAdresse("Marrakech");
            p20.setRole(User_Role.PATIENT);
            pr.save(p20);

            Dossier d13 = new Dossier();
            d13.setPatient(p13);
            d13.setStatus_p("Actif");
            d13.setG_sanguin(G_Sanguin.O_POSITIF);
            d13.setAllergies_notees("Aucune");
            d13.setTraitements_actuels("Vitamine D");
            dr.save(d13);

            Dossier d14 = new Dossier();
            d14.setPatient(p14);
            d14.setStatus_p("Actif");
            d14.setG_sanguin(G_Sanguin.A_POSITIF);
            d14.setAllergies_notees("Poussière");
            d14.setTraitements_actuels("Aucun");
            dr.save(d14);

            Dossier d15 = new Dossier();
            d15.setPatient(p15);
            d15.setStatus_p("Actif");
            d15.setG_sanguin(G_Sanguin.B_POSITIF);
            d15.setAllergies_notees("Pénicilline");
            d15.setTraitements_actuels("Paracétamol");
            dr.save(d15);

            Dossier d16 = new Dossier();
            d16.setPatient(p16);
            d16.setStatus_p("Actif");
            d16.setG_sanguin(G_Sanguin.AB_POSITIF);
            d16.setAllergies_notees("Aucune");
            d16.setTraitements_actuels("Aucun");
            dr.save(d16);

            Dossier d17 = new Dossier();
            d17.setPatient(p17);
            d17.setStatus_p("Actif");
            d17.setG_sanguin(G_Sanguin.O_NEGATIF);
            d17.setAllergies_notees("Gluten");
            d17.setTraitements_actuels("Fer");
            dr.save(d17);

            Dossier d18 = new Dossier();
            d18.setPatient(p18);
            d18.setStatus_p("Actif");
            d18.setG_sanguin(G_Sanguin.B_NEGATIF);
            d18.setAllergies_notees("Aucune");
            d18.setTraitements_actuels("Insuline");
            dr.save(d18);

            Dossier d19 = new Dossier();
            d19.setPatient(p19);
            d19.setStatus_p("Actif");
            d19.setG_sanguin(G_Sanguin.A_NEGATIF);
            d19.setAllergies_notees("Arachides");
            d19.setTraitements_actuels("Aucun");
            dr.save(d19);

            Dossier d20 = new Dossier();
            d20.setPatient(p20);
            d20.setStatus_p("Actif");
            d20.setG_sanguin(G_Sanguin.O_POSITIF);
            d20.setAllergies_notees("Aucune");
            d20.setTraitements_actuels("Antibiotiques");
            dr.save(d20);
        };
    }

   // @Bean
    //@Order(1)
    CommandLineRunner start2(
            SpecRepo sprp,
            Hopitalrepo hp,
            MedicamentRepo medicamentr,
            InfermierRepo ir,
            RendezVousRepo rvr,
            VaccinationRepo vR,
            MedcineRepo mr,
            PatientRepo pr,
            DossierRepo dr,
            InfermierRepo infermierRepository,
            PersonnelRepo per,
            PasswordEncoder pE
    ) {
        return args -> {

            // =========================
            // LISTES DE VRAIS NOMS / PRENOMS
            // =========================
            List<String> prenomsHommes = Arrays.asList(
                    "Yahya", "Ahmed", "Mohamed", "Yassine", "Zakaria", "Hamza", "Omar", "Karim",
                    "Anass", "Soufiane", "Amine", "Ayoub", "Mehdi", "Reda", "Sami", "Bilal",
                    "Rachid", "Nabil", "Tariq", "Imad", "Adil", "Khalid", "Ismail", "Hicham",
                    "Badr", "Othmane", "Jawad", "Marouane", "Walid", "Mustapha"
            );

            List<String> prenomsFemmes = Arrays.asList(
                    "Sara", "Salma", "Imane", "Lina", "Fatima", "Amina", "Nadia", "Khadija",
                    "Hajar", "Meryem", "Asmae", "Noura", "Sanae", "Oumaima", "Leila", "Ikram",
                    "Chaimae", "Samira", "Houda", "Najat", "Zineb", "Wafae", "Siham", "Ilham",
                    "Malak", "Rim", "Kenza", "Bouchra", "Farah", "Manal"
            );

            List<String> nomsFamille = Arrays.asList(
                    "Essalhi", "El Amrani", "Benali", "Lahcen", "Mansouri", "Idrissi", "Chakir",
                    "Haddad", "Toumi", "Bennani", "Alaoui", "Tazi", "Berrada", "Amrani",
                    "Ouahbi", "Razi", "Skalli", "Kadiri", "El Fassi", "Bouzidi", "Najmi",
                    "Zerouali", "Ait Lahcen", "Oukabli", "Mouline", "Kettani", "Filali",
                    "Belhaj", "Azzouzi", "Tahiri"
            );

            int maleIndex = 0;
            int femaleIndex = 0;
            int nomIndex = 0;

            // =========================
            // 1) CREATION DES HOPITAUX
            // =========================
            List<Hopital> hopitaux = new ArrayList<>();

            Hopital h1 = hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Mohammed V Tanger")
                    .email("contact@hopitaltanger.ma")
                    .local("Boulevard Mohammed V, Tanger")
                    .regions(Regions.TANGER_TETOUAN_AL_HOCEIMA)
                    .build());
            hopitaux.add(h1);

            Hopital h2 = hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial de Tétouan")
                    .email("contact@hopitaltetouan.ma")
                    .local("Avenue Hassan II, Tétouan")
                    .regions(Regions.TANGER_TETOUAN_AL_HOCEIMA)
                    .build());
            hopitaux.add(h2);

            Hopital h3 = hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Al Farabi")
                    .email("contact@alfarabi.ma")
                    .local("Route Sidi Yahya, Oujda")
                    .regions(Regions.L_ORIENTAL)
                    .build());
            hopitaux.add(h3);

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial de Nador")
                    .email("contact@hopitalnador.ma")
                    .local("Centre-ville, Nador")
                    .regions(Regions.L_ORIENTAL)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("CHU Hassan II")
                    .email("contact@chufes.ma")
                    .local("Route Sidi Hrazem, Fès")
                    .regions(Regions.FES_MEKNES)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Mohammed V Meknès")
                    .email("contact@hopitalmeknes.ma")
                    .local("Quartier Hamria, Meknès")
                    .regions(Regions.FES_MEKNES)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Ibn Sina")
                    .email("contact@ibnsina.ma")
                    .local("Avenue Allal Ben Abdellah, Rabat")
                    .regions(Regions.RABAT_SALE_KENITRA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Moulay Abdellah")
                    .email("contact@hopitalsale.ma")
                    .local("Salé Médina, Salé")
                    .regions(Regions.RABAT_SALE_KENITRA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Régional Béni Mellal")
                    .email("contact@hopitalbm.ma")
                    .local("Avenue Hassan II, Béni Mellal")
                    .regions(Regions.BENI_MELLAL_KHENIFRA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial de Khénifra")
                    .email("contact@hopitalkhenifra.ma")
                    .local("Centre-ville, Khénifra")
                    .regions(Regions.BENI_MELLAL_KHENIFRA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("CHU Ibn Rochd")
                    .email("contact@chuibnrochd.ma")
                    .local("Boulevard Abou Chouaib Doukkali, Casablanca")
                    .regions(Regions.CASABLANCA_SETAT)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial de Settat")
                    .email("contact@hopitalsettat.ma")
                    .local("Avenue Hassan II, Settat")
                    .regions(Regions.CASABLANCA_SETAT)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("CHU Mohammed VI")
                    .email("contact@chum6.ma")
                    .local("Avenue Ibn Sina, Marrakech")
                    .regions(Regions.MARRAKECH_SAFI)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Mohammed V Safi")
                    .email("contact@hopitalsafi.ma")
                    .local("Centre-ville, Safi")
                    .regions(Regions.MARRAKECH_SAFI)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Régional Errachidia")
                    .email("contact@hopitalerrachidia.ma")
                    .local("Avenue Moulay Ali Cherif, Errachidia")
                    .regions(Regions.DRAA_TAFILALET)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial Ouarzazate")
                    .email("contact@hopitalouarzazate.ma")
                    .local("Centre-ville, Ouarzazate")
                    .regions(Regions.DRAA_TAFILALET)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("CHU Souss-Massa")
                    .email("contact@chusouss.ma")
                    .local("Quartier Tilila, Agadir")
                    .regions(Regions.SOUSS_MASSA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Hassan II Tiznit")
                    .email("contact@hopitaltiznit.ma")
                    .local("Avenue Hassan II, Tiznit")
                    .regions(Regions.SOUSS_MASSA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Régional de Guelmim")
                    .email("contact@hopitalguelmim.ma")
                    .local("Avenue Mohammed V, Guelmim")
                    .regions(Regions.GUELMIM_OUED_NOUN)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial de Tan-Tan")
                    .email("contact@hopitaltantan.ma")
                    .local("Centre-ville, Tan-Tan")
                    .regions(Regions.GUELMIM_OUED_NOUN)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Moulay El Hassan Ben Mehdi")
                    .email("contact@hopitallaayoune.ma")
                    .local("Avenue Mekka, Laâyoune")
                    .regions(Regions.LAAYOUNE_SAKIA_EL_HAMRA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial de Boujdour")
                    .email("contact@hopitalboujdour.ma")
                    .local("Centre-ville, Boujdour")
                    .regions(Regions.LAAYOUNE_SAKIA_EL_HAMRA)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Régional de Dakhla")
                    .email("contact@hopitaldakhla.ma")
                    .local("Avenue Al Massira, Dakhla")
                    .regions(Regions.DAKHLA_OUED_ED_DAHAB)
                    .build()));

            hopitaux.add(hp.save(Hopital.builder()
                    .nom_hopital("Hôpital Provincial Aousserd")
                    .email("contact@hopitalaousserd.ma")
                    .local("Centre-ville, Aousserd")
                    .regions(Regions.DAKHLA_OUED_ED_DAHAB)
                    .build()));

            // =========================
            // 2) SPECIALITES MEDECINS
            // =========================
            List<Specialite> specialites = new ArrayList<>();
            specialites.add(sprp.save(Specialite.builder().nomspec("Cardiologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Dermatologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Neurologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Pédiatrie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Gynécologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Orthopédie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Ophtalmologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("ORL").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Psychiatrie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Radiologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Urologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Néphrologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Endocrinologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Gastro-entérologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Pneumologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Rhumatologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Hématologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Oncologie").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Chirurgie générale").build()));
            specialites.add(sprp.save(Specialite.builder().nomspec("Médecine générale").build()));

            // =========================
            // 3) SPECIALITES INFIRMIERS
            // =========================
            List<String> specialitesInfermiers = Arrays.asList(
                    "Soins",
                    "Urgences",
                    "Pédiatrie",
                    "Bloc opératoire",
                    "Gériatrie",
                    "Cardiologie",
                    "Dermatologie",
                    "Neurologie",
                    "Radiologie",
                    "Maternité"
            );

            // =========================
            // 4) DATE COMMUNE
            // =========================
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, 2026);
            calendar.set(Calendar.MONTH, Calendar.JANUARY);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date dateJanvier = calendar.getTime();

            // =========================
            // 5) DIRECTOR + ADMIN PAR HOPITAL
            // =========================
            int personnelIndex = 1;
            for (Hopital hopital : hopitaux) {
                String base = normalizeForEmail(hopital.getNom_hopital());

                Personnel director = new Personnel();
                director.setCin(generateCin("DIR", personnelIndex));
                director.setDate_arrivee(dateJanvier);
                director.setAge(45);
                director.setRole(User_Role.DIRECTOR);
                director.setHopital(hopital);
                director.setPrenom(prenomsHommes.get(maleIndex % prenomsHommes.size()));
                director.setNom(nomsFamille.get(nomIndex % nomsFamille.size()));
                director.setEmail("director." + base + personnelIndex + "@gmail.com");
                director.setTelephone(generatePhone(personnelIndex));
                director.setPassword(pE.encode("12345678"));
                per.save(director);
                personnelIndex++;
                maleIndex++;
                nomIndex++;

                Personnel admin = new Personnel();
                admin.setCin(generateCin("ADM", personnelIndex));
                admin.setDate_arrivee(dateJanvier);
                admin.setAge(30);
                admin.setRole(User_Role.ADMIN);
                admin.setHopital(hopital);
                admin.setPrenom(prenomsFemmes.get(femaleIndex % prenomsFemmes.size()));
                admin.setNom(nomsFamille.get(nomIndex % nomsFamille.size()));
                admin.setEmail("admin." + base + personnelIndex + "@gmail.com");
                admin.setTelephone(generatePhone(personnelIndex));
                admin.setPassword(pE.encode("12345678"));
                per.save(admin);
                personnelIndex++;
                femaleIndex++;
                nomIndex++;
            }

            // =========================
            // 6) MEDECINS : 1 PAR SPECIALITE / HOPITAL
            // =========================
            int medecinIndex = 1;
            for (Hopital hopital : hopitaux) {
                for (Specialite specialite : specialites) {
                    Medecin medecin = new Medecin();
                    medecin.setPrenom(prenomsHommes.get(maleIndex % prenomsHommes.size()));
                    medecin.setNom(nomsFamille.get(nomIndex % nomsFamille.size()));
                    medecin.setCin(generateCin("MED", medecinIndex));
                    medecin.setEmail("medecin" + medecinIndex + "." + normalizeForEmail(hopital.getNom_hopital()) + "@ckhm.ma");
                    medecin.setTelephone(generatePhone(1000 + medecinIndex));
                    medecin.setPassword(pE.encode("qwrtyu"));
                    medecin.setDate_arrivee(new Date());
                    medecin.setDate_sortie(new Date());
                    medecin.setSpecialite(specialite);
                    medecin.setAge(28 + (medecinIndex % 25));
                    medecin.setRole(User_Role.MEDECIN);
                    medecin.setHopital(hopital);
                    mr.save(medecin);

                    medecinIndex++;
                    maleIndex++;
                    nomIndex++;
                }
            }

            // =========================
            // 7) INFIRMIERS : 1 PAR SPECIALITE / HOPITAL
            // =========================
            int infermierIndex = 1;
            for (Hopital hopital : hopitaux) {
                for (String specialiteInf : specialitesInfermiers) {
                    Infermier infermier = new Infermier();
                    infermier.setPrenom(prenomsFemmes.get(femaleIndex % prenomsFemmes.size()));
                    infermier.setNom(nomsFamille.get(nomIndex % nomsFamille.size()));
                    infermier.setCin(generateCin("INF", infermierIndex));
                    infermier.setEmail("infermier" + infermierIndex + "." + normalizeForEmail(hopital.getNom_hopital()) + "@gmail.com");
                    infermier.setPassword(pE.encode("qwrtyu"));
                    infermier.setTelephone(generatePhone(2000 + infermierIndex));
                    infermier.setSpecialite(specialiteInf);
                    infermier.setDescription("Infirmier spécialisé en " + specialiteInf);
                    infermier.setDate_arrivee(new Date());
                    infermier.setAge(24 + (infermierIndex % 15));
                    infermier.setRole(User_Role.INFERMIER);
                    infermier.setHopital(hopital);
                    infermierRepository.save(infermier);

                    infermierIndex++;
                    femaleIndex++;
                    nomIndex++;
                }
            }

            // =========================
            // 8) PATIENTS
            // =========================
            Patient p1 = new Patient();
            p1.setCin("GD36922");
            p1.setNom("Ouafi");
            p1.setPrenom("Mohammed");
            p1.setVerified(true);
            p1.setAge(20);
            p1.setEmail("mohammed@gmail.com");
            p1.setTelephone("0237884634");
            p1.setPassword(pE.encode("qwrtyu"));
            p1.setSexe("female");
            p1.setAdresse("selouane");
            p1.setRole(User_Role.PATIENT);
            pr.save(p1);

            Patient p2 = new Patient();
            p2.setCin("GD36923");
            p2.setNom("Milodi");
            p2.setAge(22);
            p2.setPrenom("Zakariya");
            p2.setVerified(true);
            p2.setEmail("zaki@gmail.com");
            p2.setTelephone("0946736525");
            p2.setPassword(pE.encode("qwrtyu"));
            p2.setSexe("male");
            p2.setAdresse("midelt");
            p2.setRole(User_Role.PATIENT);
            pr.save(p2);

            Patient p3 = new Patient();
            p3.setCin("AB12345");
            p3.setNom("El Amrani");
            p3.setPrenom("Yassine");
            p3.setAge(28);
            p3.setVerified(true);
            p3.setEmail("yassine@gmail.com");
            p3.setTelephone("0612345678");
            p3.setPassword(pE.encode("password123"));
            p3.setSexe("male");
            p3.setAdresse("Nador");
            p3.setRole(User_Role.PATIENT);
            pr.save(p3);

            Patient p4 = new Patient();
            p4.setCin("CD67890");
            p4.setNom("Benali");
            p4.setPrenom("Sara");
            p4.setAge(24);
            p4.setVerified(true);
            p4.setEmail("sara@gmail.com");
            p4.setTelephone("0623456789");
            p4.setPassword(pE.encode("password123"));
            p4.setSexe("female");
            p4.setAdresse("Oujda");
            p4.setRole(User_Role.PATIENT);
            pr.save(p4);

            Patient p5 = new Patient();
            p5.setCin("EF11223");
            p5.setNom("Lahcen");
            p5.setPrenom("Karim");
            p5.setAge(35);
            p5.setVerified(true);
            p5.setEmail("karim@gmail.com");
            p5.setTelephone("0634567890");
            p5.setPassword(pE.encode("password123"));
            p5.setSexe("male");
            p5.setAdresse("Rabat");
            p5.setRole(User_Role.PATIENT);
            pr.save(p5);

            Patient p6 = new Patient();
            p6.setCin("GH44556");
            p6.setNom("Zahraoui");
            p6.setPrenom("Imane");
            p6.setAge(22);
            p6.setVerified(true);
            p6.setEmail("imane@gmail.com");
            p6.setTelephone("0645678901");
            p6.setPassword(pE.encode("password123"));
            p6.setSexe("female");
            p6.setAdresse("Casablanca");
            p6.setRole(User_Role.PATIENT);
            pr.save(p6);

            Patient p7 = new Patient();
            p7.setCin("IJ77889");
            p7.setNom("Mansouri");
            p7.setPrenom("Hamza");
            p7.setAge(30);
            p7.setVerified(true);
            p7.setEmail("hamza@gmail.com");
            p7.setTelephone("0656789012");
            p7.setPassword(pE.encode("password123"));
            p7.setSexe("male");
            p7.setAdresse("Fes");
            p7.setRole(User_Role.PATIENT);
            pr.save(p7);

            Patient p8 = new Patient();
            p8.setCin("KL99001");
            p8.setNom("Idrissi");
            p8.setPrenom("Salma");
            p8.setAge(27);
            p8.setVerified(true);
            p8.setEmail("salma@gmail.com");
            p8.setTelephone("0667890123");
            p8.setPassword(pE.encode("password123"));
            p8.setSexe("female");
            p8.setAdresse("Tanger");
            p8.setRole(User_Role.PATIENT);
            pr.save(p8);

            Patient p9 = new Patient();
            p9.setCin("MN22334");
            p9.setNom("Chakir");
            p9.setPrenom("Rachid");
            p9.setAge(40);
            p9.setVerified(true);
            p9.setEmail("rachid@gmail.com");
            p9.setTelephone("0678901234");
            p9.setPassword(pE.encode("password123"));
            p9.setSexe("male");
            p9.setAdresse("Agadir");
            p9.setRole(User_Role.PATIENT);
            pr.save(p9);

            Patient p10 = new Patient();
            p10.setCin("OP55667");
            p10.setNom("Haddad");
            p10.setPrenom("Nadia");
            p10.setAge(29);
            p10.setVerified(true);
            p10.setEmail("nadia@gmail.com");
            p10.setTelephone("0689012345");
            p10.setPassword(pE.encode("password123"));
            p10.setSexe("female");
            p10.setAdresse("Marrakech");
            p10.setRole(User_Role.PATIENT);
            pr.save(p10);

            Patient p11 = new Patient();
            p11.setCin("QR88990");
            p11.setNom("Toumi");
            p11.setPrenom("Anas");
            p11.setAge(33);
            p11.setVerified(true);
            p11.setEmail("anas@gmail.com");
            p11.setTelephone("0690123456");
            p11.setPassword(pE.encode("password123"));
            p11.setSexe("male");
            p11.setAdresse("Tetouan");
            p11.setRole(User_Role.PATIENT);
            pr.save(p11);

            Patient p12 = new Patient();
            p12.setCin("ST33445");
            p12.setNom("Bennani");
            p12.setPrenom("Lina");
            p12.setAge(26);
            p12.setVerified(true);
            p12.setEmail("lina@gmail.com");
            p12.setTelephone("0601234567");
            p12.setPassword(pE.encode("password123"));
            p12.setSexe("female");
            p12.setAdresse("Al Hoceima");
            p12.setRole(User_Role.PATIENT);
            pr.save(p12);

            // =========================
            // 9) DOSSIERS
            // =========================
            Dossier d1 = new Dossier();
            d1.setPatient(p1);
            d1.setStatus_p("Actif");
            d1.setG_sanguin(G_Sanguin.A_POSITIF);
            d1.setAllergies_notees("Pénicilline");
            d1.setTraitements_actuels("Aucune");
            dr.save(d1);

            Dossier d2 = new Dossier();
            d2.setPatient(p2);
            d2.setStatus_p("Actif");
            d2.setG_sanguin(G_Sanguin.A_POSITIF);
            dr.save(d2);

            Dossier d3 = new Dossier();
            d3.setPatient(p3);
            d3.setStatus_p("Inactif");
            d3.setG_sanguin(G_Sanguin.B_POSITIF);
            dr.save(d3);

            Dossier d4 = new Dossier();
            d4.setPatient(p4);
            d4.setStatus_p("Actif");
            d4.setG_sanguin(G_Sanguin.O_POSITIF);
            dr.save(d4);

            Dossier d5 = new Dossier();
            d5.setPatient(p5);
            d5.setStatus_p("Suspendu");
            d5.setG_sanguin(G_Sanguin.A_NEGATIF);
            dr.save(d5);

            Dossier d6 = new Dossier();
            d6.setPatient(p6);
            d6.setStatus_p("Actif");
            d6.setG_sanguin(G_Sanguin.B_NEGATIF);
            dr.save(d6);

            Dossier d7 = new Dossier();
            d7.setPatient(p7);
            d7.setStatus_p("Inactif");
            d7.setG_sanguin(G_Sanguin.O_NEGATIF);
            dr.save(d7);

            Dossier d8 = new Dossier();
            d8.setPatient(p8);
            d8.setStatus_p("Actif");
            d8.setG_sanguin(G_Sanguin.AB_POSITIF);
            dr.save(d8);

            Dossier d9 = new Dossier();
            d9.setPatient(p9);
            d9.setStatus_p("Actif");
            d9.setG_sanguin(G_Sanguin.AB_NEGATIF);
            dr.save(d9);

            Dossier d10 = new Dossier();
            d10.setPatient(p10);
            d10.setStatus_p("Suspendu");
            d10.setG_sanguin(G_Sanguin.O_POSITIF);
            dr.save(d10);

            Dossier d11 = new Dossier();
            d11.setPatient(p11);
            d11.setStatus_p("Actif");
            d11.setG_sanguin(G_Sanguin.A_POSITIF);
            dr.save(d11);

            Dossier d12 = new Dossier();
            d12.setPatient(p12);
            d12.setStatus_p("Inactif");
            d12.setG_sanguin(G_Sanguin.B_POSITIF);
            dr.save(d12);

            // =========================
            // 10) MEDICAMENTS
            // =========================
            Medicament medicament1 = new Medicament();
            medicament1.setNom("ASPRO");
            medicament1.setDescription("Antalgique pour les maux de tête");
            medicamentr.save(medicament1);

            Medicament medicament2 = new Medicament();
            medicament2.setNom("DOLIPRANE");
            medicament2.setDescription("Antidouleur et antipyrétique");
            medicamentr.save(medicament2);

            Medicament medicament3 = new Medicament();
            medicament3.setNom("AMOXICILLINE");
            medicament3.setDescription("Antibiotique pour infections bactériennes");
            medicamentr.save(medicament3);

            Medicament medicament4 = new Medicament();
            medicament4.setNom("SPASFON");
            medicament4.setDescription("Antispasmodique pour douleurs abdominales");
            medicamentr.save(medicament4);

            Medicament medicament5 = new Medicament();
            medicament5.setNom("VENTOLINE");
            medicament5.setDescription("Bronchodilatateur pour l'asthme");
            medicamentr.save(medicament5);

            Medicament medicament6 = new Medicament();
            medicament6.setNom("IBUPROFENE");
            medicament6.setDescription("Anti-inflammatoire et antidouleur");
            medicamentr.save(medicament6);

            Medicament medicament7 = new Medicament();
            medicament7.setNom("SMECTA");
            medicament7.setDescription("Traitement des troubles digestifs");
            medicamentr.save(medicament7);

            Medicament medicament8 = new Medicament();
            medicament8.setNom("CLARITINE");
            medicament8.setDescription("Antihistaminique contre les allergies");
            medicamentr.save(medicament8);

            Medicament medicament9 = new Medicament();
            medicament9.setNom("AUGMENTIN");
            medicament9.setDescription("Antibiotique à large spectre");
            medicamentr.save(medicament9);

            Medicament medicament10 = new Medicament();
            medicament10.setNom("EFFERALGAN");
            medicament10.setDescription("Antalgique et antipyrétique");
            medicamentr.save(medicament10);

            Medicament medicament11 = new Medicament();
            medicament11.setNom("OMEPRAZOLE");
            medicament11.setDescription("Traitement des brûlures d'estomac");
            medicamentr.save(medicament11);

            Medicament medicament22 = new Medicament();
            medicament11.setNom("AMIODARONE");
            medicament11.setDescription("Correction de gin troubles du rythme");
            medicamentr.save(medicament22);

            Medicament medicament12 = new Medicament();
            medicament12.setNom("CETIRIZINE");
            medicament12.setDescription("Antiallergique");
            medicamentr.save(medicament12);

            Medicament medicament13 = new Medicament();
            medicament13.setNom("PARACETAMOL");
            medicament13.setDescription("Antidouleur et antipyrétique");
            medicamentr.save(medicament13);

            Medicament medicament14 = new Medicament();
            medicament14.setNom("METFORMINE");
            medicament14.setDescription("Traitement du diabète de type 2");
            medicamentr.save(medicament14);

            Medicament medicament15 = new Medicament();
            medicament15.setNom("LOPERAMIDE");
            medicament15.setDescription("Traitement de la diarrhée");
            medicamentr.save(medicament15);

            // =========================
            // 11) VACCINATION
            // =========================
            Infermier infermierVaccin = infermierRepository.findAll().stream().findFirst().orElse(null);
            if (infermierVaccin != null) {
                Vaccination v = new Vaccination();
                v.setDateVaccin(new Date());
                v.setMotif("a cause de passport");
                v.setInfermierV(infermierVaccin);
                v.setObservation("pas de reaction");
                v.setNomVaccin("covid-19 vaccin");
                v.setDossierV(d1);
                vR.save(v);
            }
        };
    }

    // =========================
    // METHODES UTILITAIRES
    // =========================
    private static String normalizeForEmail(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        normalized = normalized.toLowerCase()
                .replaceAll("[^a-z0-9]+", "");
        return normalized;
    }

    private static String generateCin(String prefix, int index) {
        return prefix + String.format("%06d", index);
    }

    private static String generatePhone(int index) {
        return "06" + String.format("%08d", index % 100000000);
    }
}