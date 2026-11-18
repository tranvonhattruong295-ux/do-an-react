import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../config/roles';

export default function UserMenu({ isOpen, onClose }) {
  const { currentUser, openModal, addToast } = useAuth();
  if (!isOpen || !currentUser) return null;

  const roleConfig = ROLES[currentUser.role] || ROLES.employee;

  const handleProfile = () => {
    onClose();
    openModal('profile');
  };

  const handleChangePass = () => {
    onClose();
    openModal('changePassword');
  };

  const handleFaceStatus = () => {
    onClose();
    addToast('Dữ liệu khuôn mặt FaceID', 'Trạng thái: Đã đăng ký mẫu 3D Liveness (Độ khớp trung bình 99.6%).', 'emerald');
  };

  const handleSessionLog = () => {
    onClose();
    const now = new Date().toLocaleTimeString('vi-VN');
    addToast('Bảo mật phiên làm việc', `Phiên hoạt động từ ${now}. Lưu trữ an toàn trên trình duyệt.`, 'blue');
  };

  const handleLogout = () => {
    onClose();
    openModal('logoutConfirm');
  };

  return (
    <div className="user-menu">
      <div className="user-menu__header">
        <div className="user-menu__user-row">
          <div className="user-menu__avatar">
            {currentUser.empCode ? currentUser.empCode.slice(0, 2) : 'NV'}
          </div>
          <div className="user-menu__meta">
            <div className="user-menu__name">{currentUser.userName}</div>
            <div className="user-menu__email">{currentUser.email}</div>
          </div>
        </div>
        <div className="user-menu__badge-row">
          <span className={`badge ${roleConfig.badge}`}>
            {currentUser.name}
          </span>
          <span className="user-menu__status-indicator">
            <span className="user-menu__status-dot"></span>
            Đang hoạt động
          </span>
        </div>
      </div>

      <div className="user-menu__body">
        <button 
          type="button" 
          onClick={handleProfile}
          className="user-menu__item"
        >
          <div className="user-menu__item-icon user-menu__item-icon--profile">
            <i className="fa-regular fa-id-badge"></i>
          </div>
          <div className="user-menu__item-text">
            <div className="user-menu__item-title">Hồ sơ cá nhân</div>
            <div className="user-menu__item-desc">Xem thông tin chi tiết & phòng ban</div>
          </div>
        </button>

        <button 
          type="button" 
          onClick={handleChangePass}
          className="user-menu__item"
        >
          <div className="user-menu__item-icon user-menu__item-icon--key">
            <i className="fa-solid fa-key"></i>
          </div>
          <div className="user-menu__item-text">
            <div className="user-menu__item-title">Đổi mật khẩu</div>
            <div className="user-menu__item-desc">Cập nhật mật khẩu tài khoản</div>
          </div>
        </button>

        <button 
          type="button" 
          onClick={handleFaceStatus}
          className="user-menu__item"
        >
          <div className="user-menu__item-icon user-menu__item-icon--face">
            <i className="fa-solid fa-face-smile"></i>
          </div>
          <div className="user-menu__item-text">
            <div className="user-menu__item-title">Dữ liệu khuôn mặt FaceID</div>
            <div className="user-menu__item-desc">Kiểm tra trạng thái nhận diện AI</div>
          </div>
        </button>

        <button 
          type="button" 
          onClick={handleSessionLog}
          className="user-menu__item"
        >
          <div className="user-menu__item-icon user-menu__item-icon--session">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div className="user-menu__item-text">
            <div className="user-menu__item-title">Bảo mật phiên đăng nhập</div>
            <div className="user-menu__item-desc">LocalStorage • Mã hóa an toàn</div>
          </div>
        </button>
      </div>

      <div className="user-menu__footer">
        <button 
          type="button" 
          onClick={handleLogout}
          className="user-menu__logout-btn"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Đăng xuất khỏi hệ thống</span>
        </button>
      </div>
    </div>
  );
}