const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end pb-12 lg:pb-16 overflow-hidden bg-\[#F7FAFC\]">([\s\S]*?)<\/section>/;

const newHero = `<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
        {/* Animated Lighting Orbs (Behind Image) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite] mix-blend-multiply"></div>
          <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_1s] mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[40%] w-[600px] h-[600px] bg-blue-300/15 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_2s] mix-blend-multiply"></div>
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 text-[#DA7C75]/40 animate-float">
            <HeartPulse className="w-12 h-12" />
          </div>
          <div className="absolute top-40 right-24 text-[#1A3789]/30 animate-float-delayed">
            <Activity className="w-16 h-16" />
          </div>
          <div className="absolute top-1/2 left-10 text-green-400/40 animate-pulse animate-float-delayed">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
          </div>
        </div>

        {/* Hero Characters Image */}
        <div className="absolute inset-x-0 bottom-0 z-0 flex items-end justify-center pointer-events-none">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-6xl h-auto object-contain object-bottom" />
        </div>
        
        {/* Bottom fade gradient to softly hide the feet */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-0 pointer-events-none"></div>
        
        {/* Centered Glassmorphism Text Box */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto mt-20">
          <div className="bg-[#F0F8F6] text-primary px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 mb-6 shadow-sm border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Trusted by 10,000+ families
          </div>
          
          <div className="w-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2rem] p-8 md:p-10 mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-bold leading-[1.1] font-poppins text-[#1E3A8A]">
              Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
            </h1>
          </div>
          
          <div className="w-full max-w-[800px] bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] p-6 mb-8">
            <p className="text-base sm:text-lg text-black font-bold max-w-2xl mx-auto">
              Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
            </p>
          </div>
          
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-[#DA7C75] hover:bg-[#C96D66] text-white px-10 py-3.5 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-8"
          >
            Book An Appointment
          </button>
          
          <div className="bg-white px-6 py-2 rounded-full shadow-sm">
            <p className="text-xs sm:text-sm text-gray-800 font-bold">
              Popular: <span className="text-[#1E3A8A] cursor-pointer">Physiotherapy</span> • <span className="text-[#1E3A8A] cursor-pointer">Home Nurse</span> • <span className="text-[#1E3A8A] cursor-pointer">Doctor Visit</span>
            </p>
          </div>
        </div>
      </section>`;

content = content.replace(heroRegex, newHero);
fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Added lighting and updated glassmorphism UI');
