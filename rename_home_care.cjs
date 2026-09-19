const fs = require('fs');
const path = require('path');

// 1. Rename the file
if (fs.existsSync('src/pages/HomeCare.jsx')) {
  fs.renameSync('src/pages/HomeCare.jsx', 'src/pages/BabyCare.jsx');
}

// 2. Helper to replace in a file
function replaceInFile(file, replacements) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    for (let r of replacements) {
      // replace all occurrences
      content = content.split(r.find).join(r.replace);
    }
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
}

// 3. Update App.jsx
replaceInFile('src/App.jsx', [
  { find: 'HomeCare', replace: 'BabyCare' },
  { find: '/home-care', replace: '/baby-care' },
  { find: 'Home Care', replace: 'Baby Care' }
]);

// 4. Update Navbar.jsx
replaceInFile('src/components/Navbar.jsx', [
  { find: 'Home Care', replace: 'Baby Care' },
  { find: '/home-care', replace: '/baby-care' }
]);

// 5. Update Home.jsx
replaceInFile('src/pages/Home.jsx', [
  { find: 'Home Care', replace: 'Baby Care' },
  { find: '/home-care', replace: '/baby-care' }
]);

// 6. Update BabyCare.jsx (formerly HomeCare.jsx)
replaceInFile('src/pages/BabyCare.jsx', [
  { find: 'Home Care', replace: 'Baby Care' },
  { find: 'HomeCare', replace: 'BabyCare' }
]);

// 7. Update other pages
const otherPages = ['src/pages/Careers.jsx', 'src/pages/FindJobs.jsx', 'src/pages/Blog.jsx', 'src/pages/ProfessionalOnboarding.jsx'];
for (const p of otherPages) {
  replaceInFile(p, [
    { find: 'Home Care', replace: 'Baby Care' }
  ]);
}
