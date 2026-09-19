const fs = require('fs');

const imageLogo = `<Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Carevia Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>`;

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

const regex = /<Link to="\/" className="flex items-center gap-2 cursor-pointer">[\s\S]*?<div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shadow-sm">[\s\S]*?<div className="w-4 h-4 bg-white rounded-full" \/>[\s\S]*?<\/div>[\s\S]*?<span className="text-xl font-bold text-primary font-poppins tracking-tight">carevia<\/span>[\s\S]*?<\/Link>/;

if (content.match(regex)) {
  content = content.replace(regex, imageLogo);
  fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
  console.log('Replaced logo in DoctorDashboard.jsx');
} else {
  console.log('Regex did not match.');
}
