const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

const targetHeader = `<div className="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
                    <button className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-sm transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      Create Visit Plan
                    </button>
                  </div>`;

if (content.includes('Create Visit Plan')) {
  content = content.replace(targetHeader, '');
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
  console.log('Removed Create Visit Plan button successfully');
} else {
  console.log('Could not find Create Visit Plan button');
}
