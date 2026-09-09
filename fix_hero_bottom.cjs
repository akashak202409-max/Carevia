const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<section id="home" className="relative[\s\S]*?<\/section>/;

const newHero = `<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end overflow-hidden bg-[#F7FAFC] pb-10">
        {/* Background Image */}
        <div className="absolute inset-x-0 top-20 z-0 flex items-start justify-center pointer-events-none">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-6xl h-auto object-contain object-top" />
        </div>
        
        {/* Floating Medical Animations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 text-secondary/30 animate-float">
            <HeartPulse className="w-16 h-16" />
          </div>
          <div className="absolute top-40 right-24 text-primary/20 animate-float-delayed">
            <Activity className="w-20 h-20" />
          </div>
        </div>
        
        {/* Bottom fade gradient to softly hide the feet/bottom cut-off */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-0 pointer-events-none"></div>
        
        {/* Unified Glass Panel at the absolute bottom */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto mt-auto pt-[60vh]">
          <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 md:p-8 w-full flex flex-col items-center">
            
            <div className="bg-green-50 text-primary px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2 mb-4 shadow-sm border border-green-100 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Trusted by 10,000+ families
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug mb-3 font-poppins text-primary">
              Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
            </h1>
            
            <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-xl font-medium leading-relaxed">
              Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
            </p>
            
            <div className="flex w-full sm:w-auto mb-5">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg w-full sm:w-auto hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book An Appointment
              </button>
            </div>
            
            <p className="text-xs text-gray-500 font-medium">
              Popular: <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Doctor Visit</span>
            </p>
          </div>
        </div>
      </section>`;

content = content.replace(heroRegex, newHero);
fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Fixed hero panel size and position');
