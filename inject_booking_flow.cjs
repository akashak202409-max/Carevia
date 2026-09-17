const fs = require('fs');

let doc = fs.readFileSync('src/pages/DoctorVisit.jsx', 'utf8');

if (!doc.includes('import BookingFlow')) {
  doc = doc.replace(
    "import AnimatedCTA from '../components/AnimatedCTA';",
    "import AnimatedCTA from '../components/AnimatedCTA';\nimport BookingFlow from '../components/BookingFlow';"
  );
}

const ctaSection = `<section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-secondary to-primary rounded-[32px] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">`;

const injection = `<BookingFlow />\n\n      ` + ctaSection;

doc = doc.replace(ctaSection, injection);

fs.writeFileSync('src/pages/DoctorVisit.jsx', doc);
console.log('Injected BookingFlow into DoctorVisit.jsx');
