const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const oldHero = `<section id="home" className="relative w-full overflow-hidden bg-[#FDF7F4] pt-24 lg:pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col items-start z-10 pt-4 lg:pt-10 pb-12 lg:pb-32 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.2] mb-4 font-poppins">
              Skip the travel!<br/>Take Online Doctor Consultation
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 lg:mb-10 font-medium">
              Private consultation + Audio call • Starts at just ₹199
            </p>
            
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <div className="flex -space-x-3">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                <img src="https://randomuser.me/api/portraits/men/68.jpg" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                +129 Doctors are online
                <span className="w-2.5 h-2.5 bg-[#84cc16] rounded-full animate-pulse shadow-sm"></span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 lg:px-10 py-3 lg:py-3.5 rounded-lg font-bold text-lg transition shadow-md hover:shadow-lg w-full sm:w-auto mb-10 lg:mb-12"
            >
              Consult Now
            </button>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 lg:gap-6 text-sm font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-500" /> Verified Doctors
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" /> Digital Prescription
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-500" /> Free Followup
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end self-end mt-4 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop" 
              alt="Patient consulting online" 
              className="w-full sm:w-4/5 lg:w-full max-w-[600px] object-cover rounded-t-[30px] lg:rounded-t-[40px] shadow-xl border-t-[4px] border-l-[4px] border-r-[4px] border-white/50" 
              style={{ maxHeight: '550px' }}
            />
          </div>
          
        </div>
      </section>`;

const newHero = `<section id="home" className="relative w-full overflow-hidden bg-[#F0F4FF] pt-24 lg:pt-32 pb-16 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col items-start z-10 pt-4 lg:pt-10 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-primary leading-[1.2] mb-6 font-poppins">
              Skip the travel!<br/>Take Online Doctor Consultation
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-10 font-medium">
              Private consultation + Audio call • Starts at just ₹199
            </p>
            
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <div className="flex -space-x-3">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                <img src="https://randomuser.me/api/portraits/men/68.jpg" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                +129 Doctors are online
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm"></span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-8 lg:px-10 py-3 lg:py-3.5 rounded-full font-bold text-lg transition shadow-md hover:shadow-lg w-full sm:w-auto mb-10 lg:mb-12"
            >
              Consult Now
            </button>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 lg:gap-6 text-sm font-bold text-primary/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" /> Verified Doctors
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" /> Digital Prescription
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-secondary" /> Free Followup
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px]">
              <div className="absolute inset-0 bg-primary rounded-[40px] transform rotate-3 scale-105 -z-10 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop" 
                alt="Patient consulting online" 
                className="w-full object-cover rounded-[32px] shadow-2xl border-4 border-white h-[400px] lg:h-[550px]" 
              />
            </div>
          </div>
          
        </div>
      </section>`;

if (content.includes('Skip the travel!')) {
  content = content.replace(oldHero, newHero);
  fs.writeFileSync('src/pages/Home.jsx', content);
  console.log('Fixed Home Hero design system and responsiveness');
} else {
  console.log('Hero not found, check the file.');
}

