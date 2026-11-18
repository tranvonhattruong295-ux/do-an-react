import React, { useState, useRef, useEffect } from 'react';
import Logo from '../common/Logo';
import Clock from '../common/Clock';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onToggleSidebar }) {
  const { currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <button 
          type="button" 
          onClick={onToggleSidebar}
          className="header__toggle-btn" 
          title="Thu gọn / Mở rộng Menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <Logo to="/" subtitle="Trang chủ" />
      </div>

      <div className="header__right">
        <div className="header__clock-wrapper">
          <Clock />
        </div>

        {currentUser && (
          <div className="header__user-dropdown" ref={containerRef}>
            <button 
              type="button" 
              onClick={() => setDropdownOpen(prev => !prev)}
              className="header__user-trigger"
            >
              <div className="header__avatar">
                {currentUser.empCode ? currentUser.empCode.slice(0, 2) : 'NV'}
              </div>
              <div className="header__user-meta">
                <div className="header__user-name">{currentUser.userName}</div>
                <div className="header__user-role">{currentUser.name}</div>
              </div>
              <i className={`fa-solid fa-chevron-down header__user-arrow ${dropdownOpen ? 'header__user-arrow--rotated' : ''}`}></i>
            </button>

            <UserMenu isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}