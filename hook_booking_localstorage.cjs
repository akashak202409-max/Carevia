const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const handleNextBlock = `  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };`;

const newHandleNext = `  const handleNext = () => {
    if (step === 4) {
      // Create new appointment object for doctor dashboard
      const newAppt = {
        id: Date.now(),
        date: selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/ /g, ' ') : 'UNKNOWN',
        time: selectedTime,
        title: \`\${consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} Consultation\`,
        status: 'Waiting',
        statusColor: 'yellow',
        patient: 'Sanjay M.', // Mock logged-in patient
        phone: '+91 99887 76655',
        location: consultationType === 'online' ? 'Virtual' : (consultationType === 'home' ? 'Patient Home' : 'Main Clinic')
      };
      
      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('carevia_appointments') || '[]');
        localStorage.setItem('carevia_appointments', JSON.stringify([newAppt, ...existing]));
        
        // Also trigger an event so other tabs/components could theoretically listen, 
        // though we'll just read on mount in Dashboard.
        window.dispatchEvent(new Event('carevia_appointment_booked'));
      } catch (e) {
        console.error('Failed to save appointment to localStorage', e);
      }
    }
    if (step < 5) setStep(step + 1);
  };`;

if (content.includes(handleNextBlock)) {
  content = content.replace(handleNextBlock, newHandleNext);
  fs.writeFileSync('src/components/BookingModal.jsx', content);
  console.log('Hooked BookingModal to localStorage');
} else {
  console.log('Could not find handleNext');
}
