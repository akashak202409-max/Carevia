const fs = require('fs');
let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const newDropdown = `<select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium text-gray-600 appearance-none">
                  <option value="">Select Specialization</option>
                  <option>Doctor Appointment – General Physician</option>
                  <optgroup label="Specialist Doctor Appointment">
                    <option>Cardiologist</option>
                    <option>Neurologist</option>
                    <option>Orthopedic</option>
                    <option>Dermatologist</option>
                    <option>Psychiatrist</option>
                    <option>Pediatrician</option>
                    <option>Gynecologist</option>
                    <option>ENT</option>
                    <option>Ophthalmologist</option>
                    <option>Diabetologist</option>
                  </optgroup>
                  <option>Online Video Consultation</option>
                  <option>Phone Consultation</option>
                  <option>Home Doctor Visit</option>
                  <option>Physiotherapist Home Visit</option>
                  <option>Speech Therapy Home Visit</option>
                  <option>Occupational Therapy Home Visit</option>
                  <option>Nursing Home Care</option>
                  <option>Elderly / Geriatric Care</option>
                  <option>Post-operative Home Care</option>
                  <option>Wound Dressing</option>
                  <option>Injection / Basic Nursing Services</option>
                  <option>Lab Test Booking</option>
                  <option>Blood Test Home Collection</option>
                  <option>Health Check-up Packages</option>
                  <option>Medicine Delivery / Pharmacy</option>
                  <option>Ambulance Booking</option>
                  <option>Hospital Appointment</option>
                  <option>Diagnostic Scan Booking</option>
                </select>`;

const selectRegex = /<select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary\/50 text-sm font-medium text-gray-600 appearance-none">[\s\S]*?Select Specialization[\s\S]*?<\/select>/;

if (content.match(selectRegex)) {
  content = content.replace(selectRegex, newDropdown);
  fs.writeFileSync('src/components/BookingModal.jsx', content);
  console.log('Successfully updated the Specialization dropdown.');
} else {
  console.log('Regex did not match.');
}
