import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Heart, Brain, Calendar, Activity,
  MapPin, Phone, ChevronRight, Lock,
  Clock, ExternalLink, Menu, User, Stethoscope, Hospital, Navigation, Syringe, Baby
} from 'lucide-react';
import {voireHopitalByRegion} from "../services/PrincipaleService.js";

const App = () => {

  const [hops,setHops]=useState([])
  const voire = async ()=>{
    try{
      const res=await voireHopitalByRegion()
      console.log(res.data)
      setHops(res.data);
    }catch (error) {
      console.error("Erreur specs:", error);
    }

  }
  useEffect(() => {
    voire();
  }, []);

  return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

        {/* --- BARRE DE NAVIGATION --- */}
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-white/95 to-[#0056b3]/10 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              {/* Section Logo & Texte */}
              <div className="flex items-center gap-4">
                <img
                    src="/images/Hopital.png"
                    alt="Logo Ministère"
                    className="h-14 w-auto object-contain"
                />
                <div className="border-l-2 border-[#0056b3] pl-3 leading-none">
          <span className="block font-bold text-gray-800 text-base tracking-wide uppercase">
            Ministère de la Santé
          </span>
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            Royaume du Maroc
          </span>
                </div>
              </div>

              {/* Navigation Links avec indicateur de ligne bleue */}
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-700">
                {[
                  { name: 'Accueil', href: '#', active: true },
                  { name: 'Services', href: '#services', active: false },
                  { name: 'Établissements', href: '#etablissements', active: false },
                  { name: 'À propos', href: '#mission', active: false },
                ].map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={`relative py-2 transition-colors duration-300 ${
                            link.active ? 'text-[#0056b3]' : 'hover:text-[#0056b3]'
                        }`}
                    >
                      {link.name}
                      {/* La ligne bleue */}
                      <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-[#0056b3] transition-all duration-300 ${
                              link.active ? 'w-full' : 'w-0 hover:w-full'
                          }`}
                      ></span>
                    </a>
                ))}
              </div>

              {/* Actions (Boutons) */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Link
                      to="/auth/Register"
                      className="hidden sm:flex items-center gap-2 bg-white/50 border-2 border-[#0056b3] text-[#0056b3] hover:bg-[#0056b3] hover:text-white px-5 py-2 rounded-xl font-bold text-sm transition-all"
                  >
                    Créer un compte
                  </Link>

                  <Link
                      to="/auth/Login"
                      className="bg-[#0056b3] hover:bg-[#004494] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
                  >
                    <User size={16} /> Connexion
                  </Link>
                </div>
                <Menu className="md:hidden text-slate-600 cursor-pointer" />
              </div>

            </div>
          </div>
        </nav>

        {/* --- SECTION HERO (Espace réduit ici avec pt-4) --- */}
        <header className="relative pt-4 pb-16 lg:pt-8 lg:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">

                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                  Votre santé, notre <span className="text-[#0056b3]">engagement</span>.
                </h1>
                <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                  Accédez à vos services de santé en ligne : prise de rendez-vous simplifiée, suivi médical sécurisé et accompagnement personnalisé 24h/24.
                </p>

                <div className="flex flex-wrap gap-4">

                  <div className="flex gap-8 text-sm font-bold text-slate-500 items-center">
                    <span className="flex items-center gap-2"><Lock className="text-emerald-500" size={18}/> 100% Sécurisé</span>
                    <span className="flex items-center gap-2"><Clock className="text-blue-500" size={18}/> 24h/24</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* Bloc principal */}
                <div className="bg-gradient-to-br from-blue-600/90 via-blue-500/70 to-blue-400/50 rounded-3xl p-6 lg:p-8 shadow-lg text-white relative z-10">

                  {/* Titre */}
                  <h3 className="text-xl lg:text-2xl font-bold mb-6 flex items-center gap-3 uppercase tracking-wider text-blue-100">
                    <Hospital size={24} /> Établissement Public
                  </h3>

                  {/* Cartes internes */}
                  <div className="space-y-3">
                    <HeroActionCard
                        icon={<Calendar size={18}/>}
                        title="Consultation"
                        sub="Prendre rendez-vous en ligne"
                        highlight
                    />
                    <HeroActionCard
                        icon={<Syringe size={18}/>}
                        title="Vaccination"
                        sub="Calendrier et rappels"
                    />
                    <HeroActionCard
                        icon={<Baby size={18}/>}
                        title="Suivi de Grossesse"
                        sub="Maternité et prénatal"
                    />
                  </div>
                </div>

                {/* Overlay décoratif */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-blue-200/30 rounded-3xl -z-10 rotate-2 opacity-40"></div>
              </div>

            </div>
          </div>
        </header>

        {/* --- SECTION MISSION & VISION --- */}
        {/* --- SECTION MISSION & VISION --- */}
        <section className="py-24 bg-[#004494] relative overflow-hidden text-white">
          {/* Overlay décoratif */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80" alt="background" className="w-full h-full object-cover" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-3 gap-12 items-start">

              {/* Colonne de titre et description */}
              <div className="lg:col-span-1">
                <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                  Notre Mission <br />& Vision
                </h2>
                <div className="w-16 h-1.5 bg-blue-400 rounded-full mb-8"></div>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Le Ministère de la Santé œuvre pour garantir un accès équitable à des soins de qualité, en plaçant l'innovation au service du citoyen marocain.
                </p>
              </div>

              {/* Grille des 3 missions fondamentales */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">

                {/* Mission 1 : Modernisation */}
                <div className="group flex flex-col gap-4 p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
                    <Activity size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">Modernisation</h4>
                    <p className="text-sm text-blue-100/70 leading-relaxed">
                      Mise à jour constante des plateaux techniques et infrastructures hospitalières pour répondre aux standards internationaux.
                    </p>
                  </div>
                </div>

                {/* Mission 2 : Souveraineté */}
                <div className="group flex flex-col gap-4 p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">Souveraineté</h4>
                    <p className="text-sm text-blue-100/70 leading-relaxed">
                      Développement de l'autonomie médicale nationale et promotion de la fabrication locale des médicaments essentiels.
                    </p>
                  </div>
                </div>

                {/* Mission 3 : Digitalisation (La Nouvelle Mission) */}
                <div className="group sm:col-span-2 flex flex-col sm:flex-row items-start gap-6 p-8 bg-gradient-to-br from-blue-600/20 to-transparent rounded-[2rem] border border-blue-400/20 backdrop-blur-md hover:border-blue-400/40 transition-all">
                  <div className="w-14 h-14 bg-blue-400/20 rounded-2xl flex items-center justify-center text-blue-200 shrink-0">
                    <Stethoscope size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">Digitalisation & Accessibilité</h4>
                    <p className="text-sm text-blue-100/80 leading-relaxed max-w-xl">
                      Transformation numérique du système de santé : Dossier Médical Partagé (DMP), téléconsultation et gestion intelligente des ressources pour réduire les délais d'attente.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION SERVICES --- */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Services Numériques
              </h2>
              <p className="mt-3 text-slate-500 font-medium">
                Simplifiez votre parcours de santé en quelques clics
              </p>
              <div className="mt-5 w-12 h-1 bg-[#0056b3] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <ServiceCard
                  img="/images/rendezvous.png"
                  icon={<Calendar size={18} />}
                  title="Rendez-vous"
                  desc="Planifiez vos consultations avec nos spécialistes hospitaliers."

              />

              <ServiceCard
                  img="/images/dossier-medical.png"
                  icon={<Stethoscope size={18} />}
                  title="Dossier Médical"
                  desc="Accédez à vos résultats d'analyses et historique de soins."

              />

              <ServiceCard
                  img="/images/urgence.png"
                  icon={<MapPin size={18} />}
                  title="Urgences"
                  desc="Localisez les centres de santé et pharmacies ouverts 24h/24."

              />

            </div>
          </div>
        </section>



        {/* --- SECTION CARTE & GPS (Points Rouges) --- */}
        <section id="etablissements" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                    Présence Nationale des Hôpitaux
                  </h2>
                  <p className="mt-4 text-lg text-slate-600">
                    Visualisez les structures de santé du Royaume. Les <span className="text-red-600 font-bold">points rouges</span> indiquent les hôpitaux publics.
                  </p>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {
                    hops.map(hopital=>(
                    <RegionStat label={hopital.nomRegion} hospital={hopital.nomHospital} value={hopital.counthospital}/>
                    ))}
                </div>


              </div>

              <div
                  className="relative bg-white rounded-[3rem] p-3 h-[600px] border border-slate-200 shadow-2xl overflow-hidden">
                <iframe
                    title="Carte GPS Maroc"
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3500000!2d-7.0!3d31.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospitals+in+Morocco!5e0!3m2!1sfr!2sma!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '2.5rem' }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer id="mission"  className="bg-[#0f172a] text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Shield className="text-[#0056b3]" fill="currentColor" size={24} />
                  <span className="font-bold uppercase tracking-tighter text-lg leading-none">Ministère de la Santé</span>
                </div>
                <p className="text-slate-400 text-sm">Royaume du Maroc</p>
              </div>
              <FooterLinkCol title="Navigation" links={["Accueil", "Services", "Établissements"]} />
              <FooterLinkCol title="Aide" links={["Contact", "FAQ", "Mentions Légales"]} />
              <div className="space-y-4">
                <h4 className="font-bold text-blue-500 uppercase text-xs tracking-widest">Contact</h4>
                <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-3"><Phone size={14}/> 0801 00 47 47</p>
                <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-3"><MapPin size={14}/> Rabat, Maroc</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">© 2026 Ministère de la Santé — Royaume du Maroc.</p>
          </div>
        </footer>
      </div>
  );
};

/* --- SOUS-COMPOSANTS --- */

const HeroActionCard = ({ icon, title, sub, highlight = false }) => (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${highlight ? 'bg-white text-slate-900 shadow-xl scale-[1.02] border-transparent' : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlight ? 'bg-blue-50 text-[#1e3a8a]' : 'bg-white/20'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm uppercase tracking-wide">{title}</p>
        <p className={`text-xs ${highlight ? 'text-slate-500' : 'text-blue-100/70'}`}>{sub}</p>
      </div>
      <ChevronRight size={18} className={highlight ? 'text-[#0056b3]' : 'text-white/40 group-hover:translate-x-1 transition-transform'} />
    </div>
);

const ServiceCard = ({ img, icon, title, desc, btnText }) => (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="h-48 overflow-hidden relative">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      </div>
      <div className="p-8">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0056b3] transition-colors">
          <span className="text-[#0056b3] group-hover:text-white transition-colors">{icon}</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
        <button className="text-[#0056b3] font-bold text-sm flex items-center gap-2">
          {btnText} <ExternalLink size={14} />
        </button>
      </div>
    </div>
);

const RegionStat = ({ label, hospital, value }) => (
    <div className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl hover:border-red-200 transition-colors shadow-sm cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-red-600 rounded-full group-hover:animate-ping"></div>
        <div>
          <span className="block font-bold text-slate-800 text-sm">{label}</span>
          <span className="text-[10px] text-slate-500 italic">{hospital}</span>
        </div>
      </div>
      <span className="text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-lg">{value}</span>
    </div>
);

const FooterLinkCol = ({ title, links }) => (
    <div className="space-y-4">
      <h4 className="font-bold text-blue-500 uppercase text-xs tracking-widest">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, i) => (
            <li key={i}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</a></li>
        ))}
      </ul>
    </div>
);

export default App;