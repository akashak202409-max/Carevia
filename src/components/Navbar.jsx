import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import BookingModal from './BookingModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Carevia Logo" className="h-16 sm:h-20 w-auto object-contain" />
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="font-medium text-primary hover:text-primary transition">Home</Link>
            
            <div className="relative">
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="font-medium text-primary hover:text-primary transition flex items-center gap-1 focus:outline-none"
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesDropdownOpen && (
                <div className="absolute top-full mt-4 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 flex flex-col z-50">
                  <Link to="/physiotherapy" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Physiotherapy</Link>
                  <Link to="/home-care" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Home Care</Link>
                  <Link to="/care-taker" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Care Taker</Link>
                  <Link to="/doctor-visit" className="px-4 py-2 hover:bg-gray-50 text-primary font-medium transition">Doctor Visit</Link>
                </div>
              )}
            </div>

            <a href="/#how-it-works" className="font-medium text-primary hover:text-primary transition">How It Works</a>
            <Link to="/about" className="font-medium text-primary hover:text-primary transition">About</Link>
            <Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-gray-100 p-1 rounded-full flex items-center mr-2">
              <Link to="/hire-professional" className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${location.pathname === '/hire-professional' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-gray-500 hover:text-[#1E3A8A]'}`}>
                I want to hire
              </Link>
              <Link to="/jobs" className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${location.pathname === '/jobs' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-gray-500 hover:text-[#1E3A8A]'}`}>
                I'm a professional
              </Link>
            </div>
            <Link to="/login" className="font-bold text-primary hover:text-[#E87070] transition">Login</Link>
            <button className="bg-[#E87070] hover:bg-[#d66161] text-white px-6 py-2.5 rounded-full font-bold transition shadow-md">
              Post Requirement
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t mt-3 p-4 shadow-lg absolute w-full">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-primary">Home</Link>
              
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="font-medium text-primary flex items-center justify-between focus:outline-none"
                >
                  Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="flex flex-col space-y-2 pl-4 border-l-2 border-gray-100 ml-2">
                    <Link to="/physiotherapy" className="text-gray-600 text-sm font-medium">Physiotherapy</Link>
                    <Link to="/home-care" className="text-gray-600 text-sm font-medium">Home Care</Link>
                    <Link to="/care-taker" className="text-gray-600 text-sm font-medium">Care Taker</Link>
                    <Link to="/doctor-visit" className="text-gray-600 text-sm font-medium">Doctor Visit</Link>
                  </div>
                )}
              </div>

              <Link to="/careers" className="font-medium text-[#E87070] font-bold">For Professionals</Link>
              <Link to="/about" className="font-medium text-primary hover:text-primary transition">About</Link>
              <Link to="/blog" className="font-medium text-primary hover:text-primary transition">Blog</Link>
              <div className="pt-4 border-t flex flex-col space-y-3">
                <Link to="/login" className="font-medium text-left text-primary hover:text-primary transition">Login</Link>
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-secondary text-white px-6 py-2.5 rounded-full font-medium w-full text-center"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
}
