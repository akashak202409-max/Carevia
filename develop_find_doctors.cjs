const fs = require('fs');

let content = fs.readFileSync('src/pages/PatientDashboard.jsx', 'utf8');

// 1. Add imports
content = content.replace(
  "import { Link } from 'react-router-dom';",
  "import { Link } from 'react-router-dom';\nimport BookingModal from '../components/BookingModal';\nimport { Star, Filter } from 'lucide-react';"
);

// 2. Add state for booking modal
content = content.replace(
  "const [myAppointments, setMyAppointments] = useState([]);",
  "const [myAppointments, setMyAppointments] = useState([]);\n  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);\n  const [searchQuery, setSearchQuery] = useState('');"
);

// 3. Change Link to button in sidebar
const oldLink = `<Link 
                to="/doctor-visit"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all"
              >
                <Search className="w-5 h-5" /> Find Doctors
              </Link>`;

const newButton = `<button 
                onClick={() => setActiveTab('Find Doctors')}
                className={\`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all \${activeTab === 'Find Doctors' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}\`}
              >
                <Search className="w-5 h-5" /> Find Doctors
              </button>`;
content = content.replace(oldLink, newButton);

// 4. Build the Find Doctors tab UI
const findDoctorsUI = `
            {activeTab === 'Find Doctors' && (
              <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">Find a Doctor</h3>
                      <p className="text-gray-500">Search and book appointments with top healthcare professionals.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search doctors, specialties..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none w-full md:w-64 transition"
                        />
                      </div>
                      <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition text-gray-600">
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
                      { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
                      { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
                      { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: "4.9", exp: "15 Years", loc: "Virtual", fee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
                      { name: "Dr. Amit Patel", spec: "Dermatologist", rating: "4.7", exp: "9 Years", loc: "Mumbai", fee: 700, img: "https://randomuser.me/api/portraits/men/45.jpg" },
                      { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: "4.8", exp: "11 Years", loc: "Virtual", fee: 900, img: "https://randomuser.me/api/portraits/women/22.jpg" }
                    ].filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.spec.toLowerCase().includes(searchQuery.toLowerCase())).map((doc, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-[20px] p-5 hover:shadow-lg transition-all bg-white group">
                        <div className="flex items-start gap-4 mb-4">
                          <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{doc.name}</h4>
                            <p className="text-sm font-medium text-secondary mb-1">{doc.spec}</p>
                            <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" /> {doc.rating}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-5 bg-gray-50 p-3 rounded-xl">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {doc.exp}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg text-primary">₹{doc.fee}</span>
                          <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-secondary hover:bg-secondary-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
`;

// Insert the new tab logic
const targetString = `            {activeTab === 'Records' && (`;
content = content.replace(targetString, findDoctorsUI + '\n' + targetString);

// 5. Add BookingModal at the bottom
const lastDivIndex = content.lastIndexOf('</div>');
if (lastDivIndex !== -1) {
  const before = content.substring(0, lastDivIndex);
  const after = content.substring(lastDivIndex);
  content = before + `  <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />\n    ` + after;
}

fs.writeFileSync('src/pages/PatientDashboard.jsx', content);
console.log('Find Doctors page developed in PatientDashboard');
