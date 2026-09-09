import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CheckCircle, Star, Users, MapPin, Search, Phone, 
  ChevronRight, Shield, Clock, Heart, Award, 
  Activity, Briefcase, ChevronDown, Check, GraduationCap, 
  DollarSign, Map, Calendar
} from 'lucide-react';

export default function FindJobs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => setActiveFaq(activeFaq === idx ? null : idx);

  const jobs = [
    { title: "Home Physiotherapist Needed", loc: "Anna Nagar, Chennai (2.4 km)", req: "BPT / MPT • 2+ years", shift: "Daily 2 hours × 6 days", sal: "₹25,000 – ₹35,000/mo", pat: "👵 65yo • Post-knee-replacement", time: "2h ago", role: "Physiotherapist" },
    { title: "24-Hour Nurse (Elderly Care)", loc: "Koramangala, Bangalore", req: "GNM / BSc Nursing", shift: "24-hr Shift", sal: "₹40,000 – ₹50,000/mo", pat: "👴 72yo • Bedridden", time: "5h ago", role: "Home Nurse" },
    { title: "Post-Surgery Attendant", loc: "Hitech City, Hyderabad", req: "Basic Training • 1+ year", shift: "12-hr Day Shift", sal: "₹22,000 – ₹28,000/mo", pat: "👨 45yo • Post-op recovery", time: "1d ago", role: "Care Taker" },
    { title: "Female Nurse (Newborn Care)", loc: "Andheri, Mumbai", req: "Pediatric Exp • 3+ years", shift: "12-hr Night Shift", sal: "₹35,000 – ₹45,000/mo", pat: "👶 Newborn • Mother assist", time: "1d ago", role: "Home Nurse" },
    { title: "Doctor Home Visit (Weekends)", loc: "Gurugram, Delhi", req: "MBBS / MD", shift: "Weekends Only", sal: "₹800/visit", pat: "👨‍👩‍👧 General Consultations", time: "2d ago", role: "Doctor" },
    { title: "Physio for Stroke Recovery", loc: "Jayanagar, Bangalore", req: "Neuro Exp • 4+ years", shift: "Daily 1 hour × 5 days", sal: "₹30,000 – ₹40,000/mo", pat: "👴 68yo • Stroke rehab", time: "2d ago", role: "Physiotherapist" }
  ];

  return (
    <div className="font-sans text-[#0A2540] bg-[#FAFBFC] min-h-screen relative selection:bg-secondary/30 selection:text-primary">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="pt-32 pb-48 lg:pt-40 lg:pb-56 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#F0F4FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
          {/* Left Hero */}
          <div className="lg:w-[55%] flex flex-col items-start">
            <div className="bg-[#E87070]/10 text-[#E87070] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 mb-6 border border-[#E87070]/20">
              <span className="animate-bounce">🚀</span> 1,500+ Open Jobs Right Now
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold font-poppins text-[#1E3A8A] leading-[1.1] mb-6">
              Find Your Next Healthcare Job. Earn What You Deserve.
            </h1>
            
            <p className="text-[#5A6478] text-lg mb-8 max-w-xl leading-relaxed">
              Join 1,500+ verified professionals earning up to ₹60,000/month through Carevia. Flexible shifts, weekly payouts, and jobs near your home.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#1E3A8A] mb-10 bg-white/60 px-6 py-3 rounded-full border border-blue-100 backdrop-blur-sm shadow-sm">
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-[#E87070]"/> 1,500+ Jobs</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-[#10B981]"/> Avg. ₹45k/mo</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><Map className="w-4 h-4 text-[#1E3A8A]"/> 20+ Cities</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#job-board" className="bg-[#E87070] hover:bg-[#d66161] text-white px-8 py-4 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 text-lg">
                <Search className="w-5 h-5"/> Browse Open Jobs
              </a>
              <button className="bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-lg">
                <Users className="w-5 h-5"/> Create Free Profile
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-[#5A6478] font-medium">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#10B981]"/> Free registration</span>
              <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-[#1E3A8A]"/> Weekly payouts</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#E87070]"/> Choose your shifts</span>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:w-[45%] relative w-full max-w-lg mx-auto">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop" alt="Professional Nurse" className="w-full h-[500px] object-cover" />
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow border border-blue-50">
              <div className="bg-green-100 p-2 rounded-full"><DollarSign className="w-6 h-6 text-green-600" /></div>
              <div>
                <div className="font-bold text-[#1E3A8A]">Avg. Earning</div>
                <div className="text-sm text-green-600 font-bold">₹45,000/month</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse-slow border border-blue-50">
              <div className="bg-[#E87070]/10 p-2 rounded-full"><Users className="w-6 h-6 text-[#E87070]" /></div>
              <div>
                <div className="font-bold text-[#1E3A8A]">🔥 500+ Hired</div>
                <div className="text-xs text-gray-500 font-medium">this month alone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Job Search Bar */}
      <section className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-[24px] shadow-[0_20px_50px_rgba(30,58,138,0.1)] p-8 md:p-10 border border-blue-50">
          <h2 className="text-2xl font-bold font-poppins text-[#1E3A8A] text-center mb-8">
            Find your next assignment in seconds
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">I am a...</label>
              <select className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] outline-none font-medium">
                <option>Physiotherapist</option>
                <option>Home Nurse</option>
                <option>Care Taker</option>
                <option>Doctor</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-semibold text-gray-600">Location</label>
              <div className="relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Your City / Pincode" className="w-full pl-10 p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] outline-none font-medium" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Shift Type</label>
              <select className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] outline-none font-medium">
                <option>Any Shift</option>
                <option>Part-time</option>
                <option>Full-time</option>
                <option>24-hr</option>
                <option>Weekend only</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Salary Range</label>
              <select className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#E87070] outline-none font-medium">
                <option>Any Range</option>
                <option>₹10k - ₹25k</option>
                <option>₹25k - ₹40k</option>
                <option>₹40k+</option>
              </select>
            </div>
            
            <a href="#job-board" className="bg-[#E87070] hover:bg-[#d66161] text-white p-3.5 rounded-xl font-bold transition shadow-md w-full flex items-center justify-center gap-2 h-[52px]">
              <Search className="w-5 h-5"/> Search Jobs
            </a>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-500" /> Free forever</span>
            <span className="hidden md:block text-gray-300">•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-500" /> Instant matches</span>
            <span className="hidden md:block text-gray-300">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#E87070]" /> Apply in one click</span>
          </div>
        </div>
      </section>

      {/* 4. Live Stats Strip */}
      <section className="bg-[#1E3A8A] py-16 mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div className="flex flex-col items-center">
            <div className="text-4xl lg:text-5xl font-bold font-poppins mb-2">1,500+</div>
            <div className="text-blue-200 font-medium text-sm md:text-base uppercase tracking-wider">Open Jobs</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl lg:text-5xl font-bold font-poppins mb-2">₹45k</div>
            <div className="text-blue-200 font-medium text-sm md:text-base uppercase tracking-wider">Avg. Earning</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl lg:text-5xl font-bold font-poppins mb-2">3 Days</div>
            <div className="text-blue-200 font-medium text-sm md:text-base uppercase tracking-wider">To First Job</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl lg:text-5xl font-bold font-poppins mb-2">92%</div>
            <div className="text-blue-200 font-medium text-sm md:text-base uppercase tracking-wider">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* 6. Live Job Board */}
      <section id="job-board" className="py-24 bg-[#F0F4FF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#1E3A8A] mb-4">🔥 Open Jobs — Apply in One Click</h2>
            <p className="text-[#5A6478] text-lg max-w-2xl mx-auto">Fresh assignments posted every hour. Find your perfect match.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-wrap gap-4 items-center justify-between mb-10 border border-blue-100 sticky top-20 z-30">
            <div className="flex flex-wrap gap-3">
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none"><option>Any Role</option></select>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none"><option>Any City</option></select>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none"><option>Any Shift</option></select>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium outline-none"><option>Salary Range</option></select>
            </div>
            <select className="bg-blue-50 border border-blue-100 text-sm text-[#1E3A8A] rounded-lg px-4 py-2 font-bold outline-none">
              <option>Sort by: Newest</option>
              <option>Highest Paying</option>
              <option>Nearest to me</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white rounded-[16px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#E87070] hover:-translate-y-1 relative group">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#E87070]/10 text-[#E87070] px-3 py-1 rounded-full text-xs font-bold">{job.role}</span>
                    <span className="text-gray-400 text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3"/> {job.time}</span>
                  </div>
                  <button className="text-gray-300 hover:text-gray-500 transition"><Heart className="w-5 h-5"/></button>
                </div>

                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">{job.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4 font-medium">
                  <MapPin className="w-4 h-4 text-gray-400"/> {job.loc}
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 bg-gray-50 p-4 rounded-xl text-sm font-medium">
                  <div className="flex items-start gap-2"><Award className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"/> <span className="text-gray-700">{job.req}</span></div>
                  <div className="flex items-start gap-2"><Calendar className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5"/> <span className="text-gray-700">{job.shift}</span></div>
                  <div className="flex items-start gap-2"><DollarSign className="w-4 h-4 text-green-500 shrink-0 mt-0.5"/> <span className="text-gray-700">{job.sal}</span></div>
                  <div className="flex items-start gap-2"><Users className="w-4 h-4 text-purple-500 shrink-0 mt-0.5"/> <span className="text-gray-700">{job.pat}</span></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg w-full sm:w-auto">
                    <CheckCircle className="w-4 h-4"/> Verified Family
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition">Details</button>
                    <button className="flex-1 sm:flex-none px-6 py-2 bg-[#E87070] text-white rounded-xl font-bold text-sm hover:bg-[#d66161] shadow-md transition">Apply Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#1E3A8A] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition shadow-lg inline-flex items-center gap-2">
              See All 1,500+ Jobs <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </section>

      {/* 8. How to Apply */}
      <section className="py-24 bg-[#FEF7F0] px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#1E3A8A] mb-16">Start Earning in 5 Easy Steps</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 border-t-2 border-dashed border-[#E87070]/30 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {[
                { s: "1", i: "📝", t: "Create Profile", d: "Basic details (5 mins)" },
                { s: "2", i: "📤", t: "Upload Docs", d: "Certificates + ID" },
                { s: "3", i: "🎥", t: "Video Call", d: "10-min verification" },
                { s: "4", i: "🎓", t: "Free Training", d: "Get certified" },
                { s: "5", i: "💼", t: "Get Jobs", d: "Start earning" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative bg-[#FEF7F0] p-2">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-[#FEF7F0] shadow-md flex items-center justify-center text-3xl mb-6 z-10 relative">
                    {step.i}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#1E3A8A] text-white text-sm font-bold flex items-center justify-center">{step.s}</div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3A8A] mb-2">{step.t}</h3>
                  <p className="text-sm text-gray-600 font-medium">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 text-[#10B981] font-bold text-lg bg-green-50 inline-block px-6 py-3 rounded-full border border-green-100 shadow-sm">
            ⚡ First job within 3 days of joining
          </div>
        </div>
      </section>

      {/* 15. Big CTA Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#1E3A8A] to-[#E87070] rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 relative z-10">Your Best Career in Healthcare Starts Here.</h2>
          <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
            Join 1,500+ professionals earning more with Carevia
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 w-full sm:w-auto">
            <button className="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition flex items-center justify-center gap-2">
              🎯 Apply Now — Free
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">
              💬 WhatsApp Your CV
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium">© 2024 Carevia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
