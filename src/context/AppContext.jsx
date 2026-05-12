import { createContext, useContext, useReducer, useEffect } from 'react';
import { defaultJobs } from '../data/jobs';
import { defaultUsers } from '../data/users';
import { defaultChats, botResponses } from '../data/chats';
import { defaultNotifications } from '../data/notifications';
import { defaultCompanies } from '../data/companies';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  AUTH: 'jobfinder_auth',
  USERS: 'jobfinder_users',
  JOBS: 'jobfinder_jobs',
  APPLICATIONS: 'jobfinder_applications',
  SAVED: 'jobfinder_saved',
  CHATS: 'jobfinder_chats',
  NOTIFICATIONS: 'jobfinder_notifications',
  COMPANIES: 'jobfinder_companies'
};

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}

function getInitialState() {
  const auth = loadFromStorage(STORAGE_KEYS.AUTH, { isAuthenticated: false, userId: null, role: null, token: null });
  const users = loadFromStorage(STORAGE_KEYS.USERS, defaultUsers);
  const jobs = loadFromStorage(STORAGE_KEYS.JOBS, defaultJobs);
  const applications = loadFromStorage(STORAGE_KEYS.APPLICATIONS, []);
  const saved = loadFromStorage(STORAGE_KEYS.SAVED, {});
  const chats = loadFromStorage(STORAGE_KEYS.CHATS, defaultChats);
  const notifications = loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, defaultNotifications);
  const companies = loadFromStorage(STORAGE_KEYS.COMPANIES, defaultCompanies);

  let currentUser = null;
  if (auth.isAuthenticated && auth.userId) {
    currentUser = users.find(u => u.id === auth.userId) || null;
  }

  return {
    auth,
    currentUser,
    users,
    jobs,
    applications,
    saved,
    chats,
    notifications,
    companies,
    searchQuery: '',
    activeJobFilter: 'See All',
    activeCategory: null,
    sortBy: 'Recently',
    toasts: []
  };
}

function appReducer(state, action) {
  switch (action.type) {
    // ── Auth ──
    case 'LOGIN': {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      if (!user) return { ...state, toasts: [...state.toasts, { id: Date.now(), type: 'error', message: 'Invalid email or password' }] };
      const auth = { isAuthenticated: true, userId: user.id, role: user.role, token: `token_${user.id}_${Date.now()}` };
      return { ...state, auth, currentUser: user };
    }

    case 'REGISTER': {
      const { name, email, password, role } = action.payload;
      const exists = state.users.find(u => u.email === email);
      if (exists) return { ...state, toasts: [...state.toasts, { id: Date.now(), type: 'error', message: 'Email already registered' }] };
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
        role,
        avatar: null,
        headline: '',
        location: { label: 'My Location', address: '' },
        bio: '',
        phone: '',
        skills: [],
        experience: [],
        education: [],
        resume: null,
        profileCompletion: 20,
        savedJobs: [],
        appliedJobs: [],
        notifications: 0,
        reminder: null,
        companyId: role === 'employer' ? `company_${Date.now()}` : undefined,
        companyName: role === 'employer' ? name + "'s Company" : undefined,
        createdAt: new Date().toISOString().split('T')[0]
      };
      const users = [...state.users, newUser];
      const auth = { isAuthenticated: true, userId: newUser.id, role: newUser.role, token: `token_${newUser.id}_${Date.now()}` };
      let companies = state.companies;
      if (role === 'employer') {
        companies = [...companies, { id: newUser.companyId, name: newUser.companyName, logo: 'default', industry: '', size: '', founded: '', website: '', location: '', description: 'Tell us about your company.', benefits: [], rating: 0, openPositions: 0 }];
      }
      return { ...state, users, auth, currentUser: newUser, companies, toasts: [...state.toasts, { id: Date.now(), type: 'success', message: 'Account created successfully!' }] };
    }

    case 'LOGOUT':
      return { ...state, auth: { isAuthenticated: false, userId: null, role: null, token: null }, currentUser: null };

    case 'UPDATE_PROFILE': {
      const updated = { ...state.currentUser, ...action.payload };
      let completion = 20;
      if (updated.name) completion += 10;
      if (updated.headline) completion += 10;
      if (updated.location?.address) completion += 10;
      if (updated.bio) completion += 10;
      if (updated.skills?.length > 0) completion += 15;
      if (updated.experience?.length > 0) completion += 15;
      if (updated.education?.length > 0) completion += 5;
      if (updated.resume) completion += 5;
      updated.profileCompletion = Math.min(completion, 100);
      const users = state.users.map(u => u.id === updated.id ? updated : u);
      return { ...state, currentUser: updated, users };
    }

    case 'UPDATE_COMPANY': {
      const companies = state.companies.map(c => c.id === action.payload.id ? { ...c, ...action.payload } : c);
      return { ...state, companies };
    }

    // ── Jobs ──
    case 'ADD_JOB': {
      const newJob = {
        ...action.payload,
        id: `job_${Date.now()}`,
        postedBy: state.currentUser?.id,
        companyId: state.currentUser?.companyId,
        company: action.payload.company || state.currentUser?.companyName || 'Company',
        companyLogo: 'default',
        applicants: 0,
        saved: false,
        featured: false,
        postedDate: new Date().toISOString().split('T')[0]
      };
      const jobs = [newJob, ...state.jobs];
      return { ...state, jobs, toasts: [...state.toasts, { id: Date.now(), type: 'success', message: 'Job posted successfully!' }] };
    }

    case 'EDIT_JOB': {
      const jobs = state.jobs.map(j => j.id === action.payload.id ? { ...j, ...action.payload } : j);
      return { ...state, jobs, toasts: [...state.toasts, { id: Date.now(), type: 'success', message: 'Job updated successfully!' }] };
    }

    case 'DELETE_JOB': {
      const jobs = state.jobs.filter(j => j.id !== action.payload);
      const applications = state.applications.filter(a => a.jobId !== action.payload);
      return { ...state, jobs, applications, toasts: [...state.toasts, { id: Date.now(), type: 'success', message: 'Job deleted successfully' }] };
    }

    // ── Applications ──
    case 'APPLY_JOB': {
      const { jobId } = action.payload;
      const alreadyApplied = state.applications.find(a => a.jobId === jobId && a.userId === state.currentUser?.id);
      if (alreadyApplied) return state;
      const application = {
        id: `app_${Date.now()}`,
        userId: state.currentUser?.id,
        userName: state.currentUser?.name,
        userEmail: state.currentUser?.email,
        userAvatar: state.currentUser?.avatar,
        userSkills: state.currentUser?.skills || [],
        jobId,
        status: 'pending',
        appliedDate: new Date().toISOString()
      };
      const applications = [...state.applications, application];
      const jobs = state.jobs.map(j => j.id === jobId ? { ...j, applicants: (j.applicants || 0) + 1 } : j);
      return { ...state, applications, jobs, toasts: [...state.toasts, { id: Date.now(), type: 'success', message: 'Application submitted! ✅' }] };
    }

    case 'UPDATE_APPLICATION_STATUS': {
      const { applicationId, status } = action.payload;
      const applications = state.applications.map(a => a.id === applicationId ? { ...a, status } : a);
      return { ...state, applications, toasts: [...state.toasts, { id: Date.now(), type: 'success', message: `Application ${status}` }] };
    }

    // ── Save/Bookmark ──
    case 'TOGGLE_SAVE': {
      const { jobId } = action.payload;
      const userId = state.currentUser?.id;
      if (!userId) return state;
      const userSaved = state.saved[userId] || [];
      const isSaved = userSaved.includes(jobId);
      const newSaved = isSaved ? userSaved.filter(id => id !== jobId) : [...userSaved, jobId];
      return {
        ...state,
        saved: { ...state.saved, [userId]: newSaved },
        toasts: [...state.toasts, { id: Date.now(), type: 'success', message: isSaved ? 'Removed from saved' : 'Job saved! 🔖' }]
      };
    }

    // ── Search & Filters ──
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'SET_JOB_FILTER':
      return { ...state, activeJobFilter: action.payload };

    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.payload };

    case 'SET_SORT':
      return { ...state, sortBy: action.payload };

    // ── Chats ──
    case 'SEND_MESSAGE': {
      const { chatId, text } = action.payload;
      const newMsg = {
        id: `msg_${Date.now()}`,
        senderId: state.currentUser?.id,
        text,
        timestamp: new Date().toISOString(),
        read: true
      };
      const chats = state.chats.map(c => {
        if (c.id === chatId) {
          return { ...c, messages: [...c.messages, newMsg], lastMessage: text, lastMessageTime: newMsg.timestamp, unreadCount: 0 };
        }
        return c;
      });
      return { ...state, chats };
    }

    case 'RECEIVE_BOT_MESSAGE': {
      const { chatId } = action.payload;
      const responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      const chat = state.chats.find(c => c.id === chatId);
      if (!chat) return state;
      const botMsg = {
        id: `msg_bot_${Date.now()}`,
        senderId: chat.participantId,
        text: responseText,
        timestamp: new Date().toISOString(),
        read: false
      };
      const chats = state.chats.map(c => {
        if (c.id === chatId) {
          return { ...c, messages: [...c.messages, botMsg], lastMessage: responseText, lastMessageTime: botMsg.timestamp, unreadCount: c.unreadCount + 1 };
        }
        return c;
      });
      return { ...state, chats };
    }

    case 'MARK_CHAT_READ': {
      const chats = state.chats.map(c => {
        if (c.id === action.payload) {
          const messages = c.messages.map(m => ({ ...m, read: true }));
          return { ...c, messages, unreadCount: 0 };
        }
        return c;
      });
      return { ...state, chats };
    }

    // ── Notifications ──
    case 'ADD_NOTIFICATION': {
      const notifications = [action.payload, ...state.notifications];
      return { ...state, notifications };
    }

    case 'MARK_ALL_NOTIFICATIONS_READ': {
      const notifications = state.notifications.map(n => ({ ...n, read: true }));
      return { ...state, notifications };
    }

    case 'MARK_NOTIFICATION_READ': {
      const notifications = state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n);
      return { ...state, notifications };
    }

    // ── Toasts ──
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };

    // ── Reset ──
    case 'RESET_DATA': {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      return getInitialState();
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  // Sync to localStorage on every state change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.AUTH, state.auth);
    saveToStorage(STORAGE_KEYS.USERS, state.users);
    saveToStorage(STORAGE_KEYS.JOBS, state.jobs);
    saveToStorage(STORAGE_KEYS.APPLICATIONS, state.applications);
    saveToStorage(STORAGE_KEYS.SAVED, state.saved);
    saveToStorage(STORAGE_KEYS.CHATS, state.chats);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
    saveToStorage(STORAGE_KEYS.COMPANIES, state.companies);
  }, [state.auth, state.users, state.jobs, state.applications, state.saved, state.chats, state.notifications, state.companies]);

  // Auto-remove toasts after 3 seconds
  useEffect(() => {
    if (state.toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: state.toasts[0].id });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.toasts]);

  // Helper functions
  const isJobSaved = (jobId) => {
    const userId = state.currentUser?.id;
    return userId ? (state.saved[userId] || []).includes(jobId) : false;
  };

  const isJobApplied = (jobId) => {
    return state.applications.some(a => a.jobId === jobId && a.userId === state.currentUser?.id);
  };

  const getUserApplications = () => {
    return state.applications.filter(a => a.userId === state.currentUser?.id);
  };

  const getJobApplications = (jobId) => {
    return state.applications.filter(a => a.jobId === jobId);
  };

  const getSavedJobs = () => {
    const userId = state.currentUser?.id;
    const savedIds = userId ? (state.saved[userId] || []) : [];
    return state.jobs.filter(j => savedIds.includes(j.id));
  };

  const getEmployerJobs = () => {
    return state.jobs.filter(j => j.postedBy === state.currentUser?.id);
  };

  const getFilteredJobs = () => {
    let filtered = [...state.jobs];
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    if (state.activeJobFilter && state.activeJobFilter !== 'See All') {
      const filterMap = {
        'Full Time': 'Full-time',
        'Part Time': 'Part-time',
        'Freelance': 'Freelance',
        'Remote': 'Remote',
        'Internship': 'Internship'
      };
      const mapped = filterMap[state.activeJobFilter];
      if (mapped) {
        filtered = filtered.filter(j => j.jobType === mapped || j.workplaceType === mapped || j.tags.includes(mapped));
      }
    }
    if (state.activeCategory) {
      const cat = state.activeCategory.toLowerCase();
      filtered = filtered.filter(j => j.title.toLowerCase().includes(cat));
    }
    if (state.sortBy === 'Recently') {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (state.sortBy === 'Salary High-Low') {
      filtered.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (state.sortBy === 'Most Applicants') {
      filtered.sort((a, b) => b.applicants - a.applicants);
    }
    return filtered;
  };

  const getUnreadNotificationCount = () => {
    return state.notifications.filter(n => !n.read).length;
  };

  const getUnreadChatCount = () => {
    return state.chats.reduce((sum, c) => sum + c.unreadCount, 0);
  };

  const value = {
    state,
    dispatch,
    isJobSaved,
    isJobApplied,
    getUserApplications,
    getJobApplications,
    getSavedJobs,
    getEmployerJobs,
    getFilteredJobs,
    getUnreadNotificationCount,
    getUnreadChatCount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

export default AppContext;
