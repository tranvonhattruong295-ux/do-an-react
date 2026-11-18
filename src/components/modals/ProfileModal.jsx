import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileModal() {
  const { modals, closeModal, currentUser, employees } = useAuth();
  if (!modals.profile || !currentUser) return null;

  const empInfo = employees.find(e => e.code === currentUser.empCode);
  const shiftText = empInfo?.shift || 'Ca Hành chính (08:00 - 17:30)';
  const isEnrolled = empInfo ? empInfo.faceEnrolled : true;

  return (
    <div className="modal">
      <div className="modal__dialog modal__dialog--md">
        <div className="modal__header">
          <div className="modal__header-left">
            <div className="modal__header-icon modal__header-icon--blue">
              <i className="fa-regular fa-id-badge"></i>
            </div>
            <div className="modal__header-meta">
              <h3 className="modal__header-title">Hồ Sơ Nhân Sự Cá Nhân</h3>
              <p className="modal__header-desc">Thông tin tài khoản định danh trên hệ thống</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => closeModal('profile')}
            className="modal__close-btn"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal__profile-card">
          <div className="modal__profile-avatar">
            {currentUser.empCode ? currentUser.empCode.slice(0, 2) : 'NV'}
          </div>
          <div className="modal__profile-meta">
            <div className="modal__profile-name">{currentUser.userName}</div>
            <div className="modal__profile-subrow">
              <span className="modal__profile-code">
                {currentUser.empCode}
              </span>
              <span className="modal__profile-role">{currentUser.name}</span>
            </div>
          </div>
        </div>

        <div className="modal__profile-grid">
          <div className="modal__profile-item">
            <span className="modal__profile-item-label">Email công ty:</span>
            <div className="modal__profile-item-val">{currentUser.email}</div>
          </div>
          <div className="modal__profile-item">
            <span className="modal__profile-item-label">Phòng ban:</span>
            <div className="modal__profile-item-val">{currentUser.dept}</div>
          </div>
          <div className="modal__profile-item">
            <span className="modal__profile-item-label">Ca làm việc:</span>
            <div className="modal__profile-item-val">{shiftText}</div>
          </div>
          <div className="modal__profile-item">
            <span className="modal__profile-item-label">Trạng thái FaceID:</span>
            <div className={`modal__profile-item-val ${isEnrolled ? 'modal__profile-item-val--active' : 'modal__profile-item-val--pending'}`}>
              <i className={`fa-solid ${isEnrolled ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
              <span>{isEnrolled ? 'Đã kích hoạt 3D' : 'Chưa đăng ký'}</span>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button 
            type="button" 
            onClick={() => closeModal('profile')}
            className="modal__btn modal__btn--primary"
          >
            Đóng hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}
