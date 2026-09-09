const fs = require('fs');

const files = [
  'src/pages/Physiotherapy.jsx',
  'src/pages/HomeCare.jsx',
  'src/pages/CareTaker.jsx',
  'src/pages/DoctorVisit.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <AnimatedCTA className="..."> with <AnimatedCTA>
    content = content.replace(/<AnimatedCTA className="[^"]*">/g, '<AnimatedCTA>');
    
    fs.writeFileSync(file, content);
  }
});
console.log('Stripped className from AnimatedCTA');
