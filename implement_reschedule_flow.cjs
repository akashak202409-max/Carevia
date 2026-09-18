const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// 1. Add state for upcomingAppointments and rescheduleStep
const stateUpdates = `const [appointmentTab, setAppointmentTab] = React.useState('Upcoming');
  const [upcomingAppointments, setUpcomingAppointments] = React.useState([
    {
      id: 1,
      date: '20 MAY 2026',
      time: '04:00 PM - 05:00 PM',
      title: 'Initial Consultation',
      status: 'Waiting',
      statusColor: 'yellow',
      patient: 'Priya Sharma',
      phone: '+91 87654 32109',
      location: 'Virtual'
    },
    {
      id: 2,
      date: '21 MAY 2026',
      time: '11:00 AM - 12:30 PM',
      title: 'Follow-up Session',
      status: 'Confirmed',
      statusColor: 'blue',
      patient: 'Rahul Gupta',
      phone: '+91 76543 21098',
      location: 'Main Clinic'
    }
  ]);
  const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);
  const [activeRescheduleId, setActiveRescheduleId] = React.useState(null);
  const [rescheduleStep, setRescheduleStep] = React.useState('select');
  const [selectedRescheduleDate, setSelectedRescheduleDate] = React.useState('Thu, May 22');
  const [selectedRescheduleTime, setSelectedRescheduleTime] = React.useState('');

  const activeAppointment = upcomingAppointments.find(a => a.id === activeRescheduleId);

  const handleConfirmReschedule = () => {
    // Update the list
    setUpcomingAppointments(prev => prev.map(app => {
      if (app.id === activeRescheduleId) {
        return {
          ...app,
          date: selectedRescheduleDate.toUpperCase(),
          time: \`\${selectedRescheduleTime} - Rescheduled\`
        };
      }
      return app;
    }));
    
    setRescheduleStep('success');
  };
`;

content = content.replace(
  `const [appointmentTab, setAppointmentTab] = React.useState('Upcoming');
  const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);
  const [selectedRescheduleDate, setSelectedRescheduleDate] = React.useState('Thu, May 22');
  const [selectedRescheduleTime, setSelectedRescheduleTime] = React.useState('');`,
  stateUpdates
);

// 2. Replace hardcoded upcoming list with map
const oldUpcomingList = `<>
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
                          <button onClick={() => setIsRescheduleOpen(true)} className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm">Reschedule</button>
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
                          <button onClick={() => setIsRescheduleOpen(true)} className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm">Reschedule</button>
                          <button className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>
                        </div>
                      </div>
                    </>`;

const newUpcomingList = `<>
                      {upcomingAppointments.map((apt) => (
                        <div key={apt.id} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
                          <div className="min-w-[150px] border-r border-gray-100 pr-6">
                            <h4 className="font-bold text-[#1e293b] mb-1">{apt.date}</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">{apt.time}</p>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-[#1e293b]">{apt.title}</h3>
                              <span className={\`bg-\${apt.statusColor}-100 text-\${apt.statusColor}-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider\`}>{apt.status}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                              <div className="flex items-center gap-2"><User className="w-4 h-4" /> {apt.patient}</div>
                              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {apt.phone}</div>
                              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {apt.location}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 min-w-[160px]">
                            <button 
                              onClick={() => {
                                setActiveRescheduleId(apt.id);
                                setRescheduleStep('select');
                                setSelectedRescheduleDate('Thu, May 22');
                                setSelectedRescheduleTime('');
                                setIsRescheduleOpen(true);
                              }} 
                              className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                            >
                              Reschedule
                            </button>
                            <button className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>
                          </div>
                        </div>
                      ))}
                    </>`;

content = content.replace(oldUpcomingList, newUpcomingList);


// 3. Update the Modal content to handle the two steps
const oldModalInner = `<div className="flex justify-between items-center p-6 border-b border-gray-100">
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
            </div>`;

const newModalInner = `<div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1e293b]">
                {rescheduleStep === 'select' ? 'Reschedule Appointment' : 'Reschedule Confirmed'}
              </h2>
              <button onClick={() => setIsRescheduleOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {rescheduleStep === 'select' ? (
              <>
                <div className="p-6 space-y-6">
                  {/* Current Info */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-4 items-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center font-bold shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-0.5">Current Appointment</p>
                      <h4 className="font-bold text-[#1e293b]">{activeAppointment?.patient} • {activeAppointment?.title}</h4>
                      <p className="text-sm font-medium text-gray-500">{activeAppointment?.date} at {activeAppointment?.time.split('-')[0].trim()}</p>
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
                    onClick={handleConfirmReschedule}
                    disabled={!selectedRescheduleTime}
                    className={\`px-6 py-3 font-bold rounded-xl shadow-md transition \${selectedRescheduleTime ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}\`}
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </>
            ) : (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Success!</h3>
                <p className="text-gray-500 font-medium mb-8">
                  {activeAppointment?.patient}'s appointment has been successfully rescheduled to<br/>
                  <strong className="text-gray-800">{selectedRescheduleDate}</strong> at <strong className="text-gray-800">{selectedRescheduleTime}</strong>.
                </p>
                <button 
                  onClick={() => setIsRescheduleOpen(false)} 
                  className="w-full max-w-xs py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition"
                >
                  Done
                </button>
              </div>
            )}`;

content = content.replace(oldModalInner, newModalInner);

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Full reschedule flow implemented successfully');
