import React, { useState } from 'react';
import { 
  LayoutDashboard, User, Calendar, BarChart3, Star, MessageSquare, 
  Settings, Bell, Search, TrendingUp, Users, MousePointerClick, 
  Activity, CheckCircle, ChevronDown, Menu, X, MapPin, Mic, Video, PhoneOff, Clock, Phone, CalendarCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { label: "Profile Views", value: "2,450", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Search Appearances", value: "8,240", trend: "+18%", icon: Search, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Profile Clicks", value: "1,320", trend: "+15%", icon: MousePointerClick, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Clinic Link Clicks", value: "480", trend: "+10%", icon: Activity, color: "text-pink-500", bg: "bg-pink-50" },
  { label: "Appointments", value: "86", trend: "+22%", icon: Calendar, color: "text-green-500", bg: "bg-green-50" },
];

const APPOINTMENTS = [
  { id: 1, patient: "Rahul Sharma", type: "Online Consultation", time: "10:00 AM", date: "Today", status: "Upcoming" },
  { id: 2, patient: "Sneha Patel", type: "Clinic Visit", time: "11:30 AM", date: "Today", status: "Upcoming" },
  { id: 3, patient: "Arjun Kumar", type: "Online Consultation", time: "02:00 PM", date: "Today", status: "Upcoming" },
];

export default function DoctorDashboard() {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState('Today');
  const [activeTab, setActiveTab] = React.useState('Dashboard');
  const [appointmentTab, setAppointmentTab] = React.useState('Upcoming');
  
  const defaultAppointments = [
    {
      id: 1,
      date: '20 MAY 2026',
      time: '04:00 PM - 05:00 PM',
      title: 'Initial Consultation',
      status: 'Waiting',
      statusColor: 'yellow',
      patient: 'Priya Sharma',
      phone: '+91 87654 32109',
      location: 'Virtual'
    },
    {
      id: 2,
      date: '21 MAY 2026',
      time: '11:00 AM - 12:30 PM',
      title: 'Follow-up Session',
      status: 'Confirmed',
      statusColor: 'blue',
      patient: 'Rahul Gupta',
      phone: '+91 76543 21098',
      location: 'Main Clinic'
    }
  ];

  const loadAppointments = () => {
    try {
      const stored = localStorage.getItem('carevia_appointments');
      if (stored) {
        return JSON.parse(stored).concat(defaultAppointments); // Put new ones at top
      }
    } catch(e) {}
    return defaultAppointments;
  };

  const [upcomingAppointments, setUpcomingAppointments] = React.useState(loadAppointments());

  React.useEffect(() => {
    const handleNewBooking = () => {
      setUpcomingAppointments(loadAppointments());
    };
    window.addEventListener('carevia_appointment_booked', handleNewBooking);
    return () => window.removeEventListener('carevia_appointment_booked', handleNewBooking);
  }, []);

  const [isRescheduleOpen, setIsRescheduleOpen] = React.useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = React.useState(false);
  const [activeCallAppointment, setActiveCallAppointment] = React.useState(null);
  const [isVisitSuccessOpen, setIsVisitSuccessOpen] = React.useState(false);
  
  const handleCompleteVisit = () => {
    // Remove the active appointment from upcoming list
    if (activeCallAppointment) {
      setUpcomingAppointments(prev => prev.filter(app => app.id !== activeCallAppointment.id));
    }
    // Close video call
    setIsVideoCallOpen(false);
    // Show success modal
    setIsVisitSuccessOpen(true);
  };
  const [activeRescheduleId, setActiveRescheduleId] = React.useState(null);
  const [rescheduleStep, setRescheduleStep] = React.useState('select');
  const [selectedRescheduleDate, setSelectedRescheduleDate] = React.useState('Thu, May 22');
  const [selectedRescheduleTime, setSelectedRescheduleTime] = React.useState('');

  const activeAppointment = upcomingAppointments.find(a => a.id === activeRescheduleId);

  const handleConfirmReschedule = () => {
    // Update the list
    setUpcomingAppointments(prev => prev.map(app => {
      if (app.id === activeRescheduleId) {
        return {
          ...app,
          date: selectedRescheduleDate.toUpperCase(),
          time: `${selectedRescheduleTime} - Rescheduled`
        };
      }
      return app;
    }));
    
    setRescheduleStep('success');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-gray-800 font-sans">
      
      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100 justify-between lg:justify-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Carevia Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'My Profile', icon: User },
            { name: 'Appointments', icon: Calendar },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Reviews', icon: Star },
            { name: 'Messages', icon: MessageSquare },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === item.name ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-primary">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center relative">
              <Search className="w-5 h-5 absolute left-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition w-64 lg:w-96 text-sm font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-gray-400 hover:text-primary transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-100 cursor-pointer">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dr. Priya" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" />
              <div className="hidden md:block text-sm">
                <p className="font-bold text-primary">Dr. Priya Sharma</p>
                <p className="text-gray-500 text-xs font-medium">Homeopathy</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'Dashboard' && (
              <>
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1">Good Morning, Dr. Priya 👋</h1>
                <p className="text-gray-500 font-medium">Here's what's happening with your practice today.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100 shadow-sm">
                  <CheckCircle className="w-4 h-4" /> Verified Profile
                </span>
                
                {/* Custom Date Range Picker */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className={`flex items-center gap-2 bg-white border ${isDatePickerOpen ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'} text-primary text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:border-primary/50 transition`}
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {selectedRange === 'Today' ? 'Today (Jul 16, 2026 - Jul 16, 2026)' : selectedRange}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDatePickerOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-[24px] shadow-2xl border border-gray-100 flex overflow-hidden z-50 w-[550px] animate-[fade-in_0.2s_ease-out]">
                      
                      {/* Left Sidebar Presets */}
                      <div className="w-1/3 bg-gray-50/50 border-r border-gray-100 p-3 flex flex-col gap-1">
                        {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map(preset => (
                          <button 
                            key={preset}
                            onClick={() => { setSelectedRange(preset); setIsDatePickerOpen(false); }}
                            className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition ${selectedRange === preset ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'}`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>

                      {/* Right Calendar Area */}
                      <div className="w-2/3 p-6 bg-white">
                        <div className="flex items-center justify-between mb-6">
                          <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                          </button>
                          <h3 className="font-bold text-gray-900">July 2026</h3>
                          <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d} className="text-center text-xs font-bold text-gray-400">{d}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                          {/* Empty offset for July 1st (Wednesday) */}
                          <div></div><div></div><div></div>
                          
                          {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const isSelected = selectedRange === 'Today' && day === 16;
                            return (
                              <button 
                                key={day} 
                                className={`h-10 rounded-xl flex items-center justify-center text-sm font-bold transition ${isSelected ? 'bg-[#1e293b] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                      <TrendingUp className="w-3 h-3" /> {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-primary">Today's Appointments</h2>
                  <button className="text-sm font-bold text-secondary hover:underline">View All</button>
                </div>
                <div className="p-6 flex-1">
                  <div className="space-y-4">
                    {APPOINTMENTS.map(apt => (
                      <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-secondary/30 transition gap-4 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                            {apt.patient.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{apt.patient}</h4>
                            <p className="text-xs font-medium text-gray-500">{apt.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
                          <div className="text-right">
                            <p className="font-bold text-primary">{apt.time}</p>
                            <p className="text-xs font-medium text-gray-500">{apt.date}</p>
                          </div>
                          <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-hover shadow-sm transition">
                            Join
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Performance / Reviews */}
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 flex flex-col">
                <h2 className="text-lg font-bold text-primary mb-6">Patient Satisfaction</h2>
                
                <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-[20px] mb-6">
                  <h3 className="text-5xl font-bold text-primary mb-2">4.8</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-500">Based on 126 Reviews</p>
                </div>

                <h3 className="text-sm font-bold text-primary mb-4">Recent Feedback</h3>
                <div className="space-y-4 flex-1">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm text-gray-800">Sanjay M.</span>
                      <span className="flex items-center text-xs font-bold text-yellow-500"><Star className="w-3 h-3 fill-current mr-0.5" /> 5.0</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">"Very patient and understanding. The online consultation was smooth and helpful."</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm text-gray-800">Priya K.</span>
                      <span className="flex items-center text-xs font-bold text-yellow-500"><Star className="w-3 h-3 fill-current mr-0.5" /> 5.0</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">"Highly recommend Dr. Priya. Great experience overall."</p>
                  </div>
                </div>
                
              </div>
            </div>
              </>
            )}

            {activeTab === 'My Profile' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1">My Profile</h1>
                  <p className="text-gray-500 font-medium">Manage your personal and professional information.</p>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-6">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-primary/10" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dr. Priya Sharma</h2>
                        <p className="text-primary font-bold mb-1">Homeopathy Doctor • Skin & Allergy</p>
                        <p className="text-sm text-gray-500 font-medium">8 Years Experience • English, Hindi, Tamil</p>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-sm transition">
                      Edit Profile
                    </button>
                  </div>

                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Consultation Fees */}
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> Consultation Fees</h3>
                      <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Home Consultation</span>
                          <span className="font-bold text-gray-900">₹800</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Online Consultation</span>
                          <span className="font-bold text-gray-900">₹500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-500">Clinic Consultation</span>
                          <span className="font-bold text-gray-900">₹600</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><LayoutDashboard className="w-5 h-5" /> Bank Details</h3>
                      <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Bank Name</span>
                          <span className="font-bold text-gray-900">HDFC Bank</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-bold text-gray-500">Account No.</span>
                          <span className="font-bold text-gray-900">••••••••1234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-500">IFSC Code</span>
                          <span className="font-bold text-gray-900 uppercase">HDFC0001234</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2"><User className="w-5 h-5" /> Clinic Information</h3>
                    <button className="text-sm font-bold text-secondary hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Clinic Name</p>
                      <p className="font-bold text-gray-800">Carevia Health Clinic</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="font-bold text-gray-800">+91 98765 43210</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="font-bold text-gray-800">123 Health Avenue, Block B, Chennai, Tamil Nadu</p>
                    </div>
                  </div>
                </div>
                
              </div>
            )}

            {activeTab === 'Appointments' && (
              <div className="space-y-8 animate-[fade-in_0.4s_ease-out]">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b] mb-1">Appointments & Consultations</h1>
                    <p className="text-gray-500 font-medium">Manage your schedule and upcoming client meetings</p>
                  </div>
                  
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-blue-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Total Appointments</span>
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">42</h3>
                      <p className="text-xs font-medium text-gray-400">Scheduled this month</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-purple-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Total Visit Planned</span>
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">18</h3>
                      <p className="text-xs font-medium text-gray-400">Planned site visits</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-green-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Completed Appointments</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">28</h3>
                      <p className="text-xs font-medium text-gray-400">+5 Completed Today</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-orange-200 transition">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-400">Total Visit Completed</span>
                      <CalendarCheck className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-1">12</h3>
                      <p className="text-xs font-medium text-gray-400">Done this week</p>
                    </div>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4">
                  <div className="flex gap-8 w-full sm:w-auto mb-4 sm:mb-0">
                    <button 
                      onClick={() => setAppointmentTab('Upcoming')}
                      className={`text-sm font-bold pb-4 -mb-[18px] transition ${appointmentTab === 'Upcoming' ? 'text-[#1e293b] border-b-2 border-[#1e293b]' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'}`}
                    >
                      Upcoming Appointments
                    </button>
                    <button 
                      onClick={() => setAppointmentTab('Past')}
                      className={`text-sm font-bold pb-4 -mb-[18px] transition ${appointmentTab === 'Past' ? 'text-[#1e293b] border-b-2 border-[#1e293b]' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'}`}
                    >
                      Past Appointments
                    </button>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm hover:border-gray-300 transition">
                      <Calendar className="w-4 h-4" />
                      Last 30 Days (Jun 17, 2026 - Jul 16, 2026)
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                  </div>
                </div>

                {/* Appointment List */}
                <div className="space-y-4">
                  {appointmentTab === 'Upcoming' ? (
                    <>
                      {upcomingAppointments.map((apt) => (
                        <div key={apt.id} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
                          <div className="min-w-[150px] border-r border-gray-100 pr-6">
                            <h4 className="font-bold text-[#1e293b] mb-1">{apt.date}</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">{apt.time}</p>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-[#1e293b]">{apt.title}</h3>
                              <span className={`bg-${apt.statusColor}-100 text-${apt.statusColor}-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>{apt.status}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                              <div className="flex items-center gap-2"><User className="w-4 h-4" /> {apt.patient}</div>
                              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {apt.phone}</div>
                              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {apt.location}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 min-w-[160px]">
                            <button 
                              onClick={() => {
                                setActiveRescheduleId(apt.id);
                                setRescheduleStep('select');
                                setSelectedRescheduleDate('Thu, May 22');
                                setSelectedRescheduleTime('');
                                setIsRescheduleOpen(true);
                              }} 
                              className="w-full py-2.5 bg-white border border-gray-200 text-[#1e293b] text-sm font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                            >
                              Reschedule
                            </button>
                            <button onClick={() => { setActiveCallAppointment(apt); setIsVideoCallOpen(true); }} className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold rounded-xl shadow-sm transition">Appointment Start</button>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {/* Past Item 1 */}
                      <div className="bg-gray-50 p-6 rounded-[20px] border border-gray-200 flex flex-col md:flex-row items-center gap-6">
                        <div className="min-w-[150px] border-r border-gray-200 pr-6 opacity-70">
                          <h4 className="font-bold text-[#1e293b] mb-1">12 MAY 2026</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">10:00 AM - 11:00 AM</p>
                        </div>
                        
                        <div className="flex-1 opacity-80">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">Routine Checkup</h3>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Completed</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Anita Patel</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 12345</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Virtual</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition">View Summary</button>
                        </div>
                      </div>
                      
                      {/* Past Item 2 */}
                      <div className="bg-gray-50 p-6 rounded-[20px] border border-gray-200 flex flex-col md:flex-row items-center gap-6">
                        <div className="min-w-[150px] border-r border-gray-200 pr-6 opacity-70">
                          <h4 className="font-bold text-[#1e293b] mb-1">08 MAY 2026</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">02:30 PM - 03:00 PM</p>
                        </div>
                        
                        <div className="flex-1 opacity-80">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">Consultation</h3>
                            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Cancelled</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Vikram Singh</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 90123 45678</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Main Clinic</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Reschedule Overlay Modal */}
      {isRescheduleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm" onClick={() => setIsRescheduleOpen(false)}></div>
          <div className="relative bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden animate-[fade-in_0.3s_ease-out]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1e293b]">
                {rescheduleStep === 'select' ? 'Reschedule Appointment' : 'Reschedule Confirmed'}
              </h2>
              <button onClick={() => setIsRescheduleOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {rescheduleStep === 'select' ? (
              <>
                <div className="p-6 space-y-6">
                  {/* Current Info */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-4 items-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center font-bold shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-0.5">Current Appointment</p>
                      <h4 className="font-bold text-[#1e293b]">{activeAppointment?.patient} • {activeAppointment?.title}</h4>
                      <p className="text-sm font-medium text-gray-500">{activeAppointment?.date} at {activeAppointment?.time.split('-')[0].trim()}</p>
                    </div>
                  </div>

                  {/* Select New Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select New Date</label>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {['Wed, May 21', 'Thu, May 22', 'Fri, May 23', 'Mon, May 26'].map(date => (
                        <button 
                          key={date}
                          onClick={() => setSelectedRescheduleDate(date)}
                          className={`shrink-0 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${selectedRescheduleDate === date ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select New Time */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'].map(time => (
                        <button 
                          key={time}
                          onClick={() => setSelectedRescheduleTime(time)}
                          className={`py-2.5 rounded-lg border-2 font-bold text-sm transition-all ${selectedRescheduleTime === time ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4 justify-end">
                  <button onClick={() => setIsRescheduleOpen(false)} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm">
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmReschedule}
                    disabled={!selectedRescheduleTime}
                    className={`px-6 py-3 font-bold rounded-xl shadow-md transition ${selectedRescheduleTime ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </>
            ) : (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Success!</h3>
                <p className="text-gray-500 font-medium mb-8">
                  {activeAppointment?.patient}'s appointment has been successfully rescheduled to<br/>
                  <strong className="text-gray-800">{selectedRescheduleDate}</strong> at <strong className="text-gray-800">{selectedRescheduleTime}</strong>.
                </p>
                <button 
                  onClick={() => setIsRescheduleOpen(false)} 
                  className="w-full max-w-xs py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition"
                >
                  Done
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}

      {/* Video Consultation Overlay */}
      {isVideoCallOpen && (
        <div className="fixed inset-0 z-[200] bg-gray-900 flex flex-col md:flex-row overflow-hidden animate-[fade-in_0.3s_ease-out]">
          
          {/* Main Video Area */}
          <div className="flex-1 relative flex flex-col">
            
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                <span className="text-white font-bold tracking-widest text-sm">LIVE</span>
                <span className="text-white/80 font-medium ml-2 border-l border-white/20 pl-4">00:14:32</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm">
                {activeCallAppointment?.patient} - {activeCallAppointment?.title}
              </div>
            </div>

            {/* Main Patient Video (Placeholder) */}
            <div className="flex-1 bg-black w-full h-full relative">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop" alt="Patient Video" className="w-full h-full object-cover opacity-80" />
              
              {/* Doctor PIP */}
              <div className="absolute bottom-28 right-6 w-48 h-64 bg-black rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Doctor Video" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded">Dr. Priya (You)</div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-6 px-6">
              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition">
                <Mic className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition">
                <Video className="w-5 h-5" />
              </button>
              <button onClick={() => setIsVideoCallOpen(false)} className="w-16 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/20 transition">
                <PhoneOff className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clinical Notes Sidebar */}
          <div className="w-full md:w-[400px] bg-white border-l border-gray-200 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-[#1e293b]">Clinical Notes</h3>
              <button onClick={() => setIsVideoCallOpen(false)} className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Patient History</p>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Age/Gender:</strong> 32/F<br/>
                    <strong>Previous Visits:</strong> 2<br/>
                    <strong>Known Allergies:</strong> Penicillin<br/>
                    <strong>Chief Complaint:</strong> Recurring skin irritation and mild fever over the last 3 days.
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Symptoms & Observations</label>
                <textarea className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#4F46E5]/50 outline-none resize-none" placeholder="Type clinical observations here during the call..."></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Prescription / Action Plan</label>
                <textarea className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#4F46E5]/50 outline-none resize-none" placeholder="List medications or next steps..."></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button onClick={handleCompleteVisit} className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition">
                Save & Complete Visit
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Visit Success Modal */}
      {isVisitSuccessOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm" onClick={() => setIsVisitSuccessOpen(false)}></div>
          <div className="relative bg-white rounded-[24px] w-full max-w-sm shadow-2xl overflow-hidden animate-[fade-in_0.3s_ease-out] p-8 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Visit Completed!</h3>
            
            <p className="text-gray-500 font-medium mb-6">
              Clinical notes and prescriptions have been securely saved and sent to <strong className="text-gray-800">{activeCallAppointment?.patient}</strong>.
            </p>
            
            <div className="w-full space-y-3">
              <button onClick={() => setIsVisitSuccessOpen(false)} className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md transition">
                Return to Dashboard
              </button>
              <button onClick={() => setIsVisitSuccessOpen(false)} className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition border border-gray-200">
                Download Summary PDF
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
