const fs = require('fs');
let content = fs.readFileSync('src/pages/HireProfessional.jsx', 'utf8');

// 1. Add state variables to the component
const stateReplacement = `export default function HireProfessional() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    service: 'Physiotherapist',
    patient: 'Elderly Care',
    location: '',
    duration: 'Few hours'
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!formData.location.trim()) {
      alert("Please enter your city or pincode.");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      document.getElementById('browse-professionals')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };`;

content = content.replace(`export default function HireProfessional() {\n  useEffect(() => { window.scrollTo(0, 0); }, []);\n  const [activeFaq, setActiveFaq] = useState(null);`, stateReplacement);

// 2. Add ID to browse section
content = content.replace(`<section className="py-24 bg-[#F0F4FF] px-4 sm:px-6 lg:px-8">`, `<section id="browse-professionals" className="py-24 bg-[#F0F4FF] px-4 sm:px-6 lg:px-8">`);

// 3. Update the form to use state and the handleSearch function
const formRegex = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">[\s\S]*?<\/div>\s*<div className="mt-6/;

const newForm = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">I need a...</label>
              <select 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] focus:border-[#E87070] outline-none text-[#0A2540] font-medium"
              >
                <option>Physiotherapist</option>
                <option>Home Nurse</option>
                <option>Care Taker</option>
                <option>Doctor</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">For...</label>
              <select 
                value={formData.patient}
                onChange={(e) => setFormData({...formData, patient: e.target.value})}
                className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] focus:border-[#E87070] outline-none text-[#0A2540] font-medium"
              >
                <option>Elderly Care</option>
                <option>Post-Surgery</option>
                <option>Chronic Illness</option>
                <option>Newborn Care</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-semibold text-gray-600">Location</label>
              <div className="relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Your City / Pincode" 
                  className="w-full pl-10 p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] focus:border-[#E87070] outline-none text-[#0A2540] font-medium" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Duration</label>
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] focus:border-[#E87070] outline-none text-[#0A2540] font-medium"
              >
                <option>Few hours</option>
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-[#E87070] hover:bg-[#d66161] disabled:opacity-70 text-white p-3.5 rounded-xl font-bold transition shadow-md w-full flex items-center justify-center gap-2 h-[52px]"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Search className="w-5 h-5"/> Find Pros</>
              )}
            </button>
          </div>
          <div className="mt-6`;

content = content.replace(formRegex, newForm);

fs.writeFileSync('src/pages/HireProfessional.jsx', content);
console.log('Made form workable');
