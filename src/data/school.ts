import {
  Award,
  Baby,
  BookOpen,
  Bus,
  Camera,
  Check,
  Cpu,
  Dumbbell,
  FlaskConical,
  Globe,
  GraduationCap,
  HeartPulse,
  Music,
  Palette,
  Shield,
  Trophy,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';

export const SCHOOL = {
  name: 'A K Public School',
  short: 'AKPS',
  tagline: 'Enhance Vision',
  board: 'CBSE',
  grades: 'Montessori to Class 12',
  est: 2008,
  city: 'Bokaro, Jharkhand',
  phone: '+91 82100 00154',
  email: 'info@akpsokaro.com',
  email2: 'moqueem6@gmail.com',
  address: 'Karbala Road, Sultan Nagar, Chas, Bokaro, Jharkhand – 827013',
  whatsapp: '918210000154',
  year: '2025–26',
  affiliation: 'CBSE Affiliation No: 3430538',
};

export const ACADEMIC_SESSION = '2018-19';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export const STATS = [
  { value: '1,800+', label: 'Students', Icon: Users },
  { value: '80+', label: 'Expert Teachers', Icon: GraduationCap },
  { value: '17', label: 'Years of Excellence', Icon: Trophy },
  { value: '100%', label: 'Board Results', Icon: Award },
  { value: '20+', label: 'Activities & Clubs', Icon: Palette },
];

export const ACADEMICS = [
  {
    id: 'montessori',
    label: 'Montessori',
    grades: 'Play Group – Nursery',
    highlights: ['Structured play-based learning', 'AC classrooms', 'Soft play zone', 'Phonics & sensory activities'],
    subjects: 'English, Hindi, Math, EVS, Art, Music, Rhymes, Motor skills',
    image: 'photo-1503676260728-1c00da094a0b',
  },
  {
    id: 'pre-primary',
    label: 'Pre-Primary',
    grades: 'LKG – UKG',
    highlights: ['Concept-based learning', 'Smart class sessions', 'Library visits', 'Art & music integration'],
    subjects: 'English, Hindi, Math, EVS, GK, Art, Music, PE',
    image: 'photo-1427504494785-3a9ca7044f45',
  },
  {
    id: 'primary',
    label: 'Primary',
    grades: 'Class 1 – 5',
    highlights: ['Smart classroom teaching', 'Activity-based NCERT', 'Computer lab access', 'Weekly library period'],
    subjects: 'English, Hindi, Math, Science, Social Studies, Computer, Art, PE',
    image: 'photo-1580582932707-520aed937b7b',
  },
  {
    id: 'middle',
    label: 'Middle School',
    grades: 'Class 6 – 8',
    highlights: ['Project-based learning', 'Science lab practicals', 'Computer Science', 'Leadership programs'],
    subjects: 'English, Hindi, Sanskrit, Math, Science, Social Studies, Computer',
    image: 'photo-1532094349884-543bc11b234d',
  },
  {
    id: 'secondary',
    label: 'Secondary',
    grades: 'Class 9 – 10',
    highlights: ['CBSE board exam prep', 'Olympiad training', 'Career counselling', 'Regular mock tests'],
    subjects: 'English, Hindi, Math, Science, Social Science, IT/Computer',
    image: 'photo-1509062522246-3755977927d7',
  },
  {
    id: 'senior',
    label: 'Senior Secondary',
    grades: 'Class 11 – 12',
    highlights: ['Science, Commerce & Humanities', 'JEE/NEET/Commerce prep', 'Guest lectures', 'College counselling'],
    subjects: 'Science: PCM/PCB | Commerce: Accounts, Economics | Humanities: History, Pol. Sci, Geo',
    image: 'photo-1523050854058-8df90110c9f1',
  },
];

export const WHY_US = [
  { Icon: Camera, title: 'CCTV Surveillance', desc: 'Full campus covered with HD CCTV cameras, ensuring round-the-clock safety and security for every child.' },
  { Icon: Cpu, title: 'Smart Classrooms', desc: 'Modern interactive smart boards and digital learning tools in all classrooms for an engaging learning experience.' },
  { Icon: Baby, title: 'AC Montessori Rooms', desc: 'Air-conditioned classrooms in the Montessori wing ensure a comfortable and focused learning environment for our youngest learners.' },
  { Icon: Dumbbell, title: 'Playground & Sports', desc: 'Spacious playground with cricket, football, badminton, and athletics facilities promoting fitness and team spirit.' },
  { Icon: FlaskConical, title: 'Science & Computer Lab', desc: 'Fully equipped Science lab for hands-on experiments and a modern Computer lab with latest hardware and software.' },
  { Icon: Bus, title: 'Safe Transport', desc: 'GPS-tracked school buses covering major routes in Bokaro and Chas with trained drivers and lady attendants.' },
];

export const ADMISSION_STEPS = [
  { step: 1, title: 'Enquiry', desc: 'Visit, call, or WhatsApp us to learn about admissions and available seats.' },
  { step: 2, title: 'Application', desc: 'Collect or download the application form from our office or website.' },
  { step: 3, title: 'Interaction', desc: 'Age-appropriate assessment and interaction with child and parents.' },
  { step: 4, title: 'Documents', desc: 'Submit required documents for verification at the admissions office.' },
  { step: 5, title: 'Fee Payment', desc: 'Pay the admission and tuition fee to confirm your child\'s seat.' },
  { step: 6, title: 'Enrollment', desc: 'Receive your welcome kit, uniform list, and academic calendar.' },
];

export const FACULTY = [
  { name: 'Mr. Abdul Kareem', role: 'Chairman & Founder', qual: 'M.A., visionary educationist', image: 'photo-1560250097-0b93528c311a' },
  { name: 'Mrs. Rubina Siddiqui', role: 'Principal', qual: 'M.Ed., M.Sc. | 18 yrs exp.', image: 'photo-1573496359142-b8d87734a5a2' },
  { name: 'Mr. Ravi Kumar', role: 'Vice-Principal', qual: 'M.A., B.Ed. | 15 yrs exp.', image: 'photo-1506794778202-cad84cf45f1d' },
  { name: 'Mrs. Seema Sharma', role: 'Head – Science', qual: 'M.Sc. Chemistry | 12 yrs exp.', image: 'photo-1580489944761-15a19d654956' },
  { name: 'Mr. Ajay Mishra', role: 'Head – Mathematics', qual: 'M.Sc. Maths | 14 yrs exp.', image: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Ms. Preethi Roy', role: 'Head – Languages', qual: 'M.A. English, M.Ed.', image: 'photo-1534528741775-53994a69daeb' },
  { name: 'Mr. Naresh Singh', role: 'Head – Commerce', qual: 'MBA, B.Com | 11 yrs exp.', image: 'photo-1472099645785-5658abf4ff4e' },
  { name: 'Mrs. Fatima Khatoon', role: 'Head – Montessori', qual: 'Montessori Certified, B.Ed.', image: 'photo-1544005313-94ddf0286df2' },
];

export const FACILITIES = [
  { title: 'Science Lab', image: 'photo-1532094349884-543bc11b234d', desc: 'Physics, Chemistry & Biology' },
  { title: 'Computer Lab', image: 'photo-1588702547923-7093a6c3ba33', desc: 'Latest PCs with internet' },
  { title: 'Library', image: 'photo-1524995997946-a1c2e315a42f', desc: '5,000+ books & periodicals' },
  { title: 'Soft Play Zone', image: 'photo-1503676260728-1c00da094a0b', desc: 'Safe play for Montessori kids' },
  { title: 'Playground', image: 'photo-1461896836934-ffe607ba8211', desc: 'Cricket, football, athletics' },
  { title: 'Music Room', image: 'photo-1511379938547-c1f69419868d', desc: 'Instruments & vocal training' },
  { title: 'Smart Classrooms', image: 'photo-1580582932707-520aed937b7b', desc: 'Interactive digital boards' },
  { title: 'Transport', image: 'photo-1544620347460-35ea14f6ec6f', desc: 'GPS-tracked school buses' },
];

export const GALLERY_ITEMS = [
  { id: 1, category: 'campus', image: 'photo-1562774053-701939374585', title: 'School Building', tall: true },
  { id: 2, category: 'classrooms', image: 'photo-1580582932707-520aed937b7b', title: 'Smart Classroom', tall: false },
  { id: 3, category: 'sports', image: 'photo-1461896836934-ffe607ba8211', title: 'Sports Day', tall: false },
  { id: 4, category: 'events', image: 'photo-1540575467063-178a50c2df87', title: 'Annual Day 2024', tall: true },
  { id: 5, category: 'classrooms', image: 'photo-1427504494785-3a9ca7044f45', title: 'Group Activity', tall: false },
  { id: 6, category: 'sports', image: 'photo-1546483875-ad9014c88eba', title: 'Basketball Match', tall: false },
  { id: 7, category: 'events', image: 'photo-1511379938547-c1f69419868d', title: 'Music Concert', tall: true },
  { id: 8, category: 'campus', image: 'photo-1524995997946-a1c2e315a42f', title: 'School Library', tall: false },
  { id: 9, category: 'events', image: 'photo-1513364776144-60967b0f800f', title: 'Art Exhibition', tall: false },
];

export const NEWS = [
  { date: 'Dec 15, 2024', tag: 'Announcement', title: 'Admissions Open for 2025–26 Academic Year', excerpt: 'Seats now open for Montessori to Class 11. Apply early to secure your child\'s spot.', img: 'photo-1580582932707-520aed937b7b' },
  { date: 'Dec 08, 2024', tag: 'Achievement', title: 'AKPS Students Shine in CBSE Class 10 & 12 Results', excerpt: 'Our students secured top scores in the 2024 board exams with a 100% pass rate across all streams.', img: 'photo-1427504494785-3a9ca7044f45' },
  { date: 'Nov 25, 2024', tag: 'Event', title: 'Annual Sports Day 2024 – A Grand Celebration', excerpt: 'Students from all classes participated in over 20 track and field events on the school playground.', img: 'photo-1461896836934-ffe607ba8211' },
];

export const EVENTS_DATA = [
  { day: '26', month: 'Jan', title: 'Republic Day Celebration', time: '8:00 AM – 10:00 AM' },
  { day: '12', month: 'Feb', title: 'Science Exhibition', time: '10:00 AM – 4:00 PM' },
  { day: '05', month: 'Mar', title: 'Inter-House Quiz Competition', time: '2:00 PM – 5:00 PM' },
  { day: '22', month: 'Mar', title: 'Parent-Teacher Meeting', time: '9:00 AM – 1:00 PM' },
];

export const TESTIMONIALS = [
  {
    name: 'Md. Rashid Khan',
    role: 'Parent of Class 8 student',
    quote: "A K Public School has truly transformed my son. The teachers give individual attention, the smart classes keep him engaged, and the disciplined environment is exactly what we wanted.",
    rating: 5,
    image: 'photo-1506794778202-cad84cf45f1d',
  },
  {
    name: 'Sunita Devi',
    role: 'Parent of Class 10 student',
    quote: "My daughter scored 94% in Class 10 boards. The school's preparation strategy, regular mock tests, and dedicated faculty made all the difference. We are very proud parents.",
    rating: 5,
    image: 'photo-1438761681033-6461ffad8d80',
  },
  {
    name: 'Rohit Kumar',
    role: 'Class XII Alumni, 2023',
    quote: "AKPS gave me a strong foundation in Science. The lab facilities and the support from teachers during board prep helped me crack competitive entrance exams with confidence.",
    rating: 5,
    image: 'photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Anita & Suresh Mahto',
    role: 'Parents of two AKPS students',
    quote: "Both our children study at AKPS and we couldn't be happier. The Montessori wing is excellent, the CCTV gives us peace of mind, and the teachers are genuinely caring.",
    rating: 5,
    image: 'photo-1544005313-94ddf0286df2',
  },
];

export const FAQS = [
  { q: 'What is the admission process for the 2025–26 academic year?', a: 'Admissions are open for Montessori to Class 11. Visit our school at Karbala Road, Sultan Nagar, Chas, Bokaro, or call/WhatsApp us at +91 82100 00154. The process involves an enquiry, application form, brief interaction, document submission, and fee payment.' },
  { q: 'What board does A K Public School follow?', a: 'A K Public School is affiliated with the Central Board of Secondary Education (CBSE), New Delhi. We follow the NCERT curriculum for all classes.' },
  { q: 'What are the school timings?', a: 'Morning Shift (Montessori to Class 5): 7:00 AM to 12:30 PM. Day Shift (Class 6 to Class 12): 10:30 AM to 4:30 PM. Office hours: 8:00 AM to 5:00 PM, Monday to Saturday.' },
  { q: 'Is transportation available in Bokaro and Chas?', a: 'Yes, we operate GPS-tracked school buses covering major routes in Bokaro and Chas. Lady attendants are present on every bus. Contact our transport office for route details.' },
  { q: 'Are the Montessori classrooms air-conditioned?', a: 'Yes. All Montessori classrooms are fully air-conditioned to ensure a comfortable and focused learning environment for our youngest students.' },
  { q: 'What facilities does the school have?', a: 'The school offers Smart Classrooms, Science Lab, Computer Lab, Library, Music Room, Soft Play Zone, Playground, CCTV, GPS Transport, and AC Montessori classes.' },
  { q: 'Are there scholarships for meritorious students?', a: 'Yes, merit-based fee concessions are available for students who perform exceptionally in the entrance assessment. Sibling concessions and need-based support are also offered.' },
  { q: 'How can I contact the school?', a: 'Call or WhatsApp us at +91 82100 00154, or email info@akpsokaro.com. You can also visit us at Karbala Road, Sultan Nagar, Chas, Bokaro, Jharkhand – 827013.' },
];

export const TOPPERS = [
  { name: 'Aryan Singh', grade: 'Class XII – Science', score: '96.8%', image: 'photo-1539571696357-5a69c17a67c6', topper: true },
  { name: 'Nisha Kumari', grade: 'Class XII – Commerce', score: '95.4%', image: 'photo-1534528741775-53994a69daeb', topper: false },
  { name: 'Sahil Ansari', grade: 'Class X', score: '97.2%', image: 'photo-1507003211169-0a1dd7228f2d', topper: false },
];

export const FEE_STRUCTURE = [
  { class: 'Play Group / Nursery (Montessori)', annual: '₹18,000', monthly: '₹1,500', admission: '₹5,000' },
  { class: 'LKG / UKG (Pre-Primary)', annual: '₹22,000', monthly: '₹1,833', admission: '₹5,000' },
  { class: 'Class 1 – 2', annual: '₹26,000', monthly: '₹2,167', admission: '₹6,000' },
  { class: 'Class 3 – 5', annual: '₹30,000', monthly: '₹2,500', admission: '₹6,000' },
  { class: 'Class 6 – 8', annual: '₹36,000', monthly: '₹3,000', admission: '₹7,000' },
  { class: 'Class 9 – 10', annual: '₹42,000', monthly: '₹3,500', admission: '₹8,000' },
  { class: 'Class 11 – 12 (Science)', annual: '₹52,000', monthly: '₹4,333', admission: '₹10,000' },
  { class: 'Class 11 – 12 (Commerce / Humanities)', annual: '₹46,000', monthly: '₹3,833', admission: '₹10,000' },
];

export const SYLLABUS_GRADES = [
  { label: 'Montessori & Nursery', file: 'syllabus-montessori.pdf' },
  { label: 'LKG & UKG', file: 'syllabus-lkg-ukg.pdf' },
  { label: 'Class 1 – 2', file: 'syllabus-class-1-2.pdf' },
  { label: 'Class 3 – 5', file: 'syllabus-class-3-5.pdf' },
  { label: 'Class 6 – 8', file: 'syllabus-class-6-8.pdf' },
  { label: 'Class 9 – 10', file: 'syllabus-class-9-10.pdf' },
  { label: 'Class 11 – 12', file: 'syllabus-class-11-12.pdf' },
];

export const ACADEMIC_CALENDAR = [
  { month: 'April', events: ['New Academic Session Begins', 'Orientation Day for new students', 'Book & Uniform distribution'] },
  { month: 'May', events: ['Unit Test – I', 'Earth Day Celebration', 'Summer Vacation (May 20 – Jun 15)'] },
  { month: 'June', events: ['School reopens after vacation', 'Parent Orientation Meeting'] },
  { month: 'July', events: ['Half-Yearly Exams begin', 'Independence Day Rehearsals'] },
  { month: 'August', events: ['Independence Day Celebration (Aug 15)', 'Half-Yearly Results', 'Science Exhibition'] },
  { month: 'September', events: ['Teachers\' Day (Sep 5)', 'Unit Test – II', 'Inter-House Sports Events'] },
  { month: 'October', events: ['Gandhi Jayanti (Oct 2)', 'Dussehra / Puja Vacation (7 days)', 'Annual Sports Day'] },
  { month: 'November', events: ['Children\'s Day Celebration (Nov 14)', 'Unit Test – III', 'Annual Cultural Fest'] },
  { month: 'December', events: ['Pre-Board Exams (Class 10 & 12)', 'Christmas & Winter Vacation (Dec 25 – Jan 1)'] },
  { month: 'January', events: ['Republic Day Celebration (Jan 26)', 'Unit Test – IV', 'Science Fair'] },
  { month: 'February', events: ['Pre-Board Exams – II', 'Parent-Teacher Meeting', 'Board Exam Preparation Camp'] },
  { month: 'March', events: ['CBSE Board Exams (Class 10 & 12)', 'Annual Exams (Class 1–9)', 'Session-end Result Day'] },
];

export const OVERVIEW_STATS = [
  { Icon: Shield, label: 'Safe Campus' },
  { Icon: HeartPulse, label: 'Wellbeing' },
  { Icon: Zap, label: 'Innovation' },
  { Icon: Wifi, label: 'Connected Learning' },
  { Icon: BookOpen, label: 'Academic Depth' },
  { Icon: Music, label: 'Arts & Culture' },
];
