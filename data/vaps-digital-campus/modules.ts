export default {
  aiVrmModules: [
    { title: "Report Cards", desc: "Comprehensive evaluation system for CBSE, ICSE, and State Boards." },
    { title: "Parent Communication", desc: "Dedicated portal and mobile app for real-time updates." },
    { title: "Student Management", desc: "Centralized profiles from admission to graduation." },
    { title: "Examinations", desc: "Simplified assessment management with flexible scheduling." },
    { title: "Timetable Management", desc: "Automated schedule creation balancing workloads." },
    { title: "Analytics & OBE", desc: "Outcome-Based Education standards with predictive analytics." },
    { title: "Placement Management", desc: "Streamlines campus recruitment and internships." },
    { title: "Faculty Evaluation", desc: "Automated workload distribution and performance monitoring." }
  ],
  exploreModules: {
    description: "Schools can easily opt for the different modules available on the VAPS Digital Campus NEP Platform solution based on their requirement and need. All the solutions offered are compatible with each other and delivers seamless functioning at all levels.",
    title: "Explore All Our Modules",
    tabs: ['Smart Cards', 'Kiosk Devices', 'LMS', 'GPS Devices', 'Servers & Infra', 'E-Banking', 'Mobile Apps'],
    modules: [
      {
        id: 'Smart Cards',
        title: 'Smart Card & Access Management',
        description: 'i-Vidyalaya is intelligently designed to enable sophisticated access management using smart cards that can be used in class rooms, office, library, labs, canteen, and hostel. A single card management system to create access, track, manage all stakeholders - students, staff, faculty, vendors, etc.',
        image: '/images/vaps-digital-campus/Smart-Card.jpg',
        gradient: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)'
      },
      {
        id: 'Kiosk Devices',
        title: 'Touch Enabled Kiosk Devices',
        description: 'Take your school management to the next level by using a touch enabled kiosk in your school and allow students, parents, visitors and other stakeholders in premises to easily access information like premises map, important events, fee structure, school related videos and more.',
        image: '/images/vaps-digital-campus/education-kiosk.png',
        gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(152, 16, 250, 0.05) 100%)'
      },
      {
        id: 'LMS',
        title: 'Learning Management System (LMS)',
        description: 'VAPS LMS is web-based platform designed to facilitate schools, colleges or universities of any size in the creation, delivery, and management of educational courses and training programs.',
        image: '/images/vaps-digital-campus/LMS.jpg',
        gradient: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
      },
      {
        id: 'GPS Devices',
        title: 'GPS Tracking & Monitoring Devices',
        description: 'Safety is a top priority in any modern schools today and VAPS iVRM integration with GPS devices will allow schools to take safety to the next level. With this GSM/GPRS network based GPS device allows in enabling multiple functions of security, positioning, monitoring surveillance emergency remote target by SMS or internet.',
        image: '/images/vaps-digital-campus/gps.jpeg',
        gradient: 'linear-gradient(135deg, rgba(3, 41, 123, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
      },
      {
        id: 'Servers & Infra',
        title: 'Server & IT Infrastructure Setup',
        description: 'VAPS can help in sourcing, setup and maintenance of servers needed in educational institutions to run their business, store data and manage applications. Our offering includes high-quality branded servers from all prominent brands and strong / proven infrastructure design.',
        image: '/images/vaps-digital-campus/Infrastructure.webp',
        gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)'
      },
      {
        id: 'E-Banking',
        title: 'E-Banking Solutions For Any Scale',
        description: 'E-Banking module on VAPS iVRM lets schools enable easy payment options for parents (NEFT, UPI, RTGS, etc) to pay school fees, library fees, bus fees, etc. directly from their phone or desktop.',
        image: '/images/vaps-digital-campus/E-banking.webp',
        gradient: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)'
      },
      {
        id: 'Mobile Apps',
        title: 'VAPS Mobile Apps',
        description: 'VAPS IVRS also bundled with a mobile application (Android & iOS) that parents, teachers, students, administrators, etc. can install on their phones and access any information related to school, academics, calendar, teacher notes and other upcoming action items whenever they need at their convenience.',
        image: '/images/vaps-digital-campus/Vaps-mobile.png',
        gradient: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
      }
    ]
  },
  erpSuite: {
    title: "I-Vidyalaya ERP Suite",
    description: "The integrated ERP system 'i-Vidyalaya' enables all the stakeholders (teachers, administration, parents & students) to get access to all relevant information and data from anywhere, at any time using their browser on phone or desktop.",
    modules: [
      { title: "Pre-admission", icon: "📋" },
      { title: "Admission", icon: "📝" },
      { title: "Fees Management", icon: "💰" },
      { title: "Student Attendance", icon: "📊" },
      { title: "Exam Management", icon: "📚" },
      { title: "Library Management", icon: "📖" },
      { title: "Inventory Management", icon: "📦" },
      { title: "Transport Management", icon: "🚌" },
      { title: "LMS", icon: "💻" }
    ]
  }
};
