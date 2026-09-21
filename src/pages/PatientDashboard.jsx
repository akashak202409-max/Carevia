import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, FileText, Search, Settings, Bell, 
  Activity, User, MapPin, Phone, CheckCircle, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { Star, Filter } from 'lucide-react';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [myAppointments, setMyAppointments] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load from localStorage to show the loop!
    try {
      const stored = localStorage.getItem('carevia_appointments');
      if (stored) {
        setMyAppointments(JSON.parse(stored));
      }
    } catch(e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Carevia Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#1e293b] group-hover:text-secondary transition">Sanjay M.</p>
                <p className="text-xs font-medium text-gray-400">Patient</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-transparent group-hover:border-secondary transition">
                SM
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 sticky top-28 space-y-2">
              <button 
                onClick={() => setActiveTab('Dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'Dashboard' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('Appointments')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'Appointments' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Calendar className="w-5 h-5" /> My Appointments
              </button>
              <button 
                onClick={() => setActiveTab('Records')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'Records' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <FileText className="w-5 h-5" /> Medical Records
              </button>
              <button 
                onClick={() => setActiveTab('Find Doctors')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'Find Doctors' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Search className="w-5 h-5" /> Find Doctors
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            
            {activeTab === 'Dashboard' && (
              <div className="space-y-8 animate-[fade-in_0.4s_ease-out]">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-3">Good Morning, Sanjay!</h1>
                    <p className="text-gray-300 font-medium max-w-lg leading-relaxed">
                      Your health is our priority. You have {myAppointments.length} upcoming appointments. Book a new consultation or review your medical records below.
                    </p>
                    <Link to="/doctor-visit" className="inline-flex mt-6 bg-secondary hover:bg-secondary-hover text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1">
                      Book New Appointment
                    </Link>
                  </div>
                  <div className="hidden md:flex relative z-10 shrink-0 bg-white/10 p-6 rounded-[24px] backdrop-blur-md border border-white/20 items-center justify-center">
                    <Activity className="w-16 h-16 text-secondary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Next Appointment */}
                  <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2"><Calendar className="w-5 h-5 text-secondary" /> Next Appointment</h3>
                    {myAppointments.length > 0 ? (
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">{myAppointments[0].title}</span>
                            <h4 className="font-bold text-lg text-gray-900">Dr. {myAppointments[0].title === 'General Physician Consultation' ? 'Ramesh Kumar' : 'Specialist'}</h4>
                          </div>
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{myAppointments[0].status}</span>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                            <Clock className="w-4 h-4" /> {myAppointments[0].date} at {myAppointments[0].time}
                          </div>
                          <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                            <MapPin className="w-4 h-4" /> {myAppointments[0].location}
                          </div>
                        </div>
                        <button className="w-full py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition">Reschedule / Cancel</button>
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium mb-4">No upcoming appointments.</p>
                        <button onClick={() => setActiveTab("Find Doctors")} className="text-secondary font-bold hover:underline">Find a Doctor</button>
                      </div>
                    )}
                  </div>

                  {/* Health Vitals / Summary */}
                  <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-green-500" /> Recent Vitals</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Blood Pressure</p>
                        <h4 className="text-2xl font-bold text-blue-700">120/80</h4>
                        <p className="text-xs font-medium text-green-600 mt-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Normal</p>
                      </div>
                      <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                        <h4 className="text-2xl font-bold text-orange-700">72 kg</h4>
                        <p className="text-xs font-medium text-orange-600 mt-2">Last checked: 2w ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Appointments' && (
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 animate-[fade-in_0.4s_ease-out]">
                <h3 className="text-2xl font-bold text-primary mb-6">My Appointments</h3>
                <div className="space-y-4">
                  {myAppointments.length > 0 ? myAppointments.map(app => (
                    <div key={app.id} className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-6">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{app.title}</h4>
                        <div className="flex gap-4 text-sm font-medium text-gray-500">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {app.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {app.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {app.location}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${app.statusColor}-100 text-${app.statusColor}-700`}>
                        {app.status}
                      </span>
                    </div>
                  )) : (
                    <div className="text-center py-20 text-gray-500 font-medium">You have no appointments yet.</div>
                  )}
                </div>
              </div>
            )}
            

            {activeTab === 'Find Doctors' && (
              <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">Find a Doctor</h3>
                      <p className="text-gray-500">Search and book appointments with top healthcare professionals.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search doctors, specialties..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none w-full md:w-64 transition"
                        />
                      </div>
                      <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition text-gray-600">
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
                      { name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
                      { name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
                      { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: "4.9", exp: "15 Years", loc: "Virtual", fee: 1200, img: "https://randomuser.me/api/portraits/women/33.jpg" },
                      { name: "Dr. Amit Patel", spec: "Dermatologist", rating: "4.7", exp: "9 Years", loc: "Mumbai", fee: 700, img: "https://randomuser.me/api/portraits/men/45.jpg" },
                      { name: "Dr. Emily Chen", spec: "Psychiatrist", rating: "4.8", exp: "11 Years", loc: "Virtual", fee: 900, img: "https://randomuser.me/api/portraits/women/22.jpg" }
                    ].filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.spec.toLowerCase().includes(searchQuery.toLowerCase())).map((doc, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-[20px] p-5 hover:shadow-lg transition-all bg-white group">
                        <div className="flex items-start gap-4 mb-4">
                          <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{doc.name}</h4>
                            <p className="text-sm font-medium text-secondary mb-1">{doc.spec}</p>
                            <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" /> {doc.rating}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-5 bg-gray-50 p-3 rounded-xl">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {doc.exp}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg text-primary">₹{doc.fee}</span>
                          <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-secondary hover:bg-secondary-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Records' && (
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 animate-[fade-in_0.4s_ease-out] text-center py-20">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Records Found</h3>
                <p className="text-gray-500">Your prescriptions and lab reports will appear here after your first visit.</p>
              </div>
            )}

          </div>
        </div>
      </main>
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}