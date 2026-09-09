const fs = require('fs');

let content = fs.readFileSync('src/pages/HomeCare.jsx', 'utf8');

// Replacements
content = content.replace(/Physiotherapy\(\)/g, 'HomeCare()');
content = content.replace(/Physiotherapy/g, 'Home Care');
content = content.replace(/physiotherapy/g, 'home care');
content = content.replace(/Physiotherapist/g, 'Home Nurse');
content = content.replace(/physiotherapist/g, 'home nurse');
content = content.replace(/Physio/g, 'Nurse');
content = content.replace(/physio/g, 'nurse');
content = content.replace(/Geriatric Nurse/g, 'Elderly Care');

// Specific text updates
content = content.replace('Conditions Our Home Nurses Treat', 'Conditions We Support at Home');
content = content.replace('Recover from pain, injury, or surgery with certified home nurses who visit you at home. Personalized care, zero travel, faster healing.', 'Get comprehensive medical and daily living support from certified home nurses and caregivers. Peace of mind for your loved ones.');
content = content.replace('Carevia connects you with highly qualified, background-checked home nurses who design custom treatment plans tailored to your home environment.', 'Carevia connects you with compassionate, background-checked caregivers and nurses who provide continuous support tailored to your specific needs.');
content = content.replace('We typically arrange a visit within 24-48 hours of booking', 'We can arrange a caregiver within 12-24 hours depending on your requirements');
content = content.replace('carry essential portable equipment, such as resistance bands, ultrasound therapy machines', 'bring necessary basic medical kits. For specialized ICU setups, we help arrange equipment separately');

fs.writeFileSync('src/pages/HomeCare.jsx', content);
console.log('Done replacing text in HomeCare.jsx');
