const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// Add states for the reschedule modal
if (!content.includes('isRescheduleOpen')) {
  content = content.replace(
    `const [appointmentTab, setAppointmentTab] = React.useState('Upcoming');`,
    `const [appointmentTab, setAppointmentTab] = React.useState('Upcoming');
  const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);
  const [selectedRescheduleDate, setSelectedRescheduleDate] = React.useState('Thu, May 22');
  const [selectedRescheduleTime, setSelectedRescheduleTime] = React.useState('');`
  );
}

// Wire the "Reschedule" buttons
content = content.replaceAll(
  '<button className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition">Reschedule</button>',
  '<button onClick={() => setIsRescheduleOpen(true)} className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm">Reschedule</button>'
);

// Append the modal JSX at the very end before the final `</div>`
const modalHTML = `
      {/* Reschedule Overlay Modal */}
      {isRescheduleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm" onClick={() => setIsRescheduleOpen(false)}></div>
          <div className="relative bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden animate-[fade-in_0.3s_ease-out]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1e293b]">Reschedule Appointment</h2>
              <button onClick={() => setIsRescheduleOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              
              {/* Current Info */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-4 items-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center font-bold shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-0.5">Current Appointment</p>
                  <h4 className="font-bold text-[#1e293b]">Priya Sharma • Initial Consultation</h4>
                  <p className="text-sm font-medium text-gray-500">20 MAY 2026 at 04:00 PM</p>
                </div>
              </div>

              {/* Select New Date */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select New Date</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {['Wed, May 21', 'Thu, May 22', 'Fri, May 23', 'Mon, May 26'].map(date => (
                    <button 
                      key={date}
                      onClick={() => setSelectedRescheduleDate(date)}
                      className={\`shrink-0 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all \${selectedRescheduleDate === date ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}\`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select New Time */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedRescheduleTime(time)}
                      className={\`py-2.5 rounded-lg border-2 font-bold text-sm transition-all \${selectedRescheduleTime === time ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}\`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4 justify-end">
              <button onClick={() => setIsRescheduleOpen(false)} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Appointment successfully rescheduled to ' + selectedRescheduleDate + ' at ' + selectedRescheduleTime);
                  setIsRescheduleOpen(false);
                }}
                disabled={!selectedRescheduleTime}
                className={\`px-6 py-3 font-bold rounded-xl shadow-md transition \${selectedRescheduleTime ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}\`}
              >
                Confirm Reschedule
              </button>
            </div>
            
          </div>
        </div>
      )}
`;

content = content.replace('    </div>\n  );\n}\n', modalHTML + '    </div>\n  );\n}\n');

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Reschedule modal overlay added successfully');
