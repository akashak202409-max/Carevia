import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  MapPin, Clock, Briefcase, Heart, Stethoscope, Leaf, HeartPulse, 
  Activity, ArrowRight, User, Mail, Phone, Map
} from 'lucide-react';

export default function FindJobs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const jobs = [
    { category: "Physiotherapy", icon: <Activity className="w-5 h-5 text-blue-500" />, iconBg: "bg-blue-50", badgeBg: "bg-blue-50", badgeText: "text-blue-600", title: "Physiotherapy Specialist", loc: "Bangalore", time: "Full-Time", desc: "Spearhead rehabilitation programs for post-surgery and elderly patients. Design custom exercise regimens and track recovery milestones." },
    { category: "Home Care", icon: <Heart className="w-5 h-5 text-rose-500" />, iconBg: "bg-rose-50", badgeBg: "bg-rose-50", badgeText: "text-rose-600", title: "Home Care Specialist", loc: "Chennai", time: "Full-Time", desc: "Lead the delivery of high-quality home care, assisting patients with daily activities, monitoring vitals, and ensuring absolute comfort." },
    { category: "Care Taker", icon: <User className="w-5 h-5 text-amber-500" />, iconBg: "bg-amber-50", badgeBg: "bg-amber-50", badgeText: "text-amber-600", title: "Senior Care Taker", loc: "Hyderabad", time: "Full-Time", desc: "Provide compassionate daily assistance, mobility support, and companionship to elderly patients in a home setting." },
    { category: "Doctor Visit", icon: <Stethoscope className="w-5 h-5 text-indigo-500" />, iconBg: "bg-indigo-50", badgeBg: "bg-indigo-50", badgeText: "text-indigo-600", title: "Doctor Visit Specialist", loc: "Pune", time: "Part-Time", desc: "Conduct professional home consultations, diagnose illnesses, prescribe treatments, and review ongoing patient care plans efficiently." },
    { category: "Nurse Care", icon: <Heart className="w-5 h-5 text-rose-500" />, iconBg: "bg-rose-50", badgeBg: "bg-rose-50", badgeText: "text-rose-600", title: "Nurse Care Professional", loc: "Mumbai", time: "Full-Time", desc: "Deliver specialized clinical care at home, administering medications, managing IVs, and providing continuous patient monitoring." },
    { category: "Home Doctor", icon: <Stethoscope className="w-5 h-5 text-indigo-500" />, iconBg: "bg-indigo-50", badgeBg: "bg-indigo-50", badgeText: "text-indigo-600", title: "Home Doctor", loc: "Delhi NCR", time: "On-Call", desc: "Provide on-call comprehensive medical consultations and diagnostics at the patient's doorstep for immediate healthcare needs." },
    { category: "Ayurveda", icon: <Leaf className="w-5 h-5 text-emerald-500" />, iconBg: "bg-emerald-50", badgeBg: "bg-emerald-50", badgeText: "text-emerald-600", title: "Ayurvedic Doctor", loc: "Bangalore", time: "Full-Time", desc: "Deliver authentic Ayurvedic consultations, prescribe natural remedies, and oversee specialized Panchakarma therapies at home." },
    { category: "BHS", icon: <HeartPulse className="w-5 h-5 text-teal-500" />, iconBg: "bg-teal-50", badgeBg: "bg-teal-50", badgeText: "text-teal-600", title: "BHS Health Professional", loc: "Chennai", time: "Part-Time", desc: "Conduct routine home health screenings, collect samples, monitor patient vitals, and maintain accurate digital health records." }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold font-poppins text-[#1E3A8A] leading-[1.1] mb-6">
              Build Your Career With Carevia
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Join a team of expert healthcare professionals—shaping the future of home care with medical integrity, compassion, and innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#hiring" className="bg-[#E87070] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#d66161] transition shadow-md">
                Apply Now
              </a>
              <a href="#hiring" className="bg-transparent border-2 border-[#1E3A8A] text-[#1E3A8A] px-8 py-3.5 rounded-full font-bold hover:bg-[#F0F4FF] transition">
                Explore Jobs
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 w-full transform translate-y-8">
            <div className="h-[450px] rounded-[32px] overflow-hidden shadow-2xl relative border-4 border-white">
              <img src="/career-hero.jpg" alt="Carevia Team" className="w-full h-full object-cover object-center" />
              
            </div>
          </div>

        </div>
      </section>

      {/* 2. Now Hiring Section */}
      <section id="hiring" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#E87070] mb-16 font-poppins">Now Hiring</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white rounded-[24px] p-7 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl ${job.iconBg} flex items-center justify-center shadow-sm`}>
                    {job.icon}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${job.badgeBg} ${job.badgeText}`}>
                    {job.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.loc}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {job.time}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">{job.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-grow">
                  {job.desc}
                </p>

                <a href="#apply" className="w-full py-3.5 rounded-xl border-2 border-gray-100 text-gray-600 font-bold text-sm text-center hover:border-[#E87070] hover:text-[#E87070] transition block mt-auto">
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Apply Form Section */}
      <section id="apply" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#F8F9FA] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-[45%]">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#1E3A8A] mb-4">Apply for Your Dream Role</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Join Carevia and build the future with us. We value compassion, safety, and medical excellence in every home we serve.
            </p>
            <div className="rounded-[32px] overflow-hidden shadow-2xl h-[350px]">
              <img src="/homecare-hero.png" alt="Apply Now" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:w-[55%] w-full">
            <form className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-gray-50 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium transition" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium transition" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Applying Role</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium text-gray-700 transition appearance-none">
                    <option>Select Role</option>
                    <option>Home Nurse</option>
                    <option>Physiotherapist</option>
                    <option>Care Taker</option>
                    <option>Doctor</option>
                    <option>Ayurvedic Doctor</option>
                    <option>BHS Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Location</label>
                  <input type="text" placeholder="Chennai" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium transition" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Years of Experience</label>
                <input type="text" placeholder="e.g. 5" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium transition" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cover Message / About Yourself</label>
                <textarea rows="4" placeholder="Tell us about your healthcare experience..." className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#E87070] outline-none text-sm font-medium transition resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-[#E87070] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d66161] transition mt-2 shadow-lg">
                Submit Application
              </button>

            </form>
          </div>
          
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#E87070] rounded-lg flex items-center justify-center text-white font-bold text-xl">+</div>
                <span className="font-bold text-xl text-[#1E3A8A]">Carevia</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Delivering world-class healthcare and medical support to your doorstep. Join our growing community of top nurses and doctors.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#1E3A8A] mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><Link to="/" className="hover:text-[#E87070] transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#E87070] transition">About Us</Link></li>
                <li><Link to="/jobs" className="text-[#E87070]">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-[#E87070] transition">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1E3A8A] mb-6">Our Services</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><Link to="/physiotherapy" className="hover:text-[#E87070] transition">Physiotherapy</Link></li>
                <li><Link to="/nurse-care" className="hover:text-[#E87070] transition">Nurse Care</Link></li>
                <li><Link to="/care-taker" className="hover:text-[#E87070] transition">Care Takers</Link></li>
                <li><Link to="/doctor-visit" className="hover:text-[#E87070] transition">Doctor Visits</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1E3A8A] mb-6">Get in Touch</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E87070] shrink-0 mt-0.5" />
                  <span>123 Health Street, Anna Nagar, Chennai, TN 600040</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E87070] shrink-0" />
                  <span>+91 98000 28229</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E87070] shrink-0" />
                  <span>careers@carevia.com</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
            <p>© 2026 Carevia Healthcare. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#E87070] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#E87070] transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
