const fs = require('fs');
let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// Change default state to 'online' so the user sees the new UI immediately
content = content.replace(
  'const [consultationType, setConsultationType] = useState("clinic");',
  'const [consultationType, setConsultationType] = useState("online");'
);

// Add a state for selected UPI method
content = content.replace(
  'const [consultationType, setConsultationType] = useState("online");',
  'const [consultationType, setConsultationType] = useState("online");\n  const [selectedUpi, setSelectedUpi] = useState("gpay");'
);

// Find the old credit card UI block
const oldCreditCardUI = `<div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
                      <input type="text" placeholder="1234 5678 9101 1121" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-2 focus:ring-secondary/50 outline-none text-sm font-medium" />
                      </div>
                    </div>
                  </div>`;

// New UPI UI
const newUpiUI = `<div className="space-y-6">
                    <h4 className="font-bold text-[#1e293b] text-sm uppercase tracking-wider mb-2">Select Payment Method</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {/* GPay */}
                      <div 
                        onClick={() => setSelectedUpi('gpay')}
                        className={\`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all \${selectedUpi === 'gpay' ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}\`}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">GPay</span>
                      </div>
                      
                      {/* PhonePe */}
                      <div 
                        onClick={() => setSelectedUpi('phonepe')}
                        className={\`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all \${selectedUpi === 'phonepe' ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}\`}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-2">
                          <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" alt="PhonePe" className="w-full h-full object-cover scale-[1.5]" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">PhonePe</span>
                      </div>
                      
                      {/* Other UPI */}
                      <div 
                        onClick={() => setSelectedUpi('upi')}
                        className={\`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all \${selectedUpi === 'upi' ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}\`}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">Other UPI</span>
                      </div>
                    </div>

                    {selectedUpi === 'upi' && (
                      <div className="animate-[fade-in_0.3s_ease-out]">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enter UPI ID</label>
                        <input type="text" placeholder="username@upi" className="w-full bg-white border-2 border-gray-100 rounded-xl p-4 focus:border-[#4F46E5] focus:ring-0 outline-none text-sm font-medium transition" />
                      </div>
                    )}
                    
                    {selectedUpi !== 'upi' && (
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center animate-[fade-in_0.3s_ease-out]">
                        <p className="text-sm text-blue-700 font-medium">You will be redirected to the <strong>{selectedUpi === 'gpay' ? 'Google Pay' : 'PhonePe'}</strong> app to complete your secure payment.</p>
                      </div>
                    )}
                  </div>`;

if (content.includes(oldCreditCardUI)) {
  content = content.replace(oldCreditCardUI, newUpiUI);
  fs.writeFileSync('src/components/BookingModal.jsx', content);
  console.log('UPI Payment options implemented');
} else {
  console.log('Could not find old credit card block');
}
