import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Building, Users, MessageCircle, Shield, ArrowRight, Heart, MapPin } from 'lucide-react';
import portrait from './portrait.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* FLOATING GLASS HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 mt-1">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-red-100 shadow-sm rounded-full px-6 py-4 flex justify-between items-center transition-all"
        >
          <div className="font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            JENS DRAKE
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-red-600 transition-colors">Über mich</a>
            <a href="#vision" className="hover:text-red-600 transition-colors">Vision</a>
          </nav>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#vision" 
            className="bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/30"
          >
            Programm ansehen
          </motion.a>
        </motion.div>
      </header>

      {/* MODERN HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 md:px-12">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-red-50 blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-slate-50 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            className="flex-1 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-bold tracking-widest uppercase mb-8 border border-red-100 w-fit cursor-default"
            >
              <MapPin size={16} /> Kommunalwahl 2026
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-slate-900">
              Gemeinde <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
                Cremlingen.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-light text-slate-600 mb-10 max-w-xl leading-relaxed border-l-4 border-red-600 pl-6">
              „Weil Heimat Nähe braucht und Ehrlichkeit verdient!“
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full max-w-lg relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2 z-10 aspect-[4/5]"
            >
              <img 
                src={portrait} 
                alt="Jens Drake - Bürgermeisterkandidat" 
                className="w-full h-full object-cover rounded-2xl"
              />
              <a href="#about" className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-red-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:scale-[1.02] transition-all duration-300">
                <div>
                  <p className="font-bold text-slate-900">Jens Drake</p>
                  <p className="text-sm text-slate-500">Ihr Kandidat</p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 45 }}
                  className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </a>
            </motion.div>
            <div className="absolute -z-10 top-8 -right-8 w-full h-full rounded-3xl bg-red-900"></div>
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
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-slate-50 rounded-3xl p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group transition-all duration-500"
            >
              <h3 className="text-3xl font-extrabold mb-6 tracking-tight z-10">Über mich</h3>
              <p className="text-lg text-slate-600 font-light leading-relaxed mb-4 z-10">
                Hallo, schön, dass Sie meine Seite besuchen. Ich heiße <strong className="font-semibold text-slate-900">Jens Drake</strong> und kandidiere als Gemeindebürgermeister der Einheitsgemeinde Cremlingen.
              </p>
              <p className="text-lg text-slate-600 font-light leading-relaxed z-10">
                Ich bin 57 Jahre alt, wohne schon immer in Cremlingen, bin seit 28 Jahren verheiratet und habe zwei erwachsene Söhne. 
              </p>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-red-100/50 group-hover:scale-150 transition-all duration-700"></div>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-red-600 text-white rounded-3xl p-10 flex flex-col justify-between shadow-xl shadow-red-600/20 cursor-default"
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className="w-12 h-12 text-red-200 mb-8" strokeWidth={1.5} />
              </motion.div>
              <div>
                <h4 className="text-5xl font-black mb-2">41</h4>
                <p className="text-red-100 font-light text-lg">Jahre ehrenamtliches Engagement in den Vereinen der Region.</p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-3 bg-slate-900 text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Building className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">Berufliche Führungserfahrung</h4>
                <p className="text-red-100 font-light text-lg leading-relaxed max-w-4xl">
                  Bei der Volkswagen Group Digital Solutions leite ich zwei Teams (Prozessmanagement und Frontoffice). Gemeinsam sichern wir den Service für <strong className="text-white">17 fahrzeugfertigende Werke</strong> in ganz Europa.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* MODERN VISION SECTION */}
      <section id="vision" className="py-32 px-6 md:px-12 relative overflow-hidden">
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
            {[
              { icon: Users, title: "Bürgerorientiert", desc: "Ich werde die Verwaltung verständlicher und lebensnäher gestalten, damit sie für die Menschen da ist – nicht umgekehrt." },
              { icon: MessageCircle, title: "Echter Dialog", desc: "Nur wer zuhört, kann richtig entscheiden. Durch aktiven Bürgerdialog möchte ich die Akzeptanz für Entscheidungen herbeiführen." },
              { icon: Shield, title: "Volle Transparenz", desc: "Entscheidungen müssen nachvollziehbar sein. Eine ehrliche und offene Kommunikation ist das Fundament meiner Arbeit." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp} 
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(220,38,38,0.1)] transition-all duration-300 border border-slate-100 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-8 group-hover:bg-red-600 transition-all duration-500">
                  <item.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h4>
                <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-red-950 text-white py-12 px-6 md:px-12 rounded-t-[3rem] mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-extrabold text-2xl tracking-tight mb-1">JENS DRAKE.</p>
            <p className="text-red-200 font-light text-sm">Bürgermeisterkandidat Cremlingen 2026</p>
          </div>
          <div className="text-sm font-light text-red-200 flex gap-6">
            <span>© 2026 Jens Drake. Alle Rechte vorbehalten.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
