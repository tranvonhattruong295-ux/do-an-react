import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <section 
      data-aos="zoom-in-up" 
      className="cta-banner"
    >
      <div className="cta-banner__blob"></div>
      <div className="cta-banner__inner">
        <span className="cta-banner__tag">
          Khởi Đầu Nhanh Chóng Trong 3 Phút
        </span>
        <h2 className="cta-banner__title">
          Sẵn Sàng Nâng Tầm Quản Trị Nhân Sự Cùng LotusHR?
        </h2>
        <p className="cta-banner__desc">
          Trải nghiệm giải pháp chấm công khuôn mặt AI hiện đại, minh bạch và tự động hóa toàn bộ luồng duyệt đơn & tính công của doanh nghiệp.
        </p>
        <div className="cta-banner__actions">
          <Link
            to="/register"
            className="cta-banner__btn-white"
          >
            <i className="fa-solid fa-user-plus text-blue-600"></i>
            <span>Đăng ký tài khoản mới</span>
          </Link>
          <Link
            to="/login"
            className="cta-banner__btn-outline"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Đăng nhập hệ thống</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
