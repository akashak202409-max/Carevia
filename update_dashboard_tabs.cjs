const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// 1. Add activeTab state
content = content.replace(
  'const [selectedRange, setSelectedRange] = React.useState(\'Today\');',
  `const [selectedRange, setSelectedRange] = React.useState('Today');\n  const [activeTab, setActiveTab] = React.useState('Dashboard');`
);

// 2. Update Sidebar mapping to use activeTab
content = content.replace(
  `{[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'My Profile', icon: User },
            { name: 'Appointments', icon: Calendar },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Reviews', icon: Star },
            { name: 'Messages', icon: MessageSquare },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <a 
              key={item.name} 
              href="#" 
              className={\`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition \${item.active ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}\`}
            >`,
  `{[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'My Profile', icon: User },
            { name: 'Appointments', icon: Calendar },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Reviews', icon: Star },
            { name: 'Messages', icon: MessageSquare },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition \${activeTab === item.name ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}\`}
            >`
);
content = content.replace(
  `            </a>\n          ))}`,
  `            </button>\n          ))}`
);

// 3. Wrap current Dashboard content in an activeTab condition, and add My Profile content
const oldHeaderStart = `{/* Header Area */}`;
const oldContentStart = `<div className="max-w-7xl mx-auto space-y-8">`;
const oldContentEnd = `</div>\n        </div>\n      </main>`;

const profileContent = `
            {activeTab === 'My Profile' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1">My Profile</h1>
                  <p className="text-gray-500 font-medium">Manage your personal and professional information.</p>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-6">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-primary/10" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dr. Priya Sharma</h2>
                        <p className="text-primary font-bold mb-1">Homeopathy Doctor • Skin & Allergy</p>
                        <p className="text-sm text-gray-500 font-medium">8 Years Experience • English, Hindi, Tamil</p>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-sm transition">
                      Edit Profile
                    </button>
                  </div>

                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Consultation Fees */}
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> Consultation Fees</h3>
                      <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Home Consultation</span>
                          <span className="font-bold text-gray-900">₹800</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Online Consultation</span>
                          <span className="font-bold text-gray-900">₹500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-500">Clinic Consultation</span>
                          <span className="font-bold text-gray-900">₹600</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><LayoutDashboard className="w-5 h-5" /> Bank Details</h3>
                      <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Bank Name</span>
                          <span className="font-bold text-gray-900">HDFC Bank</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Account No.</span>
                          <span className="font-bold text-gray-900">••••••••1234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-500">IFSC Code</span>
                          <span className="font-bold text-gray-900 uppercase">HDFC0001234</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2"><User className="w-5 h-5" /> Clinic Information</h3>
                    <button className="text-sm font-bold text-secondary hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Clinic Name</p>
                      <p className="font-bold text-gray-800">Carevia Health Clinic</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="font-bold text-gray-800">+91 98765 43210</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="font-bold text-gray-800">123 Health Avenue, Block B, Chennai, Tamil Nadu</p>
                    </div>
                  </div>
                </div>
                
              </div>
            )}
`;

content = content.replace(
  '<div className="max-w-7xl mx-auto space-y-8">',
  `<div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'Dashboard' && (
              <>`
);

content = content.replace(
  `            </div>\n            \n          </div>\n        </div>\n      </main>`,
  `            </div>\n              </>\n            )}\n${profileContent}\n          </div>\n        </div>\n      </main>`
);

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Profile tab integrated successfully');
