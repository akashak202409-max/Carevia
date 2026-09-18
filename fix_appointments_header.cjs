const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

const oldHeader = `<div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-xl p-1 flex items-center mr-2">
                      <button className="px-4 py-2 bg-white text-primary font-bold rounded-lg shadow-sm text-sm">Manager View</button>
                      <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-bold rounded-lg text-sm transition">Coordinator View</button>
                    </div>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      Create Visit Plan
                    </button>
                  </div>`;

const newHeader = `<div className="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
                    <button className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-sm transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      Create Visit Plan
                    </button>
                  </div>`;

if (content.includes('Manager View')) {
  content = content.replace(oldHeader, newHeader);
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
  console.log('Removed toggle and made responsive');
} else {
  console.log('Target block not found');
}
