// Centralized LocalStorage Manager for Carevia

const getStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(\`Error reading \${key} from localStorage\`, error);
    return defaultValue;
  }
};

const setStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(\`Error writing \${key} to localStorage\`, error);
  }
};

export const getAppointments = () => getStorage('carevia_appointments');
export const saveAppointments = (appointments) => setStorage('carevia_appointments', appointments);

export const getDoctors = () => getStorage('carevia_doctors');
export const saveDoctors = (doctors) => setStorage('carevia_doctors', doctors);

export const getPatients = () => getStorage('carevia_patients');
export const savePatients = (patients) => setStorage('carevia_patients', patients);

export const getCurrentUser = () => getStorage('carevia_current_user', null);
export const saveCurrentUser = (user) => setStorage('carevia_current_user', user);
export const clearCurrentUser = () => localStorage.removeItem('carevia_current_user');

// Initialize dummy data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem('carevia_doctors')) {
    saveDoctors([
      { id: 1, name: "Dr. Priya Sharma", spec: "Homeopathy Doctor", isDoctor: true, rating: "4.9", exp: "8 Years", loc: "Chennai", clinicFee: 700, onlineFee: 500, img: "https://randomuser.me/api/portraits/women/44.jpg", status: "ACTIVE" },
      { id: 2, name: "Dr. Ramesh Kumar", spec: "General Physician", isDoctor: true, rating: "4.8", exp: "12 Years", loc: "Chennai", clinicFee: 600, onlineFee: 400, img: "https://randomuser.me/api/portraits/men/32.jpg", status: "ACTIVE" },
      { id: 3, name: "Dr. Ananya Iyer", spec: "Pediatrician", isDoctor: true, rating: "5.0", exp: "10 Years", loc: "Bangalore", clinicFee: 900, onlineFee: 700, img: "https://randomuser.me/api/portraits/women/68.jpg", status: "ACTIVE" }
    ]);
  }
  if (!localStorage.getItem('carevia_appointments')) {
    saveAppointments([]);
  }
  if (!localStorage.getItem('carevia_patients')) {
    savePatients([]);
  }
};
