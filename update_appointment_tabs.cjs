const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

const oldTabs = `<div className="flex gap-8 w-full sm:w-auto mb-4 sm:mb-0">
                    <button className="text-sm font-bold text-[#1e293b] border-b-2 border-[#1e293b] pb-4 -mb-[18px]">Appointment</button>
                    <button className="text-sm font-bold text-gray-400 hover:text-gray-600 pb-4 -mb-[18px]">Visits</button>
                  </div>`;

const newTabs = `<div className="flex gap-8 w-full sm:w-auto mb-4 sm:mb-0">
                    <button className="text-sm font-bold text-[#1e293b] border-b-2 border-[#1e293b] pb-4 -mb-[18px]">Upcoming Appointments</button>
                    <button className="text-sm font-bold text-gray-400 hover:text-gray-600 pb-4 -mb-[18px]">Past Appointments</button>
                  </div>`;

if (content.includes('Visits</button>')) {
  content = content.replace(oldTabs, newTabs);
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
  console.log('Updated tabs to Upcoming and Past Appointments');
} else {
  console.log('Could not find the tabs block');
}
