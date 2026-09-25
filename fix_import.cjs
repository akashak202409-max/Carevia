const fs = require('fs');
let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

if (!content.includes('AlertCircle') && content.includes('AlertCircle className')) {
  // Try finding lucide-react import and add it
  content = content.replace(
    /import { (.*) } from 'lucide-react';/,
    "import { AlertCircle, $1 } from 'lucide-react';"
  );
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
}
