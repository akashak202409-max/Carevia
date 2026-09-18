const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

content = content.replace(
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop',
  '/home-hero.jpg'
);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Replaced Home hero image successfully');
