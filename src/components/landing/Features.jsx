import React from 'react';
import Card from './Card';

export default function Features() {
  const features = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
      badgeLeft: "Tốc độ 0.3s",
      badgeRight: "Liveness 3D",
      badgeRightColor: "text-emerald-400",
      title: "Chấm Công FaceID Chống Giả Mạo",
      desc: "Ứng dụng mạng nơ-ron nhận diện sinh trắc học và kiểm tra cử động sống. Ngăn chặn tuyệt đối hành vi dùng hình ảnh màn hình điện thoại hoặc video phát lại.",
      tags: ["#FaceRecognition", "#AntiSpoofing"]
    },
    {
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80",
      badgeLeft: "RBAC Chuẩn",
      badgeRight: "4 Cấp Quyền Hạn",
      badgeRightColor: "text-amber-300",
      title: "Phân Quyền Ma Trận 4 Vai Trò",
      desc: "Tách bạch chức năng cho Nhân viên, Quản lý trực tiếp, Trưởng phòng Nhân sự (HR) và Quản trị viên (Admin). Đảm bảo an toàn và bảo mật dữ liệu tuyệt đối.",
      tags: ["#RoleBasedAccess", "#DataPrivacy"]
    },
    {
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
      badgeLeft: "Báo Cáo Tức Thì",
      badgeRight: "Xuất Excel 1-Click",
      badgeRightColor: "text-indigo-300",
      title: "Tự Động Hóa Bảng Công & Lương",
      desc: "Giờ vào/ra đồng bộ liên tục lên đám mây Cloud. Tự động tính công, tăng ca (OT), đi muộn về sớm và xuất bảng tính lương đối soát nhanh chóng.",
      tags: ["#AutoTimesheet", "#CloudPayroll"]
    }
  ];

  return (
    <section id="section-features" className="features-section">
      <div className="features-section__header" data-aos="fade-up">
        <span className="features-section__tag">
          <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Hệ Sinh Thái Toàn Diện
        </span>
        <h2 className="features-section__title">
          Tính Năng Đột Phá Nâng Tầm Doanh Nghiệp
        </h2>
        <p className="features-section__desc">
          Sự kết hợp hoàn hảo giữa thuật toán thị giác máy tính AI và hệ thống điều hành nhân sự đa tầng.
        </p>
      </div>

      <div className="features-section__grid">
        {features.map((f, idx) => (
          <Card key={idx} {...f} delay={(idx + 1) * 120} />
        ))}
      </div>
    </section>
  );
}
