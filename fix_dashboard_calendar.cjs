const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// Add Calendar import if missing
if (!content.includes('Calendar')) {
  content = content.replace('import { ', 'import { Calendar, ');
}

// Add state for date picker
content = content.replace(
  'export default function DoctorDashboard() {',
  `export default function DoctorDashboard() {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState('Today');`
);

// We need to replace the select dropdown with our custom DateRangePicker component
const oldSelect = `<select className="bg-white border border-gray-200 text-gray-600 text-sm font-bold py-2.5 px-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm appearance-none cursor-pointer">
                  <option>Last 30 Days</option>
                  <option>This Week</option>
                  <option>This Year</option>
                </select>`;

const newCalendarPicker = `
                {/* Custom Date Range Picker */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className={\`flex items-center gap-2 bg-white border \${isDatePickerOpen ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'} text-primary text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:border-primary/50 transition\`}
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {selectedRange === 'Today' ? 'Today (Jul 16, 2026 - Jul 16, 2026)' : selectedRange}
                    <ChevronDown className={\`w-4 h-4 text-gray-400 transition-transform \${isDatePickerOpen ? 'rotate-180' : ''}\`} />
                  </button>

                  {isDatePickerOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-[24px] shadow-2xl border border-gray-100 flex overflow-hidden z-50 w-[550px] animate-[fade-in_0.2s_ease-out]">
                      
                      {/* Left Sidebar Presets */}
                      <div className="w-1/3 bg-gray-50/50 border-r border-gray-100 p-3 flex flex-col gap-1">
                        {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map(preset => (
                          <button 
                            key={preset}
                            onClick={() => { setSelectedRange(preset); setIsDatePickerOpen(false); }}
                            className={\`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition \${selectedRange === preset ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'}\`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>

                      {/* Right Calendar Area */}
                      <div className="w-2/3 p-6 bg-white">
                        <div className="flex items-center justify-between mb-6">
                          <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                          </button>
                          <h3 className="font-bold text-gray-900">July 2026</h3>
                          <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d} className="text-center text-xs font-bold text-gray-400">{d}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                          {/* Empty offset for July 1st (Wednesday) */}
                          <div></div><div></div><div></div>
                          
                          {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const isSelected = selectedRange === 'Today' && day === 16;
                            return (
                              <button 
                                key={day} 
                                className={\`h-10 rounded-xl flex items-center justify-center text-sm font-bold transition \${isSelected ? 'bg-[#1e293b] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}\`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                    </div>
                  )}
                </div>
`;

content = content.replace(oldSelect, newCalendarPicker);

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Custom calendar implemented');
