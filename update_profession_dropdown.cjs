const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

const targetDropdown = `<select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                      <option>Select Profession</option>
                      <option>Homeopathy Doctor</option>
                      <option>General Physician</option>
                      <option>Physiotherapist</option>
                      <option>Nurse</option>
                    </select>`;

const newDropdown = `<select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                      <option>Select Profession</option>
                      <option>MBBS</option>
                      <option>Homeopathy Doctor</option>
                      <option>Physio</option>
                      <option>Nurse</option>
                      <option>Caretaker</option>
                      <option>Lab Centre</option>
                    </select>`;

if (content.includes('General Physician')) {
  // It might have different formatting, let's use replace on a smaller string if the block fails
  if (content.includes(targetDropdown)) {
    content = content.replace(targetDropdown, newDropdown);
  } else {
    content = content.replace('<option>General Physician</option>', '');
    content = content.replace('<option>Physiotherapist</option>', '<option>Physio</option>\n                      <option>MBBS</option>\n                      <option>Caretaker</option>\n                      <option>Lab Centre</option>');
  }
  fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
  console.log('Profession dropdown updated');
} else {
  console.log('Target not found');
}
