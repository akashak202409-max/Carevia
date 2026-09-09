import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="font-sans text-primary bg-[#F7FAFC] min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins text-primary mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Login to manage your appointments and records.</p>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone Number</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition bg-gray-50" placeholder="Enter your details" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition bg-gray-50" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded text-secondary focus:ring-secondary" /> Remember me
              </label>
              <button type="button" className="text-sm text-secondary font-medium hover:underline">Forgot Password?</button>
            </div>
            <button type="button" className="w-full bg-secondary hover:bg-secondary-hover text-white py-3.5 rounded-xl font-bold transition shadow-md">
              Login
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account? <button className="text-secondary font-bold hover:underline">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
