const fs = require('fs');
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

modal = modal.replace(
  'const getFee = (doc, type) => {',
  'const getFee = (doc, type, isDoctorCategory) => {'
);

modal = modal.replace(
  /getFee\(selectedDoctor, consultationType\)/g,
  'getFee(selectedDoctor, consultationType, isDoctorCategory)'
);

fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('Fixed getFee scope issue');
