const fs = require('fs');

const componentContent = `import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';
import { Search, MapPin, Star, Briefcase, CheckCircle, Phone, Filter } from 'lucide-react';

const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", rating: "4.9", exp: "8 Years", loc: "Chennai", fee: 600, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", rating: "4.8", exp: "12 Years", loc: "Chennai", fee: 500, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", rating: "5.0", exp: "10 Years", loc: "Bangalore", fee: 800, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, name: "Dr. Sanjay Gupta", spec: "Cardiologist", rating: "4.9", exp: "15 Years", loc: "Mumbai", fee: 1200, img: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: 5, name: "Dr. Kavita Reddy", spec: "Dermatologist", rating: "4.7", exp: "6 Years", loc: "Hyderabad", fee: 700, img: "https://randomuser.me/api/portraits/women/32.jpg" },
  { id: 6, name: "Dr. Vikram Singh", spec: "Orthopedic", rating: "4.8", exp: "11 Years", loc: "Delhi NCR", fee: 1000, img: "https://randomuser.me/api/portraits/men/68.jpg" },
  { id: 7, name: "Dr. Neha Patel", spec: "Gynecologist", rating: "4.9", exp: "9 Years", loc: "Pune", fee: 800, img: "https://randomuser.me/api/portraits/women/24.jpg" },
  { id: 8, name: "Dr. Arjun Menon", spec: "Neurologist", rating: "5.0", exp: "14 Years", loc: "Kochi", fee: 1500, img: "https://randomuser.me/api/portraits/men/22.jpg" },
];

export default function Doctors() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="font-sans text-gray-900 bg-[#F7FAFC] min-h-screen">
      <Navbar />

      <section className="pt-24 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-poppins">Find & Book Top Doctors</h1>
          <p className="text-gray-600 text-lg">Consult with India's best healthcare professionals online or at your home.</p>
        </div>

        <div className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search doctor, specialty, or clinic" className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium" />
          </div>
          <select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">
            <option>All Locations</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Delhi</option>
          </select>
          <select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">
            <option>All Specialties</option>
            <option>General Physician</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Pediatrician</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map(doc => (
            <div key={doc.id} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative mb-4 overflow-hidden rounded-[16px] aspect-square bg-gray-100">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Available
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-primary">{doc.name}</h3>
              <p className="text-sm font-medium text-secondary mb-4">{doc.spec}</p>
              
              <div className="flex flex-col gap-2 text-xs font-medium text-gray-500 mb-6 flex-1">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {doc.exp}</div>
                  <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-current" /> {doc.rating}</div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {doc.loc}</div>
                  <div className="font-bold text-gray-700">₹{doc.fee} / visit</div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Doctors.jsx', componentContent);
console.log('Doctors.jsx created');
