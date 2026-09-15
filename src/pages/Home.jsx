import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, Leaf, Menu, X, Search, MapPin, 
  CheckCircle, Shield, Phone, Activity,
  Home as HomeIcon, Users, Stethoscope, ChevronRight, MessageCircle, ChevronDown,
  Sun, Laptop, Building2, Film, Landmark, GraduationCap, BookOpen, Factory, Play, ArrowUpRight
} from 'lucide-react';

import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import Navbar from '../components/Navbar';

const services = [
  {
    title: "Physiotherapy",
    desc: "Recover from pain, injury, or surgery with certified physios at home",
    price: "Starts at ₹500/session",
    icon: <Activity className="w-8 h-8 text-primary" />,
    action: "Book Physio",
    bgColor: "bg-green-50",
    link: "/physiotherapy",
    img: "/service-physio.png"
  },
  {
    title: "Home Care",
    desc: "Full-time medical care and daily support for patients recovering at home",
    price: "Starts at ₹1,200/day",
    icon: <HomeIcon className="w-8 h-8 text-primary" />,
    action: "Explore Home Care",
    bgColor: "bg-blue-50",
    link: "/home-care",
    img: "/service-homecare.png"
  },
  {
    title: "Care Taker",
    desc: "Trained attendants for elderly, post-op, and bedridden patients",
    price: "Starts at ₹800/day",
    icon: <Users className="w-8 h-8 text-primary" />,
    action: "Hire Care Taker",
    bgColor: "bg-yellow-50",
    link: "/care-taker",
    img: "/service-caretaker.png"
  },
  {
    title: "Doctor Visit",
    desc: "Get expert medical consultation and treatment without visiting a clinic",
    price: "Starts at ₹999/visit",
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
    action: "Book Doctor",
    bgColor: "bg-red-50",
    link: "/doctor-visit",
    img: "/service-doctor.jpg"
  },
  {
    title: "Ayurveda",
    desc: "Experience traditional healing and natural therapies at your doorstep",
    price: "Starts at ₹800/session",
    icon: <Leaf className="w-8 h-8 text-primary" />,
    action: "Book Ayurveda",
    bgColor: "bg-emerald-50",
    link: "/ayurveda",
    img: "/service-physio.png"
  },
  {
    title: "BHS",
    desc: "Basic Health Services including vitals monitoring and essential care",
    price: "Starts at ₹600/visit",
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    action: "Book BHS",
    bgColor: "bg-teal-50",
    link: "/bhs",
    img: "/service-homecare.png"
  }
];

const steps = [
  { title: "Choose Service", desc: "Select from Physio, Home Care, Care Taker or Doctor", num: 1 },
  { title: "Book Appointment", desc: "Pick a time, share your location, and confirm", num: 2 },
  { title: "Get Care at Home", desc: "Verified professional arrives at your doorstep", num: 3 }
];

const features = [
  { title: "Verified Professionals", desc: "Background-checked and licensed", icon: "✅" },
  { title: "24/7 Available", desc: "Book anytime, care arrives on time", icon: "⏰" },
  { title: "Transparent Pricing", desc: "No hidden charges, pay after service", icon: "💰" },
  { title: "100% Refund", desc: "Money-back guarantee if not satisfied", icon: "💯" }
];

const testimonials = [
  { name: "SAMMIE", role: "Patient", quote: "The physiotherapist was punctual and skilled.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop" },
  { name: "KAITY", role: "Patient", quote: "Excellent home nursing service.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop" },
  { name: "ANIA", role: "FASHION DIRECTOR", quote: "Booking a doctor home visit was seamless. Got the right treatment for my mother without any hassle.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop" },
  { name: "OAKES", role: "Patient", quote: "Highly recommended for elderly care.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop" },
  { name: "LAUREN", role: "Patient", quote: "Very professional and caring.", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop" }
];

const cities = [
  { name: "Chennai", icon: <Sun className="w-6 h-6" />, desc: "Tamil Nadu", color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Bangalore", icon: <Laptop className="w-6 h-6" />, desc: "Karnataka", color: "text-green-500", bg: "bg-green-50" },
  { name: "Hyderabad", icon: <Building2 className="w-6 h-6" />, desc: "Telangana", color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Kochi", icon: <Film className="w-6 h-6" />, desc: "Kerala", color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Madurai", icon: <Landmark className="w-6 h-6" />, desc: "Tamil Nadu", color: "text-red-500", bg: "bg-red-50" },
  { name: "Mysore", icon: <GraduationCap className="w-6 h-6" />, desc: "Karnataka", color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Trivandrum", icon: <BookOpen className="w-6 h-6" />, desc: "Kerala", color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Coimbatore", icon: <Factory className="w-6 h-6" />, desc: "Tamil Nadu", color: "text-primary-500", bg: "bg-primary-50" }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(2);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="font-sans text-primary bg-[#F7FAFC] min-h-screen relative">
      <Navbar />

      {/* 2. Hero Section */}
      <section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end overflow-hidden bg-[#F7FAFC] pb-16 md:pb-24">
        {/* Background Image */}
        <div className="absolute inset-x-0 top-20 z-0 flex items-start justify-center pointer-events-none">
          <img src="/home-hero-bg.png" alt="Carevia Team" className="w-full max-w-6xl h-auto object-contain object-top" />
        </div>
        
        {/* Floating Medical Animations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 text-secondary/30 animate-float">
            <HeartPulse className="w-16 h-16" />
          </div>
          <div className="absolute top-40 right-24 text-primary/20 animate-float-delayed">
            <Activity className="w-20 h-20" />
          </div>
        </div>
        
        {/* Bottom fade gradient to softly hide the feet/bottom cut-off */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#F7FAFC] via-[#F7FAFC]/80 to-transparent z-0 pointer-events-none"></div>
        
        {/* Unified Glass Panel at the absolute bottom */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto mt-auto pt-[50vh]">
          <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 md:p-8 w-full flex flex-col items-center">
            
            <div className="bg-green-50 text-primary px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2 mb-4 shadow-sm border border-green-100 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Trusted by 10,000+ families
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug mb-3 font-poppins text-primary">
              Quality Healthcare, <br className="hidden sm:block"/>Delivered to Your Doorstep
            </h1>
            
            <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-xl font-medium leading-relaxed">
              Book verified physiotherapists, home nurses, care takers, and doctors — all in one place. Available 24/7 across your city.
            </p>
            
            <div className="flex w-full sm:w-auto mb-5">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg w-full sm:w-auto hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book An Appointment
              </button>
            </div>
            
            <p className="text-xs text-gray-500 font-medium">
              Popular: <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Physiotherapy</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Home Nurse</span> • <span className="text-primary hover:text-secondary cursor-pointer transition font-bold">Doctor Visit</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <Link to={svc.link} key={idx} className="group block relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100">
              <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
              
              <div className="absolute bottom-6 left-6 right-20 z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{svc.title}</h3>
              </div>
              
              <div className="absolute -bottom-1 -right-1 bg-[#F7FAFC] p-2.5 rounded-tl-[32px] z-20">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md bg-[#2A1617] text-white group-hover:bg-yellow-400 group-hover:text-black">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary text-center mb-16">Care in 3 simple steps</h2>
          
          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-gray-200 z-0"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-xs mx-auto mb-10 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-lg mb-6 ring-8 ring-white">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Carevia */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="text-4xl mb-4">{feat.icon}</span>
                <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials - Video Coverflow */}
      <section className="py-24 bg-gradient-to-b from-[#eaf4f4] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary mb-4">Over 1000+ people trust us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Hear directly from our patients about their recovery journey with Carevia's expert professionals at home.
          </p>
          
          <div className="w-full max-w-5xl mx-auto flex justify-center items-center gap-2 sm:gap-3 md:gap-4 h-[300px] sm:h-[350px] md:h-[400px] mb-12 overflow-hidden px-2">
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === activeTestimonial;
              
              return (
                <div 
                  key={idx} 
                  onClick={() => setActiveTestimonial(idx)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${isActive ? 'w-[200px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-full shadow-2xl' : 'w-[35px] sm:w-[50px] md:w-[60px] h-[85%] opacity-70 hover:opacity-100 shadow-md'}`}
                >
                  <img src={testimonial.img} alt={testimonial.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-80'}`}></div>
                  
                  {isActive ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-5 h-5 md:w-6 md:h-6 text-black" fill="currentColor" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-left">
                        <h4 className="font-bold text-lg md:text-2xl text-white tracking-wide">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-gray-300 font-medium tracking-widest uppercase mt-0.5 md:mt-1">{testimonial.role}</p>
                        <p className="text-xs md:text-sm text-gray-200 mt-1 md:mt-2 line-clamp-2 leading-relaxed">"{testimonial.quote}"</p>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p 
                        className="text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm" 
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {testimonial.name.split('').join(' ')}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <button className="bg-white border border-gray-200 text-primary font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition shadow-sm inline-flex items-center gap-2">
            See all reviews by our customers <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. City Coverage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary mb-4">Available in your city</h2>
            <p className="text-gray-600">+ 20 more cities. Expanding every week.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                <div className={`w-14 h-14 rounded-full ${city.bg} ${city.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {city.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">{city.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{city.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-secondary to-secondary-hover rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Need care today?</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">Book a verified professional in under 60 seconds</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white text-secondary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-lg w-full sm:w-auto"
              >
                Book Your Visit Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Talk to us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-primary text-gray-300 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="Carevia Logo" className="h-10 w-auto object-contain brightness-0 invert" />
              </div>
              <p className="text-gray-400">Quality healthcare, delivered.</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-primary transition">Physiotherapy</a></li>
                <li><a href="#" className="hover:text-primary transition">Home Care</a></li>
                <li><a href="#" className="hover:text-primary transition">Care Taker</a></li>
                <li><a href="#" className="hover:text-primary transition">Doctor Visit</a></li>
                <li><a href="#" className="hover:text-primary transition">Ayurveda</a></li>
                <li><a href="#" className="hover:text-primary transition">BHS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-primary transition">About</a></li>
                <li><a href="#" className="hover:text-primary transition">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition">Partner with us</a></li>
                <li><a href="#" className="hover:text-primary transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> 1800-123-4567</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> hello@carevia.com</li>
                <li className="mt-6 flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                    <span className="sr-only">Facebook</span>
                    FB
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                    <span className="sr-only">Twitter</span>
                    TW
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                    <span className="sr-only">Instagram</span>
                    IG
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 Carevia. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="#" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group">
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-50 animate-ping group-hover:animate-none"></span>
        <MessageCircle className="w-6 h-6 relative z-10" />
      </a>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}
