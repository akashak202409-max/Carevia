const fs = require('fs');
let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// Update modal positioning
content = content.replace(
  '<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">',
  '<div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">'
);

content = content.replace(
  '<div className="relative w-full max-w-[1000px] max-h-[90vh] bg-white rounded-[24px]',
  '<div className="relative w-full h-[95vh] sm:h-auto max-w-[1000px] sm:max-h-[90vh] bg-white rounded-t-[32px] sm:rounded-[24px]'
);

fs.writeFileSync('src/components/BookingModal.jsx', content);
console.log('Fixed responsive layout');
