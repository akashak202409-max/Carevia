const fs = require('fs');
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// Replace standard {selectedTime} rendering with duration where appropriate
modal = modal.replace(
  /<p className="font-medium text-sm">{selectedTime}<\/p>/g,
  '<p className="font-medium text-sm">{selectedTime} {selectedDuration && <span className="text-secondary ml-1 font-bold">({selectedDuration})</span>}</p>'
);

modal = modal.replace(
  /<span className="font-bold text-gray-900">{selectedTime}<\/span>/g,
  '<span className="font-bold text-gray-900">{selectedTime} {selectedDuration && <span className="text-secondary ml-1 font-bold">({selectedDuration})</span>}</span>'
);

fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('Fixed Summary rendering');
