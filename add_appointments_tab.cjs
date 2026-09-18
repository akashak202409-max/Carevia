const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

if (!content.includes('MapPin')) {
  content = content.replace('X\n}', 'X, MapPin, Clock, Phone, CalendarCheck\n}');
}

const targetReplacement = `              </div>
            )}

          </div>`;

const appointmentsTab = `              </div>
            )}

            {activeTab === 'Appointments' && (
              <div className="space-y-8 animate-[fade-in_0.4s_ease-out]">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b] mb-1">Appointments & Consultations</h1>
                    <p className="text-gray-500 font-medium">Manage your schedule and upcoming client meetings</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-xl p-1 flex items-center mr-2">
                      <button className="px-4 py-2 bg-white text-primary font-bold rounded-lg shadow-sm text-sm">Manager View</button>
                      <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-bold rounded-lg text-sm transition">Coordinator View</button>
                    </div>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      Create Visit Plan
                    </button>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-blue-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Total Appointments</span>
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">42</h3>
                      <p className="text-xs font-medium text-gray-400">Scheduled this month</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-purple-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Total Visit Planned</span>
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">18</h3>
                      <p className="text-xs font-medium text-gray-400">Planned site visits</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-green-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Completed Appointments</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">28</h3>
                      <p className="text-xs font-medium text-gray-400">+5 Completed Today</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-orange-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Total Visit Completed</span>
                      <CalendarCheck className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">12</h3>
                      <p className="text-xs font-medium text-gray-400">Done this week</p>
                    </div>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4">
                  <div className="flex gap-8 w-full sm:w-auto mb-4 sm:mb-0">
                    <button className="text-sm font-bold text-[#1e293b] border-b-2 border-[#1e293b] pb-4 -mb-[18px]">Appointment</button>
                    <button className="text-sm font-bold text-gray-400 hover:text-gray-600 pb-4 -mb-[18px]">Visits</button>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:border-gray-300 transition">
                      <Calendar className="w-4 h-4" />
                      Last 30 Days (Jun 17, 2026 - Jul 16, 2026)
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:border-gray-300 transition">
                      All Managers
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Appointment List */}
                <div className="space-y-4">
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
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Main Office</div>
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
                        <h3 className="text-lg font-bold text-[#1e293b]">Design Finalization</h3>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Assigned</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2"><User className="w-4 h-4" /> Rahul Gupta</div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 76543 21098</div>
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Virtual</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[160px]">
                      <button className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition">Reschedule</button>
                      <button className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>`;

content = content.replace(targetReplacement, appointmentsTab);

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Appointments tab added successfully');
