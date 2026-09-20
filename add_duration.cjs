const fs = require('fs');

// 1. Update BabyCare.jsx
let babyCare = fs.readFileSync('src/pages/BabyCare.jsx', 'utf8');
babyCare = babyCare.replace(
  '<BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />',
  '<BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} serviceType="baby-care" />'
);
fs.writeFileSync('src/pages/BabyCare.jsx', babyCare);

// 2. Update CareTaker.jsx
let careTaker = fs.readFileSync('src/pages/CareTaker.jsx', 'utf8');
careTaker = careTaker.replace(
  '<BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />',
  '<BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} serviceType="care-taker" />'
);
fs.writeFileSync('src/pages/CareTaker.jsx', careTaker);

// 3. Update BookingModal.jsx
let modal = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

// Add prop
modal = modal.replace(
  'export default function BookingModal({ isOpen, onClose }) {',
  'export default function BookingModal({ isOpen, onClose, serviceType }) {'
);

// Add state
modal = modal.replace(
  'const [selectedTime, setSelectedTime] = useState("");',
  'const [selectedTime, setSelectedTime] = useState("");\n  const [selectedDuration, setSelectedDuration] = useState("");'
);

// Update isStep2Valid
modal = modal.replace(
  'const isStep2Valid = selectedDate !== null && selectedTime !== "";',
  'const isStep2Valid = selectedDate !== null && selectedTime !== "" && (!(serviceType === "baby-care" || serviceType === "care-taker") || selectedDuration !== "");'
);

// Add duration to newAppt payload
modal = modal.replace(
  'time: selectedTime,',
  'time: selectedDuration ? `${selectedTime} (${selectedDuration})` : selectedTime,'
);

// Inject UI into Step 2
// Look for the end of the "Available Time Slots" div block in Step 2.
// The block ends right before </div> </div> )} {/* STEP 3: Details */}
const durationUI = `
                  {/* Shift Duration for Care services */}
                  {(serviceType === 'baby-care' || serviceType === 'care-taker') && (
                    <div className="mt-8">
                      <h4 className="font-bold text-gray-800 mb-4">Select Shift Duration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {["12 Hours", "24 Hours"].map(duration => (
                          <button
                            key={duration}
                            onClick={() => setSelectedDuration(duration)}
                            className={\`py-4 rounded-xl border-2 font-bold text-sm transition-all \${selectedDuration === duration ? 'border-secondary bg-secondary/5 text-secondary' : 'border-gray-100 hover:border-gray-200 text-gray-600'}\`}
                          >
                            {duration}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
`;

// Insert it after the time slots grid.
// Find the closing div of the time slots grid:
const timeSlotsBlock = `</div>
                </div>
              </div>
            </div>
          )}`;

const newTimeSlotsBlock = `</div>
                ${durationUI}
                </div>
              </div>
            </div>
          )}`;

modal = modal.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*\{\/\* STEP 3: Details \*\/\}/,
  `</div>\n${durationUI}\n                </div>\n              </div>\n            </div>\n          )}\n\n          {/* STEP 3: Details */}`
);

fs.writeFileSync('src/components/BookingModal.jsx', modal);
console.log('Added 12hrs and 24hrs duration selection.');
