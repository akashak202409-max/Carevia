const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// The new desktop links layout
const desktopLinks = `          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/" className="font-medium text-primary hover:text-primary transition">Home</Link>
            <div className="relative group">
              <button className="text-primary hover:text-secondary font-medium transition flex items-center gap-1">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <div className="flex flex-col py-2">
                  <Link to="/physiotherapy" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Physiotherapy</Link>
                  <Link to="/home-care" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Home Care</Link>
                  <Link to="/care-taker" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Care Taker</Link>
                  <Link to="/doctor-visit" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Doctor Visit</Link>
                </div>
              </div>
            </div>
            <Link to="/hire" className="font-bold text-secondary hover:opacity-80 transition">Hire a Pro</Link>
            <Link to="/jobs" className="font-medium text-primary hover:text-primary transition">Find Jobs</Link>
            <Link to="/about" className="font-medium text-primary hover:text-primary transition">About</Link>
            <Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="bg-gray-100 p-1 rounded-full flex text-sm font-bold mr-2">
              <button className="bg-white text-primary px-4 py-1.5 rounded-full shadow-sm">I want to hire</button>
              <button className="text-gray-500 hover:text-primary px-4 py-1.5 rounded-full transition">I'm a professional</button>
            </div>
            <Link to="/login" className="font-medium text-primary hover:text-primary transition">Login</Link>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-6 py-2.5 rounded-full font-bold transition shadow-md whitespace-nowrap"
            >
              Post Requirement
            </button>
          </div>`;

// Replace desktop links
content = content.replace(/<div className="hidden md:flex items-center gap-8">[\s\S]*?<\/div>[\s\S]*?<div className="hidden md:flex items-center space-x-4">[\s\S]*?<\/div>/, desktopLinks);

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Navbar updated');
