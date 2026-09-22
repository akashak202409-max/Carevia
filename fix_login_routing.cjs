const fs = require('fs');
let content = fs.readFileSync('src/pages/Login.jsx', 'utf8');

const oldLoginBtn = `<button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                    Login
                  </button>`;

const newLoginBtns = `{role === 'doctor' ? (
                    <Link to="/doctor/dashboard" className="block text-center w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                      Login
                    </Link>
                  ) : (
                    <Link to="/patient/dashboard" className="block text-center w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                      Login
                    </Link>
                  )}`;

content = content.replace(oldLoginBtn, newLoginBtns);
fs.writeFileSync('src/pages/Login.jsx', content);
console.log('Login routing fixed.');
