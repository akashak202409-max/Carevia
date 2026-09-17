const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

const uploadBlockToRemove = `<div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><Building className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-800">Cancelled Cheque / Passbook</h4>
                      <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 5MB</p>
                    </div>
                  </div>
                  <button className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F0F4FF] transition">Upload</button>
                </div>`;

content = content.replace(uploadBlockToRemove, '');

// Clean up any extra empty lines or adjust margin if necessary. The form above it has mb-6.
// Let's just write it out.
fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
console.log('Cancelled cheque upload removed');
