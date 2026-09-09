const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Clock, Shield, Phone, MapPin, 
  ChevronRight, ChevronDown, Activity, Heart, Stethoscope, 
  Check, Star, Smartphone, ArrowRight, User
} from 'lucide-react';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function HomeCare() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const homeCareServices = [
    { icon: "🏥", title: "Post-Surgery Care", desc: "Recovery support after operations, wound care, medication management" },
    { icon: "👵", title: "Elderly Care", desc: "Daily support, mobility help, companionship for seniors" },
    { icon: "💊", title: "Chronic Illness Care", desc: "Long-term support for diabetes, BP, kidney, cancer patients" },
    { icon: "🛏️", title: "Bedridden Patient Care", desc: "Full attention for immobile patients, hygiene, positioning" },
    { icon: "🧠", title: "Stroke & Paralysis Care", desc: "Specialized rehabilitation & daily support" },
    { icon: "🤱", title: "Mother & Newborn Care", desc: "Post-delivery care for mothers and babies" },
    { icon: "🕊️", title: "Palliative Care", desc: "Comfort care with dignity and compassion" },
    { icon: "🏥", title: "ICU-Step-Down Care", desc: "Hospital-level care continued at home" }
  ];

  const caregiverTypes = [
    { icon: <Stethoscope className="w-8 h-8 text-primary mb-4" />, title: "Registered Nurse (GNM/BSc)", desc: "For medical needs — injections, IV, wound care, tracheostomy, catheter", price: "₹1,800 – ₹2,500 / day", bestFor: "Post-surgery, ICU-discharge, complex medical needs", btnText: "Book a Nurse" },
    { icon: <Heart className="w-8 h-8 text-primary mb-4" />, title: "Nursing Attendant", desc: "For daily support — bathing, feeding, mobility, vitals monitoring", price: "₹1,200 – ₹1,600 / day", bestFor: "Elderly, semi-dependent patients, general care", btnText: "Book an Attendant" },
    { icon: <User className="w-8 h-8 text-primary mb-4" />, title: "Elder Companion", desc: "For emotional support — companionship, walks, meals, conversation", price: "₹1,000 – ₹1,400 / day", bestFor: "Independent seniors needing company", btnText: "Book a Companion" }
  ];

  const steps = [
    { title: "Free Consultation", desc: "Talk to our care advisor about your needs", icon: "📞" },
    { title: "Care Assessment", desc: "We visit or call to understand the patient's condition", icon: "📋" },
    { title: "Caregiver Matched", desc: "Right nurse or attendant assigned within hours", icon: "✅" },
    { title: "Care Begins", desc: "Caregiver arrives, uniformed and equipped", icon: "🏠" },
    { title: "Track & Manage", desc: "Monitor daily care logs on our family app", icon: "📱" }
  ];

  const caregivers = [
    { name: "Nurse Kavitha M.", qual: "GNM Nursing, 6 years exp", spec: "Post-op & Elderly Care", rating: "4.9 (180 reviews)", lang: "English, Tamil", img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&q=80" },
    { name: "Attendant Rahul S.", qual: "Trained Caregiver, 4 yrs exp", spec: "Bedridden Care", rating: "4.8 (120 reviews)", lang: "Hindi, English", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80" },
    { name: "Nurse Priya K.", qual: "BSc Nursing, 8 years exp", spec: "ICU & Cardiac Care", rating: "5.0 (210 reviews)", lang: "English, Telugu", img: "https://images.unsplash.com/photo-1594824432258-0027a42c5251?w=400&q=80" },
    { name: "Companion Anita", qual: "Elderly Care Certified", spec: "Companionship", rating: "4.9 (95 reviews)", lang: "English, Kannada", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" }
  ];

  const features = [
    { icon: "🎓", title: "Trained & Certified", desc: "Only nurses and attendants from recognized institutes" },
    { icon: "🔍", title: "Background Verified", desc: "Police & reference checks on every caregiver" },
    { icon: "🔁", title: "Backup Guarantee", desc: "Replacement caregiver in 6 hours if needed" },
    { icon: "📱", title: "Family App", desc: "Track vitals, care logs, and shift updates daily" },
    { icon: "🛡️", title: "Fully Insured", desc: "Every caregiver covered by insurance" },
    { icon: "💬", title: "24/7 Support Line", desc: "Care coordinator on call anytime" }
  ];

  const faqs = [
    { q: "How quickly can a caregiver start at my home?", a: "We can typically arrange a caregiver within 4 to 24 hours of booking, depending on your specific medical requirements and location." },
    { q: "What's the difference between a nurse and an attendant?", a: "A registered nurse (RN/GNM) can perform medical tasks like injections, IVs, and wound care. An attendant helps with daily living activities like bathing, feeding, and mobility." },
    { q: "Can I request a female caregiver?", a: "Yes, you can specify your preference for a female or male caregiver during the booking process." },
    { q: "What happens if my caregiver falls sick or takes leave?", a: "We provide a 100% backup guarantee. If your caregiver is unavailable, we will arrange a replacement within 6 hours." },
    { q: "Do you provide caregivers for short-term needs?", a: "Yes, we offer both short-term (1-2 weeks for post-surgery) and long-term care plans." }
  ];

  const cities = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune", "Kolkata", "Coimbatore", "Kochi", "Ahmedabad", "Jaipur", "Lucknow", "+ 8 more"];

  return (
    <div className="font-sans text-primary bg-[#FAFBFC] min-h-screen relative selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-br from-white to-[#FEF7F0] overflow-hidden">
        <div className="lg:w-[55%] flex flex-col items-start z-10">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-[#FEF2F2] text-secondary px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 mb-6 border border-[#fce4e4]">
            🏠 24/7 Home Care Across India
          </motion.div>
          <div className="text-sm text-gray-500 mb-4 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-primary">Home</Link> <ChevronRight className="w-3 h-3" /> 
            <span className="hover:text-primary cursor-pointer">Services</span> <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Home Care</span>
          </div>
          <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-6 font-poppins text-primary">
            Hospital-Quality Home Care for the People You Love.
          </motion.h1>
          <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-lg text-[#5A6478] mb-6 max-w-[500px] leading-relaxed">
            Trained nurses, attendants, and caregivers who bring compassionate medical care to your home — for post-surgery recovery, elderly support, and chronic illness. Because home heals faster.
          </motion.p>
          
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="flex flex-wrap gap-4 mb-8 text-sm text-primary font-medium">
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm"><Check className="w-4 h-4 text-green-500" /> 1,000+ Trained Caregivers</span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm"><Star className="w-4 h-4 text-yellow-400" /> 4.9 Rated</span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm"><Activity className="w-4 h-4 text-blue-500" /> 15,000+ Families Served</span>
          </motion.div>

          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => setIsBookingModalOpen(true)} className="bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
              Book Home Care — ₹1,200 onwards/day
            </button>
            <a href="tel:+919876543210" className="bg-transparent border-2 border-primary text-primary hover:bg-[#F0F4FF] px-8 py-4 rounded-full font-semibold text-lg transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Speak to a Care Advisor
            </a>
          </motion.div>
          
          <p className="text-sm text-[#5A6478] mt-6">
            🕐 Caregiver in 4 hours • 💳 Weekly billing • 🛡️ Fully insured
          </p>
        </div>
        
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.6}} className="lg:w-[45%] relative mt-10 lg:mt-0 w-full animate-[float_4s_ease-in-out_infinite]">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80" 
              alt="Nurse helping elderly patient" 
              className="w-full h-[550px] object-cover"
            />
          </div>
          
          <div className="absolute top-10 -right-6 sm:-right-10 bg-white py-3 px-5 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Star className="text-yellow-500 w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-primary">4.9 / 5</p>
              <p className="text-xs text-gray-500">Trusted by 15,000+ families</p>
            </div>
          </div>
          
          <div className="absolute -bottom-8 -left-6 sm:-left-10 bg-gradient-to-r from-secondary to-secondary-hover text-white py-4 px-6 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">👩‍⚕️ Trained. Verified.<br/>Insured.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Quick Info Strip */}
      <section className="bg-[#FEF2F2] py-10 border-y border-[#fce4e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-[#fbd4d4]">
            {[
              { icon: <Clock className="w-6 h-6 text-secondary" />, title: "Shift Options", desc: "12-hour or 24-hour" },
              { icon: <span className="text-secondary font-bold text-xl">₹</span>, title: "Starting Price", desc: "₹1,200 per day" },
              { icon: <MapPin className="w-6 h-6 text-secondary" />, title: "Available In", desc: "20+ cities across India" },
              { icon: <Activity className="w-6 h-6 text-secondary" />, title: "Deployment", desc: "Caregiver at home in 4 hours" }
            ].map((info, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center pt-6 lg:pt-0 first:pt-0">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-primary mb-1">{info.title}</h3>
                  <p className="text-sm text-[#5A6478]">{info.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Home Care Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-[60%]">
            <FadeIn>
              <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-6 leading-tight">
                Care That Feels Like Family
              </h2>
              <p className="text-lg text-[#5A6478] mb-6 leading-relaxed">
                Whether you're looking for elderly parents, post-op patients, chronic illness support, or palliative care, we believe recovery is best at home. Our caregivers bring <span className="text-secondary font-medium">trained hands and kind hearts</span> directly to your loved ones.
              </p>
              <p className="text-lg text-[#5A6478] mb-8 leading-relaxed">
                Carevia matches the right caregiver to each family's specific needs, ensuring medical safety and emotional well-being go hand in hand.
              </p>
              
              <ul className="space-y-4">
                {["Fully trained nurses and attendants", "12-hour, 24-hour, or long-term care", "Backup caregiver guaranteed", "Family app to monitor daily care"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-primary font-medium">
                    <CheckCircle className="text-secondary w-6 h-6 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          
          <div className="md:w-[40%] relative">
            <FadeIn delay={0.2}>
              <div className="absolute inset-0 bg-[#FEF2F2] rounded-[40px] transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80" 
                alt="Family and caregiver" 
                className="rounded-[32px] shadow-2xl object-cover w-full h-[450px]"
              />
              <div className="absolute -bottom-6 -left-8 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                <span className="text-3xl">❤️</span>
                <p className="font-bold text-primary text-sm max-w-[150px]">96% of families continue with us beyond 30 days</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Types of Home Care */}
      <section className="py-24 bg-[#F0F4FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">Home Care Services We Offer</h2>
            <p className="text-lg text-[#5A6478] max-w-3xl mx-auto mb-16">
              From medical nursing to elderly companionship — matched to your family's exact needs
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeCareServices.map((service, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2 h-full flex flex-col text-left group border border-transparent hover:border-blue-100">
                  <div className="w-14 h-14 bg-[#F0F4FF] rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-[#5A6478] text-sm leading-relaxed flex-grow">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Who Comes to Your Home */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">Trained Professionals, Matched to Your Needs</h2>
            <p className="text-lg text-[#5A6478] max-w-3xl mx-auto mb-16">
              Different needs call for different care. Choose the right caregiver.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caregiverTypes.map((type, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white border border-gray-100 p-8 rounded-[24px] shadow-lg hover:shadow-xl transition flex flex-col h-full text-left">
                  {type.icon}
                  <h3 className="text-2xl font-bold text-primary mb-2">{type.title}</h3>
                  <p className="text-[#5A6478] mb-6 min-h-[60px]">{type.desc}</p>
                  
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-primary mb-4">{type.price}</p>
                    <p className="text-sm text-[#5A6478] mb-6"><strong>Best for:</strong> {type.bestFor}</p>
                    <button onClick={() => setIsBookingModalOpen(true)} className="w-full bg-transparent border-2 border-primary text-primary hover:bg-[#F0F4FF] py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 group">
                      {type.btnText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How It Works - 5 Step Journey */}
      <section className="py-24 bg-[#FEF2F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">Getting Care at Home in 5 Simple Steps</h2>
              <p className="text-lg text-[#5A6478] max-w-3xl mx-auto">From free assessment to caregiver at your door — we handle everything</p>
            </FadeIn>
          </div>
          
          <div className="relative">
            {/* Horizontal line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 border-t-2 border-dashed border-secondary opacity-50 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-md border-4 border-[#FEF2F2] mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">Step {idx + 1}</h3>
                    <h4 className="text-md font-semibold text-primary mb-2">{step.title}</h4>
                    <p className="text-sm text-[#5A6478]">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Meet Our Caregivers */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">Meet the Caregivers Who Come to Your Home</h2>
              <p className="text-lg text-[#5A6478] max-w-3xl mx-auto">Every caregiver is trained, background-verified, and reference-checked. Female caregivers available on request.</p>
            </FadeIn>
          </div>
          
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x gap-6 no-scrollbar">
            {caregivers.map((cg, idx) => (
              <div key={idx} className="min-w-[280px] sm:min-w-[320px] bg-white border border-gray-100 rounded-[20px] shadow-lg p-6 snap-center flex-shrink-0 hover:-translate-y-2 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={cg.img} alt={cg.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#F0F4FF]" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">{cg.name}</h3>
                    <p className="text-xs text-secondary font-medium flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> {cg.rating}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 text-sm">
                  <p className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Qualification</span> <span className="font-medium text-primary text-right">{cg.qual}</span></p>
                  <p className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Specialization</span> <span className="font-medium text-primary text-right">{cg.spec}</span></p>
                  <p className="flex justify-between pb-2"><span className="text-gray-500">Languages</span> <span className="font-medium text-primary text-right">{cg.lang}</span></p>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Female Caregiver</span>
                </div>
                
                <button className="w-full text-secondary font-bold hover:text-secondary-hover transition flex items-center justify-center gap-2">
                  View Profile <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="#" className="text-secondary font-bold hover:underline">View All 1,000+ Caregivers →</a>
          </div>
        </div>
      </section>

      {/* 9. Pricing */}
      <section className="py-24 bg-[#F0F4FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">Simple, Transparent Home Care Pricing</h2>
            <p className="text-lg text-[#5A6478] max-w-3xl mx-auto mb-16">No hidden charges. Pay weekly or monthly. Cancel anytime.</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-md text-left">
              <h3 className="text-xl font-bold text-primary mb-2">12-Hour Shift</h3>
              <div className="text-3xl font-bold text-primary mb-2">₹1,200 <span className="text-base text-gray-500 font-normal">/ day</span></div>
              <p className="text-sm text-gray-500 mb-6">Perfect for daytime or nighttime care</p>
              <ul className="space-y-4 mb-8">
                {["Trained attendant", "Daily care log", "Backup caregiver if unavailable", "Weekly billing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-primary"><Check className="text-green-500 w-5 h-5 shrink-0" /> {item}</li>
                ))}
              </ul>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full border-2 border-primary text-primary hover:bg-blue-50 py-3 rounded-xl font-semibold transition">Book 12-Hour Care</button>
            </div>
            
            <div className="bg-primary text-white p-8 rounded-3xl shadow-xl text-left transform md:-translate-y-4 relative border-4 border-secondary">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                <Star className="w-4 h-4 fill-current" /> Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">24-Hour Live-In Care</h3>
              <div className="text-3xl font-bold mb-2">₹1,800 <span className="text-base text-blue-200 font-normal">/ day</span></div>
              <p className="text-sm text-blue-200 mb-6">Save ₹600 vs two 12-hour shifts</p>
              <ul className="space-y-4 mb-8">
                {["Round-the-clock caregiver", "Live-in with the patient", "Everything in 12-Hour", "Free monthly nurse visit", "Priority replacement"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white"><Check className="text-secondary w-5 h-5 shrink-0" /> {item}</li>
                ))}
              </ul>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full bg-secondary hover:bg-secondary-hover text-white py-3 rounded-xl font-semibold transition">Book 24-Hour Care</button>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-md text-left">
              <h3 className="text-xl font-bold text-primary mb-2">Long-Term Care Plan</h3>
              <div className="text-3xl font-bold text-primary mb-2">₹45,000 <span className="text-base text-gray-500 font-normal">/ month</span></div>
              <p className="text-sm text-gray-500 mb-6">Save up to ₹9,000 (24-hour)</p>
              <ul className="space-y-4 mb-8">
                {["Dedicated caregiver", "Free care coordinator", "Free medical equipment rental", "Quarterly doctor visits", "Family app premium access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-primary"><Check className="text-green-500 w-5 h-5 shrink-0" /> {item}</li>
                ))}
              </ul>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full border-2 border-primary text-primary hover:bg-blue-50 py-3 rounded-xl font-semibold transition">Start Monthly Plan</button>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-500">💳 EMI available on monthly plans • 🛡️ All caregivers are fully insured</p>
        </div>
      </section>

      {/* 10. What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">What Your Home Caregiver Will Do</h2>
              <p className="text-lg text-[#5A6478] max-w-3xl mx-auto">A complete care package — nothing is missed</p>
            </FadeIn>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2"><Stethoscope className="w-6 h-6 text-secondary" /> Medical Care</h3>
              <ul className="space-y-4">
                {["Vitals monitoring (BP, sugar, temperature, oxygen)", "Medication management & reminders", "Wound dressing & catheter care", "Injections & IV administration (RN only)", "Post-operative recovery support", "Physiotherapy exercise assistance"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-primary"><Check className="text-secondary w-5 h-5 mt-0.5 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block w-px bg-gray-200"></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2"><Heart className="w-6 h-6 text-secondary" /> Daily Support</h3>
              <ul className="space-y-4">
                {["Bathing, grooming, personal hygiene", "Feeding & meal assistance", "Mobility & transfer support", "Toileting & incontinence care", "Companionship & emotional care", "Light housekeeping around the patient"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-primary"><Check className="text-secondary w-5 h-5 mt-0.5 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Why Choose Carevia */}
      <section className="py-24 bg-[#FEF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-16">Why 15,000+ Families Trust Carevia</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-md transition text-left border border-transparent hover:border-orange-100">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-[#5A6478] leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Family App Preview */}
      <section className="py-24 bg-[#F0F4FF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <FadeIn>
                <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4 leading-tight">Peace of Mind, in Your Pocket</h2>
                <p className="text-lg text-[#5A6478] mb-8">Live updates from your loved one's caregiver, every day.</p>
                <ul className="space-y-4 mb-10">
                  {[{icon:"📊", t:"Daily vitals & health logs"}, {icon:"🍽️", t:"Meal & medication tracking"}, {icon:"📸", t:"Photo updates from caregiver"}, {icon:"💬", t:"Direct chat with care coordinator"}, {icon:"🔔", t:"Real-time shift & change alerts"}].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg text-primary font-medium"><span className="text-2xl">{item.icon}</span> {item.t}</li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-opacity-90 transition">📱 App Store</button>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-opacity-90 transition">🤖 Google Play</button>
                </div>
              </FadeIn>
            </div>
            <div className="md:w-1/2 relative flex justify-center animate-[float_4s_ease-in-out_infinite]">
              <div className="w-[300px] h-[600px] bg-white rounded-[40px] border-[8px] border-gray-800 shadow-2xl relative overflow-hidden flex flex-col">
                {/* Fake App UI */}
                <div className="bg-primary text-white p-6 pt-10 text-center">
                  <h4 className="font-bold text-xl">Care Log: Dad</h4>
                  <p className="text-xs opacity-80 mt-1">Caregiver: Nurse Kavitha</p>
                </div>
                <div className="p-4 flex-grow bg-gray-50 flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">10:00 AM</p>
                    <p className="font-bold text-primary">Vitals Checked 📊</p>
                    <p className="text-sm text-gray-600 mt-2">BP: 120/80 • Sugar: 110 • Temp: 98.6°F</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">01:30 PM</p>
                    <p className="font-bold text-primary">Lunch & Meds 🍽️</p>
                    <p className="text-sm text-gray-600 mt-2">Ate full meal. Afternoon medication given.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">📸</div>
                    <div>
                      <p className="font-bold text-primary text-sm">Afternoon Walk</p>
                      <p className="text-xs text-gray-500">Dad enjoyed his walk in the garden today!</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-gray-200">
                  <button className="w-full bg-secondary text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"><MessageCircle className="w-5 h-5"/> Chat with Caregiver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Home Care Guide */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-12">How to Prepare Your Home for a Caregiver</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10 text-left">
            {[{i:"🛏️", t:"Set Up a Comfortable Care Space", d:"Choose a well-ventilated room with easy bathroom access"}, {i:"💊", t:"Organize Medications & Records", d:"Keep prescriptions and medical reports handy"}, {i:"🍽️", t:"Plan Meals in Advance", d:"Share dietary restrictions with the caregiver"}, {i:"🤝", t:"Introduce the Family", d:"Help the caregiver bond with the patient on day 1"}].map((tip, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl flex gap-4 items-start">
                <div className="text-3xl">{tip.i}</div>
                <div>
                  <h4 className="font-bold text-primary text-lg mb-1">{tip.t}</h4>
                  <p className="text-sm text-gray-600">{tip.d}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="text-secondary font-bold hover:underline">📖 Read our full Home Care Preparation Guide →</a>
        </div>
      </section>

      {/* 14. Testimonials */}
      <section className="py-24 bg-[#FEF2F2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-4">Stories from Families Like Yours</h2>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-12 shadow-sm text-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span> Verified Google Reviews — Real feedback from real families
            </div>
          </FadeIn>
          
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x gap-6 no-scrollbar">
            {[1,2,3].map((i) => (
              <div key={i} className="min-w-[320px] max-w-[400px] bg-white rounded-[20px] p-8 text-left shadow-lg snap-center flex-shrink-0">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-secondary fill-current" />)}
                </div>
                <p className="italic text-gray-700 mb-6 line-clamp-4">"After my father's stroke, we were lost. Carevia sent us Nurse Rekha — she treated him like her own father. Two months later, he's walking again. Forever grateful."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img src={"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">Anitha R. • Daughter • Bangalore</p>
                    <p className="text-xs text-gray-500 mb-1">24-Hour Stroke Recovery Care</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 font-medium"><Check className="w-3 h-3" /> Verified Google Review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="text-primary font-bold hover:underline mt-4 inline-block">See all 800+ family reviews on Google →</a>
        </div>
      </section>

      {/* 15. FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary">Frequently Asked Questions About Home Care</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left font-semibold text-lg text-primary flex justify-between items-center focus:outline-none"
                >
                  {faq.q}
                  <ChevronDown className={\`w-5 h-5 text-secondary transition-transform duration-300 \${activeFaq === idx ? 'rotate-180' : ''}\`} />
                </button>
                <div className={\`px-6 overflow-hidden transition-all duration-300 ease-in-out \${activeFaq === idx ? 'max-h-96 py-4 border-t border-gray-100' : 'max-h-0'}\`}>
                  <p className="text-[#5A6478] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. Cities We Serve */}
      <section className="py-24 bg-[#F0F4FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold font-poppins text-primary mb-4">Home Care Available in Your City</h2>
          <p className="text-lg text-[#5A6478] mb-12">Available across 20+ Indian cities — growing every month</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {cities.map((city, idx) => (
              <span key={idx} className="bg-white text-primary font-medium px-5 py-2.5 rounded-full shadow-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer border border-gray-100">{city}</span>
            ))}
          </div>
          <a href="#" className="text-secondary font-semibold hover:underline">🔔 Notify me when Carevia launches in my city →</a>
        </div>
      </section>

      {/* 17. Related Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-[40px] font-semibold font-poppins text-primary mb-12">You May Also Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {t:"Physiotherapy at Home", d:"Recovery from pain, injury or surgery.", p:"From ₹500/session"},
              {t:"Care Taker", d:"Companion care for independent elders.", p:"From ₹800/day"},
              {t:"Doctor Visit", d:"Doctor consultations at home.", p:"From ₹600/visit"}
            ].map((s, i) => (
              <div key={i} className="border border-gray-200 p-8 rounded-[24px] text-left hover:shadow-lg transition">
                <h3 className="font-bold text-xl text-primary mb-2">{s.t}</h3>
                <p className="text-gray-500 text-sm mb-4">{s.d}</p>
                <p className="font-bold text-primary mb-6">{s.p}</p>
                <a href="#" className="text-secondary font-bold hover:underline flex items-center gap-1">Explore <ArrowRight className="w-4 h-4"/></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18. Big CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-secondary to-primary text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">Your Family Deserves the Best Care. We Deliver It Home.</h2>
          <p className="text-xl text-white/90 mb-10">Speak to our care advisor today. Free consultation. No obligation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button onClick={() => setIsBookingModalOpen(true)} className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-xl flex items-center justify-center gap-2">📱 Book Home Care Now</button>
            <a href="https://wa.me/919876543210" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">💬 Talk to Advisor on WhatsApp</a>
          </div>
          <p className="text-white/80 text-sm">⚡ Caregiver at your home in 4 hours • ☎️ Free consultation</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Carevia Logo" className="h-10 w-auto object-contain brightness-0 invert" />
              </div>
              <p className="text-gray-400 mb-6">Quality healthcare, delivered.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/physiotherapy" className="hover:text-secondary transition">Physiotherapy</Link></li>
                <li><Link to="/home-care" className="hover:text-secondary transition text-secondary">Home Care</Link></li>
                <li><Link to="/care-taker" className="hover:text-secondary transition">Care Taker</Link></li>
                <li><Link to="/doctor-visit" className="hover:text-secondary transition">Doctor Visit</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#about" className="hover:text-secondary transition">About Us</a></li>
                <li><a href="#how-it-works" className="hover:text-secondary transition">How It Works</a></li>
                <li><a href="#partner" className="hover:text-secondary transition">Partner with Us</a></li>
                <li><a href="#careers" className="hover:text-secondary transition">Careers</a></li>
                <li><a href="#contact" className="hover:text-secondary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-secondary" /> Bangalore, India</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-secondary" /> +91 98765 43210</li>
                <li className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-secondary" /> hello@carevia.com</li>
              </ul>
              <button className="mt-6 bg-[#25D366] text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#1ebd5c] transition">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </button>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2026 Carevia. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Refund Policy</a>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500 text-center flex flex-wrap justify-center gap-2">
            <span>Home Nursing Services in Chennai</span> • <span>24-Hour Attendant in Bangalore</span> • <span>Post-Surgery Care at Home</span> • <span>Elderly Care in Hyderabad</span> • <span>ICU Care at Home in Mumbai</span> • <span>Palliative Care Delhi</span>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <a href="https://wa.me/919876543210" className="fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-full shadow-[0_0_20px_rgba(218,124,117,0.5)] hover:scale-110 transition z-50 animate-pulse">
        <MessageCircle className="w-8 h-8" />
      </a>
      
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 flex gap-3 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <a href="tel:+919876543210" className="flex-1 border-2 border-primary text-primary py-3 rounded-xl font-bold flex justify-center items-center gap-2">📞 Call Advisor</a>
        <button onClick={() => setIsBookingModalOpen(true)} className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold">Book Care</button>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
\`;

fs.writeFileSync('src/pages/HomeCare.jsx', code);
console.log('Complete rewrite of HomeCare.jsx generated successfully.');
