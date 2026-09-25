const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// 1. Add imports
if (!content.includes('import { getCurrentUser, getDoctors }')) {
  content = content.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { getCurrentUser, getDoctors } from '../utils/storage';"
  );
}

// 2. Add state for doctor status
if (!content.includes('const [doctorStatus, setDoctorStatus]')) {
  content = content.replace(
    'const [activeTab, setActiveTab] = useState("Dashboard");',
    `const [activeTab, setActiveTab] = useState("Dashboard");
  const [doctorStatus, setDoctorStatus] = useState("ACTIVE");
  
  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === 'doctor') {
      const doctors = getDoctors();
      const me = doctors.find(d => d.id === user.doctorId);
      if (me && me.status) {
        setDoctorStatus(me.status);
      }
    }
  }, []);`
  );
}

// 3. Inject Banner
const mainDivRegex = /<main className="flex-1 bg-gray-50 min-h-screen">/;
if (content.match(mainDivRegex)) {
  const bannerHTML = `
      <main className="flex-1 bg-gray-50 min-h-screen">
        {doctorStatus === 'PENDING' && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-8 py-3 flex items-center justify-center gap-3 animate-[fade-in_0.5s_ease-out]">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 text-sm font-medium">Your profile is currently under review by an Administrator. You cannot receive appointments until approved.</p>
          </div>
        )}
        {doctorStatus === 'REJECTED' && (
          <div className="bg-red-50 border-b border-red-200 px-8 py-3 flex items-center justify-center gap-3 animate-[fade-in_0.5s_ease-out]">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 text-sm font-medium">Your profile application was rejected. Please contact support.</p>
          </div>
        )}`;
  
  // Need to import AlertCircle if not imported
  if (!content.includes('AlertCircle')) {
    content = content.replace(
      'import { CheckCircle, Clock, Calendar as CalendarIcon',
      'import { CheckCircle, Clock, Calendar as CalendarIcon, AlertCircle'
    );
  }
  
  content = content.replace(mainDivRegex, bannerHTML);
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
  console.log('Successfully added PENDING status banner to DoctorDashboard');
}
