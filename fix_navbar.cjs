const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Replace standard links
content = content.replace(/<a href="\/#about".*?>About<\/a>/g, '<Link to="/about" className="font-medium text-primary hover:text-primary transition">About</Link>');
content = content.replace(/<a href="\/#blog".*?>Blog<\/a>/g, '<Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>');
content = content.replace(/<button className="font-medium text-primary hover:text-primary transition">Login<\/button>/g, '<Link to="/login" className="font-medium text-primary hover:text-primary transition">Login</Link>');
content = content.replace(/<button className="font-medium text-left text-primary">Login<\/button>/g, '<Link to="/login" className="font-medium text-left text-primary hover:text-primary transition">Login</Link>');

// Make sure top-level navigation matches the new structure
// In the desktop menu
content = content.replace(/<Link to="\/about" className="text-primary hover:text-secondary font-medium transition">About<\/Link>/, '');
content = content.replace(/<a href="#blog" className="text-primary hover:text-secondary font-medium transition">Blog<\/a>/, '<Link to="/blog" className="text-primary hover:text-secondary font-medium transition">Blog</Link>');

// Replace mobile links
content = content.replace(/<a href="#about".*?>About<\/a>/g, '<Link to="/about" className="font-medium text-primary">About</Link>');
content = content.replace(/<a href="#blog".*?>Blog<\/a>/g, '<Link to="/blog" className="font-medium text-primary">Blog</Link>');

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Fixed Navbar links');
