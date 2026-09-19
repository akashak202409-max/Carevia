import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, Star, Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle, ChevronLeft, ChevronRight, Check, Briefcase } from 'lucide-react';

const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "05:00 PM"];

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [patientInfo, setPatientInfo] = useState({ name: "", phone: "", email: "", reason: "" });
  const [consultationType, setConsultationType] = useState("online");
  const [selectedUpi, setSelectedUpi] = useState("gpay");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedTime("");
      setPatientInfo({ name: "", phone: "", email: "", reason: "" });
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 5) {
      const newAppt = {
        id: Date.now(),
        date: selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/ /g, ' ') : 'UNKNOWN',
        time: selectedTime,
        title: consultationType ? consultationType.charAt(0).toUpperCase() + consultationType.slice(1) + ' Consultation' : 'Consultation',
        status: 'Waiting',
        statusColor: 'yellow',
        patient: patientInfo?.name || 'Sanjay M.',
        phone: patientInfo?.phone || '+91 99887 76655',
        location: consultationType === 'online' ? 'Virtual' : (consultationType === 'home' ? 'Patient Home' : 'Main Clinic')
      };
      
      try {
        const existing = JSON.parse(localStorage.getItem('carevia_appointments') || '[]');
        localStorage.setItem('carevia_appointments', JSON.stringify([newAppt, ...existing]));
        window.dispatchEvent(new Event('carevia_appointment_booked'));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    }
    setStep((s) => Math.min(s + 1, 6));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = selectedDoctor !== null;
  const isStep2Valid = selectedDate !== null && selectedTime !== "";
  const isStep3Valid = true; // Always valid since it's just an optional upload now

  // Calendar logic
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const formatDisplayDate = (dateObj) => {
    if (!dateObj) return "";
    return dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full h-[95vh] sm:h-auto max-w-[1000px] sm:max-h-[90vh] bg-white rounded-t-[32px] sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-[fade-in_0.3s_ease-out]">
        
        {/* Header & Progress */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col bg-white shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Book Your Appointment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {step < 6 && (
            <div className="flex items-center justify-between relative max-w-2xl mx-auto w-full mb-2">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-100 -z-10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>
              {[1, 2, 3, 4, 5].map((num, idx) => (
                <div key={num} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= num ? 'bg-secondary text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                    {step > num ? <Check className="w-4 h-4" /> : num}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:block ${step >= num ? 'text-primary' : 'text-gray-400'}`}>
                    {['Professional', 'Date', 'Details', 'Confirm', 'Pay'][idx]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F8F9FA]">
          
          {/* STEP 1: Professional */}
          {step === 1 && (
            <div className="space-y-8 animate-[fade-in_0.4s_ease-out]">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-2">Choose a healthcare professional</h3>
                <p className="text-gray-500">Select a specialist and a convenient time for your consultation.</p>
              </div>

              <div className="bg-white p-4 rounded-[16px] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Search doctor or specialist" className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium" />
                </div>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">
                  <option value="">Select Specialization</option>
                  <option>Doctor Appointment – General Physician</option>
                  <optgroup label="Specialist Doctor Appointment">
                    <option>Cardiologist</option>
                    <option>Neurologist</option>
                    <option>Orthopedic</option>
                    <option>Dermatologist</option>
                    <option>Psychiatrist</option>
                    <option>Pediatrician</option>
                    <option>Gynecologist</option>
                    <option>ENT</option>
                    <option>Ophthalmologist</option>
                    <option>Diabetologist</option>
                  </optgroup>
                  <option>Online Video Consultation</option>
                  <option>Phone Consultation</option>
                  <option>Home Doctor Visit</option>
                  <option>Physiotherapist Home Visit</option>
                  <option>Speech Therapy Home Visit</option>
                  <option>Occupational Therapy Home Visit</option>
                  <option>Nursing Home Care</option>
                  <option>Elderly / Geriatric Care</option>
                  <option>Post-operative Home Care</option>
                  <option>Wound Dressing</option>
                  <option>Injection / Basic Nursing Services</option>
                  <option>Lab Test Booking</option>
                  <option>Blood Test Home Collection</option>
                  <option>Health Check-up Packages</option>
                  <option>Medicine Delivery / Pharmacy</option>
                  <option>Ambulance Booking</option>
                  <option>Hospital Appointment</option>
                  <option>Diagnostic Scan Booking</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DOCTORS.map(doc => (
                  <div 
                    key={doc.id} 
                    onClick={() => setSelectedDoctor(doc)}
                    className={`bg-white p-5 rounded-[20px] border-2 cursor-pointer transition-all duration-200 flex flex-col ${selectedDoctor?.id === doc.id ? 'border-secondary shadow-lg scale-[1.02]' : 'border-gray-100 shadow-sm hover:border-secondary/30 hover:shadow-md'}`}
                  >
                    <div className="flex gap-4 items-start mb-4">
                      <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                      <div>
                        <h4 className="font-bold text-primary leading-tight">{doc.name}</h4>
                        <p className="text-xs font-medium text-secondary mt-1">{doc.spec}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                          <span className="text-xs font-bold text-gray-700">{doc.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-medium text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl flex-1">
                      <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {doc.exp}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</div>
                      <div className="flex items-center gap-1.5"><span className="font-bold text-gray-700">₹{doc.fee}</span> / session</div>
                      <div className="flex items-center gap-1.5 text-green-600 font-bold"><CheckCircle className="w-3.5 h-3.5" /> Available</div>
                    </div>
                    
                    <div className={`w-full py-2.5 rounded-xl text-center text-sm font-bold transition-colors ${selectedDoctor?.id === doc.id ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {selectedDoctor?.id === doc.id ? 'Selected' : 'Select Doctor'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-8 animate-[fade-in_0.4s_ease-out] max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Select Date & Time</h3>
              </div>

              {selectedDoctor && (
                <div className="bg-white p-4 rounded-[16px] shadow-sm border border-gray-100 flex items-center gap-4 max-w-md mx-auto">
                  <img src={selectedDoctor.img} alt={selectedDoctor.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-primary">{selectedDoctor.name}</h4>
                    <p className="text-xs font-medium text-secondary">{selectedDoctor.spec}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5" /></button>
                    <h4 className="font-bold text-primary">{monthName}</h4>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-gray-400">
                    <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isSelected = selectedDate?.toDateString() === d.toDateString();
                      const isPast = d < new Date(new Date().setHours(0,0,0,0));
                      
                      return (
                        <button 
                          key={day}
                          disabled={isPast}
                          onClick={() => setSelectedDate(d)}
                          className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-colors ${isPast ? 'text-gray-300 cursor-not-allowed' : isSelected ? 'bg-primary text-white shadow-md font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col">
                  <h4 className="font-bold text-primary mb-6">Available Time Slots</h4>
                  {!selectedDate ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
                      <CalendarIcon className="w-10 h-10 opacity-20" />
                      <p className="text-sm font-medium">Please select a date first</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {TIME_SLOTS.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${selectedTime === time ? 'border-secondary bg-secondary/10 text-secondary' : 'border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Details */}
          {step === 3 && (
            <div className="space-y-8 animate-[fade-in_0.4s_ease-out] max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Appointment Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Summary Panel */}
                <div className="md:col-span-2 bg-primary p-6 rounded-[24px] text-white shadow-lg h-fit">
                  <h4 className="font-bold opacity-80 text-sm mb-6 uppercase tracking-wider">Summary</h4>
                  
                  <div className="flex gap-4 items-center mb-8 pb-8 border-b border-white/10">
                    <img src={selectedDoctor?.img} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
                    <div>
                      <h4 className="font-bold text-lg">{selectedDoctor?.name}</h4>
                      <p className="text-sm opacity-80">{selectedDoctor?.spec}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <CalendarIcon className="w-5 h-5 text-secondary shrink-0" />
                      <div>
                        <p className="text-xs opacity-70 mb-1">Date</p>
                        <p className="font-medium text-sm">{formatDisplayDate(selectedDate)}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <Clock className="w-5 h-5 text-secondary shrink-0" />
                      <div>
                        <p className="text-xs opacity-70 mb-1">Time</p>
                        <p className="font-medium text-sm">{selectedTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <FileText className="w-5 h-5 text-secondary shrink-0" />
                      <div>
                        <p className="text-xs opacity-70 mb-1">Consultation Type</p>
                        <p className="font-medium text-sm">Online Consultation</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm opacity-80">Total Fee</span>
                    <span className="text-xl font-bold">₹{selectedDoctor?.fee}</span>
                  </div>
                </div>

                {/* Form Panel */}
                <div className="md:col-span-3 bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-center">
                  <h4 className="font-bold text-primary mb-2">Upload Medical Reports</h4>
                  <p className="text-sm text-gray-500 mb-6">Please upload any relevant previous prescriptions or lab reports for the doctor to review.</p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-[24px] bg-gray-50 p-10 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-secondary transition cursor-pointer h-64">
                    <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Click to upload reports</h4>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirm */}
          {step === 4 && (
            <div className="space-y-8 animate-[fade-in_0.4s_ease-out] max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Confirm Your Appointment</h3>
                <p className="text-gray-500">Please review your appointment details before confirming.</p>
              </div>

              <div className="bg-white p-8 rounded-[24px] shadow-lg border border-gray-100">
                <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
                  <img src={selectedDoctor?.img} alt="" className="w-20 h-20 rounded-full object-cover shadow-md" />
                  <div>
                    <h4 className="text-xl font-bold text-primary">{selectedDoctor?.name}</h4>
                    <p className="text-sm font-medium text-secondary">{selectedDoctor?.spec}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                    <p className="font-medium text-gray-800">{formatDisplayDate(selectedDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</p>
                    <p className="font-medium text-gray-800">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Patient Name</p>
                    <p className="font-medium text-gray-800">{patientInfo.name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Consultation Type</p>
                    <p className="font-medium text-gray-800">Online Consultation</p>
                  </div>
                </div>

                <div className="bg-[#F0F4FF] p-5 rounded-2xl flex justify-between items-center">
                  <span className="font-bold text-primary">Consultation Fee</span>
                  <span className="text-2xl font-bold text-primary">₹{selectedDoctor?.fee}</span>
                </div>
              </div>
            </div>
          )}

          
          {/* STEP 5: Payment */}
          {step === 5 && (
            <div className="space-y-8 animate-[fade-in_0.4s_ease-out] max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Payment Details</h3>
                <p className="text-gray-500">Securely pay for your consultation.</p>
              </div>

              <div className="bg-white p-8 rounded-[24px] shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Total Amount</h4>
                    <p className="text-sm text-gray-500">{consultationType === 'online' ? 'Online Consultation' : 'Direct Visit'}</p>
                  </div>
                  <div className="text-3xl font-bold text-primary">₹{selectedDoctor?.fee || 500}</div>
                </div>

                {consultationType !== 'online' ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-[20px] p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-yellow-800 mb-2">Pay on Visit (COD)</h4>
                    <p className="text-yellow-700 font-medium">For direct visits, we only accept payment at the clinic or during the home visit. No upfront payment is required.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h4 className="font-bold text-[#1e293b] text-sm uppercase tracking-wider mb-2">Select Payment Method</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {/* GPay */}
                      <div 
                        onClick={() => setSelectedUpi('gpay')}
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${selectedUpi === 'gpay' ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">GPay</span>
                      </div>
                      
                      {/* PhonePe */}
                      <div 
                        onClick={() => setSelectedUpi('phonepe')}
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${selectedUpi === 'phonepe' ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-2">
                          <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" alt="PhonePe" className="w-full h-full object-cover scale-[1.5]" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">PhonePe</span>
                      </div>
                      
                      {/* Other UPI */}
                      <div 
                        onClick={() => setSelectedUpi('upi')}
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${selectedUpi === 'upi' ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">Other UPI</span>
                      </div>
                    </div>

                    {selectedUpi === 'upi' && (
                      <div className="animate-[fade-in_0.3s_ease-out]">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enter UPI ID</label>
                        <input type="text" placeholder="username@upi" className="w-full bg-white border-2 border-gray-100 rounded-xl p-4 focus:border-[#4F46E5] focus:ring-0 outline-none text-sm font-medium transition" />
                      </div>
                    )}
                    
                    {selectedUpi !== 'upi' && (
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center animate-[fade-in_0.3s_ease-out]">
                        <p className="text-sm text-blue-700 font-medium">You will be redirected to the <strong>{selectedUpi === 'gpay' ? 'Google Pay' : 'PhonePe'}</strong> app to complete your secure payment.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: Success */}
          {step === 6 && (
            <div className="py-12 animate-[fade-in_0.5s_ease-out] flex flex-col items-center justify-center max-w-lg mx-auto text-center h-full">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle className="w-12 h-12" />
              </div>
              
              <h3 className="text-3xl font-bold text-primary mb-3">Appointment Confirmed!</h3>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Your appointment has been successfully booked. A confirmation has been sent to your registered email and phone number.
              </p>

              <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 w-full mb-8 text-left">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Appointment ID</span>
                  <span className="font-bold text-primary">APT-10245</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-3 rounded-xl"><CalendarIcon className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="font-bold text-primary text-sm">{formatDisplayDate(selectedDate)}</p>
                    <p className="text-sm font-medium text-gray-500">at {selectedTime} with {selectedDoctor?.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button onClick={onClose} className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-hover transition shadow-md">
                  View Appointment
                </button>
                <button onClick={onClose} className="flex-1 bg-white border-2 border-primary text-primary py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                  Add to Calendar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 6 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-white flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="px-6 py-3 font-bold text-gray-500 hover:text-primary transition"
              >
                Back
              </button>
            ) : <div></div>}

            {step === 1 && (
              <button 
                onClick={handleNext}
                disabled={!isStep1Valid}
                className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md ${isStep1Valid ? 'bg-secondary hover:bg-secondary-hover' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
              >
                Continue
              </button>
            )}
            
            {step === 2 && (
              <button 
                onClick={handleNext}
                disabled={!isStep2Valid}
                className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md ${isStep2Valid ? 'bg-secondary hover:bg-secondary-hover' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
              >
                Continue
              </button>
            )}
            
            {step === 3 && (
              <button 
                onClick={handleNext}
                disabled={!isStep3Valid}
                className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md ${isStep3Valid ? 'bg-secondary hover:bg-secondary-hover' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
              >
                Continue to Confirm
              </button>
            )}
            
            {step === 4 && (
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md bg-secondary hover:bg-secondary-hover"
              >
                Proceed to Payment
              </button>
            )}

            {step === 5 && (
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md bg-[#4F46E5] hover:bg-[#4338CA]"
              >
                {consultationType === 'online' ? `Pay ₹${selectedDoctor?.fee || 500} & Book` : 'Complete Booking'}
              </button>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}
