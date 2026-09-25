const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Import AdminDashboard
if (!content.includes('AdminDashboard')) {
  content = content.replace(
    "import DoctorDashboard from './pages/DoctorDashboard';",
    "import DoctorDashboard from './pages/DoctorDashboard';\nimport AdminDashboard from './pages/AdminDashboard';"
  );
  
  // Add Route
  content = content.replace(
    "<Route path=\"/doctor/dashboard\" element={<DoctorDashboard />} />",
    "<Route path=\"/doctor/dashboard\" element={<DoctorDashboard />} />\n        <Route path=\"/admin/dashboard\" element={<AdminDashboard />} />"
  );
  
  fs.writeFileSync('src/App.jsx', content);
  console.log('Admin route added to App.jsx');
}
