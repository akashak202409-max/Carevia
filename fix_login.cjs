const fs = require('fs');
let content = fs.readFileSync('src/pages/Login.jsx', 'utf8');

// We need to inject a new state: `role` (patient | doctor)
content = content.replace("const [view, setView] = useState('login');", "const [view, setView] = useState('login');\n  const [role, setRole] = useState('patient');");

// Update left side text based on role
const leftTextOld = `<h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 leading-tight">
              Join India's Most Trusted Home Healthcare Network.
            </h1>
            <p className="text-primary-100 text-lg mb-12">
              Deliver quality care to patients at home, manage your practice effortlessly, and grow your career with Carevia.
            </p>`;

const leftTextNew = `{role === 'doctor' ? (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 leading-tight">
                  Join India's Most Trusted Home Healthcare Network.
                </h1>
                <p className="text-primary-100 text-lg mb-12">
                  Deliver quality care to patients at home, manage your practice effortlessly, and grow your career with Carevia.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 leading-tight">
                  Your Health, Expertly Managed at Home.
                </h1>
                <p className="text-primary-100 text-lg mb-12">
                  Book certified doctors, nurses, and physiotherapists who visit you at home. Manage your family's health seamlessly.
                </p>
              </>
            )}`;

content = content.replace(leftTextOld, leftTextNew);

// Now update the right side to add a toggle at the top of the form area
const rightSideStart = `<div className="w-full max-w-md mt-8 lg:mt-16">`;

const roleToggle = `<div className="w-full max-w-md mt-8 lg:mt-12">
            
            {/* Role Toggle */}
            <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-10 shadow-inner">
              <button 
                onClick={() => setRole('patient')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'patient' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Patient
              </button>
              <button 
                onClick={() => setRole('doctor')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Professional
              </button>
            </div>`;

content = content.replace(rightSideStart, roleToggle);

// Update welcome back text
const welcomeTextOld = `<p className="text-gray-500">Sign in to your professional dashboard.</p>`;
const welcomeTextNew = `<p className="text-gray-500">Sign in to your {role === 'doctor' ? 'professional dashboard' : 'account'}.</p>`;
content = content.replace(welcomeTextOld, welcomeTextNew);

// Update the registration options to handle both sides
const registrationOld = `<div className="space-y-4">
                  {/* Option 1 */}`;

const registrationNew = `<div className="space-y-4">
                  {role === 'patient' ? (
                    <label className="group relative block cursor-pointer rounded-2xl border-2 border-gray-100 bg-white p-6 hover:border-primary hover:bg-[#F0F4FF] transition-all shadow-sm hover:shadow-md">
                      <input type="radio" name="account_type" className="peer sr-only" defaultChecked />
                      <div className="flex gap-5 items-start">
                        <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-lg text-primary">Patient / Family Member</h3>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                              <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Book appointments, manage records, and request home care services.</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                    </label>
                  ) : (
                    <>
                  {/* Option 1 */}`;

content = content.replace(registrationOld, registrationNew);

const option2End = `</label>
                </div>`;
const option2EndNew = `</label>
                </>
                )}
                </div>`;
content = content.replace(option2End, option2EndNew);

fs.writeFileSync('src/pages/Login.jsx', content);
console.log('Login.jsx updated to support Patient and Doctor sides');
