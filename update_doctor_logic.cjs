const fs = require('fs');

// --- 1. UPDATE BookingModal.jsx ---
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const oldDoctorsModal = `const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, name: "Dr. Sanjay Gupta", spec: "Physiotherapist", rating: "4.7", exp: "6 Years", loc: "Mumbai", clinicFee: 800, onlineFee: 500, img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 5, name: "Dr. Neha Verma", spec: "Ayurveda Doctor", rating: "4.9", exp: "14 Years", loc: "Pune", clinicFee: 500, onlineFee: 300, img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 6, name: "Nurse Anita", spec: "Nurse", rating: "4.8", exp: "5 Years", loc: "Delhi", clinicFee: 400, onlineFee: 300, img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 7, name: "Rahul Singh", spec: "Care Taker", rating: "4.6", exp: "3 Years", loc: "Chennai", clinicFee: 300, onlineFee: 200, img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 8, name: "Dr. Meena Iyer", spec: "BHS", rating: "4.9", exp: "9 Years", loc: "Bangalore", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/33.jpg" }
];`;

const newDoctorsModal = `const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", isDoctor: true, rating: "4.9", exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", isDoctor: true, rating: "4.8", exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", isDoctor: true, rating: "5.0", exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, name: "Dr. Sanjay Gupta", spec: "Physiotherapist", isDoctor: false, rating: "4.7", exp: "6 Years", loc: "Mumbai", fee: 800, img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 5, name: "Dr. Neha Verma", spec: "Ayurveda Doctor", isDoctor: true, rating: "4.9", exp: "14 Years", loc: "Pune", clinicFee: 500, onlineFee: 300, img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 6, name: "Nurse Anita", spec: "Nurse", isDoctor: false, rating: "4.8", exp: "5 Years", loc: "Delhi", fee: 400, img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 7, name: "Rahul Singh", spec: "Care Taker", isDoctor: false, rating: "4.6", exp: "3 Years", loc: "Chennai", fee: 300, img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 8, name: "Dr. Meena Iyer", spec: "BHS", isDoctor: false, rating: "4.9", exp: "9 Years", loc: "Bangalore", fee: 500, img: "https://randomuser.me/api/portraits/women/33.jpg" }
];

const getFee = (doc, type) => {
  if (!doc) return 0;
  return doc.isDoctor ? (type === 'clinic' ? doc.clinicFee : doc.onlineFee) : doc.fee;
};`;

modal = modal.replace(oldDoctorsModal, newDoctorsModal);

// Update step 1 buttons
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

const newButtons = `<div className="mt-auto space-y-2">
                      {doc.isDoctor ? (
                        <>
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
                        </>
                      ) : (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); setConsultationType('home'); }}
                          className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex justify-between px-4 items-center \${selectedDoctor?.id === doc.id ? 'border-secondary bg-secondary text-white shadow-md scale-[1.02]' : 'border-gray-100 bg-white text-gray-600 hover:border-secondary/30'}\`}
                        >
                          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Book Session</span>
                          <span>₹{doc.fee}</span>
                        </button>
                      )}
                    </div>`;

modal = modal.replace(oldButtons, newButtons);

// Update step 3 summary
modal = modal.replace(
  '<span className="text-xl font-bold">₹{consultationType === "clinic" ? selectedDoctor?.clinicFee : selectedDoctor?.onlineFee}</span>',
  '<span className="text-xl font-bold">₹{getFee(selectedDoctor, consultationType)}</span>'
);

// Update step 4 summary
modal = modal.replace(
  '<span className="text-2xl font-bold text-primary">₹{consultationType === "clinic" ? selectedDoctor?.clinicFee : selectedDoctor?.onlineFee}</span>',
  '<span className="text-2xl font-bold text-primary">₹{getFee(selectedDoctor, consultationType)}</span>'
);

// Update step 5 payment total
modal = modal.replace(
  '<div className="text-3xl font-bold text-primary">₹{selectedDoctor?.fee || 500}</div>',
  '<div className="text-3xl font-bold text-primary">₹{getFee(selectedDoctor, consultationType)}</div>'
);
modal = modal.replace(
  '<p className="text-sm text-gray-500">{consultationType === \'online\' ? \'Online Consultation\' : \'Direct Visit\'}</p>',
  '<p className="text-sm text-gray-500">{consultationType === \'online\' ? \'Online Consultation\' : (consultationType === \'clinic\' ? \'Hospital Visit\' : \'Home Visit\')}</p>'
);

// Update consultation type text
modal = modal.replace(
  '<p className="font-medium text-sm">{consultationType === "clinic" ? "Hospital Visit" : "Online Consultation"}</p>',
  '<p className="font-medium text-sm">{consultationType === "clinic" ? "Hospital Visit" : (consultationType === "online" ? "Online Consultation" : "Home Service")}</p>'
);

// Update handleNext newAppt fee
modal = modal.replace(
  'fee: consultationType === "clinic" ? selectedDoctor.clinicFee : selectedDoctor.onlineFee,',
  'fee: getFee(selectedDoctor, consultationType),'
);

fs.writeFileSync('src/components/BookingModal.jsx', modal);


// --- 2. UPDATE PatientDashboard.jsx ---
let dash = fs.readFileSync('src/pages/PatientDashboard.jsx', 'utf8');

const oldDoctorsDash = `const DOCTORS = [
    { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: 4.9, exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: 4.8, exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: 5.0, exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: 4.9, exp: "15 Years", loc: "Virtual", clinicFee: 1400, onlineFee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Dr. Amit Patel", spec: "Dermatologist", rating: 4.7, exp: "9 Years", loc: "Mumbai", clinicFee: 800, onlineFee: 600, img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: 4.8, exp: "11 Years", loc: "Virtual", clinicFee: 1000, onlineFee: 800, img: "https://randomuser.me/api/portraits/women/22.jpg" }
  ];`;

const newDoctorsDash = `const DOCTORS = [
    { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", isDoctor: true, rating: 4.9, exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Ramesh Kumar", spec: "General Physician", isDoctor: true, rating: 4.8, exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Ananya Iyer", spec: "Pediatrician", isDoctor: true, rating: 5.0, exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Sarah Johnson", spec: "Cardiologist", isDoctor: true, rating: 4.9, exp: "15 Years", loc: "Virtual", clinicFee: 1400, onlineFee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Dr. Sanjay Gupta", spec: "Physiotherapist", isDoctor: false, rating: 4.7, exp: "6 Years", loc: "Mumbai", fee: 800, img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Rahul Singh", spec: "Care Taker", isDoctor: false, rating: 4.6, exp: "3 Years", loc: "Chennai", fee: 300, img: "https://randomuser.me/api/portraits/men/11.jpg" }
  ];`;

dash = dash.replace(oldDoctorsDash, newDoctorsDash);

// Sort logic
dash = dash.replace(
  'if (sortBy === \'feeAsc\') return a.onlineFee - b.onlineFee;',
  'if (sortBy === \'feeAsc\') return (a.isDoctor ? a.onlineFee : a.fee) - (b.isDoctor ? b.onlineFee : b.fee);'
);
dash = dash.replace(
  'if (sortBy === \'feeDesc\') return b.onlineFee - a.onlineFee;',
  'if (sortBy === \'feeDesc\') return (b.isDoctor ? b.onlineFee : b.fee) - (a.isDoctor ? a.onlineFee : a.fee);'
);

// Card fee render
const oldCardFee = `<div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-primary">₹{doc.clinicFee} <span className="text-[10px] text-gray-400 font-normal">Clinic</span></span>
                            <span className="font-bold text-sm text-secondary">₹{doc.onlineFee} <span className="text-[10px] text-gray-400 font-normal">Online</span></span>
                          </div>`;

const newCardFee = `<div className="flex items-center justify-between">
                          {doc.isDoctor ? (
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-primary">₹{doc.clinicFee} <span className="text-[10px] text-gray-400 font-normal">Clinic</span></span>
                              <span className="font-bold text-sm text-secondary">₹{doc.onlineFee} <span className="text-[10px] text-gray-400 font-normal">Online</span></span>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="font-bold text-lg text-primary">₹{doc.fee} <span className="text-[10px] text-gray-400 font-normal">/ Session</span></span>
                            </div>
                          )}`;

dash = dash.replace(oldCardFee, newCardFee);

fs.writeFileSync('src/pages/PatientDashboard.jsx', dash);
console.log('Update complete');
