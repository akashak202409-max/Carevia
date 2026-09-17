const fs = require('fs');

// 1. Update App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(
  "import DoctorDashboard from './pages/DoctorDashboard.jsx';",
  "import DoctorDashboard from './pages/DoctorDashboard.jsx';\nimport ProfessionalOnboarding from './pages/ProfessionalOnboarding.jsx';"
);
app = app.replace(
  '<Route path="/doctor/dashboard" element={<DoctorDashboard />} />',
  '<Route path="/doctor/dashboard" element={<DoctorDashboard />} />\n        <Route path="/professional/onboarding" element={<ProfessionalOnboarding />} />'
);
fs.writeFileSync('src/App.jsx', app);

// 2. Update Login.jsx
let login = fs.readFileSync('src/pages/Login.jsx', 'utf8');
const oldButton = `<button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all mt-8 transform hover:-translate-y-0.5">
                  Continue Setup
                </button>`;
const newButton = `<Link to="/professional/onboarding" className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all mt-8 transform hover:-translate-y-0.5">
                  Continue Setup
                </Link>`;
login = login.replace(oldButton, newButton);
fs.writeFileSync('src/pages/Login.jsx', login);

console.log('Routes and Login linked successfully');
