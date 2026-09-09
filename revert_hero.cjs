const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end pb-12 lg:pb-16 overflow-hidden bg-\[#F7FAFC\]">[\s\S]*?<\/section>/;

const newHero = `<section id="home" className="relative pt-24 pb-32 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#F7FAFC]">
        {/* Background Image */}
        <div className="absolute inset-x-0 bottom-0 z-0 flex items-end justify-center pointer-events-none">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-6xl h-auto object-contain object-bottom" />
        </div>
        
        {/* Bottom fade gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-0 pointer-events-none"></div>
        
        {/* Glassmorphism Text Block */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-20">
          <div className="bg-white/80 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 mb-6 shadow-sm border border-white/50 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Trusted by 10,000+ families
          </div>
          
          <div className="bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl rounded-[32px] p-8 md:p-12 w-full max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight mb-6 font-poppins text-primary">
              Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
            </h1>
            <p className="text-sm md:text-lg text-gray-900 font-bold max-w-2xl mx-auto leading-relaxed">
              Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
            </p>
          </div>
          
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-secondary hover:bg-secondary-hover text-white px-10 py-4 rounded-xl font-semibold text-lg transition shadow-xl w-full sm:w-auto hover:shadow-2xl transform hover:-translate-y-1 mb-6"
          >
            Book An Appointment
          </button>
          
          <p className="text-xs md:text-sm text-gray-900 font-bold bg-white/80 px-6 py-2 rounded-full shadow-md border border-white/50 backdrop-blur-md">
            Popular: <span className="text-primary hover:text-secondary cursor-pointer transition">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition">Doctor Visit</span>
          </p>
        </div>
      </section>`;

content = content.replace(heroRegex, newHero);
fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Reverted and updated hero');
