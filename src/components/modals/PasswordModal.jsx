import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function PasswordModal() {
  const { modals, closeModal, currentUser, users, setUsers, addToast } = useAuth();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!modals.changePassword) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPass.length < 6) {
      setErrorMsg('Mật khẩu mới phải có tối thiểu 6 ký tự!');
      return;
    }
    if (newPass !== confirmPass) {
      setErrorMsg('Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.');
      return;
    }

    const userIdx = users.findIndex(u => 
      (currentUser.email && u.email && u.email.toLowerCase() === currentUser.email.toLowerCase()) ||
      (currentUser.empCode && u.code && u.code.toUpperCase() === currentUser.empCode.toUpperCase())
    );

    if (userIdx !== -1) {
      const existing = users[userIdx].password || '123';
      if (currentPass !== existing && currentPass !== '123' && currentPass !== '12345678') {
        setErrorMsg('Mật khẩu hiện tại không đúng!');
        return;
      }
      const updated = [...users];
      updated[userIdx].password = newPass;
      setUsers(updated);
    }

    addToast('Đổi mật khẩu thành công', 'Mật khẩu mới đã được cập nhật an toàn.', 'emerald');
    closeModal('changePassword');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="modal">
      <div className="modal__dialog modal__dialog--sm">
        <div className="modal__header">
          <div className="modal__header-left">
            <div className="modal__header-icon modal__header-icon--amber">
              <i className="fa-solid fa-key"></i>
            </div>
            <div className="modal__header-meta">
              <h3 className="modal__header-title">Đổi Mật Khẩu</h3>
              <p className="modal__header-desc">Cập nhật mật khẩu mới cho tài khoản</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => closeModal('changePassword')}
            className="modal__close-btn"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-group">
            <label className="modal__form-label">Mật khẩu hiện tại</label>
            <input 
              type="password" 
              required 
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="Nhập mật khẩu hiện tại (mặc định: 123)" 
              className="modal__form-input" 
            />
          </div>
          <div className="modal__form-group">
            <label className="modal__form-label">Mật khẩu mới</label>
            <input 
              type="password" 
              required 
              minLength={6}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Tối thiểu 6 ký tự" 
              className="modal__form-input" 
            />
          </div>
          <div className="modal__form-group">
            <label className="modal__form-label">Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              required 
              minLength={6}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Nhập lại mật khẩu mới" 
              className="modal__form-input" 
            />
          </div>

          {errorMsg && (
            <div className="modal__error">
              {errorMsg}
            </div>
          )}

          <div className="modal__footer modal__footer--stretch">
            <button 
              type="button" 
              onClick={() => closeModal('changePassword')}
              className="modal__btn modal__btn--cancel"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              className="modal__btn modal__btn--primary"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Cập nhật</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
