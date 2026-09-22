const fs = require('fs');
let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

// 1. Add states mapping
const stateData = `
const INDIAN_STATES_CITIES = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
  "Delhi": ["New Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Telangana": ["Hyderabad", "Warangal"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Agra"]
};
`;

if (!content.includes('INDIAN_STATES_CITIES')) {
  content = content.replace(
    'export default function ProfessionalOnboarding() {',
    stateData + '\nexport default function ProfessionalOnboarding() {'
  );
}

// 2. Add state hooks
if (!content.includes('const [selectedState, setSelectedState]')) {
  content = content.replace(
    'const [step, setStep] = useState(2);',
    'const [step, setStep] = useState(2);\n  const [selectedState, setSelectedState] = useState("");\n  const [selectedCity, setSelectedCity] = useState("");'
  );
}

// 3. Replace the UI inputs
const oldCity = `                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City *</label>
                    <input type="text" placeholder="Chennai" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>`;
const oldState = `                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State *</label>
                    <input type="text" placeholder="Tamil Nadu" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>`;

// Wait, the order in the file is City then State. We should probably make State first or just replace both at once.
// Let's replace the whole block of City and State.
const oldBlock = `                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City *</label>
                    <input type="text" placeholder="Chennai" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State *</label>
                    <input type="text" placeholder="Tamil Nadu" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>`;

const newBlock = `                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State *</label>
                    <select 
                      value={selectedState} 
                      onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(''); }}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition appearance-none"
                    >
                      <option value="">Select State</option>
                      {Object.keys(INDIAN_STATES_CITIES).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City *</label>
                    <select 
                      value={selectedCity} 
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City</option>
                      {selectedState && INDIAN_STATES_CITIES[selectedState].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
  console.log('Successfully replaced city and state inputs with dropdowns!');
} else {
  console.log('Failed to find the old block.');
}
