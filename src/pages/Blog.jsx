import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Home, Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const posts = [
    {
      date: "02-07-2024",
      title: "Boost Immunity with Home Care",
      desc: "Discover how workflow automation and health routines can streamline recovery, reduce stress, and save your family valuable time.",
      img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&h=600&fit=crop"
    },
    {
      date: "25-06-2024",
      title: "Securing Health Data in Cloud",
      desc: "Learn the best practices for protecting sensitive patient data in digital environments, including encryption and access controls.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
    },
    {
      date: "10-06-2024",
      title: "Choosing the Right Physio",
      desc: "Explore a strategic approach to selecting medical experts, tools, and platforms that align with your family's recovery goals.",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop"
    },
    {
      date: "25-06-2024",
      title: "Choosing Caretakers Wisely",
      desc: "Choosing the right care plan is critical to your recovery's long-term success. In this guide, we break down how to evaluate options.",
      img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=600&fit=crop"
    },
    {
      date: "25-06-2024",
      title: "Understanding Patient Culture",
      desc: "Discover how embracing a compassionate culture can break down silos between families and doctors, fostering seamless collaboration.",
      img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop"
    },
    {
      date: "10-06-2024",
      title: "Optimizing Health Infrastructure",
      desc: "Explore smart, future-focused strategies to modernize outdated routines, implement real-time monitoring tools, and manage well-being.",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop"
    }
  ];

  return (
    <div className="font-sans text-primary bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-green-50 via-white to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 mb-6">
            <Home className="w-4 h-4" />
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <span className="text-primary font-bold">Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold font-poppins text-primary mb-6 leading-tight">
            Insights, <br/>Ideas & Health Tips
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-16">
            Explore expert articles, medical trends, and practical tips to keep your family healthy and ahead of the curve.
          </p>

          {/* Collage */}
          <div className="flex justify-center items-center gap-4 h-64 md:h-80 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=300&h=400&fit=crop" alt="Collage 1" className="w-1/5 max-w-[150px] h-3/5 object-cover rounded-3xl hidden md:block" />
            <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&h=400&fit=crop" alt="Collage 2" className="w-1/4 max-w-[200px] h-4/5 object-cover rounded-[2rem]" />
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=500&fit=crop" alt="Collage 3" className="w-1/3 max-w-[280px] h-full object-cover rounded-[2.5rem] shadow-xl z-10 relative -top-4" />
            <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=400&fit=crop" alt="Collage 4" className="w-1/4 max-w-[200px] h-4/5 object-cover rounded-[2rem]" />
            <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&h=400&fit=crop" alt="Collage 5" className="w-1/5 max-w-[150px] h-3/5 object-cover rounded-3xl hidden md:block" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-gray-500 font-semibold mb-2 block text-lg">Our Blog</span>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary leading-tight">
              View All <br/>Knowledge Posts
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-sm md:text-base leading-relaxed">
            Dive into expert-written articles, tutorials, and insights designed to help you stay ahead in the fast-moving world of healthcare and family well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col h-full">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                <Calendar className="w-4 h-4" /> {post.date}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                {post.desc}
              </p>
              <div className="relative rounded-[2rem] overflow-hidden mt-auto aspect-[4/3]">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-primary px-6 py-2.5 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <footer className="bg-[#F7FAFC] border-t border-gray-100 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium">© 2024 Carevia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
