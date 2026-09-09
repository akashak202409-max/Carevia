import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Jobs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="font-sans text-primary bg-[#F7FAFC] min-h-screen">
      <Navbar />
      <div className="pt-40 text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">Find Jobs (Side 2)</h1>
        <p className="text-gray-600">This side is for professionals looking for jobs.</p>
      </div>
    </div>
  );
}
