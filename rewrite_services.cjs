const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Update the services array to add images
const servicesArrayReplacement = `const services = [
  {
    title: "Physiotherapy",
    desc: "Recover from pain, injury, or surgery with certified physios at home",
    price: "Starts at ₹500/session",
    icon: <Activity className="w-8 h-8 text-primary" />,
    action: "Book Physio",
    bgColor: "bg-green-50",
    link: "/physiotherapy",
    img: "https://images.unsplash.com/photo-1598256989785-5c207b5a266b?w=600&h=800&fit=crop"
  },
  {
    title: "Home Care",
    desc: "Full-time medical care and daily support for patients recovering at home",
    price: "Starts at ₹1,200/day",
    icon: <HomeIcon className="w-8 h-8 text-primary" />,
    action: "Explore Home Care",
    bgColor: "bg-blue-50",
    link: "/home-care",
    img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=800&fit=crop"
  },
  {
    title: "Care Taker",
    desc: "Trained attendants for elderly, post-op, and bedridden patients",
    price: "Starts at ₹800/day",
    icon: <Users className="w-8 h-8 text-primary" />,
    action: "Hire Care Taker",
    bgColor: "bg-yellow-50",
    link: "/care-taker",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=800&fit=crop"
  },
  {
    title: "Doctor Visit",
    desc: "Get expert medical consultation and treatment without visiting a clinic",
    price: "Starts at ₹999/visit",
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
    action: "Book Doctor",
    bgColor: "bg-red-50",
    link: "/doctor-visit",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=800&fit=crop"
  }
];`;

content = content.replace(/const services = \[[\s\S]*?\];/m, servicesArrayReplacement);

const sectionRegex = /<section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">[\s\S]*?<\/section>/m;

const newSection = `<section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 text-secondary font-medium mb-4">
              <span className="w-4 h-0.5 bg-secondary"></span> Services We Offer
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-primary leading-[1.1]">
              Care that<br/>comes to you
            </h2>
          </div>
          
          <div className="md:w-1/3 flex flex-col justify-end md:pt-12">
            <p className="text-gray-600 mb-6 font-medium">
              From medical checkups and physiotherapy to full-time caregiving, we've got you covered. Choose reliability, choose Carevia.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#services" className="text-secondary font-semibold flex items-center gap-2 hover:opacity-80 transition">
                View All Services <ChevronRight className="w-4 h-4" />
              </a>
              <button onClick={() => setIsBookingModalOpen(true)} className="text-secondary font-semibold flex items-center gap-2 hover:opacity-80 transition">
                Call For Booking <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <Link to={svc.link} key={idx} className="group block relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100">
              <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
              
              <div className="absolute bottom-6 left-6 right-20 z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{svc.title}</h3>
              </div>
              
              <div className="absolute -bottom-1 -right-1 bg-[#F7FAFC] p-2.5 rounded-tl-[32px] z-20">
                <div className={\`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md \${idx === 0 ? 'bg-yellow-400 text-black' : 'bg-[#2A1617] text-white group-hover:bg-yellow-400 group-hover:text-black'}\`}>
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>`;

content = content.replace(sectionRegex, newSection);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Replaced services section');
