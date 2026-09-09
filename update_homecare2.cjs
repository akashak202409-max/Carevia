const fs = require('fs');

let content = fs.readFileSync('src/pages/HomeCare.jsx', 'utf8');

// Replace conditions
content = content.replace(
  /const conditions = \[\s*\{[\s\S]*?\];/m,
  `const conditions = [
    { icon: "👵", name: "Elderly Care", desc: "Compassionate daily assistance" },
    { icon: "🏥", name: "Post-Surgery Care", desc: "Wound dressing & medication" },
    { icon: "🧠", name: "Dementia & Alzheimer's", desc: "Specialized cognitive support" },
    { icon: "🛏️", name: "Bedridden Care", desc: "Hygiene, feeding & turning" },
    { icon: "❤️", name: "Cardiac Care", desc: "Vitals monitoring at home" },
    { icon: "🤱", name: "Mother & Baby Care", desc: "Post-natal support" },
    { icon: "💉", name: "Injections & IV", desc: "Administered by qualified nurses" },
    { icon: "♿", name: "Mobility Assistance", desc: "Help with daily movement" }
  ];`
);

// Replace features
content = content.replace('Expert Home Care, <br/>Delivered to Your Home.', 'Compassionate Home Care,<br/>Right Where You Belong.');

fs.writeFileSync('src/pages/HomeCare.jsx', content);
console.log('Updated HomeCare conditions.');
