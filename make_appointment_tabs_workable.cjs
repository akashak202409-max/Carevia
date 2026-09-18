const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// 1. Add state variable
if (!content.includes('appointmentTab')) {
  content = content.replace(
    `const [activeTab, setActiveTab] = React.useState('Dashboard');`,
    `const [activeTab, setActiveTab] = React.useState('Dashboard');\n  const [appointmentTab, setAppointmentTab] = React.useState('Upcoming');`
  );
}

// 2. Update the Tabs HTML
const oldTabs = `<div className="flex gap-8 w-full sm:w-auto mb-4 sm:mb-0">
                    <button className="text-sm font-bold text-[#1e293b] border-b-2 border-[#1e293b] pb-4 -mb-[18px]">Upcoming Appointments</button>
                    <button className="text-sm font-bold text-gray-400 hover:text-gray-600 pb-4 -mb-[18px]">Past Appointments</button>
                  </div>`;

const newTabs = `<div className="flex gap-8 w-full sm:w-auto mb-4 sm:mb-0">
                    <button 
                      onClick={() => setAppointmentTab('Upcoming')}
                      className={\`text-sm font-bold pb-4 -mb-[18px] transition \${appointmentTab === 'Upcoming' ? 'text-[#1e293b] border-b-2 border-[#1e293b]' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'}\`}
                    >
                      Upcoming Appointments
                    </button>
                    <button 
                      onClick={() => setAppointmentTab('Past')}
                      className={\`text-sm font-bold pb-4 -mb-[18px] transition \${appointmentTab === 'Past' ? 'text-[#1e293b] border-b-2 border-[#1e293b]' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'}\`}
                    >
                      Past Appointments
                    </button>
                  </div>`;

content = content.replace(oldTabs, newTabs);

// 3. Update the List HTML
const oldListStart = `{/* Appointment List */}
                <div className="space-y-4">
                  {/* Item 1 */}`;
const oldListEnd = `</div>
              </div>
            )}`;

const regex = /\{\/\* Appointment List \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\)\}/;

const newLists = `{/* Appointment List */}
                <div className="space-y-4">
                  {appointmentTab === 'Upcoming' ? (
                    <>
                      {/* Item 1 */}
                      <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
                        <div className="min-w-[150px] border-r border-gray-100 pr-6">
                          <h4 className="font-bold text-[#1e293b] mb-1">20 MAY 2026</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">04:00 PM - 05:00 PM</p>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">Initial Consultation</h3>
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Waiting</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Priya Sharma</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 87654 32109</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Virtual</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <button className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition">Reschedule</button>
                          <button className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
                        <div className="min-w-[150px] border-r border-gray-100 pr-6">
                          <h4 className="font-bold text-[#1e293b] mb-1">21 MAY 2026</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">11:00 AM - 12:30 PM</p>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">Follow-up Session</h3>
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Rahul Gupta</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 76543 21098</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Main Clinic</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <button className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition">Reschedule</button>
                          <button className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Past Item 1 */}
                      <div className="bg-gray-50 p-6 rounded-[20px] border border-gray-200 flex flex-col md:flex-row items-center gap-6">
                        <div className="min-w-[150px] border-r border-gray-200 pr-6 opacity-70">
                          <h4 className="font-bold text-[#1e293b] mb-1">12 MAY 2026</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">10:00 AM - 11:00 AM</p>
                        </div>
                        
                        <div className="flex-1 opacity-80">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">Routine Checkup</h3>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Completed</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Anita Patel</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 12345</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Virtual</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition">View Summary</button>
                        </div>
                      </div>
                      
                      {/* Past Item 2 */}
                      <div className="bg-gray-50 p-6 rounded-[20px] border border-gray-200 flex flex-col md:flex-row items-center gap-6">
                        <div className="min-w-[150px] border-r border-gray-200 pr-6 opacity-70">
                          <h4 className="font-bold text-[#1e293b] mb-1">08 MAY 2026</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">02:30 PM - 03:00 PM</p>
                        </div>
                        
                        <div className="flex-1 opacity-80">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">Consultation</h3>
                            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Cancelled</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Vikram Singh</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 90123 45678</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Main Clinic</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}`;

content = content.replace(regex, newLists);

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Made appointment tabs workable successfully');
