const fs = require('fs');
let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

// Replace all \${ with ${
content = content.replace(/\\\${/g, '${');
// Replace all \` with `
content = content.replace(/\\`/g, '`');

fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Fixed escape sequences');
