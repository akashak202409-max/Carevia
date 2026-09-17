const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Add missing icon imports if needed
if (!content.includes('CheckCircle')) {
  content = content.replace('MessageCircle,', 'MessageCircle, CheckCircle, FileText,');
}

const oldHeroRegex = /\{\/\* 2\. Hero Section \*\/\}([\s\S]*?)<\/section>/;

const newHero = `{/* 2. Hero Section */}
      <section id="home" className="relative w-full overflow-hidden bg-[#FCF6F2] pt-24 lg:pt-32 pb-12 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col items-start z-10 pt-4 lg:pt-10 lg:pb-32">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.2] mb-4 font-poppins">
              Skip the travel!<br/>Take Online Doctor Consultation
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-10 font-medium">
              Private consultation + Audio call • Starts at just ₹199
            </p>
            
            <div className="flex items-center gap-4 mb-10">
              <div className="flex -space-x-3">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                <img src="https://randomuser.me/api/portraits/men/68.jpg" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                +129 Doctors are online
                <span className="w-2.5 h-2.5 bg-[#84cc16] rounded-full animate-pulse shadow-sm"></span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-10 py-3.5 rounded-lg font-bold text-lg transition shadow-md hover:shadow-lg w-full sm:w-auto mb-12"
            >
              Consult Now
            </button>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-600">
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
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0 flex justify-end self-end">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop" 
              alt="Patient consulting online" 
              className="w-full max-w-[600px] object-cover rounded-t-[40px] shadow-2xl border-4 border-white/50 mb-[-20px]" 
              style={{ maxHeight: '550px' }}
            />
          </div>
          
        </div>
      </section>`;

content = content.replace(oldHeroRegex, newHero);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Hero section updated to Practo style');
