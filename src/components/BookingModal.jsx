import React from 'react';
import { X, Calendar } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-primary mb-2 font-poppins">Book Your Appointment</h2>
          <p className="text-gray-600 mb-8">
            Fill out the form below to schedule your physiotherapy session. We'll confirm your appointment shortly.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Email Address (Optional)</label>
              <input 
                type="email" 
                placeholder="yourname@email.com" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-500 mt-2">Email is optional, but recommended for appointment confirmations.</p>
            </div>

            {/* Preferred Appointment Date */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Preferred Appointment Date *</label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-gray-50 text-gray-700 cursor-pointer"
                  required
                />
                <Calendar className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Service Required */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Service Required *</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white appearance-none cursor-pointer" required>
                  <option value="" disabled selected>Select service</option>
                  <option>Physiotherapy</option>
                  <option>Home Care</option>
                  <option>Care Taker</option>
                  <option>Doctor Visit</option>
                </select>
              </div>

              {/* Preferred Location */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Preferred Location *</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white appearance-none cursor-pointer" required>
                  <option value="" disabled selected>Select location</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Kolkata</option>
                  <option>Coimbatore</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Additional Information</label>
              <textarea 
                rows="3" 
                placeholder="Please share any specific concerns or requirements..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">Include any relevant medical history or specific concerns.</p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-lg shadow-md transition-colors"
              >
                Submit Appointment Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
