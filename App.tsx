import React from 'react';
import { motion } from 'motion/react';
import { Building, Users, MessageCircle, Shield, ArrowRight, Heart, MapPin } from 'lucide-react';
import portrait from './portrait.jpg';

// Animations-Vorlagen
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* FLOATING GLASS HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-full px-6 py-4 flex justify-between items-center transition-all">
          <div className="font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            JENS DRAKE
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Über mich</a>
            <a href="#vision" className="hover:text-blue-600 transition-colors">Vision</a>
          </nav>
          <a href="#vision" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/25">
            Programm ansehen
          </a>
        </div>
      </header>

      {/* MODERN HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 md:px-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-slate-200/50 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-widest uppercase mb-8 border border-blue-100 w-fit">
              <MapPin size={16} /> Kommunalwahl 2026
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-slate-900">
              Gemeinde <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-800">
                Cremlingen.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-light text-slate-600 mb-10 max-w-xl leading-relaxed border-l-4 border-blue-600 pl-6">
              „Weil Heimat Nähe braucht und Ehrlichkeit verdient!“
            </motion.p>
          </motion.div>
          
          {/* Image Content */}
          <motion.div 
            className="flex-1 w-full max-w-lg relative"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2 z-10 aspect-[4/5]">
              <img 
                src={portrait} 
                alt="Jens Drake - Bürgermeisterkandidat" 
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Jens Drake</p>
                  <p className="text-sm text-slate-500">Ihr Bürgermeisterkandidat</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
            {/* Decor Element */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full rounded-3xl bg-slate-900"></div>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID ABOUT SECTION */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white relative rounded-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Intro Card */}
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-slate-50 rounded-3xl p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <h3 className="text-3xl font-extrabold mb-6 tracking-tight z-10">Über mich</h3>
              <p className="text-lg text-slate-600 font-light leading-relaxed mb-4 z-10">
                Hallo, schön, dass Sie meine Seite besuchen. Ich heiße <strong className="font-semibold text-slate-900">Jens Drake</strong> und kandidiere als Gemeindebürgermeister der Einheitsgemeinde Cremlingen.
              </p>
              <p className="text-lg text-slate-600 font-light leading-relaxed z-10">
                Ich bin 57 Jahre alt, wohne schon immer in Cremlingen, bin seit 28 Jahren verheiratet und habe zwei erwachsene Söhne. 
              </p>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-blue-100/50 transition-colors duration-500"></div>
            </motion.div>

            {/* Ehrenamt Card */}
            <motion.div variants={fadeInUp} className="bg-blue-600 text-white rounded-3xl p-10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 shadow-xl shadow-blue-600/20">
              <Heart className="w-12 h-12 text-blue-200 mb-8" strokeWidth={1.5} />
              <div>
                <h4 className="text-5xl font-black mb-2">41</h4>
                <p className="text-blue-100 font-light text-lg">Jahre ehrenamtliches Engagement in den Vereinen unserer Region.</p>
              </div>
            </motion.div>

            {/* Beruf Card */}
            <motion.div variants={fadeInUp} className="md:col-span-3 bg-slate-900 text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Building className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">Berufliche Führungserfahrung</h4>
                <p className="text-slate-300 font-light text-lg leading-relaxed max-w-4xl">
                  Bei der Volkswagen Group Digital Solutions leite ich zwei Teams (Prozessmanagement und Frontoffice). Gemeinsam sichern wir den Service für <strong className="text-white">17 fahrzeugfertigende Werke</strong> in ganz Europa.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* MODERN VISION SECTION */}
      <section id="vision" className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Meine Vision für Cremlingen
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-xl text-slate-500 font-light max-w-3xl mx-auto">
              Verwaltung wird oft als zu langsam und bürokratisch empfunden. Mein Ziel ist eine moderne, lebensnahe Gemeinde.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Goal 1 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-slate-100 group">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900">Bürgerorientiert</h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Ich werde die Verwaltung verständlicher und lebensnäher gestalten, damit sie für die Menschen da ist – nicht umgekehrt.
              </p>
            </motion.div>
            
            {/* Goal 2 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-slate-100 group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-500">
                <MessageCircle className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900">Echter Dialog</h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Nur wer zuhört, kann richtig entscheiden. Durch aktiven Bürgerdialog möchte ich die Akzeptanz für Entscheidungen herbeiführen.
              </p>
            </motion.div>

            {/* Goal 3 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-slate-100 group">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-teal-600 transition-all duration-500">
                <Shield className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900">Volle Transparenz</h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Entscheidungen müssen nachvollziehbar sein. Eine ehrliche und offene Kommunikation ist das Fundament meiner Arbeit.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-12 px-6 md:px-12 rounded-t-[3rem] mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-extrabold text-2xl tracking-tight mb-1">JENS DRAKE.</p>
            <p className="text-slate-400 font-light text-sm">Bürgermeisterkandidat Cremlingen 2026</p>
          </div>
          <div className="text-sm font-light text-slate-500 flex gap-6">
            <span>© 2026 Jens Drake. Alle Rechte vorbehalten.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
