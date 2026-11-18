import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ to = "/", subtitle = "FaceID Cloud" }) {
  return (
    <Link to={to} className="logo">
      <div className="logo__icon-box">
        <i className="fa-solid fa-people-group"></i>
      </div>
      <div className="logo__meta">
        <div className="logo__header">
          <span className="logo__brand">
            Lotus<span className="logo__brand-accent">HR</span>
          </span>
          <span className="logo__badge">{subtitle}</span>
        </div>
        <p className="logo__tagline">Quản trị Nhân sự & Chấm công Tự động</p>
      </div>
    </Link>
  );
}