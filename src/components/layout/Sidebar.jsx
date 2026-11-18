import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MODULES } from '../../config/modules';

export default function Sidebar({ isOpen, onToggle }) {
  const { currentUser, activeModuleId, navigateModule, employees } = useAuth();

  const pendingHRCount = currentUser?.role === 'hr'
    ? (employees || []).filter(e => e.accountStatus === 'Chờ duyệt').length 
    : 0;

  const groupedModules = {};
  MODULES.forEach(m => {
    if (!groupedModules[m.category]) groupedModules[m.category] = [];
    groupedModules[m.category].push(m);
  });

  return (
    <aside 
      id="leftSidebar" 
      className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}
    >
      <div className="sidebar__nav custom-scrollbar">
        {Object.entries(groupedModules).map(([cat, list]) => (
          <div key={cat} className="sidebar__group">
            <div className="sidebar__group-title">
              {cat}
            </div>
            <div className="sidebar__menu">
              {list.map(m => {
                const isActive = activeModuleId === m.id;
                const isAllowed = currentUser && m.roles.includes(currentUser.role);
                const statusClass = isActive 
                  ? 'sidebar__item--active' 
                  : (isAllowed ? '' : 'sidebar__item--locked');
                const hasPendingBadge = m.id === 'hr-profiles-depts' && pendingHRCount > 0;

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => navigateModule(m.id)}
                    className={`sidebar__item ${statusClass}`}
                  >
                    <i className={`fa-solid ${m.icon} sidebar__item-icon`}></i>
                    <span className="sidebar__item-label">{m.title}</span>
                    {hasPendingBadge && (
                      <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white animate-pulse shadow-sm">
                        {pendingHRCount} chờ
                      </span>
                    )}
                    {isAllowed ? (
                      <span className="sidebar__item-status" title="Thuộc thẩm quyền"></span>
                    ) : (
                      <i className="fa-solid fa-lock sidebar__item-lock" title="Khác thẩm quyền"></i>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar__footer">
        <span className="sidebar__footer-label">Menu Điều Hướng</span>
        <button 
          type="button" 
          onClick={onToggle}
          className="sidebar__footer-collapse" 
          title="Thu gọn menu"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
    </aside>
  );
}
