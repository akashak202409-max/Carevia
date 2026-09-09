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
    
    // Check if AnimatedCTA is imported
    if (!content.includes('AnimatedCTA')) {
      content = content.replace(
        "import Navbar from '../components/Navbar';",
        "import Navbar from '../components/Navbar';\nimport AnimatedCTA from '../components/AnimatedCTA';"
      );
    }
    
    // Replace solid button with AnimatedCTA
    content = content.replace(
      /<button className="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-xl font-medium text-base transition shadow-md transform hover:-translate-y-0\.5">([\s\S]*?)<\/button>/g,
      '<AnimatedCTA className="bg-secondary text-white px-6 py-3 rounded-xl font-medium text-base transition shadow-md">$1</AnimatedCTA>'
    );
    
    fs.writeFileSync(file, content);
  }
});
console.log('Replaced CTAs with AnimatedCTA');
