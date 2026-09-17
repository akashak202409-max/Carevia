const fs = require('fs');

let content = fs.readFileSync('src/pages/ProfessionalOnboarding.jsx', 'utf8');

const targetToReplace = `                  {/* Doc 3 */}
                  <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><ShieldCheck className="w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-gray-800">ID Proof (Aadhaar / PAN)</h4>
                        <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 10MB</p>
                      </div>
                    </div>
                    <button className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F0F4FF] transition">Upload</button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">`;

const newBankDetails = `                  {/* Doc 3 */}
                  <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><ShieldCheck className="w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-gray-800">ID Proof (Aadhaar / PAN)</h4>
                        <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 10MB</p>
                      </div>
                    </div>
                    <button className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F0F4FF] transition">Upload</button>
                  </div>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-100 mt-10">
                  <h2 className="text-xl font-bold text-primary mb-1">Bank Details</h2>
                  <p className="text-sm text-gray-500">Provide your bank information for receiving consultation payouts.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                </div>

                <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:border-primary/30 transition mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-primary"><Building className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-800">Cancelled Cheque / Passbook</h4>
                      <p className="text-xs text-gray-500 mt-1">PDF / JPG / PNG — Max 5MB</p>
                    </div>
                  </div>
                  <button className="bg-white border-2 border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F0F4FF] transition">Upload</button>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">`;

content = content.replace(targetToReplace, newBankDetails);

fs.writeFileSync('src/pages/ProfessionalOnboarding.jsx', content);
console.log('Bank details section added to Step 4');
