import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Physiotherapy from './pages/Physiotherapy.jsx';

import HomeCare from './pages/HomeCare.jsx';
import CareTaker from './pages/CareTaker.jsx';
import DoctorVisit from './pages/DoctorVisit.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import Login from './pages/Login.jsx';
import HireProfessional from './pages/HireProfessional.jsx';
import FindJobs from './pages/FindJobs.jsx';
import Verification from './pages/Verification.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/physiotherapy" element={<Physiotherapy />} />
        <Route path="/home-care" element={<HomeCare />} />
        <Route path="/care-taker" element={<CareTaker />} />
        <Route path="/doctor-visit" element={<DoctorVisit />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hire-professional" element={<HireProfessional />} />
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </Router>
  );
}
