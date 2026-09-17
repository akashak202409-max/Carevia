const fs = require('fs');
let content = fs.readFileSync('src/pages/DoctorVisit.jsx', 'utf8');

// 1. Add BookingModal import
content = content.replace("import AnimatedCTA from '../components/AnimatedCTA';", "import AnimatedCTA from '../components/AnimatedCTA';\nimport BookingModal from '../components/BookingModal';");

// 2. Add State
content = content.replace("const [activeFaq, setActiveFaq] = useState(null);", "const [activeFaq, setActiveFaq] = useState(null);\n  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);");

// 3. Find the AnimatedCTA and add onClick handler
// Using regex to find <AnimatedCTA>Book a Session</AnimatedCTA> and replace it
const oldCTA = /<AnimatedCTA>\s*Book a Session\s*<\/AnimatedCTA>/g;
content = content.replace(oldCTA, '<AnimatedCTA onClick={() => setIsBookingModalOpen(true)}>Book a Session</AnimatedCTA>');

// 4. Inject <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} /> just before the closing </div>
const oldEnd = '    </div>\n  );\n}';
const newEnd = '      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />\n    </div>\n  );\n}';
content = content.replace(oldEnd, newEnd);

fs.writeFileSync('src/pages/DoctorVisit.jsx', content);
console.log('DoctorVisit.jsx hooked up to BookingModal');
