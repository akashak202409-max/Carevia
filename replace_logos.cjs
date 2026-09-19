const fs = require('fs');

const imageLogo = `<Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Carevia Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>`;

function replaceLogo(filePath, regex) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.match(regex)) {
      content = content.replace(regex, imageLogo);
      fs.writeFileSync(filePath, content);
      console.log(`Replaced logo in ${filePath}`);
    }
  }
}

// 1. PatientDashboard
const patientRegex = /<Link to="\/" className="flex items-center gap-3">[\s\S]*?<div className="w-10 h-10 bg-gradient-to-br from-secondary to-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">[\s\S]*?C[\s\S]*?<\/div>[\s\S]*?<span className="text-2xl font-bold text-primary tracking-tight font-poppins">carevia<\/span>[\s\S]*?<\/Link>/;
replaceLogo('src/pages/PatientDashboard.jsx', patientRegex);

// 2. DoctorDashboard
const doctorRegex = /<Link to="\/" className="flex items-center gap-3">[\s\S]*?<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">[\s\S]*?<div className="w-4 h-4 bg-white rounded-full" \/>[\s\S]*?<\/div>[\s\S]*?<span className="text-xl font-bold text-primary font-poppins tracking-tight">carevia<\/span>[\s\S]*?<\/Link>/;
replaceLogo('src/pages/DoctorDashboard.jsx', doctorRegex);

// 3. ProfessionalOnboarding
const onboardingRegex = /<Link to="\/" className="flex items-center gap-3">[\s\S]*?<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">[\s\S]*?<div className="w-4 h-4 bg-white rounded-full" \/>[\s\S]*?<\/div>[\s\S]*?<span className="text-xl font-bold text-primary font-poppins tracking-tight">carevia<\/span>[\s\S]*?<\/Link>/;
replaceLogo('src/pages/ProfessionalOnboarding.jsx', onboardingRegex);

