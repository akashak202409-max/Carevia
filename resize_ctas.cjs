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
    
    // Solid Button
    content = content.replace(
      /className="bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg transform hover:-translate-y-0\.5"/g,
      'className="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-xl font-medium text-base transition shadow-md transform hover:-translate-y-0.5"'
    );
    
    // Outline Button
    content = content.replace(
      /className="bg-transparent border-2 border-primary text-primary hover:bg-\[#F0F4FF\] px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"/g,
      'className="bg-transparent border-2 border-primary text-primary hover:bg-[#F0F4FF] px-6 py-3 rounded-xl font-medium text-base transition flex items-center justify-center gap-2"'
    );
    
    fs.writeFileSync(file, content);
  }
});
console.log('Resized CTAs on all service pages');
