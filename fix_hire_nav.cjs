const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Replace standard links in desktop menu
const oldLinks = `            <Link to="/" className="font-medium text-primary hover:text-primary transition">Home</Link>
            <div className="relative group">
              <button className="text-primary hover:text-secondary font-medium transition flex items-center gap-1">
                Services <ChevronDownIcon className="w-4 h-4" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 overflow-hidden">
                <div className="py-2 flex flex-col">
                  <Link to="/physiotherapy" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Physiotherapy</Link>
                  <Link to="/home-care" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Home Care</Link>
                  <Link to="/care-taker" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Care Taker</Link>
                  <Link to="/doctor-visit" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Doctor Visit</Link>
                </div>
              </div>
            </div>
            <a href="/#how-it-works" className="text-primary hover:text-secondary font-medium transition">How It Works</a>
            <Link to="/about" className="font-medium text-primary hover:text-primary transition">About</Link>
            <Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>`;

const newLinks = `            <Link to="/" className="font-medium text-primary hover:text-[#E87070] transition">Home</Link>
            <div className="relative group">
              <button className="text-primary hover:text-[#E87070] font-medium transition flex items-center gap-1">
                Services <ChevronDownIcon className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 overflow-hidden">
                <div className="py-2 flex flex-col">
                  <Link to="/physiotherapy" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Physiotherapy</Link>
                  <Link to="/home-care" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Home Care</Link>
                  <Link to="/care-taker" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Care Taker</Link>
                  <Link to="/doctor-visit" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Doctor Visit</Link>
                </div>
              </div>
            </div>
            <Link to="/hire-professional" className="font-medium text-[#E87070] transition">Hire a Pro</Link>
            <Link to="/jobs" className="font-medium text-primary hover:text-[#E87070] transition">Find Jobs</Link>
            <Link to="/about" className="font-medium text-primary hover:text-[#E87070] transition">About</Link>
            <Link to="/blog" className="font-medium text-primary hover:text-[#E87070] transition">Blog</Link>`;

content = content.replace(oldLinks, newLinks);

const oldRight = `          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="font-medium text-primary hover:text-primary transition">Login</Link>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-secondary hover:bg-secondary-hover text-white px-6 py-2.5 rounded-full font-medium transition shadow-md"
            >
              Book Now
            </button>
          </div>`;

const newRight = `          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-gray-100 p-1 rounded-full flex items-center mr-2">
              <button className="px-4 py-1.5 rounded-full text-sm font-bold bg-white text-[#1E3A8A] shadow-sm">I want to hire</button>
              <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-[#1E3A8A] transition">I'm a professional</button>
            </div>
            <Link to="/login" className="font-bold text-primary hover:text-[#E87070] transition">Login</Link>
            <button className="bg-[#E87070] hover:bg-[#d66161] text-white px-6 py-2.5 rounded-full font-bold transition shadow-md">
              Post Requirement
            </button>
          </div>`;

content = content.replace(oldRight, newRight);

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Fixed Navbar');
