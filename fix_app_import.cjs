const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

if (!content.includes('import PatientDashboard')) {
  content = content.replace(
    "import DoctorDashboard from './pages/DoctorDashboard.jsx';",
    "import DoctorDashboard from './pages/DoctorDashboard.jsx';\nimport PatientDashboard from './pages/PatientDashboard.jsx';"
  );
  fs.writeFileSync('src/App.jsx', content);
  console.log('Fixed import');
}
