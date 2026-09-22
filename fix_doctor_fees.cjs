const fs = require('fs');

let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// 1. Update DOCTORS array in BookingModal
const oldDoctors = `const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
];`;

const newDoctors = `const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
];`;

modal = modal.replace(oldDoctors, newDoctors);

// 2. Remove the onClick from the card root, and the old fee display
modal = modal.replace(
  'onClick={() => setSelectedDoctor(doc)}',
  '' // remove from root so buttons handle it
);

// We need to replace the bottom part of the card (the grid and the "Selected" button)
const oldCardBottom = `                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-medium text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl flex-1">
                      <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {doc.exp}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</div>
                      <div className="flex items-center gap-1.5"><span className="font-bold text-gray-700">₹{doc.fee}</span> / session</div>
                      <div className="flex items-center gap-1.5 text-green-600 font-bold"><CheckCircle className="w-3.5 h-3.5" /> Available</div>
                    </div>
                    
                    <div className={\`w-full py-2.5 rounded-xl text-center text-sm font-bold transition-colors \${selectedDoctor?.id === doc.id ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500'}\`}>
                      {selectedDoctor?.id === doc.id ? 'Selected' : 'Select Doctor'}
                    </div>`;
                    
const newCardBottom = `                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-medium text-gray-500 mb-4 bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {doc.exp}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</div>
                    </div>
                    
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
                    </div>`;

modal = modal.replace(oldCardBottom, newCardBottom);

// 3. Update the summary sections to display the correct fee based on consultationType
modal = modal.replace(
  /<span className="text-xl font-bold">₹\{selectedDoctor\?\.fee\}<\/span>/g,
  '<span className="text-xl font-bold">₹{consultationType === "clinic" ? selectedDoctor?.clinicFee : selectedDoctor?.onlineFee}</span>'
);
modal = modal.replace(
  /<span className="text-2xl font-bold text-primary">₹\{selectedDoctor\?\.fee\}<\/span>/g,
  '<span className="text-2xl font-bold text-primary">₹{consultationType === "clinic" ? selectedDoctor?.clinicFee : selectedDoctor?.onlineFee}</span>'
);

// 4. Step 2 summary shows "Consultation Type: Online Consultation". Update to be dynamic
modal = modal.replace(
  '<p className="font-medium text-sm">Online Consultation</p>',
  '<p className="font-medium text-sm">{consultationType === "clinic" ? "Hospital Visit" : "Online Consultation"}</p>'
);

// 5. Update the newAppt payload
modal = modal.replace(
  /type: "online",/g,
  'type: consultationType,'
);
modal = modal.replace(
  /fee: selectedDoctor\.fee,/g,
  'fee: consultationType === "clinic" ? selectedDoctor.clinicFee : selectedDoctor.onlineFee,'
);


fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('BookingModal updated');
