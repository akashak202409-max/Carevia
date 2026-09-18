const fs = require('fs');
let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

// 1. Add state for profession
content = content.replace(
  'const [step, setStep] = useState(2);',
  'const [step, setStep] = useState(2);\n  const [profession, setProfession] = useState("");\n  const skipClinic = profession === "Nurse" || profession === "Caretaker";'
);

// 2. Replace steps array logic
const oldSteps = `  const steps = [
    { num: 1, title: 'Account', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { num: 2, title: 'Profile', icon: step > 2 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold \${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}\`}>2</div> },
    { num: 3, title: 'Clinic', icon: step > 3 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold \${step === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}\`}>3</div> },
    { num: 4, title: 'Verification', icon: step > 4 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold \${step === 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}\`}>4</div> },
    { num: 5, title: 'Availability', icon: <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold \${step === 5 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}\`}>5</div> },
  ];`;

const newSteps = `  const baseSteps = [
    { id: 1, title: 'Account' },
    { id: 2, title: 'Profile' },
    { id: 3, title: 'Clinic' },
    { id: 4, title: 'Verification' },
    { id: 5, title: 'Availability' },
  ];

  const visibleSteps = baseSteps.filter(s => !(skipClinic && s.id === 3));
  
  const steps = visibleSteps.map((s, index) => {
    const seqNum = index + 1;
    const isPast = step > s.id;
    const isCurrent = step === s.id;
    
    let icon;
    if (s.id === 1 || isPast) {
      icon = <CheckCircle className="w-5 h-5 text-green-500" />;
    } else {
      icon = <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold \${isCurrent ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}\`}>{seqNum}</div>;
    }
    
    return { id: s.id, num: s.id, title: s.title, icon };
  });`;

content = content.replace(oldSteps, newSteps);

// 3. Update select binding
content = content.replace(
  '<select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">',
  '<select value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">'
);

// 4. Update Step 2 "Save & Continue" button
content = content.replace(
  '<button onClick={() => setStep(3)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">',
  '<button onClick={() => setStep(skipClinic ? 4 : 3)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">'
);

// 5. Update Step 4 "Back" button
content = content.replace(
  '<button onClick={() => setStep(3)} className="bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 px-8 py-3.5 rounded-xl font-bold transition-all">\n                    Back',
  '<button onClick={() => setStep(skipClinic ? 2 : 3)} className="bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 px-8 py-3.5 rounded-xl font-bold transition-all">\n                    Back'
);

fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
console.log('Dynamic Clinic step removal logic applied');
