const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

content = content.replace('Activity,', 'Activity, FileText,');

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Added FileText to imports');
