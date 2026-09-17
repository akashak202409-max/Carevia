const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.jsx', 'utf8');
content = content.replace(
  "import { X, Search, MapPin, Star, Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';",
  "import { X, Search, MapPin, Star, Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle, ChevronLeft, ChevronRight, Check, Briefcase } from 'lucide-react';"
);

fs.writeFileSync('src/components/BookingModal.jsx', content);
console.log('Fixed missing Briefcase import');
