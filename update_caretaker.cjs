const fs = require('fs');

let content = fs.readFileSync('src/pages/CareTaker.jsx', 'utf8');

// Replacements
content = content.replace(/HomeCare\(\)/g, 'CareTaker()');
content = content.replace(/Compassionate Home Care,/g, 'Reliable Care Taker Services,');
content = content.replace(/Home Care That Comes to You/g, 'Care Takers You Can Trust');
content = content.replace(/Conditions We Support at Home/g, 'How Our Care Takers Can Help');
content = content.replace(/Home Care/g, 'Care Taker');
content = content.replace(/Home Nurse/g, 'Care Taker');
content = content.replace(/home nurse/g, 'care taker');
content = content.replace(/nurse/g, 'care taker');
content = content.replace(/Nurse/g, 'Care Taker');
content = content.replace(/nurses/g, 'care takers');
content = content.replace(/Nurses/g, 'Care Takers');
content = content.replace(/homecare-hero.png/g, 'caretaker-hero.png'); // placeholder
content = content.replace(/homecare-section.jpg/g, 'caretaker-section.jpg'); // placeholder

// More specific content adjustments
content = content.replace(
  /const conditions = \[\s*\{[\s\S]*?\];/m,
  `const conditions = [
    { icon: "👴", name: "Elderly Companionship", desc: "Friendly support for seniors" },
    { icon: "🛏️", name: "Bedridden Assistance", desc: "Turning, feeding, and hygiene" },
    { icon: "🚶", name: "Mobility Support", desc: "Help with walking & movement" },
    { icon: "💊", name: "Medication Reminders", desc: "Timely medicine management" },
    { icon: "🛁", name: "Personal Hygiene", desc: "Bathing and grooming help" },
    { icon: "🍎", name: "Feeding Assistance", desc: "Meal preparation and feeding" },
    { icon: "🏥", name: "Hospital Escort", desc: "Accompanying to appointments" },
    { icon: "🛒", name: "Basic Errands", desc: "Light errands & organization" }
  ];`
);

content = content.replace('Get comprehensive medical and daily living support from certified care takers and caregivers. Peace of mind for your loved ones.', 'Get comprehensive daily living support and companionship from verified care takers. Giving you peace of mind while your loved ones are well cared for.');
content = content.replace('Carevia connects you with compassionate, background-checked caregivers and care takers who provide continuous support tailored to your specific needs.', 'Carevia connects you with compassionate, background-checked care takers who provide dedicated round-the-clock or part-time support for your family.');
content = content.replace('Certified care takers at Your Doorstep', 'Verified Care Takers at Your Doorstep');

fs.writeFileSync('src/pages/CareTaker.jsx', content);
console.log('Updated CareTaker.jsx');
