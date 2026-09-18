const fs = require('fs');

let content = fs.readFileSync('src/pages/DoctorDashboard.jsx', 'utf8');

const oldState = `const [upcomingAppointments, setUpcomingAppointments] = React.useState([
    {
      id: 1,
      date: '20 MAY 2026',
      time: '04:00 PM - 05:00 PM',
      title: 'Initial Consultation',
      status: 'Waiting',
      statusColor: 'yellow',
      patient: 'Priya Sharma',
      phone: '+91 87654 32109',
      location: 'Virtual'
    },
    {
      id: 2,
      date: '21 MAY 2026',
      time: '11:00 AM - 12:30 PM',
      title: 'Follow-up Session',
      status: 'Confirmed',
      statusColor: 'blue',
      patient: 'Rahul Gupta',
      phone: '+91 76543 21098',
      location: 'Main Clinic'
    }
  ]);`;

const newState = `
  const defaultAppointments = [
    {
      id: 1,
      date: '20 MAY 2026',
      time: '04:00 PM - 05:00 PM',
      title: 'Initial Consultation',
      status: 'Waiting',
      statusColor: 'yellow',
      patient: 'Priya Sharma',
      phone: '+91 87654 32109',
      location: 'Virtual'
    },
    {
      id: 2,
      date: '21 MAY 2026',
      time: '11:00 AM - 12:30 PM',
      title: 'Follow-up Session',
      status: 'Confirmed',
      statusColor: 'blue',
      patient: 'Rahul Gupta',
      phone: '+91 76543 21098',
      location: 'Main Clinic'
    }
  ];

  const loadAppointments = () => {
    try {
      const stored = localStorage.getItem('carevia_appointments');
      if (stored) {
        return JSON.parse(stored).concat(defaultAppointments); // Put new ones at top
      }
    } catch(e) {}
    return defaultAppointments;
  };

  const [upcomingAppointments, setUpcomingAppointments] = React.useState(loadAppointments());

  React.useEffect(() => {
    const handleNewBooking = () => {
      setUpcomingAppointments(loadAppointments());
    };
    window.addEventListener('carevia_appointment_booked', handleNewBooking);
    return () => window.removeEventListener('carevia_appointment_booked', handleNewBooking);
  }, []);
`;

content = content.replace(oldState, newState);
fs.writeFileSync('src/pages/DoctorDashboard.jsx', content);
console.log('Dashboard hooked to localStorage');
