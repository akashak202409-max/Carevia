const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<section id="home" className="relative pt-32 pb-40 lg:pt-40 lg:pb-48 px-4 sm:px-6 lg:px-8 min-h-screen flex items-start justify-center overflow-hidden bg-\[#F7FAFC\]">[\s\S]*?<\/section>/;

const newHero = `<section id="home" className="relative pt-28 pb-32 lg:pt-32 lg:pb-0 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center overflow-hidden bg-[#F7FAFC]">
        {/* Background Image - completely clear, no opacity fade */}
        <div className="absolute inset-x-0 bottom-0 z-0 flex items-end justify-center pointer-events-none">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-6xl h-auto object-contain object-bottom" />
        </div>
        
        {/* Soft radial blur just behind the text for readability, instead of a full screen wash */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#F7FAFC]/80 blur-[80px] rounded-full z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-4 md:mt-8">
          <div className="bg-green-50 text-primary px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 mb-4 shadow-sm border border-green-100 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Trusted by 10,000+ families
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 font-poppins text-primary drop-shadow-sm">
            Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl font-medium">
            Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
          </p>
          
          <div className="flex w-full sm:w-auto">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3 rounded-xl font-semibold text-base transition shadow-md w-full sm:w-auto hover:shadow-lg transform hover:-translate-y-1"
            >
              Book An Appointment
            </button>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-700 mt-6 font-medium bg-white/80 px-5 py-2 rounded-full backdrop-blur-md shadow-sm border border-white/50">
            Popular: <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Doctor Visit</span>
          </p>
        </div>
      </section>`;

content = content.replace(heroRegex, newHero);
fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Fixed Home hero');
