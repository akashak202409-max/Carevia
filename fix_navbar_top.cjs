const fs = require('fs');

let nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
nav = nav.replace(
  '<nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? \'bg-white shadow-md py-3\' : \'bg-transparent py-5\'}`}>',
  '<nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? \'bg-white shadow-md py-3\' : \'bg-transparent py-5\'}`}>'
);
fs.writeFileSync('src/components/Navbar.jsx', nav);
console.log('Added top-0 left-0 to Navbar');
