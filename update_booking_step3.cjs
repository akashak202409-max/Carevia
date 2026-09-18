const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// 1. Update isStep3Valid
const oldValidation = `const isStep3Valid = patientInfo.name.trim() !== "" && patientInfo.phone.trim() !== "";`;
const newValidation = `const isStep3Valid = true; // Always valid since it's just an optional upload now`;
if (content.includes(oldValidation)) {
  content = content.replace(oldValidation, newValidation);
}

// 2. Replace the Step 3 Form with an Upload Box
const formRegex = /<h3 className="text-xl font-bold text-primary mb-6">Patient Information<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\)\}/;

const uploadUI = `<h3 className="text-xl font-bold text-primary mb-2">Upload Medical Reports</h3>
                <p className="text-sm text-gray-500 mb-6">Please upload any relevant previous prescriptions or lab reports for the doctor to review.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-[24px] bg-gray-50 p-10 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-secondary transition cursor-pointer h-64">
                  <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">Click to upload reports</h4>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                </div>
              </div>
            </div>
          )}`;

content = content.replace(formRegex, uploadUI);

fs.writeFileSync('src/components/BookingModal.jsx', content);
console.log('Step 3 updated to just file upload');
