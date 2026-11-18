import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MODULES } from '../config/modules';
import { ROLES } from '../config/roles';

import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import ProfileModal from '../components/modals/ProfileModal';
import PasswordModal from '../components/modals/PasswordModal';
import LogoutModal from '../components/modals/LogoutModal';
import Toast from '../components/common/Toast';

import Checkin from '../components/modules/employee/Checkin';
import Schedule from '../components/modules/employee/Schedule';
import Requests from '../components/modules/employee/Requests';

import Overview from '../components/modules/manager/Overview';
import Leave from '../components/modules/manager/Leave';
import Adjust from '../components/modules/manager/Adjust';

import Staff from '../components/modules/hr/Staff';
import Shifts from '../components/modules/hr/Shifts';
import Reports from '../components/modules/hr/Reports';

import Accounts from '../components/modules/admin/Accounts';
import Stations from '../components/modules/admin/Stations';
import Logs from '../components/modules/admin/Logs';

export default function Workspace() {
  const { currentUser, activeModuleId, setActiveModuleId, login } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeModule = MODULES.find(m => m.id === activeModuleId) || MODULES[0];
  const isAllowed = currentUser && activeModule.roles.includes(currentUser.role);

  const renderActiveModuleComponent = () => {
    switch (activeModule.id) {
      case 'emp-face-checkin':
        return <Checkin />;
      case 'emp-my-schedule-attendance':
        return <Schedule />;
      case 'emp-submit-requests':
        return <Requests />;

      case 'mgr-dept-overview':
        return <Overview />;
      case 'mgr-approve-leave':
        return <Leave />;
      case 'mgr-approve-adjust':
        return <Adjust />;

      case 'hr-profiles-depts':
        return <Staff />;
      case 'hr-shifts-assign':
        return <Shifts />;
      case 'hr-attendance-reports':
        return <Reports />;

      case 'admin-accounts-rbac':
        return <Accounts />;
      case 'admin-station-config':
        return <Stations />;
      case 'admin-logs-backup':
        return <Logs />;

      default:
        return <Checkin />;
    }
  };

  return (
    <div className="workspace">
      <div className="workspace__bg-blob workspace__bg-blob--blue"></div>
      <div className="workspace__bg-blob workspace__bg-blob--teal"></div>

      <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />

      <div className="workspace__body">
        <main className="workspace__main">
          <section className="workspace__header-card hr-card">
            <div className="workspace__module-info">
              <div className="workspace__tags-row">
                <span className="badge badge--blue">
                  {activeModule.category}
                </span>
              </div>
              <h2 className="workspace__title">
                {activeModule.title}
              </h2>
            </div>

            <div className="workspace__roles-box">
              <span className="workspace__roles-label">Vai trò được phép:</span>
              <div className="workspace__roles-list">
                {activeModule.roles.map(r => (
                  <span key={r} className={`badge ${ROLES[r]?.badge || ''}`}>
                    {ROLES[r]?.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {!isAllowed ? (
            <div className="workspace__rbac-gate hr-card">
              <div className="workspace__rbac-icon">
                <i className="fa-solid fa-user-lock"></i>
              </div>
              <div className="workspace__rbac-header">
                <span className="workspace__rbac-tag">Giới hạn thẩm quyền (RBAC)</span>
                <h3 className="workspace__rbac-title">
                  Tài khoản "{currentUser?.name}" không có quyền thực hiện chức năng này
                </h3>
              </div>
              <p className="workspace__rbac-desc">
                Để đảm bảo đúng quy trình nghiệp vụ và tính bảo mật, phân hệ <strong>"{activeModule.title}"</strong> chỉ dành riêng cho <strong>{activeModule.roles.map(r => ROLES[r]?.name).join(', ')}</strong>.
              </p>
              <div className="workspace__rbac-actions">
                <button 
                  type="button" 
                  onClick={() => {
                    const firstAllowed = MODULES.find(m => m.roles.includes(currentUser?.role));
                    if (firstAllowed) setActiveModuleId(firstAllowed.id);
                  }}
                  className="btn btn--secondary"
                >
                  Mở chức năng đúng quyền của {currentUser?.name}
                </button>
                <button 
                  type="button" 
                  onClick={() => login(activeModule.roles[0])}
                  className="btn btn--primary"
                >
                  <i className="fa-solid fa-repeat"></i>
                  <span>Chuyển sang tài khoản {ROLES[activeModule.roles[0]]?.name} để kiểm thử</span>
                </button>
              </div>
            </div>
          ) : (
            renderActiveModuleComponent()
          )}
        </main>

        <Footer />
      </div>

      <ProfileModal />
      <PasswordModal />
      <LogoutModal />

      <Toast />
    </div>
  );
}