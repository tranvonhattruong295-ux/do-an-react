import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer__inner">
        <div>
          <div className="home-footer__brand-line">
            <span className="home-footer__brand">Lotus<span className="home-footer__brand-accent">HR</span></span>
            <span className="home-footer__sep">•</span>
            <span className="home-footer__sub">Hệ thống Quản trị Nhân sự và Chấm công Tự động FaceID Cloud</span>
          </div>
          <p className="home-footer__desc">
            Nền tảng sinh trắc học thông minh • Bảo mật 3D Liveness • Tự động hóa bảng tính công doanh nghiệp.
          </p>
        </div>

        <div className="home-footer__links">
          <Link to="/login" className="home-footer__link">Đăng nhập</Link>
          <span className="home-footer__sep">•</span>
          <Link to="/register" className="home-footer__link">Đăng ký</Link>
          <span className="home-footer__sep">•</span>
          <Link to="/workspace" className="home-footer__link">Vào Workspace</Link>
        </div>
      </div>
    </footer>
  );
}
