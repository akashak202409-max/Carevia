const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

const targetDropdown = `                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:border-gray-300 transition">
                      All Managers
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>`;

if (content.includes('All Managers')) {
  content = content.replace(targetDropdown, '');
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
  console.log('Removed All Managers dropdown successfully');
} else {
  console.log('Could not find All Managers dropdown');
}
