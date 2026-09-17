import React, { useState } from 'react';
import { 
  LayoutDashboard, User, Calendar, BarChart3, Star, MessageSquare, 
  Settings, Bell, Search, TrendingUp, Users, MousePointerClick, 
  Activity, CheckCircle, ChevronDown, Menu, X
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
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="text-xl font-bold text-primary font-poppins tracking-tight">carevia</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'My Profile', icon: User },
            { name: 'Appointments', icon: Calendar },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Reviews', icon: Star },
            { name: 'Messages', icon: MessageSquare },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <a 
              key={item.name} 
              href="#" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${item.active ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </a>
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
                <select className="bg-white border border-gray-200 text-gray-600 text-sm font-bold py-2.5 px-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm appearance-none cursor-pointer">
                  <option>Last 30 Days</option>
                  <option>This Week</option>
                  <option>This Year</option>
                </select>
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
            
          </div>
        </div>
      </main>
    </div>
  );
}
