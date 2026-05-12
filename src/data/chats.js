export const defaultChats = [
  {
    id: "chat_001",
    participantId: "employer_001",
    participantName: "Sarah Williams",
    participantRole: "HR Manager at Google",
    participantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    online: true,
    unreadCount: 2,
    lastMessage: "When would you be available for an interview?",
    lastMessageTime: "2025-05-11T10:30:00",
    messages: [
      { id: "msg_001", senderId: "employer_001", text: "Hi Alex! Thanks for applying to the Jr. UI/UX Designer position at Google.", timestamp: "2025-05-10T09:00:00", read: true },
      { id: "msg_002", senderId: "user_001", text: "Thank you for considering my application! I'm very excited about this opportunity.", timestamp: "2025-05-10T09:15:00", read: true },
      { id: "msg_003", senderId: "employer_001", text: "Your portfolio looks impressive. We'd love to move forward with the interview process.", timestamp: "2025-05-10T09:30:00", read: true },
      { id: "msg_004", senderId: "user_001", text: "That's wonderful news! I'm available anytime this week.", timestamp: "2025-05-10T10:00:00", read: true },
      { id: "msg_005", senderId: "employer_001", text: "Great! Let me check with the team and get back to you with the schedule.", timestamp: "2025-05-10T14:00:00", read: true },
      { id: "msg_006", senderId: "employer_001", text: "When would you be available for an interview?", timestamp: "2025-05-11T10:30:00", read: false }
    ]
  },
  {
    id: "chat_002",
    participantId: "recruiter_002",
    participantName: "Rajesh Kumar",
    participantRole: "Talent Acquisition at Microsoft",
    participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    online: false,
    unreadCount: 0,
    lastMessage: "Sure, I'll send the details by EOD.",
    lastMessageTime: "2025-05-09T16:45:00",
    messages: [
      { id: "msg_007", senderId: "recruiter_002", text: "Hello Alex, I came across your profile and was impressed by your design work.", timestamp: "2025-05-09T14:00:00", read: true },
      { id: "msg_008", senderId: "user_001", text: "Hi Rajesh! Thank you for reaching out. I'd love to learn more about opportunities at Microsoft.", timestamp: "2025-05-09T14:30:00", read: true },
      { id: "msg_009", senderId: "recruiter_002", text: "We have a Junior UI/UX position open in our Bangalore office. Would you like to know the details?", timestamp: "2025-05-09T15:00:00", read: true },
      { id: "msg_010", senderId: "user_001", text: "Yes, please! I'm very interested. Could you share the job description and salary range?", timestamp: "2025-05-09T15:15:00", read: true },
      { id: "msg_011", senderId: "recruiter_002", text: "Sure, I'll send the details by EOD.", timestamp: "2025-05-09T16:45:00", read: true }
    ]
  },
  {
    id: "chat_003",
    participantId: "recruiter_003",
    participantName: "Priya Sharma",
    participantRole: "Design Lead at Flipkart",
    participantAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    online: true,
    unreadCount: 1,
    lastMessage: "Can you share your portfolio link?",
    lastMessageTime: "2025-05-11T08:00:00",
    messages: [
      { id: "msg_012", senderId: "recruiter_003", text: "Hi Alex! We're building a new design team at Flipkart and looking for talented designers.", timestamp: "2025-05-11T07:30:00", read: true },
      { id: "msg_013", senderId: "recruiter_003", text: "Can you share your portfolio link?", timestamp: "2025-05-11T08:00:00", read: false }
    ]
  },
  {
    id: "chat_004",
    participantId: "recruiter_004",
    participantName: "Arun Patel",
    participantRole: "CTO at StartupX",
    participantAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    online: false,
    unreadCount: 0,
    lastMessage: "Looking forward to working with you!",
    lastMessageTime: "2025-05-08T18:00:00",
    messages: [
      { id: "msg_014", senderId: "recruiter_004", text: "Hey Alex, we're a Series A startup looking for a design lead. Interested?", timestamp: "2025-05-08T10:00:00", read: true },
      { id: "msg_015", senderId: "user_001", text: "Hi Arun! Tell me more about the role and the product.", timestamp: "2025-05-08T11:00:00", read: true },
      { id: "msg_016", senderId: "recruiter_004", text: "We're building a fintech product for Gen-Z. The role involves leading design from scratch.", timestamp: "2025-05-08T12:00:00", read: true },
      { id: "msg_017", senderId: "user_001", text: "Sounds exciting! I'd love to discuss this further.", timestamp: "2025-05-08T14:00:00", read: true },
      { id: "msg_018", senderId: "recruiter_004", text: "Looking forward to working with you!", timestamp: "2025-05-08T18:00:00", read: true }
    ]
  },
  {
    id: "chat_005",
    participantId: "recruiter_005",
    participantName: "Meera Reddy",
    participantRole: "People Operations at Swiggy",
    participantAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    online: false,
    unreadCount: 0,
    lastMessage: "Thanks for your interest. We'll be in touch!",
    lastMessageTime: "2025-05-07T11:30:00",
    messages: [
      { id: "msg_019", senderId: "user_001", text: "Hi Meera, I applied for the Backend Engineer position. Just wanted to follow up.", timestamp: "2025-05-07T10:00:00", read: true },
      { id: "msg_020", senderId: "recruiter_005", text: "Thanks for your interest. We'll be in touch!", timestamp: "2025-05-07T11:30:00", read: true }
    ]
  }
];

export const botResponses = [
  "Thanks for your message! Let me review and get back to you.",
  "That sounds great! When would you be available for a quick call?",
  "Your profile looks impressive. We'd love to move forward.",
  "Can you share your portfolio or any recent work samples?",
  "We're reviewing applications right now. Will update you by end of week.",
  "The team was impressed with your background. Let's schedule an interview!",
  "Could you tell me more about your experience with design systems?",
  "We offer flexible hours and remote work options. Would that work for you?",
  "The salary range for this position is competitive. We can discuss details in the interview.",
  "Your application has been shortlisted! Congratulations! 🎉",
  "When would you be available for an interview this week?",
  "Do you have experience working in an agile environment?",
  "We value diversity and inclusion. What perspectives would you bring to our team?",
  "The position is based in Bangalore, but we also have hybrid options.",
  "Could you walk me through a challenging project from your portfolio?"
];
