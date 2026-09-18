const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// 1. Add states
if (!content.includes('isVideoCallOpen')) {
  content = content.replace(
    `const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);`,
    `const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = React.useState(false);
  const [activeCallAppointment, setActiveCallAppointment] = React.useState(null);`
  );
}

// 2. Add icons import
if (!content.includes('Mic, Video, PhoneOff')) {
  content = content.replace('X, MapPin', 'X, MapPin, Mic, Video, PhoneOff, MessageSquareText');
}

// 3. Wire the "Appointment Start" buttons
content = content.replaceAll(
  '<button className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>',
  '<button onClick={() => { setActiveCallAppointment(apt); setIsVideoCallOpen(true); }} className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>'
);

// 4. Add the Full Screen Video Call Overlay
const videoCallHTML = `
      {/* Video Consultation Overlay */}
      {isVideoCallOpen && (
        <div className="fixed inset-0 z-[200] bg-gray-900 flex flex-col md:flex-row overflow-hidden animate-[fade-in_0.3s_ease-out]">
          
          {/* Main Video Area */}
          <div className="flex-1 relative flex flex-col">
            
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                <span className="text-white font-bold tracking-widest text-sm">LIVE</span>
                <span className="text-white/80 font-medium ml-2 border-l border-white/20 pl-4">00:14:32</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm">
                {activeCallAppointment?.patient} - {activeCallAppointment?.title}
              </div>
            </div>

            {/* Main Patient Video (Placeholder) */}
            <div className="flex-1 bg-black w-full h-full relative">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop" alt="Patient Video" className="w-full h-full object-cover opacity-80" />
              
              {/* Doctor PIP */}
              <div className="absolute bottom-28 right-6 w-48 h-64 bg-black rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Doctor Video" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded">Dr. Priya (You)</div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-6 px-6">
              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition">
                <Mic className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition">
                <Video className="w-5 h-5" />
              </button>
              <button onClick={() => setIsVideoCallOpen(false)} className="w-16 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/20 transition">
                <PhoneOff className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition">
                <MessageSquareText className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clinical Notes Sidebar */}
          <div className="w-full md:w-[400px] bg-white border-l border-gray-200 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-[#1e293b]">Clinical Notes</h3>
              <button onClick={() => setIsVideoCallOpen(false)} className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Patient History</p>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Age/Gender:</strong> 32/F<br/>
                    <strong>Previous Visits:</strong> 2<br/>
                    <strong>Known Allergies:</strong> Penicillin<br/>
                    <strong>Chief Complaint:</strong> Recurring skin irritation and mild fever over the last 3 days.
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Symptoms & Observations</label>
                <textarea className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#4F46E5]/50 outline-none resize-none" placeholder="Type clinical observations here during the call..."></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Prescription / Action Plan</label>
                <textarea className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#4F46E5]/50 outline-none resize-none" placeholder="List medications or next steps..."></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition">
                Save & Complete Visit
              </button>
            </div>
          </div>

        </div>
      )}
`;

content = content.replace('    </div>\n  );\n}\n', videoCallHTML + '    </div>\n  );\n}\n');

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Video Call flow implemented successfully');
