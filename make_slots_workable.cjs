const fs = require('fs');
let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

// Add state for scheduling
content = content.replace(
  'const [profession, setProfession] = useState("");',
  `const [profession, setProfession] = useState("");
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [schedule, setSchedule] = useState({
    Mon: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'],
    Tue: ['10:00 AM', '02:00 PM'],
    Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
  });
  const [newSlot, setNewSlot] = useState('');
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  
  const handleAddSlot = () => {
    if (!newSlot) { setIsAddingSlot(false); return; }
    // Convert 24h to 12h AM/PM
    const [h, m] = newSlot.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formatted = \`\${hour12.toString().padStart(2, '0')}:\${m} \${ampm}\`;
    
    if (!schedule[selectedDay].includes(formatted)) {
      setSchedule({...schedule, [selectedDay]: [...schedule[selectedDay], formatted].sort()});
    }
    setNewSlot('');
    setIsAddingSlot(false);
  };
  
  const removeSlot = (slot) => {
    setSchedule({
      ...schedule,
      [selectedDay]: schedule[selectedDay].filter(s => s !== slot)
    });
  };`
);

const oldStep5Start = `{/* STEP 5: AVAILABILITY (LIVE) */}`;
const oldStep5End = `            )}

          </div>`;

// We need to extract the exact Step 5 content string and replace it.
const regex = /\{\/\* STEP 5: AVAILABILITY \(LIVE\) \*\/\}[\s\S]*?<\/div>\s*\)\}\s*<\/div>/;

const newStep5 = `{/* STEP 5: AVAILABILITY (LIVE) */}
            {step === 5 && (
              <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
                
                <div className="bg-green-50 border border-green-200 rounded-[24px] p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full shrink-0 mt-1"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                    <div>
                      <h2 className="text-xl font-bold text-green-800 mb-1">Profile Verified!</h2>
                      <p className="text-sm text-green-700">Your profile is now live on Carevia. Set your availability below so patients can book appointments.</p>
                    </div>
                  </div>
                  <button className="bg-white text-green-700 border-2 border-green-200 hover:bg-green-100 px-5 py-2.5 rounded-xl font-bold text-sm transition shrink-0 whitespace-nowrap">
                    Manage Profile
                  </button>
                </div>

                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                  <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">Available Slots</h2>
                      <p className="text-sm text-gray-500">Configure your weekly working hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                      const count = schedule[day].length;
                      return (
                        <button 
                          key={day} 
                          onClick={() => setSelectedDay(day)}
                          className={\`px-4 py-2 rounded-lg text-sm font-bold border-2 transition flex items-center gap-1.5 \${selectedDay === day ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'}\`}
                        >
                          {day}
                          {count > 0 && (
                            <span className={\`text-[10px] px-1.5 py-0.5 rounded-full \${selectedDay === day ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}\`}>{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" /> 
                      {selectedDay === 'Thu' ? 'Thursday' : selectedDay === 'Tue' ? 'Tuesday' : selectedDay === 'Wed' ? 'Wednesday' : selectedDay === 'Fri' ? 'Friday' : selectedDay === 'Sat' ? 'Saturday' : selectedDay === 'Sun' ? 'Sunday' : 'Monday'} Time Slots
                    </h4>
                    
                    <div className="flex flex-wrap gap-3 items-center">
                      {schedule[selectedDay].length === 0 && !isAddingSlot && (
                        <p className="text-sm text-gray-400 font-medium italic w-full mb-2">No slots added for this day.</p>
                      )}
                      
                      {schedule[selectedDay].map(time => (
                        <div key={time} className="bg-white border border-gray-200 pl-4 pr-1 py-1.5 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 group transition">
                          {time}
                          <button onClick={() => removeSlot(time)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                      
                      {!isAddingSlot ? (
                        <button 
                          onClick={() => setIsAddingSlot(true)}
                          className="border-2 border-dashed border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-white hover:border-gray-400 hover:text-primary transition"
                        >
                          + Add Slot
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input 
                            type="time" 
                            value={newSlot}
                            onChange={(e) => setNewSlot(e.target.value)}
                            className="bg-white border-2 border-primary text-primary px-3 py-1.5 rounded-lg text-sm font-bold outline-none"
                            autoFocus
                          />
                          <button onClick={handleAddSlot} className="bg-primary hover:bg-primary-hover text-white px-3 py-2 rounded-lg text-sm font-bold shadow-sm transition">
                            Save
                          </button>
                          <button onClick={() => setIsAddingSlot(false)} className="text-gray-400 hover:text-gray-600 font-medium text-sm px-2">
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <Link to="/doctor/dashboard" className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md text-center inline-block">
                      Save Availability & Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>`;

content = content.replace(regex, newStep5);
fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
console.log('Workable availability scheduler created');
