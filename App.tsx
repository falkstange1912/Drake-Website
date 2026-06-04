import React from 'react';
import { Building, Users, MessageCircle, Shield } from 'lucide-react';
import portrait from './portrait.jpg';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      
      {/* HEADER */}
      <header className="p-6 md:px-12 flex justify-between items-center border-b border-neutral-100">
        <div className="font-bold text-xl tracking-tight uppercase">Jens Drake.</div>
        <a href="#ziele" className="text-sm font-semibold hover:underline">Vision & Ziele</a>
      </header>

      {/* HERO SECTION (Split Layout) */}
      <section className="flex flex-col lg:flex-row min-h-[85vh]">
        {/* Text-Bereich */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Bürgermeisterkandidat 2026
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8">
            Gemeinde <br /> Cremlingen.
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-600 mb-8 max-w-2xl border-l-4 border-black pl-6">
            „Weil Heimat Nähe braucht und Ehrlichkeit verdient!“
          </p>
        </div>
        
        {/* Bild-Bereich */}
        <div className="flex-1 bg-neutral-100 relative min-h-[50vh] lg:min-h-full">
          <img 
            src={portrait} 
            alt="Jens Drake - Bürgermeisterkandidat Cremlingen" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-neutral-50 py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">Über mich</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Persönliches */}
            <div className="space-y-6 text-lg text-neutral-700 font-light leading-relaxed">
              <p>
                Hallo, schön, dass Sie meine Seite besuchen. Ich heiße <strong className="font-semibold text-black">Jens Drake</strong> und kandidiere bei der Kommunalwahl 2026 als Gemeindebürgermeister der Einheitsgemeinde Cremlingen.
              </p>
              <p>
                Ich bin 57 Jahre alt, wohne schon immer in Cremlingen, bin seit 28 Jahren verheiratet und habe zwei erwachsene Söhne. Ehrenamtlich engagiere ich mich bereits seit 41 Jahren in den unterschiedlichsten Vereinen unserer Region.
              </p>
            </div>

            {/* Berufliches */}
            <div className="bg-white p-8 md:p-10 border border-neutral-100 rounded-2xl shadow-sm">
              <div className="flex items-start gap-5">
                <Building className="w-8 h-8 text-neutral-800 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-3">Berufliche Erfahrung</h4>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Bei der Volkswagen Group Digital Solutions leite ich zwei Teams (Prozessmanagement und Frontoffice). Gemeinsam leisten wir den Service für 17 fahrzeugfertigende Werke in ganz Europa.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* VISION & GOALS SECTION */}
      <section id="ziele" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Meine Vision für uns</h3>
          <p className="text-lg text-neutral-600 font-light mb-16 max-w-3xl leading-relaxed">
            Viele Menschen empfinden Verwaltung als zu langsam, zu bürokratisch und zu kompliziert. Das möchte ich ändern.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Goal 1 */}
            <div className="p-8 border border-neutral-200 rounded-2xl hover:border-black hover:shadow-lg transition-all duration-300">
              <Users className="w-10 h-10 mb-6 text-black" />
              <h4 className="text-xl font-bold mb-4">Bürgerorientiert</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Ich werde die Verwaltung verständlicher und lebensnäher gestalten, damit sie für die Menschen da ist – nicht umgekehrt.
              </p>
            </div>
            
            {/* Goal 2 */}
            <div className="p-8 border border-neutral-200 rounded-2xl hover:border-black hover:shadow-lg transition-all duration-300">
              <MessageCircle className="w-10 h-10 mb-6 text-black" />
              <h4 className="text-xl font-bold mb-4">Echter Dialog</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Nur wer zuhört, kann richtig entscheiden. Durch aktiven Bürgerdialog möchte ich die Akzeptanz für Entscheidungen herbeiführen.
              </p>
            </div>

            {/* Goal 3 */}
            <div className="p-8 border border-neutral-200 rounded-2xl hover:border-black hover:shadow-lg transition-all duration-300">
              <Shield className="w-10 h-10 mb-6 text-black" />
              <h4 className="text-xl font-bold mb-4">Volle Transparenz</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Entscheidungen müssen nachvollziehbar sein. Eine ehrliche und offene Kommunikation ist das Fundament meiner Arbeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-black text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="font-bold text-2xl mb-1 uppercase tracking-tight">Jens Drake</p>
          <p className="text-neutral-400 font-light text-sm tracking-wide">
            Bürgermeisterkandidat Cremlingen 2026
          </p>
        </div>
        <div className="text-sm font-light text-neutral-500">
          <p>© 2026 Jens Drake. Alle Rechte vorbehalten.</p>
        </div>
      </footer>

    </div>
  );
}
