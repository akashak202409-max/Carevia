const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');

const oldHandleNext = `const handleNext = () => setStep((s) => Math.min(s + 1, 5));`;

const newHandleNext = `const handleNext = () => {
    if (step === 4) {
      const newAppt = {
        id: Date.now(),
        date: selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/ /g, ' ') : 'UNKNOWN',
        time: selectedTime,
        title: consultationType ? consultationType.charAt(0).toUpperCase() + consultationType.slice(1) + ' Consultation' : 'Consultation',
        status: 'Waiting',
        statusColor: 'yellow',
        patient: patientInfo?.name || 'Sanjay M.',
        phone: patientInfo?.phone || '+91 99887 76655',
        location: consultationType === 'online' ? 'Virtual' : (consultationType === 'home' ? 'Patient Home' : 'Main Clinic')
      };
      
      try {
        const existing = JSON.parse(localStorage.getItem('carevia_appointments') || '[]');
        localStorage.setItem('carevia_appointments', JSON.stringify([newAppt, ...existing]));
        window.dispatchEvent(new Event('carevia_appointment_booked'));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    }
    setStep((s) => Math.min(s + 1, 5));
  };`;

if (content.includes(oldHandleNext)) {
  content = content.replace(oldHandleNext, newHandleNext);
  fs.writeFileSync('src/components/BookingModal.jsx', content);
  console.log('BookingModal handleNext updated');
} else {
  console.log('Could not find old handleNext');
}
