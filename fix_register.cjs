const fs = require('fs');

let content = fs.readFileSync('src/pages/Login.jsx', 'utf8');

const regex = /<div className="animate-\[fade-in_0\.4s_ease-out\]">\s*<div className="text-center mb-10">\s*<h2 className="text-3xl font-bold text-primary mb-3 font-poppins">Join Carevia<\/h2>[\s\S]*?<div className="mt-8 text-center pt-8 border-t border-gray-100">/m;

const newRegisterBlock = `<div className="animate-[fade-in_0.4s_ease-out]">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-primary mb-3 font-poppins">Create Account</h2>
                  <p className="text-gray-500">Sign up as a {role === 'doctor' ? 'healthcare professional' : 'patient'}.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email or Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter your email or phone" 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>

                  {role === 'doctor' ? (
                    <Link to="/professional/onboarding" className="block text-center w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                      Create Account
                    </Link>
                  ) : (
                    <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                      Create Account
                    </button>
                  )}
                </form>

                <div className="flex items-center justify-center gap-6 mt-10 text-xs font-bold text-gray-400">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-500" /> Verified</div>
                  <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-gray-500" /> Trusted</div>
                </div>

                <div className="mt-8 text-center pt-8 border-t border-gray-100">`;

content = content.replace(regex, newRegisterBlock);
fs.writeFileSync('src/pages/Login.jsx', content);
console.log('Registration block replaced successfully');
