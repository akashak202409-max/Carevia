const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mt-auto pt-96">[\s\S]*?<\/div>\s*<\/section>/;

const newBlock = `<div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-auto mb-10 w-full px-4">
          <div className="bg-white/90 text-primary px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 mb-6 shadow-md border border-white/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Trusted by 10,000+ families
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 font-poppins text-primary bg-white/70 backdrop-blur-xl px-8 md:px-12 py-6 rounded-[2rem] shadow-xl border border-white/60 w-full max-w-3xl">
            Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
          </h1>
          
          <p className="text-sm sm:text-lg text-gray-900 mb-8 max-w-2xl font-bold bg-white/70 backdrop-blur-xl px-6 md:px-10 py-5 rounded-[1.5rem] shadow-lg border border-white/60 leading-relaxed">
            Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
          </p>
          
          <div className="flex w-full sm:w-auto mb-6">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-xl w-full sm:w-auto hover:shadow-2xl transform hover:-translate-y-1"
            >
              Book An Appointment
            </button>
          </div>
          
          <p className="text-sm text-gray-900 font-bold bg-white/90 px-6 py-2.5 rounded-full shadow-lg border border-white/50 backdrop-blur-xl">
            Popular: <span className="text-primary hover:text-secondary cursor-pointer transition font-extrabold">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-extrabold">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-extrabold">Doctor Visit</span>
          </p>
        </div>
      </section>`;

content = content.replace(heroRegex, newBlock);
fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Updated font visibility and glassmorphism');
