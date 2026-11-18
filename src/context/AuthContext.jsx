import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../config/roles';
import { MODULES } from '../config/modules';
import { 
  DEFAULT_EMPLOYEES, 
  DEFAULT_USERS, 
  INITIAL_ATTENDANCE_LOGS, 
  INITIAL_LEAVE_REQUESTS, 
  INITIAL_ADJUST_REQUESTS, 
  INITIAL_SYSTEM_LOGS 
} from '../config/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lotushr_current_user');
      if (saved) return JSON.parse(saved);
    } catch {}

    return {
      role: 'employee',
      name: 'Nhân viên',
      userName: 'Nguyễn Văn An',
      empCode: 'NV001',
      dept: 'Phòng Kỹ thuật & Công nghệ',
      email: 'an.nguyen@lotushr.vn'
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeModuleId, setActiveModuleId] = useState('emp-face-checkin');

  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('lotushr_employees');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_EMPLOYEES;
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('lotushr_users');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USERS;
  });

  const [attendanceLogs, setAttendanceLogs] = useState(INITIAL_ATTENDANCE_LOGS);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [adjustRequests, setAdjustRequests] = useState(INITIAL_ADJUST_REQUESTS);
  const [systemLogs, setSystemLogs] = useState(INITIAL_SYSTEM_LOGS);
  const [timesheetLocked, setTimesheetLocked] = useState(false);

  const [modals, setModals] = useState({
    profile: false,
    changePassword: false,
    logoutConfirm: false,
    guestGate: false
  });
  const [pendingGateModule, setPendingGateModule] = useState(null);

  const [toasts, setToasts] = useState([]);
  const addToast = (title, message, tone = 'blue') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, tone }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lotushr_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lotushr_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lotushr_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('lotushr_users', JSON.stringify(users));
  }, [users]);

  const login = (roleKey, customName = null, customInfo = null) => {
    const profile = ROLES[roleKey] || ROLES.employee;
    const user = {
      role: profile.id,
      name: profile.name,
      userName: customName || (customInfo && customInfo.userName) || profile.userName,
      empCode: (customInfo && customInfo.empCode) || profile.empCode,
      dept: (customInfo && customInfo.dept) || profile.dept,
      email: (customInfo && customInfo.email) || profile.email || `${profile.empCode.toLowerCase()}@lotushr.vn`
    };
    setCurrentUser(user);
    setIsLoggedIn(true);

    const defaultMod = MODULES.find(m => m.roles.includes(roleKey));
    if (defaultMod) setActiveModuleId(defaultMod.id);

    addToast(`Đã chuyển vai trò: ${user.name}`, `Chào mừng ${user.userName}. Giao diện đã phân quyền tương ứng.`, 'emerald');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setModals(prev => ({ ...prev, logoutConfirm: false }));
    addToast('Đã đăng xuất', 'Phiên làm việc đã kết thúc an toàn.', 'blue');
  };

  const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }));

  const navigateModule = (modId) => {
    const mod = MODULES.find(m => m.id === modId);
    if (!mod) return;

    if (!isLoggedIn) {
      setPendingGateModule(mod);
      openModal('guestGate');
      return;
    }
    setActiveModuleId(mod.id);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn,
      activeModuleId,
      setActiveModuleId,
      navigateModule,
      login,
      logout,
      employees,
      setEmployees,
      users,
      setUsers,
      attendanceLogs,
      setAttendanceLogs,
      leaveRequests,
      setLeaveRequests,
      adjustRequests,
      setAdjustRequests,
      systemLogs,
      setSystemLogs,
      timesheetLocked,
      setTimesheetLocked,
      modals,
      openModal,
      closeModal,
      pendingGateModule,
      toasts,
      addToast
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
