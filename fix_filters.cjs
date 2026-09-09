const fs = require('fs');
let content = fs.readFileSync('src/pages/HireProfessional.jsx', 'utf8');

// Replace the professionals static map with state & filtering logic
const stateInsertion = `  const [formData, setFormData] = useState({
    service: 'Physiotherapist',
    patient: 'Elderly Care',
    location: '',
    duration: 'Few hours'
  });
  const [isSearching, setIsSearching] = useState(false);

  // Filter States
  const [filterRole, setFilterRole] = useState("Any Role");
  const [filterCity, setFilterCity] = useState("Any City");
  const [filterGender, setFilterGender] = useState("Any Gender");
  const [filterLang, setFilterLang] = useState("Any Language");
  const [availableToday, setAvailableToday] = useState(false);

  const initialPros = [
    { id: 1, name: "Kavitha M.", role: "Home Nurse", gender: "Female", city: "Bangalore", languages: ["English", "Tamil"], price: "₹1,800/day", rating: 4.9, reviews: 240, tags: ["Post-op", "Elderly Care"], img: "35", available: true },
    { id: 2, name: "Rahul S.", role: "Physiotherapist", gender: "Male", city: "Chennai", languages: ["English", "Hindi"], price: "₹500/session", rating: 4.8, reviews: 156, tags: ["Sports Injury", "Joint Pain"], img: "11", available: false },
    { id: 3, name: "Anita K.", role: "Care Taker", gender: "Female", city: "Bangalore", languages: ["English", "Kannada"], price: "₹800/day", rating: 4.7, reviews: 320, tags: ["Dementia", "Companionship"], img: "44", available: true },
    { id: 4, name: "Dr. Vikram P.", role: "Doctor", gender: "Male", city: "Hyderabad", languages: ["English", "Telugu"], price: "₹600/visit", rating: 5.0, reviews: 89, tags: ["General Physician", "Geriatric"], img: "12", available: true },
    { id: 5, name: "Sneha R.", role: "Home Nurse", gender: "Female", city: "Chennai", languages: ["Tamil", "English"], price: "₹1,600/day", rating: 4.9, reviews: 110, tags: ["Newborn Care", "Post-op"], img: "47", available: false },
    { id: 6, name: "Manoj T.", role: "Care Taker", gender: "Male", city: "Bangalore", languages: ["Hindi", "English"], price: "₹850/day", rating: 4.6, reviews: 145, tags: ["Mobility Assist", "Elderly Care"], img: "15", available: true }
  ];

  const filteredPros = initialPros.filter(pro => {
    if (filterRole !== "Any Role" && pro.role !== filterRole) return false;
    if (filterCity !== "Any City" && pro.city !== filterCity) return false;
    if (filterGender !== "Any Gender" && pro.gender !== filterGender) return false;
    if (filterLang !== "Any Language" && !pro.languages.includes(filterLang)) return false;
    if (availableToday && !pro.available) return false;
    return true;
  });

  const handleSearch`;

content = content.replace(`  const [formData, setFormData] = useState({\n    service: 'Physiotherapist',\n    patient: 'Elderly Care',\n    location: '',\n    duration: 'Few hours'\n  });\n  const [isSearching, setIsSearching] = useState(false);\n\n  const handleSearch`, stateInsertion);

// Replace the filter bar UI and the mapped grid
const filterSectionRegex = /<div className="bg-white p-4 rounded-2xl shadow-sm flex flex-wrap gap-4 items-center justify-between mb-10 border border-blue-100">[\s\S]*?<\/div>\s*<\/div>\s*<div className="text-center mt-12">/;

const newFilterSection = `<div className="bg-white p-4 rounded-2xl shadow-sm flex flex-wrap gap-4 items-center justify-between mb-10 border border-blue-100">
            <div className="flex flex-wrap gap-3">
              <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none cursor-pointer">
                <option>Any Role</option>
                <option>Physiotherapist</option>
                <option>Home Nurse</option>
                <option>Care Taker</option>
                <option>Doctor</option>
              </select>
              <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none cursor-pointer">
                <option>Any City</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Hyderabad</option>
              </select>
              <select value={filterGender} onChange={e => setFilterGender(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none cursor-pointer">
                <option>Any Gender</option>
                <option>Female</option>
                <option>Male</option>
              </select>
              <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none cursor-pointer">
                <option>Any Language</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Kannada</option>
                <option>Telugu</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-green-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-100 transition">
              <input type="checkbox" checked={availableToday} onChange={e => setAvailableToday(e.target.checked)} className="hidden" />
              <div className={\`w-3 h-3 rounded-full \${availableToday ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}\`}></div> Available Today
            </label>
          </div>

          {/* Grid */}
          {filteredPros.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPros.map((pro) => (
                <div key={pro.id} className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-blue-100 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img src={\`https://i.pravatar.cc/150?img=\${pro.img}\`} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" alt="Profile" />
                      <div className="absolute -bottom-1 -right-1 bg-[#10B981] p-1 rounded-full border-2 border-white text-white"><Check className="w-2 h-2" /></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1E3A8A]">{pro.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{pro.role} • {pro.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pro.tags.map(tag => (
                      <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm font-medium"><Star className="w-4 h-4 text-yellow-500 fill-current"/> <span className="font-bold">{pro.rating}</span> <span className="text-gray-400">({pro.reviews} reviews)</span></div>
                    <div className="text-sm text-gray-600 font-medium">🗣️ {pro.languages.join(', ')}</div>
                    <div className="text-sm text-gray-600 font-medium">💰 {pro.price}</div>
                    {pro.available && <div className="text-sm text-green-600 font-bold mt-2">🟢 Available Today</div>}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition text-sm">Profile</button>
                    <button className="flex-1 bg-[#E87070] text-white font-bold py-2.5 rounded-xl hover:bg-[#d66161] transition shadow-md text-sm">Hire</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[20px] shadow-sm">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">No professionals found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              <button onClick={() => { setFilterRole("Any Role"); setFilterCity("Any City"); setFilterGender("Any Gender"); setFilterLang("Any Language"); setAvailableToday(false); }} className="mt-6 text-[#E87070] font-bold hover:underline">Clear all filters</button>
            </div>
          )}
          
          <div className="text-center mt-12">`;

content = content.replace(filterSectionRegex, newFilterSection);

fs.writeFileSync('src/pages/HireProfessional.jsx', content);
console.log('Filters made workable');
