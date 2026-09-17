const fs = require('fs');

const loginContent = `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Building2, ShieldCheck, CheckCircle, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Login() {
  const [view, setView] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 flex flex-col lg:flex-row pt-20 lg:pt-0">
        {/* Left Side: Visuals & Value Prop */}
        <div className="hidden lg:flex lg:w-5/12 bg-[#F0F4FF] relative flex-col justify-center p-12 lg:p-20 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-lg mt-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6 font-poppins">
              Join Carevia and Grow Your Healthcare Practice
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Connect with patients, manage appointments, and build your professional presence seamlessly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <span className="text-2xl">👩‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Expand Your Reach</h3>
                  <p className="text-sm text-gray-500 mt-1">Connect with thousands of patients seeking quality healthcare.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Smart Scheduling</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your availability, appointments, and clinics in one place.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Build Trust</h3>
                  <p className="text-sm text-gray-500 mt-1">Gather verified reviews and showcase your expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="w-full lg:w-7/12 flex items-center justify-center p-6 lg:p-20 bg-white min-h-[calc(100vh-80px)] lg:min-h-screen">
          <div className="w-full max-w-md mt-8 lg:mt-16">
            
            {view === 'login' ? (
              <div className="animate-[fade-in_0.4s_ease-out]">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-primary mb-3 font-poppins">Welcome Back</h2>
                  <p className="text-gray-500">Sign in to your professional dashboard.</p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email or Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter your email or phone" 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-gray-700">Password</label>
                      <a href="#" className="text-sm font-bold text-secondary hover:text-secondary-hover transition-colors">Forgot Password?</a>
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>

                  <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                    Login
                  </button>
                </form>

                <div className="mt-10 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setView('register')} 
                      className="font-bold text-secondary hover:text-secondary-hover transition-colors"
                    >
                      Register
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate-[fade-in_0.4s_ease-out]">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-primary mb-3 font-poppins">Join Carevia</h2>
                  <p className="text-gray-500">How would you like to register?</p>
                </div>

                <div className="space-y-4">
                  {/* Option 1 */}
                  <label className="group relative block cursor-pointer rounded-2xl border-2 border-gray-100 bg-white p-6 hover:border-primary hover:bg-[#F0F4FF] transition-all shadow-sm hover:shadow-md">
                    <input type="radio" name="account_type" className="peer sr-only" />
                    <div className="flex gap-5 items-start">
                      <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                        <UserPlus className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg text-primary">Healthcare Professional</h3>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                            <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Doctor, Physiotherapist, Homeopath, Nurse, Care Taker, etc.</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </label>

                  {/* Option 2 */}
                  <label className="group relative block cursor-pointer rounded-2xl border-2 border-gray-100 bg-white p-6 hover:border-primary hover:bg-[#F0F4FF] transition-all shadow-sm hover:shadow-md">
                    <input type="radio" name="account_type" className="peer sr-only" />
                    <div className="flex gap-5 items-start">
                      <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg text-primary">Clinic / Hospital</h3>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                            <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Manage multiple staff members, clinic resources and appointments.</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </label>
                </div>

                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all mt-8 transform hover:-translate-y-0.5">
                  Continue Setup
                </button>

                <div className="flex items-center justify-center gap-6 mt-10 text-xs font-bold text-gray-400">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-500" /> Verified</div>
                  <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-gray-500" /> Trusted</div>
                </div>

                <div className="mt-8 text-center pt-8 border-t border-gray-100">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setView('login')} 
                      className="font-bold text-secondary hover:text-secondary-hover transition-colors"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Add simple Check icon since we didn't import it directly from lucide for the radio button
function Check(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
`;

fs.writeFileSync('src/pages/Login.jsx', loginContent);
console.log('Login.jsx created successfully.');

// Link it in App.jsx
let appContent = fs.readFileSync('src/App.jsx', 'utf8');
if (!appContent.includes('import Login')) {
  appContent = appContent.replace("import Doctors from './pages/Doctors.jsx';", "import Doctors from './pages/Doctors.jsx';\nimport Login from './pages/Login.jsx';");
  appContent = appContent.replace('<Route path="/doctors" element={<Doctors />} />', '<Route path="/doctors" element={<Doctors />} />\n        <Route path="/login" element={<Login />} />');
  fs.writeFileSync('src/App.jsx', appContent);
  console.log('App.jsx updated with /login route.');
}

