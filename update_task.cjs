const fs = require('fs');
let content = fs.readFileSync('.gemini/antigravity/brain/6de5c014-2f38-453b-bd3a-00ff27c15f02/task.md', 'utf8');
content = content.replace(/\[ \]/g, '[x]');
content = content.replace(/\[\/\]/g, '[x]');
fs.writeFileSync('.gemini/antigravity/brain/6de5c014-2f38-453b-bd3a-00ff27c15f02/task.md', content);
