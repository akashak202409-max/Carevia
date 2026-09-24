const fs = require('fs');
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// 1. Define isDoctorCategory
modal = modal.replace(
  'const [filterSpec, setFilterSpec] = useState("");',
  'const [filterSpec, setFilterSpec] = useState("");\n  const isDoctorCategory = !serviceType || serviceType === "home-doctor";'
);

// 2. Conditionally render the buttons inside the doctor card
const oldButtons = `<div className="mt-auto space-y-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setConsultationType('clinic'); }}
                        className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex justify-between px-4 items-center \${selectedDoctor?.id === doc.id && consultationType === 'clinic' ? 'border-secondary bg-secondary text-white shadow-md scale-[1.02]' : 'border-gray-100 bg-white text-gray-600 hover:border-secondary/30'}\`}
                      >
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Hospital Visit</span>
                        <span>₹{doc.clinicFee}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setConsultationType('online'); }}
                        className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex justify-between px-4 items-center \${selectedDoctor?.id === doc.id && consultationType === 'online' ? 'border-secondary bg-secondary text-white shadow-md scale-[1.02]' : 'border-gray-100 bg-white text-gray-600 hover:border-secondary/30'}\`}
                      >
                        <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Online Consult</span>
                        <span>₹{doc.onlineFee}</span>
                      </button>
                    </div>`;

const newButtons = `{isDoctorCategory ? (
                    <div className="mt-auto space-y-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setConsultationType('clinic'); }}
                        className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex justify-between px-4 items-center \${selectedDoctor?.id === doc.id && consultationType === 'clinic' ? 'border-secondary bg-secondary text-white shadow-md scale-[1.02]' : 'border-gray-100 bg-white text-gray-600 hover:border-secondary/30'}\`}
                      >
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Hospital Visit</span>
                        <span>₹{doc.clinicFee}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setConsultationType('online'); }}
                        className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex justify-between px-4 items-center \${selectedDoctor?.id === doc.id && consultationType === 'online' ? 'border-secondary bg-secondary text-white shadow-md scale-[1.02]' : 'border-gray-100 bg-white text-gray-600 hover:border-secondary/30'}\`}
                      >
                        <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Online Consult</span>
                        <span>₹{doc.onlineFee}</span>
                      </button>
                    </div>
                    ) : (
                    <div className="mt-auto space-y-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setConsultationType('clinic'); }}
                        className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex justify-between px-4 items-center \${selectedDoctor?.id === doc.id ? 'border-secondary bg-secondary text-white shadow-md scale-[1.02]' : 'border-gray-100 bg-white text-gray-600 hover:border-secondary/30'}\`}
                      >
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Select</span>
                        <span>₹{doc.clinicFee} / session</span>
                      </button>
                    </div>
                    )}`;

modal = modal.replace(oldButtons, newButtons);

// 3. Update the summary display in Step 2, 3, 4, 5
// Change: {consultationType === "clinic" ? "Hospital Visit" : "Online Consultation"}
// To: {!isDoctorCategory ? "Home Visit" : consultationType === "clinic" ? "Hospital Visit" : "Online Consultation"}
modal = modal.replace(
  /\{consultationType === "clinic" \? "Hospital Visit" : "Online Consultation"\}/g,
  '{!isDoctorCategory ? "Home Visit" : consultationType === "clinic" ? "Hospital Visit" : "Online Consultation"}'
);

fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('Fixed buttons');
