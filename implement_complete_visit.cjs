const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// 1. Add state for the success modal
content = content.replace(
  `const [activeCallAppointment, setActiveCallAppointment] = React.useState(null);`,
  `const [activeCallAppointment, setActiveCallAppointment] = React.useState(null);
  const [isVisitSuccessOpen, setIsVisitSuccessOpen] = React.useState(false);
  
  const handleCompleteVisit = () => {
    // Remove the active appointment from upcoming list
    if (activeCallAppointment) {
      setUpcomingAppointments(prev => prev.filter(app => app.id !== activeCallAppointment.id));
    }
    // Close video call
    setIsVideoCallOpen(false);
    // Show success modal
    setIsVisitSuccessOpen(true);
  };`
);

// 2. Wire the button in the video call overlay
content = content.replace(
  '<button className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition">\n                Save & Complete Visit\n              </button>',
  '<button onClick={handleCompleteVisit} className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition">\n                Save & Complete Visit\n              </button>'
);

// 3. Add the Visit Success Modal at the bottom
const successModalHTML = `
      {/* Visit Success Modal */}
      {isVisitSuccessOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm" onClick={() => setIsVisitSuccessOpen(false)}></div>
          <div className="relative bg-white rounded-[24px] w-full max-w-sm shadow-2xl overflow-hidden animate-[fade-in_0.3s_ease-out] p-8 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Visit Completed!</h3>
            
            <p className="text-gray-500 font-medium mb-6">
              Clinical notes and prescriptions have been securely saved and sent to <strong className="text-gray-800">{activeCallAppointment?.patient}</strong>.
            </p>
            
            <div className="w-full space-y-3">
              <button onClick={() => setIsVisitSuccessOpen(false)} className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition">
                Return to Dashboard
              </button>
              <button onClick={() => setIsVisitSuccessOpen(false)} className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition border border-gray-200">
                Download Summary PDF
              </button>
            </div>
            
          </div>
        </div>
      )}
`;

content = content.replace('    </div>\n  );\n}\n', successModalHTML + '    </div>\n  );\n}\n');

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Save and Complete Visit flow implemented');
