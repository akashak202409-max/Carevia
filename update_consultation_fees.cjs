const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

const targetFeeField = `                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Consultation Fee (₹) *</label>
                    <input type="number" placeholder="600" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>`;

const newFeeFields = `                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Home Consultation Fee (₹) *</label>
                    <input type="number" placeholder="800" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Online Consultation Fee (₹) *</label>
                    <input type="number" placeholder="500" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Clinic Consultation Fee (₹) *</label>
                    <input type="number" placeholder="600" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>`;

if (content.includes('Consultation Fee (₹) *')) {
  content = content.replace(targetFeeField, newFeeFields);
  fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
  console.log('Consultation fees updated');
} else {
  console.log('Target not found');
}
