const fs = require('fs');

let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const searchBlockStart = '<div className="bg-white p-4 rounded-[16px] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">';
const searchBlockEndRegex = /<option>Diagnostic Scan Booking<\/option>\s*<\/select>\s*<\/div>/;

// Replace it with a conditional rendering block
if (modal.includes(searchBlockStart) && modal.match(searchBlockEndRegex)) {
  const [fullMatch] = modal.match(searchBlockEndRegex);
  const blockChunk = modal.substring(
    modal.indexOf(searchBlockStart),
    modal.indexOf(fullMatch) + fullMatch.length
  );
  
  const replacement = `{!serviceType && (\n${blockChunk}\n)}`;
  
  modal = modal.replace(blockChunk, replacement);
  fs.writeFileSync('src/components/BookingModal.jsx', modal);
  console.log('Search block hidden when serviceType is present.');
} else {
  console.log('Could not find search block.');
}
