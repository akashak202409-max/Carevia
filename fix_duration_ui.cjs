const fs = require('fs');
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const durationUI = `
                  {/* Shift Duration for Care services */}
                  {(serviceType === 'baby-care' || serviceType === 'care-taker') && (
                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <h4 className="font-bold text-gray-800 mb-4">Select Shift Duration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {["12 Hours", "24 Hours"].map(duration => (
                          <button
                            key={duration}
                            onClick={() => setSelectedDuration(duration)}
                            className={\`py-4 rounded-xl border-2 font-bold text-sm transition-all \${selectedDuration === duration ? 'border-secondary bg-secondary/5 text-secondary shadow-sm' : 'border-gray-100 hover:border-gray-200 text-gray-600'}\`}
                          >
                            {duration} Shift
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
`;

const searchString = `                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Details */}`;

if (modal.includes(searchString)) {
  const replaceString = `                  )}
${durationUI}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Details */}`;
  modal = modal.replace(searchString, replaceString);
  fs.writeFileSync('src/components/BookingModal.jsx', modal);
  console.log('UI injected');
} else {
  console.log('Failed to find target block');
}
