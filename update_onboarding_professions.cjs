const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

// 1. Update the specializationOptions object
const newSpecs = `
  "BHS": [
    "General Health Science", "Community Health", "Public Health", "Health & Wellness", 
    "Nutrition & Wellness", "Healthcare Management", "Medical Laboratory Science", 
    "Health Education", "Preventive Healthcare", "Rehabilitation & Health Support"
  ],
  "Ayurveda Doctor": [
    "General Ayurveda", "Panchakarma", "Kayachikitsa (General Medicine)", "Shalya Tantra (Surgery)", 
    "Shalakya Tantra (ENT & Ophthalmology)", "Kaumarabhritya (Pediatrics)", 
    "Prasuti & Stri Roga (Women’s Health)", "Swasthavritta (Preventive & Lifestyle Care)", 
    "Rasayana (Rejuvenation)", "Visha Chikitsa (Toxicology)", "Skin & Hair Care", "Pain & Joint Care"
  ]
};`;

content = content.replace('};', newSpecs);

// 2. Update the Profession dropdown options
const oldOptions = `<option>Select Profession</option>
                      <option>MBBS Doctor</option>
                      <option>Homeopathy Doctor</option>
                      <option>Physiotherapist</option>
                      <option>Nurse</option>
                      <option>Caretaker</option>
                      <option>Lab Centre</option>`;

const newOptions = `<option>Select Profession</option>
                      <option>MBBS Doctor</option>
                      <option>Homeopathy Doctor</option>
                      <option>Ayurveda Doctor</option>
                      <option>Physiotherapist</option>
                      <option>Nurse</option>
                      <option>Caretaker</option>
                      <option>Lab Centre</option>
                      <option>BHS</option>`;

content = content.replace(oldOptions, newOptions);

fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
console.log('Added BHS and Ayurveda to Onboarding');
