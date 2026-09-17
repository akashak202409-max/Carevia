const fs = require('fs');

// 1. Fix Navbar.jsx breakpoints
let nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
nav = nav.replace(/hidden md:flex space-x-8/g, 'hidden lg:flex space-x-8');
nav = nav.replace(/hidden md:flex items-center space-x-4/g, 'hidden lg:flex items-center space-x-4');
nav = nav.replace(/md:hidden text-primary/g, 'lg:hidden text-primary');
nav = nav.replace(/md:hidden bg-white/g, 'lg:hidden bg-white');
fs.writeFileSync('src/components/Navbar.jsx', nav);
console.log('Navbar breakpoints updated to lg');

// 2. Fix ProfessionalOnboarding padding
let prof = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');
prof = prof.replace('pt-20', 'pt-28 lg:pt-36');
// Also fix sticky sidebar top offset to account for larger navbar
prof = prof.replace('sticky top-28', 'sticky top-32 lg:top-40');
fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', prof);
console.log('ProfessionalOnboarding padding fixed');

