import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDoctors, saveDoctors, saveCurrentUser } from '../utils/storage';
import { CheckCircle, Upload, Camera, Building, FileText, Calendar, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Navbar from '../components/Navbar';


const specializationOptions = {
  "MBBS Doctor": [
    "General Physician", "General Medicine", "Dermatology", "Pediatrics", "Gynecology", 
    "Cardiology", "Orthopedics", "ENT", "Ophthalmology", "Psychiatry", "Pulmonology", 
    "Gastroenterology", "Neurology", "Urology", "Emergency Medicine", "Family Medicine"
  ],
  "Homeopathy Doctor": [
    "General Homeopathy", "Pediatrics", "Dermatology", "Women’s Health", "Chronic Disease Care",
    "Allergy & Asthma", "Digestive Health", "Mental Wellness", "Joint & Pain Management", "Respiratory Care"
  ],
  "Physiotherapist": [
    "General Physiotherapy", "Orthopedic Physiotherapy", "Sports Physiotherapy", "Neurological Physiotherapy",
    "Pediatric Physiotherapy", "Geriatric Physiotherapy", "Cardiorespiratory Physiotherapy", 
    "Post-Surgery Rehabilitation", "Sports Injury Rehabilitation", "Pain Management"
  ],
  "Nurse": [
    "General Nursing", "Staff Nurse", "ICU Nurse", "Emergency Nurse", "Pediatric Nurse", 
    "Maternity Nurse", "Geriatric Nurse", "Baby Care Nurse", "Surgical Nurse", "Community Health Nurse"
  ],
  "Caretaker": [
    "Elderly Care", "Patient Care", "Post-Surgery Care", "Bedridden Patient Care", "Disability Care", 
    "Child Care", "Baby Care", "Companion Care", "Dementia Care", "Palliative Care"
  ],
  "Lab Centre": [
    "General Diagnostic Tests", "Blood Tests", "Urine Tests", "Diabetes Tests", "Thyroid Tests", 
    "Lipid Profile", "Liver Function Tests", "Kidney Function Tests", "Hormone Tests", "Allergy Tests", 
    "Vitamin Tests", "Microbiology", "Pathology", "Hematology", "Imaging & Diagnostics"
  ]

  , "BHS": [
    "General Health Science", "Community Health", "Public Health", "Health & Wellness", 
    "Nutrition & Wellness", "Healthcare Management", "Medical Laboratory Science", 
    "Health Education", "Preventive Healthcare", "Rehabilitation & Health Support"
  ],
  "Ayurveda Doctor": [
    "General Ayurveda", "Panchakarma", "Kayachikitsa (General Medicine)", "Shalya Tantra (Surgery)", 
    "Shalakya Tantra (ENT & Ophthalmology)", "Kaumarabhritya (Pediatrics)", 
    "Prasuti & Stri Roga (Women’s Health)", "Swasthavritta (Preventive & Lifestyle Care)", 
    "Rasayana (Rejuvenation)", "Visha Chikitsa (Toxicology)", "Skin & Hair Care", "Pain & Joint Care"
  ]
};


const INDIAN_STATES_CITIES = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
  "Delhi": ["New Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Telangana": ["Hyderabad", "Warangal"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Agra"]
};

export default function ProfessionalOnboarding() {
  const [step, setStep] = useState(2);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [schedule, setSchedule] = useState({
    Mon: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'],
    Tue: ['10:00 AM', '02:00 PM'],
    Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
  });
  const [newSlot, setNewSlot] = useState('');
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  
  const handleAddSlot = () => {
    if (!newSlot) { setIsAddingSlot(false); return; }
    // Convert 24h to 12h AM/PM
    const [h, m] = newSlot.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formatted = `${hour12.toString().padStart(2, '0')}:${m} ${ampm}`;
    
    if (!schedule[selectedDay].includes(formatted)) {
      setSchedule({...schedule, [selectedDay]: [...schedule[selectedDay], formatted].sort()});
    }
    setNewSlot('');
    setIsAddingSlot(false);
  };
  
  const removeSlot = (slot) => {
    setSchedule({
      ...schedule,
      [selectedDay]: schedule[selectedDay].filter(s => s !== slot)
    });
  };
  const skipClinic = profession === "Nurse" || profession === "Caretaker"; // 1 is Account (done in login)
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const baseSteps = [
    { id: 1, title: 'Account' },
    { id: 2, title: 'Profile' },
    { id: 3, title: 'Clinic' },
    { id: 4, title: 'Verification' },
    { id: 5, title: 'Availability' },
  ];

  const visibleSteps = baseSteps.filter(s => !(skipClinic && s.id === 3));
  
  const steps = visibleSteps.map((s, index) => {
    const seqNum = index + 1;
    const isPast = step > s.id;
    const isCurrent = step === s.id;
    
    let icon;
    if (s.id === 1 || isPast) {
      icon = <CheckCircle className="w-5 h-5 text-green-500" />;
    } else {
      icon = <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCurrent ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>{seqNum}</div>;
    }
    
    return { id: s.id, num: s.id, title: s.title, icon };
  });

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
                    <select value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                      <option>Select Profession</option>
                      <option>MBBS Doctor</option>
                      <option>Homeopathy Doctor</option>
                      <option>Ayurveda Doctor</option>
                      <option>Physiotherapist</option>
                      <option>Nurse</option>
                      <option>Caretaker</option>
                      <option>Lab Centre</option>
                      <option>BHS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {profession === 'Lab Centre' ? 'Laboratory Services / Test Categories' : 'Specialization'}
                    </label>
                    {profession && profession !== 'Select Profession' ? (
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                        <option>Select {profession === 'Lab Centre' ? 'Service' : 'Specialization'}</option>
                        {specializationOptions[profession]?.map(opt => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type="text" placeholder="Select a profession first" disabled className="w-full bg-gray-100 border border-gray-100 rounded-xl p-3.5 text-sm font-medium text-gray-400 cursor-not-allowed" />
                    )}
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
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Home Consultation Fee (₹) *</label>
                    <input type="number" placeholder="800" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Online Consultation Fee (₹) *</label>
                    <input type="number" placeholder="500" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Clinic Consultation Fee (₹) *</label>
                    <input type="number" placeholder="600" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                </div>

                <div className="flex gap-4 border-t border-gray-100 pt-6">
                  <button onClick={() => setStep(skipClinic ? 4 : 3)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
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
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State *</label>
                    <select 
                      value={selectedState} 
                      onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(''); }}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition appearance-none"
                    >
                      <option value="">Select State</option>
                      {Object.keys(INDIAN_STATES_CITIES).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City *</label>
                    <select 
                      value={selectedCity} 
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City</option>
                      {selectedState && INDIAN_STATES_CITIES[selectedState].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
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
                  <h2 className="text-xl font-bold text-primary mb-1">Bank Details</h2>
                  <p className="text-sm text-gray-500">Provide your bank information for receiving consultation payouts.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Holder Name *</label>
                    <input type="text" placeholder="Dr. Priya Sharma" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bank Name *</label>
                    <input type="text" placeholder="e.g. HDFC Bank" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Number *</label>
                    <input type="password" placeholder="••••••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">IFSC Code *</label>
                    <input type="text" placeholder="e.g. HDFC0001234" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition uppercase" />
                  </div>
                </div>

                

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">
                  <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">Your profile will be reviewed by our admin team to ensure quality and trust. You’ll be notified once approved.</p>
                </div>

                <div className="flex gap-4 border-t border-gray-100 pt-6">
                  <button onClick={() => setStep(5)} className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md">
                    Submit for Verification
                  </button>
                  <button onClick={() => setStep(skipClinic ? 2 : 3)} className="bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 px-8 py-3.5 rounded-xl font-bold transition-all">
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
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                      const count = schedule[day].length;
                      return (
                        <button 
                          key={day} 
                          onClick={() => setSelectedDay(day)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition flex items-center gap-1.5 ${selectedDay === day ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'}`}
                        >
                          {day}
                          {count > 0 && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedDay === day ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" /> 
                      {selectedDay === 'Thu' ? 'Thursday' : selectedDay === 'Tue' ? 'Tuesday' : selectedDay === 'Wed' ? 'Wednesday' : selectedDay === 'Fri' ? 'Friday' : selectedDay === 'Sat' ? 'Saturday' : selectedDay === 'Sun' ? 'Sunday' : 'Monday'} Time Slots
                    </h4>
                    
                    <div className="flex flex-wrap gap-3 items-center">
                      {schedule[selectedDay].length === 0 && !isAddingSlot && (
                        <p className="text-sm text-gray-400 font-medium italic w-full mb-2">No slots added for this day.</p>
                      )}
                      
                      {schedule[selectedDay].map(time => (
                        <div key={time} className="bg-white border border-gray-200 pl-4 pr-1 py-1.5 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 group transition">
                          {time}
                          <button onClick={() => removeSlot(time)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                      
                      {!isAddingSlot ? (
                        <button 
                          onClick={() => setIsAddingSlot(true)}
                          className="border-2 border-dashed border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-white hover:border-gray-400 hover:text-primary transition"
                        >
                          + Add Slot
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input 
                            type="time" 
                            value={newSlot}
                            onChange={(e) => setNewSlot(e.target.value)}
                            className="bg-white border-2 border-primary text-primary px-3 py-1.5 rounded-lg text-sm font-bold outline-none"
                            autoFocus
                          />
                          <button onClick={handleAddSlot} className="bg-primary hover:bg-primary-hover text-white px-3 py-2 rounded-lg text-sm font-bold shadow-sm transition">
                            Save
                          </button>
                          <button onClick={() => setIsAddingSlot(false)} className="text-gray-400 hover:text-gray-600 font-medium text-sm px-2">
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <button onClick={handleComplete} className="bg-secondary hover:bg-secondary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md text-center inline-block">
                      Save Availability & Go to Dashboard
                    </button>
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
