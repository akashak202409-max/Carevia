const fs = require('fs');
const path = require('path');

const pages = [
  'CareTaker.jsx', 'HomeCare.jsx', 'Ayurveda.jsx', 'Physiotherapy.jsx', 
  'HomeDoctor.jsx', 'NurseCare.jsx', 'BHS.jsx'
];

pages.forEach(page => {
  const filePath = path.join('src', 'pages', page);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already patched
  if (content.includes('BookingModal')) return;
  
  // 1. Add import BookingModal
  content = content.replace(
    "import Navbar from '../components/Navbar';",
    "import Navbar from '../components/Navbar';\nimport BookingModal from '../components/BookingModal';"
  );
  
  // 2. Add state
  const componentNameMatch = content.match(/export default function ([A-Za-z]+)\(\) {/);
  if (componentNameMatch) {
    const compDec = componentNameMatch[0];
    content = content.replace(
      compDec,
      `${compDec}\n  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);`
    );
  }
  
  // 3. Add onClick to AnimatedCTA
  // Usually it looks like <AnimatedCTA>Book a Session</AnimatedCTA>
  content = content.replace(
    '<AnimatedCTA>Book a Session</AnimatedCTA>',
    '<AnimatedCTA onClick={() => setIsBookingModalOpen(true)}>Book a Session</AnimatedCTA>'
  );
  // Just in case it spans multiple lines:
  content = content.replace(
    /<AnimatedCTA>[\s\n]*Book a Session[\s\n]*<\/AnimatedCTA>/,
    '<AnimatedCTA onClick={() => setIsBookingModalOpen(true)}>Book a Session</AnimatedCTA>'
  );

  // 4. Render modal at the bottom
  // Find the last </div>
  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    const before = content.substring(0, lastDivIndex);
    const after = content.substring(lastDivIndex);
    content = before + `  <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />\n    ` + after;
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Patched ${page}`);
});
