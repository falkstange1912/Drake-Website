/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Phone, 
  Search, 
  Menu, 
  Mail, 
  Clock, 
  Check, 
  ArrowUpRight, 
  X, 
  Sparkles, 
  Award, 
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Calendar
} from 'lucide-react';

// Define the partner data matching BCR LAW/Artone Studio vibes
interface Partner {
  id: 'falk' | 'christina';
  name: string;
  role: string;
  quote: string;
  bio: string;
  email: string;
  phone: string;
  imageUrl: string;
  signature: string;
  credentials: string[];
}

const PARTNERS: Record<string, Partner> = {
  falk: {
    id: 'falk',
    name: 'Falk Stieg',
    role: 'Gründer & Strategischer Direktor',
    quote: '„Wer sich über den Preis definiert, hat das emotionale Design vernachlässigt. Wahre Marktführerschaft entsteht im Kopf.“',
    bio: 'Falk Stieg berät seit über 12 Jahren mittelständische Marktführer und Gründer in ganz Europa bei der Positionierung und visuellen Aufwertung ihrer Markenarchitektur. Er verbindet rationale, betriebswirtschaftliche Fakten mit disruptiver gestalterischer Ästhetik.',
    email: 'f.stieg@falkbrandstudio.de',
    phone: '+49 (0) 40 829 1912',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    signature: 'Falk Stieg',
    credentials: ['M.A. Markenwissenschaften', 'Ehemaliger Executive Art Dir. London', 'Beratungsauszeichnung Hamburg']
  },
  christina: {
    id: 'christina',
    name: 'Christina Richter',
    role: 'Partnerin & Bureau Director',
    quote: '„Ästhetik ist kein dekorativer Luxus, sondern der stärkste und härteste KPI für Preissouveränität in gesättigten Märkten.“',
    bio: 'Christina Richter blickt auf eine jahrelange Karriere in renommierten Design-Bureaus in Zürich und Frankfurt zurück. Ihr klares, an der klassischen Schweizer Schule ausgerichtetes Gespür für Typografie und Raster bringt Falk Studio seine unverwechselbare visuelle Haltung.',
    email: 'c.richter@falkbrandstudio.de',
    phone: '+49 (0) 40 829 1913',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    signature: 'C. Richter',
    credentials: ['Dipl. Visuelle Kommunikation Zürich', 'Mitglied im Deutschen Designer Club', 'Preisträgerin Lead Award']
  }
};

// Diagnostic Branding Quiz questions modeled after Milani's "Profilatore"
interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    description: string;
    value: 'A' | 'B' | 'C';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Was ist die primäre vertriebliche Hürde Ihres Unternehmens?',
    options: [
      { 
        label: 'Preiskämpfe im Markt', 
        description: 'Potenzielle Kunden vergleichen uns ständig mit billigeren Mitbewerbern.', 
        value: 'A' 
      },
      { 
        label: 'Mangelnde Strahlkraft', 
        description: 'Wir sind fachlich exzellent, aber unser Auftritt wirkt bieder oder veraltet.', 
        value: 'B' 
      },
      { 
        label: 'Komplexitätserklärung', 
        description: 'Wir haben ein revolutionäres Produkt, das Kunden nicht auf Anhieb verstehen.', 
        value: 'C' 
      }
    ]
  },
  {
    id: 2,
    text: 'Welche visuelle Aura passt am besten zu Ihrer langfristigen Vision?',
    options: [
      { 
        label: 'Zeitlose Eleganz & Autorität', 
        description: 'Vergleichbar mit einer klassischen Schweizer Privatbank oder einem noblen Hotel.', 
        value: 'A' 
      },
      { 
        label: 'Disruptive Tech-Avantgarde', 
        description: 'Progressiv, minimal, mutig und zukunftsorientiert wie ein Silicon-Valley-Einhorn.', 
        value: 'B' 
      },
      { 
        label: 'Organischer Premium-Klassiker', 
        description: 'Natürlich, nachhaltig, haptisch und handwerklich perfekt bis ins Detail.', 
        value: 'C' 
      }
    ]
  },
  {
    id: 3,
    text: 'Wer ist Ihr wichtigster Entscheidungsträger?',
    options: [
      { 
        label: 'B2B CEOs & Großkonzerne', 
        description: 'Anspruchsvolle Entscheider, die absolute Expertise und absolute Sicherheit verlangen.', 
        value: 'A' 
      },
      { 
        label: 'HNWIs & vermögende Privatkunden', 
        description: 'Privatleute, die Exklusivität, Diskretion und erstklassigen Stil erwarten.', 
        value: 'B' 
      },
      { 
        label: 'Die qualitative breite Masse', 
        description: 'Kunden, die bereit sind, für nachweisbare Qualität einen Aufpreis zu zahlen.', 
        value: 'C' 
      }
    ]
  }
];

export default function App() {
  const [activePartner, setActivePartner] = useState<Partner>(PARTNERS.falk);
  const [time, setTime] = useState<string>('');
  
  // Interactive navigation shelf state
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Diagnostic Brand Compass state
  const [compassStep, setCompassStep] = useState(0); // 0 = start, 1-3 = questions, 4 = result
  const [answers, setAnswers] = useState<('A' | 'B' | 'C')[]>([]);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    title: string;
    focus: string;
    leverage: string;
    quote: string;
  } | null>(null);

  // Form submit state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    auditType: 'Markenanalyse'
  });

  // Keep ticking local time for Hamburg (UTC+2 in Summer)
  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      // Using German locale to output time nicely
      const hh = String(now.getUTCHours() + 2).padStart(2, '0'); // Berlin/Hamburg Sommerzeit
      const mm = String(now.getUTCMinutes()).padStart(2, '0');
      const ss = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
    };
    formatTime();
    const interval = setInterval(formatTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute Brand Compass results
  const calculateResult = (finalAnswers: ('A' | 'B' | 'C')[]) => {
    // Basic heuristics based on answers count
    const countA = finalAnswers.filter(a => a === 'A').length;
    const countB = finalAnswers.filter(a => a === 'B').length;
    
    if (countA >= 2) {
      setDiagnosticResult({
        title: 'Die Preissouveränitäts-Architektur',
        focus: 'Premium-Etablierung & Preiskompetenz',
        leverage: 'Sie benötigen ein radikales visuelles Upgrade auf Editorial-Niveau, um Preiskämpfe zu eliminieren. Wenn Ihr Design absolute Autorität ausstrahlt, rückt das Thema Preis in den Hintergrund.',
        quote: '„Prestige entsteht nicht durch Erklärung, sondern durch die nonverbale Dominanz des Layouts.“ — Christina Richter'
      });
    } else if (countB >= 2) {
      setDiagnosticResult({
        title: 'Der Tech-Avantgarde-Kompass',
        focus: 'Positionierung durch Innovation & Mut',
        leverage: 'Ihr Unternehmen muss lauter, jünger und prägnanter auftreten. Wir raten zu einem kontrastreichen Dark-Mode Theme, starker Schweizer Typografie und interaktiven Webelementen, um Talente und Premium-Finanzierung anzuziehen.',
        quote: '„Wer das Gewohnte bricht, fesselt die Aufmerksamkeit des gesamten Marktes.“ — Falk Stieg'
      });
    } else {
      setDiagnosticResult({
        title: 'Die Haptische Handwerks-Aura',
        focus: 'Klarheit, Nahbarkeit & kompromisslose Qualität',
        leverage: 'Ihre visuelle Geschichte muss das greifbare, kompromisslose Handwerk hinter Ihrer Leistung betonen. Nutzen Sie gedämpfte Naturtöne (Sienna-Erden, warme Hölzer) und großzügige freie Weißräume.',
        quote: '„Simplizität ist das ultimative Symbol von Luxus und Handwerkskunst.“ — Falk Stieg'
      });
    }
  };

  const handleAnswerSelect = (optionValue: 'A' | 'B' | 'C') => {
    const newAnswers = [...answers, optionValue];
    setAnswers(newAnswers);
    
    if (compassStep < 3) {
      setCompassStep(compassStep + 1);
    }
    
    if (newAnswers.length === 3) {
      calculateResult(newAnswers);
      setCompassStep(4);
    }
  };

  const resetCompass = () => {
    setCompassStep(0);
    setAnswers([]);
    setDiagnosticResult(null);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Smooth scroll to success state
    setTimeout(() => {
      const el = document.getElementById('cta-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Switch active partner with smooth scrolling logic or state
  const handlePartnerSwitch = (partnerKey: 'falk' | 'christina') => {
    setActivePartner(PARTNERS[partnerKey]);
  };

  return (
    // Outer roasted dark-cocoa wrapper mimicking Caffè Milani container approach
    <div className="min-h-screen bg-[#1F1916] py-0 md:py-8 px-0 sm:px-4 md:px-8 font-sans antialiased text-[#1F1916]">
      
      {/* Inner premium vanilla viewport page with editorial slim border */}
      <div id="page-container" className="max-w-[1440px] mx-auto bg-[#FAF9F5] shadow-2xl rounded-sm overflow-hidden border border-[#C29B70]/15 flex flex-col relative transition-all duration-300">
        
        {/* HEADER GREETING & TICKING CLOCK */}
        <div id="top-ticker" className="bg-[#1F1916] text-[#FAF9F5] px-6 py-2.5 flex justify-between items-center text-[11px] font-mono tracking-widest border-b border-[#FAF9F5]/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C2525] animate-pulse"></span>
            <span className="uppercase text-[#C29B70] font-medium">Boutique-Advisory für Prestige-Marken</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="opacity-60">STRATEGIE & DESIGN</span>
            <span className="text-[#C29B70]">HAMBURG, DE — {time || '16:01:04'} (UTC+2)</span>
          </div>
        </div>

        {/* CORE NAVIGATION */}
        <header id="main-header" className="border-b border-[#1F1916]/10 px-6 lg:px-12 py-6 flex justify-between items-center bg-[#FAF9F5]/90 backdrop-blur-md sticky top-0 z-40 transition-all">
          
          {/* Left links representing BCR Law / Artone index structures */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-mono uppercase tracking-widest text-[#1F1916]/70">
            <a href="#hook-section" className="hover:text-[#8C2525] transition-colors">01. Überzeugung</a>
            <a href="#promise-section" className="hover:text-[#8C2525] transition-colors">02. Das Versprechen</a>
            <a href="#value-points-section" className="hover:text-[#8C2525] transition-colors">03. Prinzipien</a>
            <a href="#compass-section" className="hover:text-[#8C2525] transition-colors">04. Strategie-Kompass</a>
          </nav>
          
          {/* Middle Logo Container: Inspired heavily by elegant BCR Law typography box */}
          <div className="flex justify-center flex-1 lg:flex-none">
            <a href="#" className="group block">
              <div className="border border-[#8C2525] px-4 py-2 flex flex-col items-center justify-center bg-transparent transition-all duration-300 group-hover:bg-[#8C2525]/5">
                <span className="text-lg tracking-[0.4em] font-serif font-black text-[#1F1916] -mr-[0.4em] transition-colors group-hover:text-[#8C2525]">
                  FALK
                </span>
                <span className="text-[9px] tracking-[0.55em] font-mono text-[#8C2525] -mr-[0.55em] font-semibold">
                  STUDIO
                </span>
              </div>
            </a>
          </div>

          {/* Right Header Navigation - Call, Search, and Menu Indicator */}
          <div className="flex items-center gap-6 text-[#1F1916]">
            <a href="tel:+49408291912" className="hidden sm:flex items-center gap-2 hover:text-[#8C2525] transition-colors text-xs font-mono tracking-wider">
              <Phone size={13} className="text-[#8C2525]" />
              <span>Kontakt</span>
            </a>
            
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-1 hover:text-[#8C2525] transition-all cursor-pointer"
              title="Suchen"
            >
              <Search size={18} />
            </button>

            {/* Menu Trigger styled like BCR Law LLPs Phone & Menu Indicator */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 border-l border-[#1F1916]/15 pl-4 py-1 font-mono uppercase text-xs tracking-widest hover:text-[#8C2525] transition-all cursor-pointer"
            >
              <Menu size={16} className="text-[#8C2525]" />
              <span className="hidden md:inline font-bold">Menü</span>
            </button>
          </div>
        </header>

        {/* SEARCH DRAWER */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#1F1916] text-[#FAF9F5] px-6 lg:px-12 py-6 border-b border-[#C29B70]/20 flex flex-col gap-3 font-mono text-xs overflow-hidden z-30"
            >
              <div className="flex justify-between items-center">
                <span>Wonach suchen Sie im Falk Brand Studio?</span>
                <button onClick={() => setSearchOpen(false)} className="hover:text-[#8C2525]">
                  <X size={16} />
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Z.B. Positionierung, Markenwert, Case Studies, Christina Richter..."
                  className="w-full bg-transparent border-b border-[#FAF9F5]/30 py-2.5 text-base focus:outline-none focus:border-[#C29B70] placeholder-[#FAF9F5]/40 text-[#FAF9F5]"
                  autoFocus
                />
                <Search size={20} className="absolute right-0 top-3 text-[#C29B70]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 1: THE HOOK (ATTENTION GRABBER) */}
        <section 
          id="hook-section" 
          className="border-b border-[#1F1916]/10 py-16 lg:py-24 px-6 lg:px-16 text-center bg-[#FAF9F5] relative overflow-hidden"
        >
          {/* Subtle geometric background alignment like Swiss/Artone look */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8C2525]/20 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="font-mono text-xs tracking-[0.3em] text-[#8C2525] font-bold uppercase block">
              — DIE ERSTE ÜBERZEUGUNG
            </span>
            
            {/* The bold, disruptive editorial header hook */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] text-[#1F1916]">
              Mittelmaß ist das <span className="italic text-[#8C2525]">teuerste</span> Versprechen, das ein Unternehmen geben kann.
            </h1>
            
            <p className="font-mono text-xs text-[#1F1916]/60 uppercase tracking-widest pt-4 max-w-xl mx-auto leading-relaxed">
              In einem gesättigten Markt ist Austauschbarkeit der stille Tod Ihres Gewinns. Sie müssen kein größeres Budget haben, sondern eine unantastbare visuelle Haltung.
            </p>
          </div>
        </section>


        {/* SECTION 2: THE PROMISE OF VALUE (EDITORIAL TWOS-PLANE HERO SPLIT) */}
        {/* Responsive Design: Stacks vertically (one column) on mobile/tablet, splits to 2 columns on lg (Desktop) */}
        <section 
          id="promise-section" 
          className="border-b border-[#1F1916]/10 px-6 lg:px-12 py-12 lg:py-20 bg-[#FDFBF7]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* COLUMN A: Text & Core Promise containing interactive switches */}
            {/* On mobile, this stacked layout flows second to prioritize the image above, or stays as is. We place picture on top or bottom nicely */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
              
              {/* Partner Toggle Switches - Interactive Feature */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-[#1F1916]/10 pb-6">
                <span className="font-mono text-xs tracking-wider text-[#1F1916]/50 uppercase">Ansprechpartner wählen:</span>
                <div className="inline-flex rounded-sm bg-[#1F1916]/5 p-1 w-fit">
                  <button 
                    onClick={() => handlePartnerSwitch('falk')}
                    className={`px-4 py-1.5 text-xs font-mono tracking-widest rounded-sm transition-all duration-300 cursor-pointer ${activePartner.id === 'falk' ? 'bg-[#1F1916] text-[#FAF9F5] shadow-xs' : 'text-[#1F1916]/70 hover:text-[#1F1916]'}`}
                  >
                    FALK STIEG
                  </button>
                  <button 
                    onClick={() => handlePartnerSwitch('christina')}
                    className={`px-4 py-1.5 text-xs font-mono tracking-widest rounded-sm transition-all duration-300 cursor-pointer ${activePartner.id === 'christina' ? 'bg-[#1F1916] text-[#FAF9F5] shadow-xs' : 'text-[#1F1916]/70 hover:text-[#1F1916]'}`}
                  >
                    CHRISTINA RICHTER
                  </button>
                </div>
              </div>

              {/* Dynamic Partner Details Rendering */}
              <div>
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#8C2525] bg-[#8C2525]/10 px-2.5 py-1 rounded-sm inline-block mb-3">
                  {activePartner.role}
                </span>
                
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#1F1916] font-medium">
                  {activePartner.name}
                </h2>
              </div>

              <div className="space-y-4">
                <span className="text-[12px] font-mono text-[#8C2525] uppercase tracking-widest block font-semibold">
                  Das Wertversprechen:
                </span>
                {/* The Core Value Promise */}
                <p className="text-lg md:text-xl text-[#1F1916]/80 leading-relaxed font-light">
                  Wir transformieren inhabergeführte Nischen-Champions und Familienunternehmen in unverwechselbare Marktführer. Mit einer Synthese aus strategischem Fundament und einer ästhetischen Prestige-Aura machen wir Ihre Preishöhe unantastbar.
                </p>
              </div>

              {/* Elegant red block quotation similar to BCR Law */}
              <div className="border-l-2 border-[#8C2525] pl-6 py-2 italic font-serif text-lg text-[#8C2525]/90 bg-[#8C2525]/2 my-6">
                {activePartner.quote}
              </div>

              {/* Biography Details */}
              <p className="text-sm text-[#1F1916]/70 leading-relaxed">
                {activePartner.bio}
              </p>

              {/* Dynamic Partner metadata listing (like "Qualifications" in BCR Law image) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#1F1916]/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1F1916]/50 block">Qualifikationen & Proof:</span>
                  <ul className="space-y-1.5">
                    {activePartner.credentials.map((cred, idx) => (
                      <li key={idx} className="text-xs font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#C29B70] rounded-full"></span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1F1916]/50 block">Direkter Kontakt:</span>
                  <div className="space-y-1.5 text-xs font-mono">
                    <a href={`mailto:${activePartner.email}`} className="flex items-center gap-2 text-[#8C2525] hover:underline">
                      <Mail size={12} />
                      <span>{activePartner.email}</span>
                    </a>
                    <a href={`tel:${activePartner.phone.replace(/[\s\(\)]/g, '')}`} className="flex items-center gap-2 text-[#1F1916] hover:underline">
                      <Phone size={12} />
                      <span>{activePartner.phone}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Anchor controls indicating overview & method (exactly mimicking BCR Law / Artone signature layouts) */}
              <div className="pt-6 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest text-[#1F1916]/50">
                <span className="text-[#8C2525] font-black">• STRATEGIE</span>
                <span>• POSITIONIERUNG</span>
                <span>• EDITORIAL DESIGN</span>
                <span>• WEB-ENTWICKLUNG</span>
              </div>
            </div>

            {/* COLUMN B: Premium Portrait Representation */}
            {/* Order logic: Image flows on top for smartphone screens, stacks nicely right side on desktop */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="relative group overflow-hidden border border-[#1F1916]/10 rounded-sm bg-[#1F1916]">
                <img 
                  src={activePartner.imageUrl} 
                  alt={activePartner.name} 
                  className="w-full h-[320px] sm:h-[400px] lg:h-[500px] object-cover filter contrast-105 saturate-90 brightness-95 rounded-xs transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Accent Borders resembling BCR Law LLPs framing lines */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#FAF9F5]/20 pointer-events-none rounded-xs"></div>
                
                {/* Signature Signature tag overlay like Artone Studio */}
                <div className="absolute bottom-6 right-6 bg-[#1F1916]/95 backdrop-blur-md px-5 py-3 border border-[#C29B70]/30 text-[#FAF9F5] rounded-xs shadow-lg max-w-[200px]">
                  <p className="text-[10px] font-mono tracking-widest uppercase opacity-60">Verified Advisor</p>
                  <p className="text-xl font-serif italic font-medium text-[#C29B70] mt-1">{activePartner.signature}</p>
                </div>
              </div>
              
              <div className="bg-[#1F1916] text-[#FAF9F5] p-4 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase rounded-xs">
                <span>PORTRAIT CAPTURED AT HAMBURG BUREAU</span>
                <span className="text-[#C29B70]">© FALK Brand Studio</span>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 3: MORE VALUE DETAILS (THE 3-COLUMN VALUE PROPOSITIONS) */}
        {/* German: Im nächsten Abschnitt gibst du mehr Details zu diesem Wertversprechen (2-3 konkrete Punkte) */}
        <section 
          id="value-points-section" 
          className="border-b border-[#1F1916]/10 px-6 lg:px-12 py-16 lg:py-24 bg-[#FAF9F5] relative"
        >
          <div className="max-w-4xl mb-12 sm:mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-[#8C2525] font-bold uppercase block mb-3">
              — DAS FALK-PRINZIP
            </span>
            <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-[#1F1916] font-semibold">
              Drei kompromisslose Hebel für Ihren Marktanteil.
            </h3>
            <p className="text-sm font-mono uppercase tracking-widest text-[#1F1916]/50 mt-2">
              Wie wir Markenwert in bare Münze und nachhaltiges Vertrauen übersetzen.
            </p>
          </div>

          {/* Grid Layout: Responsive 1 col on mobile, 3 col on lg desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* VALUE POINT 1 */}
            <div className="border border-[#1F1916]/10 p-8 flex flex-col justify-between bg-[#FDFBF7] shadow-xs relative hover:border-[#8C2525]/30 transition-all duration-300 rounded-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-top">
                  <span className="text-3xl font-serif text-[#C29B70] font-light">01</span>
                  <div className="w-8 h-8 rounded-full bg-[#8C2525]/5 flex items-center justify-center text-[#8C2525]">
                    <Award size={15} />
                  </div>
                </div>
                
                <h4 className="text-xl font-serif tracking-tight text-[#1F1916] font-semibold">
                  Strategische Positionierung
                </h4>
                
                <p className="text-xs font-mono uppercase tracking-widest text-[#8C2525]/70">
                  Die Fundierung des Werts
                </p>
                
                <p className="text-sm text-[#1F1916]/70 leading-relaxed">
                  Design ohne Richtung ist Dekoration. Wir fällen schmerzhafte, aber notwendige Entscheidungen über Ihre Positionierung, um Sie unkopierbar zu verankern. Kein Mitläufertum.
                </p>
              </div>
              
              <div className="border-t border-[#1F1916]/10 pt-4 mt-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-[#1F1916]/60">
                <span>STRATEGY ASSESSMENT</span>
                <span className="text-[#8C2525] font-black">ACTIVE</span>
              </div>
            </div>

            {/* VALUE POINT 2 */}
            <div className="border border-[#1F1916]/10 p-8 flex flex-col justify-between bg-[#FDFBF7] shadow-xs relative hover:border-[#8C2525]/30 transition-all duration-300 rounded-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-top">
                  <span className="text-3xl font-serif text-[#C29B70] font-light">02</span>
                  <div className="w-8 h-8 rounded-full bg-[#8C2525]/5 flex items-center justify-center text-[#8C2525]">
                    <TrendingUp size={15} />
                  </div>
                </div>
                
                <h4 className="text-xl font-serif tracking-tight text-[#1F1916] font-semibold">
                  Preissouveränität & Prestige
                </h4>
                
                <p className="text-xs font-mono uppercase tracking-widest text-[#8C2525]/70">
                  Vermeidung von Margenverlust
                </p>
                
                <p className="text-sm text-[#1F1916]/70 leading-relaxed">
                  Durch kompromisslose Ästhetik auf dem Niveau globaler Luxus- und Traditionshäuser entziehen wir Ihre Leistung dem Preisvergleich. Ihre Kunden zahlen für Ihre Identität, nicht nur für das Produkt.
                </p>
              </div>
              
              <div className="border-t border-[#1F1916]/10 pt-4 mt-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-[#1F1916]/60">
                <span>MARGIN PROTECTION</span>
                <span className="text-[#8C2525] font-black">ACTIVE</span>
              </div>
            </div>

            {/* VALUE POINT 3 */}
            <div className="border border-[#1F1916]/10 p-8 flex flex-col justify-between bg-[#FDFBF7] shadow-xs relative hover:border-[#8C2525]/30 transition-all duration-300 rounded-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-top">
                  <span className="text-3xl font-serif text-[#C29B70] font-light">03</span>
                  <div className="w-8 h-8 rounded-full bg-[#8C2525]/5 flex items-center justify-center text-[#8C2525]">
                    <Sparkles size={15} />
                  </div>
                </div>
                
                <h4 className="text-xl font-serif tracking-tight text-[#1F1916] font-semibold">
                  Digitale Exzellenz (Flagship)
                </h4>
                
                <p className="text-xs font-mono uppercase tracking-widest text-[#8C2525]/70">
                  Die makellose Ausführung
                </p>
                
                <p className="text-sm text-[#1F1916]/70 leading-relaxed">
                  Ihr digitaler Auftritt muss sich anfühlen wie das Betreten eines edlen Schauraums in Mailand oder Paris. Schnelligkeit, feine Linienführungen, subtile Interaktionen und absolute Barrierefreiheit.
                </p>
              </div>
              
              <div className="border-t border-[#1F1916]/10 pt-4 mt-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-[#1F1916]/60">
                <span>DIGITAL ARCHITECTURE</span>
                <span className="text-[#8C2525] font-black">ACTIVE</span>
              </div>
            </div>

          </div>
        </section>


        {/* INTERACTIVE WORKSPACE SUB SECTION: THE TASTE & BRAND COMPASS BRANDING WIZARD */}
        {/* Modeled directly after Caffè Milani's Profilatore del gusto (Taste test selector) */}
        <section 
          id="compass-section" 
          className="border-b border-[#1F1916]/10 bg-[#1F1916] text-[#FAF9F5] px-6 lg:px-12 py-16 lg:py-24 relative"
        >
          {/* Decorative frame elements like German branding agency slides */}
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#FAF9F5]/5 pointer-events-none rounded-xs"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
            
            {/* Compass Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs tracking-[0.3em] text-[#C29B70] uppercase block">
                — INTERAKTIVER STRATEGIEHEBEL
              </span>
              
              {/* Brand Profile Diagnostic title matching Caffè Milani's "Profilatore del gusto" */}
              <h3 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight text-[#FAF9F5]">
                Der Falk Brand Compass.
              </h3>
              
              <p className="font-mono text-xs text-[#FAF9F5]/60 uppercase tracking-widest">
                Profilieren Sie Ihre Marken-Defizite
              </p>
              
              <p className="text-sm text-[#FAF9F5]/70 leading-relaxed">
                Beantworten Sie 3 gezielte strategische Weichenstellungen, um eine direkte visuelle und strukturelle Indikation zu erhalten. Unser Hebelrechner ermittelt die primäre Lücke in Ihrem aktuellen Außenauftritt.
              </p>

              <div className="p-4 bg-[#FAF9F5]/5 border border-[#C29B70]/10 rounded-sm">
                <p className="text-[11px] font-mono text-[#C29B70] tracking-wide leading-relaxed">
                  *Die Ergebnisse fließen direkt in unser Kontakt-Formular am Ende der Seite ein, um Ihren Strategietermin optimal vorzubereiten.
                </p>
              </div>
            </div>

            {/* Quick interactive wizard */}
            <div className="lg:col-span-7 bg-[#FAF9F5] text-[#1F1916] p-6 sm:p-8 rounded-sm border border-[#C29B70]/20 flex flex-col justify-between min-h-[360px] shadow-lg">
              
              <AnimatePresence mode="wait">
                
                {/* STATE 0: Intro Start */}
                {compassStep === 0 && (
                  <motion.div 
                    key="intro"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6 my-auto text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#8C2525]/10 flex items-center justify-center mx-auto text-[#8C2525]">
                      <Sparkles size={28} />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-serif text-[#1F1916] font-bold">Sind Sie bereit für die Marken-Indikation?</h4>
                      <p className="text-xs text-[#1F1916]/60 max-w-sm mx-auto">Triage basierend auf den empirischen Hebeln von über 120 Markenberatungen.</p>
                    </div>

                    <button 
                      onClick={() => setCompassStep(1)}
                      className="inline-flex items-center gap-3 bg-[#1F1916] text-[#FAF9F5] hover:bg-[#8C2525] px-6 py-3 font-mono text-xs uppercase tracking-widest rounded-xs transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer font-bold"
                    >
                      <span>Diagnose Jetzt starten</span>
                      <ArrowRight size={14} />
                    </button>
                  </motion.div>
                )}

                {/* STEPS 1-3: QUESTIONS */}
                {compassStep >= 1 && compassStep <= 3 && (
                  <motion.div 
                    key={`step-${compassStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-[#1F1916]/10 pb-4">
                      <span className="font-mono text-[10px] tracking-wider uppercase text-[#8C2525] bg-[#8C2525]/10 px-2.5 py-0.5 rounded-sm">
                        Frage {compassStep} von 3
                      </span>
                      <span className="text-[10px] font-mono text-[#1F1916]/40">Markendetektor</span>
                    </div>

                    <h4 className="text-lg font-serif text-[#1F1916] font-medium leading-snug">
                      {QUESTIONS[compassStep - 1].text}
                    </h4>

                    <div className="space-y-3">
                      {QUESTIONS[compassStep - 1].options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => handleAnswerSelect(opt.value)}
                          className="w-full text-left p-4 border border-[#1F1916]/10 rounded-sm hover:border-[#8C2525] hover:bg-[#8C2525]/2 transition-all group flex gap-3 items-start cursor-pointer"
                        >
                          <div className="mt-0.5 w-5 h-5 rounded-full border border-[#1F1916]/20 bg-[#FAF9F5] flex items-center justify-center text-xs font-mono font-bold text-[#1F1916] group-hover:border-[#8C2525] group-hover:bg-[#8C2525] group-hover:text-[#FAF9F5] transition-all">
                            {opt.value}
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <p className="text-sm font-serif text-[#1F1916] font-bold group-hover:text-[#8C2525] transition-all">{opt.label}</p>
                            <p className="text-xs text-[#1F1916]/60 leading-normal">{opt.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STATE 4: DIAGNOSTIC RESULT CARDS */}
                {compassStep === 4 && diagnosticResult && (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-[#1F1916]/10 pb-4">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm font-bold flex items-center gap-1">
                        <CheckCircle2 size={10} /> DIAGNOSE AUSGEWERTET
                      </span>
                      <button 
                        onClick={resetCompass}
                        className="text-xs font-mono tracking-widest text-[#8C2525] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        wiederholen
                      </button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-mono uppercase tracking-wider text-[#1F1916]/50">Empfohlene Strategiearchitektur:</p>
                      <h4 className="text-2xl font-serif text-[#8C2525] font-bold tracking-tight">
                        {diagnosticResult.title}
                      </h4>
                      <p className="text-xs font-mono tracking-wide text-[#1F1916] font-semibold bg-[#C29B70]/10 px-3 py-1 bg-amber-50/70 border border-[#C29B70]/20 rounded-xs inline-block">
                        Fokus: {diagnosticResult.focus}
                      </p>
                    </div>

                    <p className="text-sm text-[#1F1916]/80 leading-relaxed bg-[#FAF9F5] p-4 rounded-sm border border-[#1F1916]/5">
                      {diagnosticResult.leverage}
                    </p>

                    <p className="text-xs font-serif italic text-[#8C2525]/80 border-l border-[#8C2525] pl-3 py-0.5 bg-[#8C2525]/2">
                      {diagnosticResult.quote}
                    </p>

                    <div className="pt-2">
                      <a 
                        href="#cta-section"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            message: `Hallo Falk Studio. Ich habe den Brand Compass abgeschlossen. Mein diagnostiziertes Resultat ist: "${diagnosticResult.title}" (Fokus: ${diagnosticResult.focus}). Ich wünsche nähere Erläuterungen dazu.`,
                            auditType: diagnosticResult.title
                          });
                        }}
                        className="flex items-center justify-between bg-[#1F1916] text-[#FAF9F5] hover:bg-[#8C2525] p-3 text-xs font-mono uppercase tracking-widest rounded-xs transition-all duration-300 group font-bold"
                      >
                        <span>Ergebnis in Anfrage übernehmen & terminieren</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
              
              {/* Progress counter indicators like Artone look direction */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#1F1916]/10 text-[10px] font-mono text-[#1F1916]/40 uppercase tracking-widest">
                <span>© FALK Diagnostic</span>
                <span>HAMBURG / BERLIN BUREAU</span>
              </div>

            </div>

          </div>
        </section>


        {/* SECTION 4: CLIENT PROOF & TRUST MARKERS (REVIEWS & TESTIMONIAL LOGO MATRIX) */}
        {/* German: Danach zeigst du Proof (soziale Beweise, Referenzen oder Logos) */}
        <section 
          id="proof-section" 
          className="border-b border-[#1F1916]/10 px-6 lg:px-12 py-16 lg:py-24 bg-[#FDFBF7]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* COLUMN A: Intro & Minimalist Logo Grid */}
            <div className="lg:col-span-4 space-y-6">
              <span className="font-mono text-xs tracking-[0.3em] text-[#8C2525] font-bold uppercase block">
                — BEGRIFF DES VERTRAUENS
              </span>
              
              <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-[#1F1916] font-semibold">
                Die Stimmen des Renommees.
              </h3>
              
              <p className="text-sm text-[#1F1916]/75 leading-relaxed font-light">
                Unser Klientel besteht aus inhabergeführten Unternehmen, Kanzleien und hochkarätigen Manufakturen, die eines verbindet: der unbedingte Wille zu kompromissloser Ästhetik und kompromisslosem Wert.
              </p>

              {/* Grid representation of mock client logo names (as standard premium typography layout) */}
              <div className="pt-4 space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#1F1916]/50">Auswahl unserer Partner & Klienten:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-[#1F1916]/10 p-3 text-center rounded-xs bg-[#FAF9F5] text-xs font-mono font-bold tracking-widest text-[#1F1916]/60">
                    AURA HOLDING
                  </div>
                  <div className="border border-[#1F1916]/10 p-3 text-center rounded-xs bg-[#FAF9F5] text-xs font-mono font-bold tracking-widest text-[#1F1916]/60">
                    KRONOS AG
                  </div>
                  <div className="border border-[#1F1916]/10 p-3 text-center rounded-xs bg-[#FAF9F5] text-xs font-mono font-bold tracking-widest text-[#1F1916]/60">
                    SOLIS DIGITAL
                  </div>
                  <div className="border border-[#1F1916]/10 p-3 text-center rounded-xs bg-[#FAF9F5] text-xs font-mono font-bold tracking-widest text-[#1F1916]/60">
                    VERITAS CAP
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN B: Responsive client feedback cards */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TESTIMONIAL 1 */}
              <div className="border border-[#1F1916]/10 p-8 rounded-sm bg-[#FAF9F5] space-y-6 shadow-xs relative hover:border-[#8C2525]/35 transition-all">
                <span className="text-5xl font-serif text-[#C29B70] opacity-40 leading-none absolute -top-2 left-4">“</span>
                
                <p className="text-[#1F1916]/85 font-serif text-lg leading-relaxed pt-2">
                  „Falk Studio hat unsere Marke aus der grauen Austauschbarkeit des B2B-Mittelstands gehoben. Der neue, editorial inspirierte Auftritt hat innerhalb von drei Monaten Premium-Anfragen im Wert von über 1,2 Millionen Euro generiert.“
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-[#1F1916]/5">
                  <div>
                    <p className="text-sm font-serif font-black text-[#1F1916]">Benjamin Weber</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#1F1916]/60">Geschäftsführender Gesellschafter, Veritas Capital</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Kunde seit 2021</span>
                </div>
              </div>

              {/* TESTIMONIAL 2 */}
              <div className="border border-[#1F1916]/10 p-8 rounded-sm bg-[#FAF9F5] space-y-6 shadow-xs relative hover:border-[#8C2525]/35 transition-all">
                <span className="text-5xl font-serif text-[#C29B70] opacity-40 leading-none absolute -top-2 left-4">“</span>
                
                <p className="text-[#1F1916]/85 font-serif text-lg leading-relaxed pt-2">
                  „Die Detailtiefe im Design, das intuitive Verständnis für Rasterweite und die Härte in der Positionierung erinnern an internationale Traditions-Bureaus aus Paris. Falk Studio ist ein unschätzbarer Sparringspartner für unsere Kanzlei.“
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-[#1F1916]/5">
                  <div>
                    <p className="text-sm font-serif font-black text-[#1F1916]">Dr. Clara Richter</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#1F1916]/60">Senior-Partnerin, Richter & Partner Rechtsanwälte</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Kunde seit 2023</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* SECTION 5: CALL TO ACTION (INTERACTIVE CORE LEAD CAPTURE BRIEF) */}
        {/* German: Ganz unten platzierst du einen klaren Call-to-Action (Handlungsaufforderung) */}
        <section 
          id="cta-section" 
          className="bg-[#1F1916] text-[#FAF9F5] px-6 lg:px-12 py-16 lg:py-24 relative overflow-hidden"
        >
          {/* Subtle line container resembling Artone minimal profile frame */}
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#C29B70]/10 pointer-events-none rounded-xs"></div>

          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            
            <div className="text-center space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] text-[#C29B70] uppercase block">
                — IHR NEUES VORBILD
              </span>
              
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#FAF9F5] font-semibold leading-tight">
                Lassen Sie uns Geschichte schreiben.
              </h2>
              
              <p className="text-sm sm:text-base text-[#FAF9F5]/70 max-w-xl mx-auto font-light leading-relaxed">
                Fordern Sie ein kostenfreies, qualifiziertes Marken-Erstbriefing an oder buchen Sie direkt das 30-minütige Audit mit Falk Stieg oder Christina Richter.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleFormSubmit}
                  className="bg-[#FAF9F5] text-[#1F1916] p-6 sm:p-10 rounded-sm border border-[#C29B70]/20 space-y-6 max-w-2xl mx-auto"
                >
                  <p className="text-xs font-mono uppercase tracking-wider text-[#1F1916]/50 border-b border-[#1F1916]/10 pb-4 flex items-center gap-2 font-bold">
                    <Calendar size={13} className="text-[#8C2525]" /> BRIEFING-FORMULAR AUSFÜLLEN
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#1F1916]/60 uppercase tracking-widest block">Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Z.b. Michael Falk"
                        className="w-full bg-transparent border-b border-[#1F1916]/20 py-2 text-sm focus:outline-none focus:border-[#8C2525] placeholder-[#1F1916]/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#1F1916]/60 uppercase tracking-widest block">E-Mail Adresse *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="m.falk@unternehmen.de"
                        className="w-full bg-transparent border-b border-[#1F1916]/20 py-2 text-sm focus:outline-none focus:border-[#8C2525] placeholder-[#1F1916]/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#1F1916]/60 uppercase tracking-widest block">Unternehmen *</label>
                      <input 
                        type="text" 
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleFormChange}
                        placeholder="Falk AG"
                        className="w-full bg-transparent border-b border-[#1F1916]/20 py-2 text-sm focus:outline-none focus:border-[#8C2525] placeholder-[#1F1916]/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#1F1916]/60 uppercase tracking-widest block">Audit-Typ</label>
                      <select 
                        name="auditType"
                        value={formData.auditType}
                        onChange={handleFormChange}
                        className="w-full bg-transparent border-b border-[#1F1916]/20 py-2 text-sm focus:outline-none focus:border-[#8C2525] uppercase text-[11px] font-mono tracking-wider text-[#1F1916]/70 cursor-pointer"
                      >
                        <option value="Markenanalyse">Markenanalyse & Triage</option>
                        <option value="Die Preissouveränitäts-Architektur">Preissouveränität</option>
                        <option value="Der Tech-Avantgarde-Kompass">Tech-Avantgarde</option>
                        <option value="Die Haptische Handwerks-Aura">Haptisches Handwerk</option>
                        <option value="Anderes Anliegen">Anderes Anliegen</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#1F1916]/60 uppercase tracking-widest block">Ihre Nachricht / Ziele (Optional)</label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Beschreiben Sie kurz Ihre aktuellen vertrieblichen Hürden..."
                      className="w-full bg-transparent border-b border-[#1F1916]/20 py-2 text-sm focus:outline-none focus:border-[#8C2525] placeholder-[#1F1916]/30 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-between bg-[#1F1916] text-[#FAF9F5] hover:bg-[#8C2525] p-4 text-xs font-mono uppercase tracking-widest rounded-xs transition-all duration-300 group cursor-pointer font-bold"
                    >
                      <span>Qualifizierte Anfrage absenden</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>

                  <p className="text-[10px] text-[#1F1916]/50 text-center font-mono leading-relaxed">
                    Mit dem Absenden erklären Sie sich damit einverstanden, dass Falk Brand Studio Sie zur Abstimmung eines Termins per Telefon oder E-Mail kontaktieren darf.
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FAF9F5]/5 border border-[#C29B70]/30 text-[#FAF9F5] p-8 sm:p-12 rounded-sm text-center max-w-xl mx-auto space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C29B70]/10 flex items-center justify-center mx-auto text-[#C29B70]">
                    <CheckCircle2 size={32} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-[#C29B70] tracking-tight">Vielen Dank für Ihr Vertrauen.</h3>
                    <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">ÜBERMITTLUNG ERFOLGREICH — STATUS: 200 OK</p>
                  </div>

                  <p className="text-sm text-[#FAF9F5]/70 leading-relaxed max-w-sm mx-auto">
                    Ihre Parameter wurden sicher an das Büro von <strong>{activePartner.name}</strong> übertragen. Wir sichten Ihre Positionierung und kontaktieren Sie innerhalb der nächsten 24 Stunden per E-Mail für die Terminabstimmung.
                  </p>

                  <div className="p-4 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10 rounded-sm text-left font-mono space-y-2 text-xs">
                    <p className="text-amber-200">Zusammenfassung des Erstbriefings:</p>
                    <p className="opacity-80"><span className="opacity-55">Anforderer:</span> {formData.name}</p>
                    <p className="opacity-80"><span className="opacity-55">Firma:</span> {formData.company}</p>
                    <p className="opacity-80"><span className="opacity-55">Audit Typ:</span> {formData.auditType}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        message: '',
                        auditType: 'Markenanalyse'
                      });
                    }}
                    className="text-xs font-mono uppercase tracking-widest bg-transparent border border-[#FAF9F5]/20 hover:border-[#FAF9F5]/60 text-[#FAF9F5] px-6 py-2.5 rounded-xs transition-colors cursor-pointer"
                  >
                    Neues Briefing verfassen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>


        {/* FOOTER AREA */}
        <footer className="border-t border-[#1F1916]/10 px-6 lg:px-12 py-12 bg-[#FAF9F5] flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono text-[#1F1916]/50">
          
          {/* Signature/Studio Credits */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#1F1916] tracking-[0.25em]">FALK BRAND STUDIO</span>
            <span>—</span>
            <span>Hamburg • Berlin • Zürich</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-[#8C2525] transition-colors">Impressum</a>
            <a href="#" className="hover:text-[#8C2525] transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-[#8C2525] transition-colors">Allgemeine Geschäftsbedingungen</a>
          </div>

          <p className="text-right">
            © {new Date().getFullYear()} Falk & Co. Alle Rechte vorbehalten.
          </p>
        </footer>


        {/* SLIDING NAVIGATION DRAWER (The "≡ Menü" Link overlay) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-[#1F1916] text-[#FAF9F5] z-50 shadow-2xl p-8 flex flex-col justify-between"
            >
              <div className="space-y-8">
                
                {/* Header of Sidebar Drawer */}
                <div className="flex justify-between items-center border-b border-[#FAF9F5]/10 pb-5">
                  <div className="border border-[#C29B70] px-3 py-1 flex flex-col items-center">
                    <span className="text-xs tracking-widest font-serif font-black text-[#FAF9F5]">FALK</span>
                    <span className="text-[6px] tracking-widest font-mono text-[#C29B70]">STUDIO</span>
                  </div>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="p-1 hover:text-[#8C2525] transition-colors uppercase font-mono text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <X size={16} /> <span>Schließen</span>
                  </button>
                </div>

                {/* Vertical menu navigation */}
                <div className="space-y-6 pt-4">
                  <p className="text-[10px] font-mono text-[#C29B70]/60 tracking-[0.2em] uppercase">Navigation</p>
                  <nav className="flex flex-col gap-4 font-serif text-2xl">
                    <a 
                      href="#hook-section" 
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#C29B70] transition-colors flex items-center justify-between group"
                    >
                      <span>01 / Die Philosophie</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C29B70]" />
                    </a>
                    <a 
                      href="#promise-section" 
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#C29B70] transition-colors flex items-center justify-between group"
                    >
                      <span>02 / Unser Wertversprechen</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C29B70]" />
                    </a>
                    <a 
                      href="#value-points-section" 
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#C29B70] transition-colors flex items-center justify-between group"
                    >
                      <span>03 / Das Falk-Prinzip</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C29B70]" />
                    </a>
                    <a 
                      href="#compass-section" 
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#C29B70] transition-colors flex items-center justify-between group"
                    >
                      <span>04 / Strategie-Kompass</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C29B70]" />
                    </a>
                    <a 
                      href="#cta-section" 
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#C29B70] transition-colors flex items-center justify-between group"
                    >
                      <span>05 / Audit anfordern</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C29B70]" />
                    </a>
                  </nav>
                </div>

                {/* Office locations description */}
                <div className="pt-6 space-y-3 font-mono text-xs">
                  <p className="text-[10px] text-[#C29B70]/60 tracking-[0.2em] uppercase">Unsere Büros</p>
                  <p className="text-[#FAF9F5]/80">Hamm • Neuer Wall 43 • 20354 Hamburg</p>
                  <p className="text-[#FAF9F5]/80">Mitte • Kurfürstendamm 21 • 10719 Berlin</p>
                </div>

              </div>

              {/* Bottom parameter */}
              <div className="border-t border-[#FAF9F5]/10 pt-5 text-center text-[10px] font-mono tracking-widest opacity-40 uppercase">
                Est. {new Date().getFullYear() - 8} • Falk Advisory Group
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
