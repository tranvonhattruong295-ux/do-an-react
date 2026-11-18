import React from 'react';
import { Link } from 'react-router-dom';
import ScannerDemo from './ScannerDemo';

export default function Hero() {
  const scrollToDemo = () => {
    const el = document.getElementById('section-checkin-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="section-hero" className="hero">
      <div className="hero__content" data-aos="fade-right">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          <span>Công Nghệ AI Liveness 3D • Nhận Diện Dưới 0.3 Giây</span>
        </div>

        <h1 className="hero__title">
          Chấm Công Khuôn Mặt AI <br />
          <span className="hero__title-accent">
            Minh Bạch & Tự Động Hóa
          </span>
        </h1>

        <p className="hero__desc">
          Giải pháp quản trị nhân sự đám mây thế hệ mới. Điểm danh không chạm, triệt tiêu hoàn toàn gian lận chấm công hộ, tự động đối soát bảng công và đồng bộ phiếu lương trên một nền tảng thống nhất.
        </p>

        <div className="hero__actions">
          <Link
            to="/register"
            className="hero__btn-primary"
          >
            <i className="fa-solid fa-rocket"></i>
            <span>Bắt đầu trải nghiệm ngay</span>
          </Link>
          <button
            type="button"
            onClick={scrollToDemo}
            className="hero__btn-demo"
          >
            <i className="fa-solid fa-play text-blue-600"></i>
            <span>Xem demo trực tiếp</span>
          </button>
        </div>

        <div className="hero__stats">
          <div className="hero__stat-item">
            <i className="fa-solid fa-circle-check text-emerald-500 text-sm"></i>
            <span className="hero__stat-text">Chính xác 99.8%</span>
          </div>
          <div className="hero__stat-item">
            <i className="fa-solid fa-shield-halved text-blue-500 text-sm"></i>
            <span className="hero__stat-text">Chống giả mạo 3D Liveness</span>
          </div>
          <div className="hero__stat-item">
            <i className="fa-solid fa-cloud text-teal-500 text-sm"></i>
            <span className="hero__stat-text">Điện toán đám mây 24/7</span>
          </div>
        </div>
      </div>

      <div className="hero__preview" data-aos="fade-left" data-aos-delay="150">
        <ScannerDemo />
      </div>
    </section>
  );
}
