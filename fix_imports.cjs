const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// The line currently has: MessageCircle, CheckCircle, FileText,
// We want to replace it to just MessageCircle, FileText, since CheckCircle is already on line 4.
content = content.replace('MessageCircle, CheckCircle, FileText,', 'MessageCircle, FileText,');

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Fixed imports');
