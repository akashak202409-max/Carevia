const fs = require('fs');
const path = require('path');

const pagesToUpdate = {
  'Physiotherapy.jsx': 'physiotherapy',
  'Ayurveda.jsx': 'ayurveda',
  'HomeDoctor.jsx': 'home-doctor',
  'NurseCare.jsx': 'nurse-care',
  'BHS.jsx': 'bhs'
};

for (const [file, type] of Object.entries(pagesToUpdate)) {
  const filePath = path.join('src', 'pages', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const oldModal = '<BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />';
    const newModal = '<BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} serviceType="' + type + '" />';
    
    if (content.includes(oldModal)) {
      content = content.replace(oldModal, newModal);
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + file);
    }
  }
}
