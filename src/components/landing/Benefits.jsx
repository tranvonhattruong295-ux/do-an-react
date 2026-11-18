import React from 'react';

export default function Benefits() {
  const benefits = [
    {
      icon: "fa-clock",
      iconBg: "bg-blue-100 text-blue-700",
      title: "Tiết Kiệm 85% Thời Gian",
      desc: "Tự động chốt dữ liệu công hàng ngày, giảm thiểu sai sót so với nhập liệu thủ công bằng Excel."
    },
    {
      icon: "fa-user-shield",
      iconBg: "bg-teal-100 text-teal-700",
      title: "Triệt Tiêu Chấm Công Hộ",
      desc: "Định danh sinh trắc học từng cá nhân, tạo môi trường làm việc minh bạch, công bằng và kỷ luật."
    },
    {
      icon: "fa-hand-holding-hand",
      iconBg: "bg-indigo-100 text-indigo-700",
      title: "Điểm Danh Không Chạm",
      desc: "Nhân viên chỉ cần nhìn lướt qua camera là hoàn tất, giữ vệ sinh tuyệt đối và văn minh công sở."
    },
    {
      icon: "fa-cloud-arrow-up",
      iconBg: "bg-amber-100 text-amber-700",
      title: "Quản Trị Mọi Lúc Mọi Nơi",
      desc: "Hệ thống Cloud vận hành thông suốt trên cả máy tính lẫn điện thoại với độ ổn định cao."
    }
  ];

  return (
    <section id="section-benefits" className="benefits-section">
      <div className="benefits-section__media" data-aos="fade-right">
        <div className="benefits-section__img-card">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
            alt="Văn phòng hiện đại sử dụng LotusHR" 
            className="benefits-section__img" 
            loading="lazy" 
          />
          <div className="benefits-section__img-overlay"></div>
        </div>

        <div className="benefits-section__badge benefits-section__badge--top animate-float">
          <div className="benefits-section__badge-icon benefits-section__badge-icon--amber">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div className="benefits-section__badge-info">
            <div className="benefits-section__badge-title">0.3s Mỗi Lượt</div>
            <div className="benefits-section__badge-sub">Không ùn tắc cửa ra vào</div>
          </div>
        </div>

        <div className="benefits-section__badge benefits-section__badge--bottom animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="benefits-section__badge-icon benefits-section__badge-icon--emerald">
            <i className="fa-solid fa-check-double"></i>
          </div>
          <div className="benefits-section__badge-info">
            <div className="benefits-section__badge-title">99.8% Chuẩn Xác</div>
            <div className="benefits-section__badge-sub">Tin cậy cho toàn bộ HR</div>
          </div>
        </div>
      </div>

      <div className="benefits-section__content" data-aos="fade-left">
        <div>
          <span className="benefits-section__tag">
            <i className="fa-solid fa-chart-line mr-1"></i> Tối ưu hóa vận hành
          </span>
          <h2 className="benefits-section__title">
            Vì Sao Hơn 500+ Doanh Nghiệp Chọn LotusHR FaceID Cloud?
          </h2>
          <p className="benefits-section__desc">
            Giải pháp được thiết kế tối giản, trực quan giúp ban lãnh đạo và phòng nhân sự cắt giảm đến 80% gánh nặng đối soát thủ công mỗi tháng.
          </p>
        </div>

        <div className="benefits-section__grid">
          {benefits.map((b, idx) => (
            <div 
              key={idx} 
              data-aos="zoom-in"
              data-aos-delay={(idx + 1) * 100}
              className="benefits-section__card"
            >
              <div className={`benefits-section__card-icon ${b.iconBg}`}>
                <i className={`fa-solid ${b.icon}`}></i>
              </div>
              <h4 className="benefits-section__card-title">{b.title}</h4>
              <p className="benefits-section__card-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
