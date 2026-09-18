const fs = require('fs');
let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// 1. Shift handleNext logic to trigger save on step 5 instead of 4
const oldHandleNext = `const handleNext = () => {
    if (step === 4) {
      const newAppt = {`;

const newHandleNext = `const handleNext = () => {
    if (step === 5) {
      const newAppt = {`;

content = content.replace(oldHandleNext, newHandleNext);

// Also need to allow going to step 6 (success)
// The old handleNext ends with: setStep((s) => Math.min(s + 1, 5));
// Need to change it to: setStep((s) => Math.min(s + 1, 6));
content = content.replace('setStep((s) => Math.min(s + 1, 5));', 'setStep((s) => Math.min(s + 1, 6));');

// And handleBack: setStep((s) => Math.max(s - 1, 1)); - this is fine.

// 2. Add Step 5 JSX just before step === 5 (which is the old success screen, now we make success screen step 6)
content = content.replace('{/* STEP 5: Success */}\n          {step === 5 && (', '{/* STEP 6: Success */}\n          {step === 6 && (');

const paymentUI = `
          {/* STEP 5: Payment */}
          {step === 5 && (
            <div className="space-y-8 animate-[fade-in_0.4s_ease-out] max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Payment Details</h3>
                <p className="text-gray-500">Securely pay for your consultation.</p>
              </div>

              <div className="bg-white p-8 rounded-[24px] shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Total Amount</h4>
                    <p className="text-sm text-gray-500">{consultationType === 'online' ? 'Online Consultation' : 'Direct Visit'}</p>
                  </div>
                  <div className="text-3xl font-bold text-primary">₹{selectedDoctor?.fee || 500}</div>
                </div>

                {consultationType !== 'online' ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-[20px] p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-yellow-800 mb-2">Pay on Visit (COD)</h4>
                    <p className="text-yellow-700 font-medium">For direct visits, we only accept payment at the clinic or during the home visit. No upfront payment is required.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
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
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: Success */}
          {step === 6 && (`;

content = content.replace('{/* STEP 6: Success */}\n          {step === 6 && (', paymentUI);


// 3. Update the bottom buttons to accommodate step 5
const oldButtons = `
            {step === 4 && (
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md bg-secondary hover:bg-secondary-hover"
              >
                Confirm Appointment
              </button>
            )}
          </div>
        )}
`;

const newButtons = `
            {step === 4 && (
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md bg-secondary hover:bg-secondary-hover"
              >
                Proceed to Payment
              </button>
            )}

            {step === 5 && (
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md bg-[#4F46E5] hover:bg-[#4338CA]"
              >
                {consultationType === 'online' ? \`Pay ₹\${selectedDoctor?.fee || 500} & Book\` : 'Complete Booking'}
              </button>
            )}
          </div>
        )}
`;

content = content.replace(oldButtons, newButtons);


// 4. Update the step tracker to show 'Payment' if we want, but since they provided a 4-step UI image, let's just make the tracker max out at 4 or dynamically change the 4th bubble to Payment. Let's just add Payment as a 5th bubble to be safe and clear.
const oldTrackerArray = `['Professional', 'Date & Time', 'Details', 'Confirm'][idx]`;
const newTrackerArray = `['Professional', 'Date', 'Details', 'Confirm', 'Pay'][idx]`;
content = content.replace(oldTrackerArray, newTrackerArray);

const oldTrackerLoop = `{[1, 2, 3, 4].map((num, idx) => (`
const newTrackerLoop = `{[1, 2, 3, 4, 5].map((num, idx) => (`
content = content.replace(oldTrackerLoop, newTrackerLoop);

// Also need to hide the footer when step === 6 (Success)
// Currently: `{!isSubmitted && (` Wait, earlier I used `step === 5` as success. 
// Now success is `step === 6`.
// Look for `{step < 5 && (` and change to `{step < 6 && (`
content = content.replace('{step < 5 && (', '{step < 6 && (');


fs.writeFileSync('src/components/BookingModal.jsx', content);
console.log('Payment Page integrated');
