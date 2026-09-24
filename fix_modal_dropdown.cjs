const fs = require('fs');

let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// 1. Add states for search and filter
modal = modal.replace(
  'const [selectedDoctor, setSelectedDoctor] = useState(null);',
  'const [selectedDoctor, setSelectedDoctor] = useState(null);\n  const [searchQuery, setSearchQuery] = useState("");\n  const [filterSpec, setFilterSpec] = useState("");'
);

// 2. Initialize filterSpec based on serviceType
const effectFind = `if (isOpen) {
      document.body.style.overflow = 'hidden';`;
const effectReplace = `if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-set filter based on service page
      if (serviceType === 'physiotherapy') setFilterSpec('Physiotherapist Home Visit');
      else if (serviceType === 'home-doctor') setFilterSpec('Home Doctor Visit');
      else if (serviceType === 'nurse-care') setFilterSpec('Nursing Home Care');
      else if (serviceType === 'care-taker') setFilterSpec('Elderly / Geriatric Care');
      else setFilterSpec('');`;
modal = modal.replace(effectFind, effectReplace);

// 3. Bind the inputs
modal = modal.replace(
  '<input type="text" placeholder="Search doctor or specialist" className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium" />',
  '<input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search doctor or specialist" className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium" />'
);

modal = modal.replace(
  '<select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">',
  '<select value={filterSpec} onChange={e => setFilterSpec(e.target.value)} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">'
);

// 4. Update the DOCTORS map logic to use both search and filterSpec
const oldMapLogic = `{DOCTORS.filter(doc => {
                  if (!serviceType) return true;
                  if (serviceType === 'physiotherapy' && doc.spec !== 'Physiotherapist') return false;
                  if (serviceType === 'ayurveda' && doc.spec !== 'Ayurveda Doctor') return false;
                  if (serviceType === 'nurse-care' && doc.spec !== 'Nurse') return false;
                  if (serviceType === 'bhs' && doc.spec !== 'BHS') return false;
                  if (serviceType === 'baby-care' && doc.spec !== 'Pediatrician') return false;
                  if (serviceType === 'care-taker' && doc.spec !== 'Care Taker') return false;
                  if (serviceType === 'home-doctor' && doc.spec !== 'General Physician') return false;
                  return true;
                }).map(doc => (`

const newMapLogic = `{DOCTORS.filter(doc => {
                  // 1. Search Query
                  if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase()) && !doc.spec.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                  
                  // 2. Dropdown Filter
                  if (filterSpec) {
                    if (filterSpec === 'Physiotherapist Home Visit' && doc.spec !== 'Physiotherapist') return false;
                    if (filterSpec === 'Home Doctor Visit' && doc.spec !== 'General Physician') return false;
                    if (filterSpec === 'Nursing Home Care' && doc.spec !== 'Nurse') return false;
                    if (filterSpec === 'Elderly / Geriatric Care' && doc.spec !== 'Care Taker') return false;
                    if (filterSpec === 'Doctor Appointment – General Physician' && doc.spec !== 'General Physician') return false;
                    if (filterSpec === 'Cardiologist' && doc.spec !== 'Cardiologist') return false;
                    if (filterSpec === 'Pediatrician' && doc.spec !== 'Pediatrician') return false;
                    // For anything else, loosely match if spec is in the filter string
                    if (!['Physiotherapist Home Visit', 'Home Doctor Visit', 'Nursing Home Care', 'Elderly / Geriatric Care', 'Doctor Appointment – General Physician', 'Cardiologist', 'Pediatrician'].includes(filterSpec)) {
                       if (!filterSpec.toLowerCase().includes(doc.spec.toLowerCase()) && !doc.spec.toLowerCase().includes(filterSpec.toLowerCase())) return false;
                    }
                  } else {
                    // 3. Fallback to serviceType if no dropdown filter is selected
                    if (serviceType === 'physiotherapy' && doc.spec !== 'Physiotherapist') return false;
                    if (serviceType === 'ayurveda' && doc.spec !== 'Ayurveda Doctor') return false;
                    if (serviceType === 'nurse-care' && doc.spec !== 'Nurse') return false;
                    if (serviceType === 'bhs' && doc.spec !== 'BHS') return false;
                    if (serviceType === 'baby-care' && doc.spec !== 'Pediatrician') return false;
                    if (serviceType === 'care-taker' && doc.spec !== 'Care Taker') return false;
                    if (serviceType === 'home-doctor' && doc.spec !== 'General Physician') return false;
                  }
                  
                  return true;
                }).map(doc => (`

modal = modal.replace(oldMapLogic, newMapLogic);

fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('Modal dropdown filter hooked up!');
