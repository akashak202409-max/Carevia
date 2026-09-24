const fs = require('fs');

let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const oldDoctors = `const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
];`;

const newDoctors = `const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, name: "Dr. Sanjay Gupta", spec: "Physiotherapist", rating: "4.7", exp: "6 Years", loc: "Mumbai", clinicFee: 800, onlineFee: 500, img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 5, name: "Dr. Neha Verma", spec: "Ayurveda Doctor", rating: "4.9", exp: "14 Years", loc: "Pune", clinicFee: 500, onlineFee: 300, img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 6, name: "Nurse Anita", spec: "Nurse", rating: "4.8", exp: "5 Years", loc: "Delhi", clinicFee: 400, onlineFee: 300, img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 7, name: "Rahul Singh", spec: "Care Taker", rating: "4.6", exp: "3 Years", loc: "Chennai", clinicFee: 300, onlineFee: 200, img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 8, name: "Dr. Meena Iyer", spec: "BHS", rating: "4.9", exp: "9 Years", loc: "Bangalore", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/33.jpg" }
];`;

modal = modal.replace(oldDoctors, newDoctors);

// Now, we need to filter DOCTORS based on serviceType in the render method.
// Let's find where DOCTORS.map(doc => ( is used.
const oldMap = '{DOCTORS.map(doc => (';
const newMap = `{DOCTORS.filter(doc => {
                  if (!serviceType) return true;
                  if (serviceType === 'physiotherapy' && doc.spec !== 'Physiotherapist') return false;
                  if (serviceType === 'ayurveda' && doc.spec !== 'Ayurveda Doctor') return false;
                  if (serviceType === 'nurse-care' && doc.spec !== 'Nurse') return false;
                  if (serviceType === 'bhs' && doc.spec !== 'BHS') return false;
                  if (serviceType === 'baby-care' && doc.spec !== 'Pediatrician') return false;
                  if (serviceType === 'care-taker' && doc.spec !== 'Care Taker') return false;
                  if (serviceType === 'home-doctor' && doc.spec !== 'General Physician') return false;
                  return true;
                }).map(doc => (`;

modal = modal.replace(oldMap, newMap);

fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('BookingModal filter updated');
