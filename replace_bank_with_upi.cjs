const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

const targetToReplace = `<h2 className="text-xl font-bold text-primary mb-1">Bank Details</h2>
                  <p className="text-sm text-gray-500">Provide your bank information for receiving consultation payouts.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Holder Name *</label>
                    <input type="text" placeholder="Dr. Priya Sharma" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bank Name *</label>
                    <input type="text" placeholder="e.g. HDFC Bank" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Number *</label>
                    <input type="password" placeholder="••••••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">IFSC Code *</label>
                    <input type="text" placeholder="e.g. HDFC0001234" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition uppercase" />
                  </div>
                </div>`;

const newUPIDetails = `<h2 className="text-xl font-bold text-primary mb-1">Payment Details</h2>
                  <p className="text-sm text-gray-500">Provide your UPI ID for receiving consultation payouts.</p>
                </div>
                
                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">UPI ID *</label>
                  <input type="text" placeholder="e.g. 9876543210@ybl or drpriya@okicici" className="w-full max-w-md bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium transition" />
                </div>`;

if (content.includes('Bank Details')) {
  content = content.replace(targetToReplace, newUPIDetails);
  fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
  console.log('Successfully replaced Bank Details with UPI ID');
} else {
  console.log('Could not find Bank Details block to replace');
}
