const fs = require('fs');
let content = fs.readFileSync('src/pages/Login.jsx', 'utf8');

// Replace the two-button toggle with a three-button toggle or just a secret admin button?
// Let's make it a 3-button toggle for easy testing
const oldToggle = `<div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-10 shadow-inner">
              <button 
                onClick={() => setRole('patient')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'patient' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Patient Login
              </button>
              <button 
                onClick={() => setRole('doctor')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Doctor Login
              </button>
            </div>`;

const newToggle = `<div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-10 shadow-inner">
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
                Doctor
              </button>
              <button 
                onClick={() => setRole('admin')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Admin
              </button>
            </div>`;

if (content.includes(oldToggle)) {
  content = content.replace(oldToggle, newToggle);
} else {
  // Try fallback logic
  const fallbackOld = `<div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-10 shadow-inner">`;
  const fallbackNew = `<div className="bg-gray-100 p-1.5 rounded-2xl flex flex-wrap md:flex-nowrap items-center mb-10 shadow-inner gap-1">
              <button 
                onClick={() => setRole('patient')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'patient' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Patient Login
              </button>
              <button 
                onClick={() => setRole('doctor')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Doctor Login
              </button>
              <button 
                onClick={() => setRole('admin')}
                className={\`flex-1 py-3 text-sm font-bold rounded-xl transition-all \${role === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}\`}
              >
                Admin Login
              </button>
            </div>`;
  // I will just do a regex replace for the whole div
  const regex = /<div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-10 shadow-inner">[\s\S]*?<\/div>/;
  content = content.replace(regex, fallbackNew);
}

// Ensure navigate handles admin
const oldHandleSubmit = `if (role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }`;

const newHandleSubmit = `if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }`;

content = content.replace(oldHandleSubmit, newHandleSubmit);
fs.writeFileSync('src/pages/Login.jsx', content);
console.log('Login.jsx updated for Admin role');
