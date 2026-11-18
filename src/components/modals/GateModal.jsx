import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../config/roles';

export default function GateModal() {
  const { modals, closeModal, pendingGateModule, login } = useAuth();

  if (!modals.guestGate || !pendingGateModule) return null;

  const handleQuickLogin = () => {
    closeModal('guestGate');
    const targetRole = pendingGateModule.roles[0] || 'employee';
    login(targetRole);
  };

  return (
    <div className="modal">
      <div className="modal__dialog modal__dialog--md">
        <div className="modal__header">
          <div className="modal__header-left">
            <div className="modal__header-icon modal__header-icon--blue">
              <i className="fa-solid fa-lock"></i>
            </div>
            <div className="modal__header-meta">
              <span className="modal__header-tag">Kiểm tra thẩm quyền thao tác</span>
              <h3 className="modal__header-title">{pendingGateModule.title}</h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => closeModal('guestGate')}
            className="modal__close-btn"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <p className="modal__body-text">
          {pendingGateModule.desc}
        </p>

        <div className="modal__info-box">
          <div className="modal__info-row">
            <span className="modal__info-label">Tác nhân được phép:</span>
            <span className="modal__info-val">
              {pendingGateModule.roles.map(r => ROLES[r]?.name).join(', ')}
            </span>
          </div>
          <div className="modal__info-row">
            <span className="modal__info-label">Kết quả xử lý:</span>
            <span className="modal__info-val modal__info-val--success">{pendingGateModule.resultText}</span>
          </div>
        </div>

        <div className="modal__footer">
          <button 
            type="button" 
            onClick={() => closeModal('guestGate')}
            className="modal__btn modal__btn--cancel"
          >
            Đóng lại
          </button>
          <button 
            type="button" 
            onClick={handleQuickLogin}
            className="modal__btn modal__btn--primary"
          >
            <i className="fa-solid fa-repeat mr-1"></i>Chuyển đúng vai trò
          </button>
        </div>
      </div>
    </div>
  );
}
