const fs = require('fs');

// Update App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
if (!app.includes("import Doctors")) {
  app = app.replace("import BHS from './pages/BHS.jsx';", "import BHS from './pages/BHS.jsx';\nimport Doctors from './pages/Doctors.jsx';");
  app = app.replace('<Route path="/bhs" element={<BHS />} />', '<Route path="/bhs" element={<BHS />} />\n        <Route path="/doctors" element={<Doctors />} />');
  fs.writeFileSync('src/App.jsx', app);
  console.log('App.jsx updated');
}

// Update Navbar.jsx
let nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
const desktopBlog = '<Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>';
nav = nav.replace(
  desktopBlog, 
  '<Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>\n              <Link to="/doctors" className="font-medium text-primary hover:text-primary transition">Doctors</Link>'
);
fs.writeFileSync('src/components/Navbar.jsx', nav);
console.log('Navbar updated');
