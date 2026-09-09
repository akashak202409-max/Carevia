const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const heroRegex = /<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end pb-12 lg:pb-16 overflow-hidden bg-\[#F7FAFC\]">([\s\S]*?)<\/section>/;

// Find the content inside the hero section to inject the floating icons right after the <section> opening tag
const replacement = `<section id="home" className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-end pb-12 lg:pb-16 overflow-hidden bg-[#F7FAFC]">
        {/* Floating Medical Animations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 text-secondary/30 animate-float">
            <HeartPulse className="w-16 h-16" />
          </div>
          <div className="absolute top-40 right-24 text-primary/20 animate-float-delayed">
            <Activity className="w-20 h-20" />
          </div>
          <div className="absolute top-1/2 left-10 text-green-500/20 animate-pulse animate-float-delayed">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
          </div>
          <div className="absolute top-1/3 right-10 text-secondary/20 animate-float">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 7l-10 5L2 7l10-5zm0 10l10-5-10-5-10 5 10 5z" /></svg>
          </div>
        </div>
        $1</section>`;

content = content.replace(heroRegex, replacement);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Added floating animations to hero');
