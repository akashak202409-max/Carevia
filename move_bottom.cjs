const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// I need to change flex behavior so the text wrapper is pushed to the bottom.
const heroRegex = /<section id="home" className="relative pt-24 pb-32 lg:pt-28 lg:pb-0 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center overflow-hidden bg-\[#F7FAFC\]">[\s\S]*?<\/section>/;

const newHero = `<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end pb-12 lg:pb-16 overflow-hidden bg-[#F7FAFC]">
        {/* Background Image */}
        <div className="absolute inset-x-0 top-16 z-0 flex items-start justify-center pointer-events-none">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-6xl h-auto object-contain object-top" />
        </div>
        
        {/* We place the text wrapper at the bottom by ensuring it's at the end of the flex container */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mt-auto pt-96">
          <div className="bg-green-50 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 mb-3 shadow-sm border border-green-100 backdrop-blur-sm bg-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Trusted by 10,000+ families
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-snug mb-3 font-poppins text-primary drop-shadow-lg bg-white/40 px-6 py-2 rounded-2xl backdrop-blur-sm">
            Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
          </h1>
          
          <p className="text-sm sm:text-base text-gray-900 mb-6 max-w-lg font-bold drop-shadow-lg bg-white/40 px-6 py-2 rounded-xl backdrop-blur-sm">
            Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
          </p>
          
          <div className="flex w-full sm:w-auto">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3 rounded-xl font-semibold text-base transition shadow-xl w-full sm:w-auto hover:shadow-2xl transform hover:-translate-y-1"
            >
              Book An Appointment
            </button>
          </div>
          
          <p className="text-xs text-gray-800 mt-5 font-semibold bg-white/90 px-5 py-2 rounded-full shadow-md border border-gray-100 backdrop-blur-md">
            Popular: <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Doctor Visit</span>
          </p>
        </div>
      </section>`;

content = content.replace(heroRegex, newHero);
fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Moved text to bottom');
