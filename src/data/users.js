export const defaultUsers = [
  {
    id: "user_001",
    name: "Alex Johnson",
    email: "candidate@demo.com",
    password: "password123",
    role: "candidate",
    avatar: null,
    headline: "UI/UX Designer | Creative Problem Solver",
    location: {
      label: "My Location",
      address: "23/B Kumapara, Sylhet"
    },
    bio: "Passionate UI/UX designer with 3 years of experience creating intuitive digital experiences. I love turning complex problems into simple, beautiful solutions.",
    phone: "+91 98765 43210",
    skills: ["UI Design", "UX Research", "Figma", "Prototyping", "Design Systems", "User Testing", "Wireframing", "Adobe XD"],
    experience: [
      {
        id: "exp_001",
        company: "TechCorp Solutions",
        role: "Junior UI Designer",
        startDate: "2023-01",
        endDate: "2024-06",
        current: false,
        description: "Designed user interfaces for 3 SaaS products. Conducted user research and usability testing. Created and maintained a design system used across the organization."
      },
      {
        id: "exp_002",
        company: "DesignHub Agency",
        role: "UI/UX Design Intern",
        startDate: "2022-06",
        endDate: "2022-12",
        current: false,
        description: "Assisted senior designers with wireframing and prototyping. Participated in client meetings and design reviews. Contributed to redesigning 2 mobile applications."
      }
    ],
    education: [
      {
        id: "edu_001",
        institution: "National Institute of Design",
        degree: "B.Des in Communication Design",
        startYear: "2019",
        endYear: "2023",
        grade: "8.5 CGPA"
      }
    ],
    resume: null,
    profileCompletion: 85,
    savedJobs: ["job_001", "job_003"],
    appliedJobs: [],
    notifications: 3,
    reminder: {
      title: "Reminder",
      subtitle: "Interview at zoom in 2 hour",
      countdown: { hours: 9, minutes: 4, seconds: 5 }
    },
    createdAt: "2025-04-15"
  },
  {
    id: "employer_001",
    name: "Sarah Williams",
    email: "employer@demo.com",
    password: "password123",
    role: "employer",
    avatar: null,
    headline: "HR Manager at Google",
    location: {
      label: "Office",
      address: "Googleplex, Bangalore"
    },
    bio: "Experienced HR professional with 8 years in talent acquisition for tech companies. Passionate about finding the right talent and building diverse teams.",
    phone: "+91 99887 76655",
    companyId: "company_001",
    companyName: "Google",
    skills: [],
    experience: [],
    education: [],
    resume: null,
    profileCompletion: 90,
    savedJobs: [],
    appliedJobs: [],
    notifications: 5,
    reminder: null,
    createdAt: "2025-03-01"
  }
];

export const defaultAvatars = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
];
