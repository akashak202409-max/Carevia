const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<section id="home" className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-screen">[\s\S]*?<\/section>/;

const newHero = `<section id="home" className="relative pt-32 pb-40 lg:pt-40 lg:pb-48 px-4 sm:px-6 lg:px-8 min-h-screen flex items-start justify-center overflow-hidden bg-[#F7FAFC]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 flex items-end justify-center">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-7xl h-auto object-contain object-bottom opacity-30 md:opacity-100" />
        </div>
        
        {/* Overlay gradient for text readability on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAFC] via-[#F7FAFC]/90 to-transparent z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-10 md:mt-16">
          <div className="bg-green-100 text-primary px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 mb-6 shadow-sm border border-green-200 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Trusted by 10,000+ families
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-tight mb-6 font-poppins text-primary">
            Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl font-medium drop-shadow-sm">
            Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
          </p>
          
          <div className="flex w-full sm:w-auto">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-10 py-4 rounded-xl font-semibold text-lg transition shadow-xl w-full sm:w-auto hover:shadow-2xl transform hover:-translate-y-1"
            >
              Book An Appointment
            </button>
          </div>
          <p className="text-sm text-gray-700 mt-6 font-medium bg-white/70 px-6 py-2 rounded-full backdrop-blur-md shadow-sm border border-white/50">
            Popular: <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Doctor Visit</span>
          </p>
        </div>
      </section>`;

content = content.replace(heroRegex, newHero);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Replaced Home hero section');
