import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__brand-name">Lotus<span className="footer__brand-accent">HR</span></span>
          <span className="footer__brand-divider">•</span>
          <span className="footer__brand-desc">Hệ Thống Quản Trị Nhân Sự & Chấm Công FaceID Cloud</span>
        </div>
        <div className="footer__meta">
          <Link to="/" className="footer__link">Trang chủ giới thiệu</Link>
          <span className="footer__brand-divider">•</span>
          <span className="footer__status">
            <span className="footer__status-dot"></span>
            Hệ thống AI hoạt động bình thường
          </span>
        </div>
      </div>
    </footer>
  );
}