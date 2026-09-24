const fs = require('fs');
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// The block we want to replace starts with:
// <div className="mt-auto space-y-2">
//   {doc.isDoctor ? (
// ...
//   )}
// </div>

const oldBlockRegex = /<div className="mt-auto space-y-2">[\s\S]*?\{doc\.isDoctor \? \([\s\S]*?<\/div>\s*<\/div>/;

// Let's just find exactly what it looks like
const match = modal.match(/<div className="mt-auto space-y-2">[\s\S]*?\{doc\.isDoctor \? \([\s\S]*?<\/button>\s*\}\)\s*<\/div>/);
// Wait, regex might be tricky. Let's do a string replacement.
const oldStringPart = `{doc.isDoctor ? (`;
const newStringPart = `{isDoctorCategory ? (`;

if (modal.includes(oldStringPart)) {
  modal = modal.replace(oldStringPart, newStringPart);
  fs.writeFileSync('src/components/BookingModal.jsx', modal);
  console.log('Replaced doc.isDoctor with isDoctorCategory');
} else {
  console.log('Could not find doc.isDoctor');
}

// But wait, getFee also uses doc.isDoctor
const oldGetFee = `return doc.isDoctor ? (type === 'clinic' ? doc.clinicFee : doc.onlineFee) : doc.fee;`;
const newGetFee = `return isDoctorCategory ? (type === 'clinic' ? (doc.clinicFee || doc.fee) : (doc.onlineFee || doc.fee)) : (doc.fee || doc.clinicFee);`;
modal = modal.replace(oldGetFee, newGetFee);
fs.writeFileSync('src/components/BookingModal.jsx', modal);

