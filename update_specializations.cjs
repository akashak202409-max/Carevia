const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const oldSelect = `<select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">
                  <option>Select Specialization</option>
                  <option>Homeopathy</option>
                  <option>General Physician</option>
                  <option>Pediatrics</option>
                </select>`;

const newSelect = `<select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">
                  <option>Select Specialization</option>
                  <option>MBBS Doctor</option>
                  <option>Homeopathy Doctor</option>
                  <option>Ayurveda Doctor</option>
                  <option>Physiotherapist</option>
                  <option>Nurse</option>
                  <option>Caretaker</option>
                  <option>Lab Centre</option>
                  <option>BHS</option>
                </select>`;

if (content.includes(oldSelect)) {
  content = content.replace(oldSelect, newSelect);
  fs.writeFileSync('src/components/BookingModal.jsx', content);
  console.log('Dropdown updated successfully');
} else {
  // Let's try regex if exact string match fails
  const regex = /<select className="[^"]+">\s*<option>Select Specialization<\/option>[\s\S]*?<\/select>/;
  if (regex.test(content)) {
    content = content.replace(regex, newSelect);
    fs.writeFileSync('src/components/BookingModal.jsx', content);
    console.log('Dropdown updated using regex');
  } else {
    console.log('Could not find the select specialization dropdown');
  }
}
