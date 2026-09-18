const fs = require('fs');
let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const startTag = `{/* Form Panel */}`;
const startIndex = content.indexOf(startTag);
if (startIndex !== -1) {
  const endIndex = content.indexOf('</div>\n              </div>\n            </div>\n          )}\n\n          {/* STEP 4: Confirm */}');
  
  if (endIndex !== -1) {
    const uploadUI = `{/* Form Panel */}
                <div className="md:col-span-3 bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-center">
                  <h4 className="font-bold text-primary mb-2">Upload Medical Reports</h4>
                  <p className="text-sm text-gray-500 mb-6">Please upload any relevant previous prescriptions or lab reports for the doctor to review.</p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-[24px] bg-gray-50 p-10 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-secondary transition cursor-pointer h-64">
                    <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Click to upload reports</h4>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>`;
                
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    
    // Also fix validation
    let newContent = before + uploadUI + after;
    newContent = newContent.replace(
      'const isStep3Valid = patientInfo.name.trim() !== "" && patientInfo.phone.trim() !== "";',
      'const isStep3Valid = true;'
    );
    
    fs.writeFileSync('src/components/BookingModal.jsx', newContent);
    console.log('Replaced Patient info with Upload');
  } else {
    console.log('Could not find end index');
  }
} else {
  console.log('Could not find start index');
}
