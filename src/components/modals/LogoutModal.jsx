import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LogoutModal() {
  const { modals, closeModal, logout } = useAuth();
  const navigate = useNavigate();

  if (!modals.logoutConfirm) return null;

  const handleConfirm = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="modal">
      <div className="modal__dialog modal__dialog--sm">
        <div className="modal__center-icon modal__center-icon--rose">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
        <div className="modal__center-content">
          <h3 className="modal__center-title">Xác nhận đăng xuất</h3>
          <p className="modal__center-desc">
            Bạn có chắc chắn muốn đăng xuất và kết thúc phiên làm việc hiện tại không?
          </p>
        </div>
        <div className="modal__footer modal__footer--stretch">
          <button 
            type="button" 
            onClick={() => closeModal('logoutConfirm')}
            className="modal__btn modal__btn--cancel"
          >
            Hủy bỏ
          </button>
          <button 
            type="button" 
            onClick={handleConfirm}
            className="modal__btn modal__btn--danger"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-[11px]"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}
