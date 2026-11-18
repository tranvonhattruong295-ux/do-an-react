import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Clock from '../common/Clock';
import { useAuth } from '../../context/AuthContext';

export default function Nav() {
  const { isLoggedIn, currentUser } = useAuth();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="landing-nav">
      <Logo to="/" subtitle="FaceID Cloud" />

      <nav className="landing-nav__menu">
        <button
          type="button"
          onClick={() => scrollTo('section-hero')}
          className="landing-nav__link"
        >
          <i className="fa-solid fa-house text-[11px]"></i>
          <span>Trang chủ</span>
        </button>
        <button
          type="button"
          onClick={() => scrollTo('section-features')}
          className="landing-nav__link"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-[11px] text-blue-500"></i>
          <span>Tính năng nổi bật</span>
        </button>
        <button
          type="button"
          onClick={() => scrollTo('section-checkin-demo')}
          className="landing-nav__link"
        >
          <i className="fa-solid fa-camera text-[11px] text-teal-500"></i>
          <span>Trải nghiệm FaceID</span>
        </button>
        <button
          type="button"
          onClick={() => scrollTo('section-benefits')}
          className="landing-nav__link"
        >
          <i className="fa-solid fa-chart-line text-[11px] text-indigo-500"></i>
          <span>Lợi ích doanh nghiệp</span>
        </button>
      </nav>

      <div className="landing-nav__right">
        <div className="landing-nav__clock">
          <Clock />
        </div>

        {isLoggedIn && currentUser ? (
          <div className="landing-nav__user-box">
            <div className="landing-nav__user-badge">
              <div className="landing-nav__user-avatar">
                {currentUser.empCode ? currentUser.empCode.slice(0, 2) : 'NV'}
              </div>
              <span className="landing-nav__user-name">{currentUser.userName}</span>
              <span className="landing-nav__user-role">({currentUser.name})</span>
            </div>
            <Link
              to="/workspace"
              className="landing-nav__btn-workspace"
            >
              <span>Vào không gian làm việc</span>
              <i className="fa-solid fa-arrow-right text-[11px]"></i>
            </Link>
          </div>
        ) : (
          <div className="landing-nav__user-box">
            <Link
              to="/login"
              className="landing-nav__btn-login"
            >
              <i className="fa-solid fa-right-to-bracket text-blue-600"></i>
              <span>Đăng nhập</span>
            </Link>
            <Link
              to="/register"
              className="landing-nav__btn-register"
            >
              <i className="fa-solid fa-user-plus"></i>
              <span>Đăng ký</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
