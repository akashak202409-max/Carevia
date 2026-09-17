const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

const target = '<Link to="/doctors" className="font-medium text-primary hover:text-primary transition">Doctors</Link>';
content = content.replace(target, '');

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Removed Doctors link from Navbar');
