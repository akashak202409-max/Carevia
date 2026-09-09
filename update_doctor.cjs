const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorVisit.jsx', 'utf8');

// Replacements
content = content.replace(/HomeCare\(\)/g, 'DoctorVisit()');
content = content.replace(/Compassionate Home Care,/g, 'Expert Doctor Visits,');
content = content.replace(/Home Care That Comes to You/g, 'Expert Doctors At Your Doorstep');
content = content.replace(/Conditions We Support at Home/g, 'Conditions Our Doctors Treat');
content = content.replace(/Home Care/g, 'Doctor Visit');
content = content.replace(/Home Nurse/g, 'Doctor');
content = content.replace(/home nurse/g, 'doctor');
content = content.replace(/nurse/g, 'doctor');
content = content.replace(/Nurse/g, 'Doctor');
content = content.replace(/nurses/g, 'doctors');
content = content.replace(/Nurses/g, 'Doctors');
content = content.replace(/homecare-hero.png/g, 'doctor-hero.png'); // placeholder
content = content.replace(/nurse-section.png/g, 'doctor-section.jpg'); // placeholder

// More specific content adjustments
content = content.replace(
  /const conditions = \[\s*\{[\s\S]*?\];/m,
  `const conditions = [
    { icon: "🤒", name: "Fever & Infections", desc: "Diagnosis & treatment for seasonal illnesses" },
    { icon: "🩺", name: "General Checkup", desc: "Routine health assessment & vitals" },
    { icon: "🍬", name: "Diabetes Management", desc: "Blood sugar tracking & prescriptions" },
    { icon: "❤️", name: "Hypertension", desc: "BP monitoring & cardiovascular care" },
    { icon: "👴", name: "Geriatric Care", desc: "Specialized care for elderly patients" },
    { icon: "🩹", name: "Minor Injuries", desc: "First aid, wound care, & dressing" },
    { icon: "🤧", name: "Respiratory Issues", desc: "Asthma & allergy management" },
    { icon: "📋", name: "Lab Test Referrals", desc: "Prescribing necessary diagnostics" }
  ];`
);

content = content.replace('Get comprehensive medical and daily living support from certified doctors and caregivers. Peace of mind for your loved ones.', 'Skip the hospital waiting rooms. Get comprehensive medical consultations and treatments from certified doctors in the comfort of your own home.');
content = content.replace('Carevia connects you with compassionate, background-checked caregivers and doctors who provide continuous support tailored to your specific needs.', 'Carevia connects you with experienced, background-checked doctors who bring professional medical care directly to you, saving you time and travel.');
content = content.replace('Certified doctors at Your Doorstep', 'Verified Doctors at Your Doorstep');

fs.writeFileSync('src/pages/DoctorVisit.jsx', content);
console.log('Updated DoctorVisit.jsx');
