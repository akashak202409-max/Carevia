const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Ensure useLocation is imported
if (!content.includes('useLocation')) {
  content = content.replace("import { Link } from 'react-router-dom';", "import { Link, useLocation } from 'react-router-dom';");
}

// Add location hook
if (!content.includes('const location = useLocation();')) {
  content = content.replace("const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);", "const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);\n  const location = useLocation();");
}

// Replace static toggle buttons with dynamic ones based on location.pathname
const oldToggle = `<div className="bg-gray-100 p-1 rounded-full flex items-center mr-2">
              <button className="px-4 py-1.5 rounded-full text-sm font-bold bg-white text-[#1E3A8A] shadow-sm">I want to hire</button>
              <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-[#1E3A8A] transition">I'm a professional</button>
            </div>`;

const newToggle = `<div className="bg-gray-100 p-1 rounded-full flex items-center mr-2">
              <Link to="/hire-professional" className={\`px-4 py-1.5 rounded-full text-sm font-bold transition \${location.pathname === '/hire-professional' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-gray-500 hover:text-[#1E3A8A]'}\`}>
                I want to hire
              </Link>
              <Link to="/jobs" className={\`px-4 py-1.5 rounded-full text-sm font-bold transition \${location.pathname === '/jobs' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-gray-500 hover:text-[#1E3A8A]'}\`}>
                I'm a professional
              </Link>
            </div>`;

content = content.replace(oldToggle, newToggle);

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Fixed Navbar Toggle');
