const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

// Import hooks and storage
if (!content.includes('useNavigate')) {
  content = content.replace(
    "import { Link } from 'react-router-dom';",
    "import { Link, useNavigate } from 'react-router-dom';\nimport { getDoctors, saveDoctors, saveCurrentUser } from '../utils/storage';"
  );
}

// Add state for basic inputs to save (we'll just use a mock name if they didn't fill it out, but they should have filled Step 1)
// Let's add handleComplete
const hookRegex = /const \[step, setStep\] = useState\(1\);/;
if (content.match(hookRegex) && !content.includes('const handleComplete')) {
  content = content.replace(
    'const [step, setStep] = useState(1);',
    `const [step, setStep] = useState(1);\n  const navigate = useNavigate();
    
  const handleComplete = () => {
    // Save to global doctors array as PENDING
    const doctors = getDoctors();
    const newDoctor = {
      id: Date.now(),
      name: "Dr. New Professional", // Hardcoded mock for now since we don't have controlled inputs for everything
      spec: "General Physician",
      isDoctor: true,
      rating: "0.0",
      exp: "0 Years",
      loc: selectedCity || "Chennai",
      clinicFee: 500,
      onlineFee: 300,
      img: "https://randomuser.me/api/portraits/lego/1.jpg",
      status: "PENDING",
      schedule: schedule
    };
    
    saveDoctors([...doctors, newDoctor]);
    saveCurrentUser({ role: 'doctor', doctorId: newDoctor.id });
    
    navigate('/doctor/dashboard');
  };`
  );
}

// Replace the Link with a button
const oldLink = '<Link to="/doctor/dashboard" className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md text-center inline-block">\n                      Save Availability & Go to Dashboard\n                    </Link>';
const newButton = '<button onClick={handleComplete} className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md text-center inline-block">\n                      Save Availability & Go to Dashboard\n                    </button>';

if (content.includes(oldLink)) {
  content = content.replace(oldLink, newButton);
  fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
  console.log('Successfully updated onboarding submission logic.');
} else {
  console.log('Failed to find old Link');
}
