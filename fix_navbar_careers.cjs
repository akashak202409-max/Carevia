const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Replace "How It Works" with "For Professionals" leading to /careers
content = content.replace(/<a href="\/#how-it-works" className="font-medium text-primary">How It Works<\/a>/g, '<Link to="/careers" className="font-medium text-[#E87070] font-bold">For Professionals</Link>');
content = content.replace(/<a href="\/#how-it-works" className="text-primary hover:text-secondary font-medium transition">How It Works<\/a>/g, '<Link to="/careers" className="text-[#E87070] hover:text-primary font-bold transition">For Professionals</Link>');

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Added Careers link to Navbar');
