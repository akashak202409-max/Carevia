const fs = require('fs');

let content = fs.readFileSync('src/pages/PatientDashboard.jsx', 'utf8');

// Update DOCTORS array in PatientDashboard
const oldDoctors = `const DOCTORS = [
    { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: 4.9, exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: 4.8, exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: 5.0, exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: 4.9, exp: "15 Years", loc: "Virtual", fee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Dr. Amit Patel", spec: "Dermatologist", rating: 4.7, exp: "9 Years", loc: "Mumbai", fee: 700, img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: 4.8, exp: "11 Years", loc: "Virtual", fee: 900, img: "https://randomuser.me/api/portraits/women/22.jpg" }
  ];`;

const newDoctors = `const DOCTORS = [
    { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: 4.9, exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: 4.8, exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: 5.0, exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: 4.9, exp: "15 Years", loc: "Virtual", clinicFee: 1400, onlineFee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Dr. Amit Patel", spec: "Dermatologist", rating: 4.7, exp: "9 Years", loc: "Mumbai", clinicFee: 800, onlineFee: 600, img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: 4.8, exp: "11 Years", loc: "Virtual", clinicFee: 1000, onlineFee: 800, img: "https://randomuser.me/api/portraits/women/22.jpg" }
  ];`;
content = content.replace(oldDoctors, newDoctors);

// Fix sort logic
content = content.replace(
  'if (sortBy === \'feeAsc\') return a.fee - b.fee;',
  'if (sortBy === \'feeAsc\') return a.onlineFee - b.onlineFee;'
);
content = content.replace(
  'if (sortBy === \'feeDesc\') return b.fee - a.fee;',
  'if (sortBy === \'feeDesc\') return b.onlineFee - a.onlineFee;'
);

// Fix the card fee display
const oldFeeRow = `<div className="flex items-center justify-between">
                          <span className="font-bold text-lg text-primary">₹{doc.fee}</span>`;
const newFeeRow = `<div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-primary">₹{doc.clinicFee} <span className="text-[10px] text-gray-400 font-normal">Clinic</span></span>
                            <span className="font-bold text-sm text-secondary">₹{doc.onlineFee} <span className="text-[10px] text-gray-400 font-normal">Online</span></span>
                          </div>`;
content = content.replace(oldFeeRow, newFeeRow);

fs.writeFileSync('src/pages/PatientDashboard.jsx', content);
console.log('PatientDashboard fees updated');
