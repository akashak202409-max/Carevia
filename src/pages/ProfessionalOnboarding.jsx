import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Upload, Camera, Building, FileText, Calendar, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ProfessionalOnboarding() {
  const [step, setStep] = useState(2); // 1 is Account (done in login)
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const steps = [
    { num: 1, title: 'Account', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { num: 2, title: 'Profile', icon: step > 2 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div> },
    { num: 3, title: 'Clinic', icon: step > 3 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div> },
    { num: 4, title: 'Verification', icon: step > 4 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>4</div> },
    { num: 5, title: 'Availability', icon: <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 5 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>5</div> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pt-28 lg:pt-36">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Complete Your Professional Profile</h1>
          <p className="text-gray-500">Provide your details to start connecting with patients.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 sticky top-32 lg:top-40">
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0">{s.icon}</div>
                      <span className={`font-bold ${step === s.num ? 'text-primary' : (step > s.num ? 'text-green-600' : 'text-gray-400')}`}>
                        {s.title}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-6 bg-gray-200 ml-3 mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            
            {/* STEP 2: PROFILE */}
            {step === 2 && (
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 animate-[fade-in_0.4s_ease-out]">
                <h2 className="text-2xl font-bold text-primary mb-6 pb-4 border-b border-gray-100">Basic Details</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-[#F0F4FF] border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition group relative overflow-hidden">
                    <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold">Upload</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1">Profile Photo</h3>
                    <p className="text-xs text-gray-500 max-w-xs">Upload a professional, clear headshot. JPG or PNG, max 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                    <input type="text" placeholder="Dr. Priya Sharma" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Profession *</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                      <option>Select Profession</option>
                      <option>Homeopathy Doctor</option>
                      <option>General Physician</option>
                      <option>Physiotherapist</option>
                      <option>Nurse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Specialization</label>
                    <input type="text" placeholder="e.g. Skin & Allergy" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Experience (Years) *</label>
                    <input type="number" placeholder="8" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Languages Spoken</label>
                    <input type="text" placeholder="English, Hindi, Tamil" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Consultation Fee (₹) *</label>
                    <input type="number" placeholder="600" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                </div>

                <div className="flex gap-4 border-t border-gray-100 pt-6">
                  <button onClick={() => setStep(3)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
                    Save & Continue
                  </button>
                  <button className="bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 px-8 py-3.5 rounded-xl font-bold transition-all">
                    Save as Draft
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CLINIC */}
            {step === 3 && (
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 animate-[fade-in_0.4s_ease-out]">
                <div className="mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-primary mb-1">Add Clinic Details</h2>
                  <p className="text-sm text-gray-500">Link your clinic and manage its information.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Clinic Name *</label>
                    <input type="text" placeholder="Carevia Health Clinic" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Clinic Address *</label>
                    <textarea rows="2" placeholder="123 Health Avenue, Block B..." className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City *</label>
                    <input type="text" placeholder="Chennai" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State *</label>
                    <input type="text" placeholder="Tamil Nadu" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Website / Google Maps</label>
                    <input type="url" placeholder="https://..." className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Clinic Photos</label>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <div className="w-32 h-24 shrink-0 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition">
                      <Upload className="w-6 h-6 mb-1" />
                      <span className="text-xs font-bold">+ Add Photo</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-gray-100 pt-6">
                  <button onClick={() => setStep(4)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
                    Save & Continue
                  </button>
                  <button onClick={() => setStep(2)} className="bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 px-8 py-3.5 rounded-xl font-bold transition-all">
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: VERIFICATION */}
            {step === 4 && (
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 animate-[fade-in_0.4s_ease-out]">
                <div className="mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-primary mb-1">Upload Documents</h2>
                  <p className="text-sm text-gray-500">Submit your credentials for admin verification.</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {/* Doc 1 */}
                  <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><FileText className="w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-gray-800">Professional Registration Certificate</h4>
                        <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 10MB</p>
                      </div>
                    </div>
                    <button className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F0F4FF] transition">Upload</button>
                  </div>
                  
                  {/* Doc 2 */}
                  <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><FileText className="w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-gray-800">Qualification Certificate</h4>
                        <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 10MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-bold">Uploaded</span>
                    </div>
                  </div>

                  {/* Doc 3 */}
                  <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><ShieldCheck className="w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-gray-800">ID Proof (Aadhaar / PAN)</h4>
                        <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 10MB</p>
                      </div>
                    </div>
                    <button className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F0F4FF] transition">Upload</button>
                  </div>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-100 mt-10">
                  <h2 className="text-xl font-bold text-primary mb-1">Payment Details</h2>
                  <p className="text-sm text-gray-500">Provide your UPI ID for receiving consultation payouts.</p>
                </div>
                
                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">UPI ID *</label>
                  <input type="text" placeholder="e.g. 9876543210@ybl or drpriya@okicici" className="w-full max-w-md bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                </div>

                

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">
                  <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">Your profile will be reviewed by our admin team to ensure quality and trust. You’ll be notified once approved.</p>
                </div>

                <div className="flex gap-4 border-t border-gray-100 pt-6">
                  <button onClick={() => setStep(5)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
                    Submit for Verification
                  </button>
                  <button onClick={() => setStep(3)} className="bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 px-8 py-3.5 rounded-xl font-bold transition-all">
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: AVAILABILITY (LIVE) */}
            {step === 5 && (
              <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
                
                <div className="bg-green-50 border border-green-200 rounded-[24px] p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full shrink-0 mt-1"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                    <div>
                      <h2 className="text-xl font-bold text-green-800 mb-1">Profile Verified!</h2>
                      <p className="text-sm text-green-700">Your profile is now live on Carevia. Set your availability below so patients can book appointments.</p>
                    </div>
                  </div>
                  <button className="bg-white text-green-700 border-2 border-green-200 hover:bg-green-100 px-5 py-2.5 rounded-xl font-bold text-sm transition shrink-0 whitespace-nowrap">
                    Manage Profile
                  </button>
                </div>

                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                  <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">Available Slots</h2>
                      <p className="text-sm text-gray-500">Configure your weekly working hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <button key={day} className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition ${day === 'Mon' ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'}`}>
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-secondary" /> Monday Time Slots</h4>
                    <div className="flex flex-wrap gap-3">
                      {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                        <div key={time} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 group cursor-pointer hover:border-secondary hover:text-secondary transition">
                          {time}
                        </div>
                      ))}
                      <button className="border-2 border-dashed border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-white hover:border-gray-400 transition">
                        + Add Slot
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <Link to="/doctor/dashboard" className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md text-center inline-block">
                      Save Availability & Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
