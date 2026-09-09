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
    
    // Add import if not present
    if (!content.includes('AnimatedCTA')) {
      content = content.replace(/import Navbar from '\.\.\/components\/Navbar';/g, "import Navbar from '../components/Navbar';\nimport AnimatedCTA from '../components/AnimatedCTA';");
    }

    // Replace the specific solid button
    content = content.replace(
      /<button className="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-xl font-medium text-base transition shadow-md transform hover:-translate-y-0.5">\s*Book a Session — ₹500 onwards\s*<\/button>/g,
      '<AnimatedCTA>\n              Book a Session — ₹500 onwards\n            </AnimatedCTA>'
    );
    
    fs.writeFileSync(file, content);
  }
});
console.log('Updated to use AnimatedCTA');
