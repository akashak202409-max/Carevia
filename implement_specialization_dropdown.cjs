const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

// Add specialization map at the top level
const specMapStr = `
const specializationOptions = {
  "MBBS Doctor": [
    "General Physician", "General Medicine", "Dermatology", "Pediatrics", "Gynecology", 
    "Cardiology", "Orthopedics", "ENT", "Ophthalmology", "Psychiatry", "Pulmonology", 
    "Gastroenterology", "Neurology", "Urology", "Emergency Medicine", "Family Medicine"
  ],
  "Homeopathy Doctor": [
    "General Homeopathy", "Pediatrics", "Dermatology", "Women’s Health", "Chronic Disease Care",
    "Allergy & Asthma", "Digestive Health", "Mental Wellness", "Joint & Pain Management", "Respiratory Care"
  ],
  "Physiotherapist": [
    "General Physiotherapy", "Orthopedic Physiotherapy", "Sports Physiotherapy", "Neurological Physiotherapy",
    "Pediatric Physiotherapy", "Geriatric Physiotherapy", "Cardiorespiratory Physiotherapy", 
    "Post-Surgery Rehabilitation", "Sports Injury Rehabilitation", "Pain Management"
  ],
  "Nurse": [
    "General Nursing", "Staff Nurse", "ICU Nurse", "Emergency Nurse", "Pediatric Nurse", 
    "Maternity Nurse", "Geriatric Nurse", "Home Care Nurse", "Surgical Nurse", "Community Health Nurse"
  ],
  "Caretaker": [
    "Elderly Care", "Patient Care", "Post-Surgery Care", "Bedridden Patient Care", "Disability Care", 
    "Child Care", "Home Care", "Companion Care", "Dementia Care", "Palliative Care"
  ],
  "Lab Centre": [
    "General Diagnostic Tests", "Blood Tests", "Urine Tests", "Diabetes Tests", "Thyroid Tests", 
    "Lipid Profile", "Liver Function Tests", "Kidney Function Tests", "Hormone Tests", "Allergy Tests", 
    "Vitamin Tests", "Microbiology", "Pathology", "Hematology", "Imaging & Diagnostics"
  ]
};
`;

if (!content.includes('specializationOptions')) {
  content = content.replace(
    'export default function ProfessionalOnboarding() {',
    specMapStr + '\nexport default function ProfessionalOnboarding() {'
  );
}

// Update the profession dropdown to strictly match the requested list
const oldProfessionDropdown = `<select value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                      <option>Select Profession</option>
                      <option>MBBS</option>
                      <option>Homeopathy Doctor</option>
                      <option>Physio</option>
                      <option>Nurse</option>
                      <option>Caretaker</option>
                      <option>Lab Centre</option>
                    </select>`;

const newProfessionDropdown = `<select value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                      <option>Select Profession</option>
                      <option>MBBS Doctor</option>
                      <option>Homeopathy Doctor</option>
                      <option>Physiotherapist</option>
                      <option>Nurse</option>
                      <option>Caretaker</option>
                      <option>Lab Centre</option>
                    </select>`;

content = content.replace(oldProfessionDropdown, newProfessionDropdown);

// Replace the Specialization input with the dynamic dropdown
const oldSpecializationInput = `<div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Specialization</label>
                    <input type="text" placeholder="e.g. Skin & Allergy" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>`;

const newSpecializationDropdown = `<div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {profession === 'Lab Centre' ? 'Laboratory Services / Test Categories' : 'Specialization'}
                    </label>
                    {profession && profession !== 'Select Profession' ? (
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition text-gray-600">
                        <option>Select {profession === 'Lab Centre' ? 'Service' : 'Specialization'}</option>
                        {specializationOptions[profession]?.map(opt => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type="text" placeholder="Select a profession first" disabled className="w-full bg-gray-100 border border-gray-100 rounded-xl p-3.5 text-sm font-medium text-gray-400 cursor-not-allowed" />
                    )}
                  </div>`;

content = content.replace(oldSpecializationInput, newSpecializationDropdown);

fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
console.log('Specialization dynamic dropdown implemented successfully');
