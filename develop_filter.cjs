const fs = require('fs');

let content = fs.readFileSync('src/pages/PatientDashboard.jsx', 'utf8');

// 1. Add states
const statesSearch = `const [searchQuery, setSearchQuery] = useState('');`;
const newStates = `const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterSpec, setFilterSpec] = useState('All');
  const [filterLoc, setFilterLoc] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  
  const DOCTORS = [
    { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: 4.9, exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: 4.8, exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: 5.0, exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: 4.9, exp: "15 Years", loc: "Virtual", fee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Dr. Amit Patel", spec: "Dermatologist", rating: 4.7, exp: "9 Years", loc: "Mumbai", fee: 700, img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: 4.8, exp: "11 Years", loc: "Virtual", fee: 900, img: "https://randomuser.me/api/portraits/women/22.jpg" }
  ];
  
  const filteredDoctors = DOCTORS.filter(d => {
    if (filterSpec !== 'All' && d.spec !== filterSpec) return false;
    if (filterLoc !== 'All' && d.loc !== filterLoc) return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) && !d.spec.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'feeAsc') return a.fee - b.fee;
    if (sortBy === 'feeDesc') return b.fee - a.fee;
    return b.rating - a.rating; // default highest rating
  });
`;

if (content.includes(statesSearch) && !content.includes('const [isFilterOpen')) {
  content = content.replace(statesSearch, newStates);
}

// 2. Update the Filter Button to toggle state
const oldFilterBtn = `<button className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition text-gray-600">
                        <Filter className="w-5 h-5" />
                      </button>`;
const newFilterBtn = `<button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={\`p-3 border rounded-xl transition flex items-center gap-2 \${isFilterOpen ? 'bg-[#4F46E5] border-[#4F46E5] text-white' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'}\`}
                      >
                        <Filter className="w-5 h-5" />
                      </button>`;
if (content.includes(oldFilterBtn)) {
  content = content.replace(oldFilterBtn, newFilterBtn);
}

// 3. Inject Filter Panel UI right after the search bar block
const searchBlockEnd = `                    </div>
                  </div>`;
                  
const filterPanelUI = `                    </div>
                  </div>
                  
                  {isFilterOpen && (
                    <div className="mb-8 p-6 bg-gray-50 border border-gray-100 rounded-[20px] animate-[fade-in_0.3s_ease-out]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Specialty</label>
                          <select 
                            value={filterSpec}
                            onChange={(e) => setFilterSpec(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#4F46E5]"
                          >
                            <option value="All">All Specialties</option>
                            {[...new Set(DOCTORS.map(d => d.spec))].map(spec => (
                              <option key={spec} value={spec}>{spec}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                          <select 
                            value={filterLoc}
                            onChange={(e) => setFilterLoc(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#4F46E5]"
                          >
                            <option value="All">All Locations</option>
                            {[...new Set(DOCTORS.map(d => d.loc))].map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sort By</label>
                          <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#4F46E5]"
                          >
                            <option value="rating">Highest Rated</option>
                            <option value="feeAsc">Fee: Low to High</option>
                            <option value="feeDesc">Fee: High to Low</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                        <button 
                          onClick={() => { setFilterSpec('All'); setFilterLoc('All'); setSortBy('rating'); }}
                          className="text-sm font-bold text-gray-500 hover:text-gray-900 transition"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  )}
`;

if (content.includes(searchBlockEnd) && !content.includes('value={filterSpec}')) {
  // Replace the FIRST occurrence, which is after the search block
  content = content.replace(searchBlockEnd, filterPanelUI);
}

// 4. Update the doctor grid to use filteredDoctors
const oldMap = `{[
                      { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
                      { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
                      { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
                      { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: "4.9", exp: "15 Years", loc: "Virtual", fee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
                      { name: "Dr. Amit Patel", spec: "Dermatologist", rating: "4.7", exp: "9 Years", loc: "Mumbai", fee: 700, img: "https://randomuser.me/api/portraits/men/45.jpg" },
                      { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: "4.8", exp: "11 Years", loc: "Virtual", fee: 900, img: "https://randomuser.me/api/portraits/women/22.jpg" }
                    ].filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.spec.toLowerCase().includes(searchQuery.toLowerCase())).map((doc, idx) => (`;

const newMap = `{filteredDoctors.length > 0 ? filteredDoctors.map((doc, idx) => (`

if (content.includes(oldMap)) {
  content = content.replace(oldMap, newMap);
  
  // also need to handle empty state for map
  const oldEnd = `</button>
                        </div>
                      </div>
                    ))}`;
                    
  const newEnd = `</button>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-bold text-gray-800 mb-1">No doctors found</h4>
                        <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
                      </div>
                    )}`;
                    
  content = content.replace(oldEnd, newEnd);
}

fs.writeFileSync('src/pages/PatientDashboard.jsx', content);
console.log('Filter developed successfully.');
