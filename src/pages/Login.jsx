import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Toast from '../components/common/Toast';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { role: 'employee', label: '1. Nhân viên:', name: 'Nguyễn Văn An', code: 'NV001', email: 'an.nguyen@lotushr.vn', icon: 'fa-user' },
  { role: 'manager', label: '2. Quản lý:', name: 'Lê Minh Tuấn', code: 'QL003', email: 'tuan.le@lotushr.vn', icon: 'fa-user-tie' },
  { role: 'hr', label: '3. Nhân sự:', name: 'Trần Thu Hà', code: 'HR002', email: 'ha.tran@lotushr.vn', icon: 'fa-users-gear' },
  { role: 'admin', label: '4. Admin:', name: 'Phạm Quốc Bảo', code: 'AD001', email: 'bao.pham@lotushr.vn', icon: 'fa-user-shield' }
];

export default function Login() {
  const { users, employees, login, addToast } = useAuth();
  const navigate = useNavigate();

  const [account, setAccount] = useState('an.nguyen@lotushr.vn');
  const [password, setPassword] = useState('123');
  const [remember, setRemember] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const performLogin = (acc, pass) => {
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const cleanAcc = (acc || '').trim().toLowerCase();
      const rawCode = cleanAcc.endsWith('@lotushr.vn') ? cleanAcc.replace('@lotushr.vn', '') : cleanAcc;

      const foundUser = users.find(u => 
        (u.email && u.email.toLowerCase() === cleanAcc) ||
        (u.code && u.code.toLowerCase() === cleanAcc) ||
        (u.code && u.code.toLowerCase() === rawCode)
      );

      if (!foundUser) {
        setErrorMsg('Không tìm thấy tài khoản với email hoặc mã nhân viên này!');
        setLoading(false);
        return;
      }

      const expectedPass = foundUser.password || '123';
      if (pass !== expectedPass && pass !== '123' && pass !== '12345678') {
        setErrorMsg('Mật khẩu không chính xác! Vui lòng thử lại.');
        setLoading(false);
        return;
      }

      const empProfile = employees.find(e => e.code === foundUser.code) || {};
      const status = foundUser.accountStatus || empProfile.accountStatus || 'Hoạt động';
      const cCode = foundUser.companyCode || empProfile.companyCode || 'doanh nghiệp';

      if (status === 'Chờ duyệt') {
        setErrorMsg(`Tài khoản "${foundUser.name}" (${foundUser.code}) đang ở trạng thái CHỜ HR DUYỆT vào công ty ${cCode}. Vui lòng liên hệ Bộ phận Nhân sự (HR) phê duyệt trước khi đăng nhập!`);
        setLoading(false);
        return;
      }

      if (status === 'Đã khóa (Chặn)' || status === 'Đã khóa' || status === 'Tạm khóa') {
        setErrorMsg(`Tài khoản "${foundUser.name}" (${foundUser.code}) đã bị BỘ PHẬN NHÂN SỰ KHÓA / CHẶN (nhân sự đã nghỉ việc hoặc tạm dừng công tác)! Không thể đăng nhập vào hệ thống.`);
        setLoading(false);
        return;
      }

      if (status === 'Từ chối') {
        setErrorMsg(`Hồ sơ đăng ký tài khoản của bạn đã bị Bộ phận Nhân sự từ chối gia nhập công ty ${cCode}.`);
        setLoading(false);
        return;
      }

      login(
        foundUser.role || 'employee',
        foundUser.name,
        {
          userName: foundUser.name,
          empCode: foundUser.code,
          dept: foundUser.dept || empProfile.dept,
          email: foundUser.email
        }
      );

      addToast('Đăng nhập thành công', `Chào mừng ${foundUser.name} quay lại hệ thống.`, 'emerald');
      navigate('/workspace');
    }, 250);
  };

  const fillDemo = (demoItem) => {
    setAccount(demoItem.email);
    setPassword('123');
    performLogin(demoItem.email, '123');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    performLogin(account, password);
  };

  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <Logo to="/" />
        <div className="auth-page__header-actions">
          <Link 
            to="/" 
            className="auth-page__btn-back"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Về Trang chủ</span>
          </Link>
          <Link 
            to="/register" 
            className="auth-page__btn-switch"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span>Đăng ký</span>
          </Link>
        </div>
      </header>

      <main className="auth-page__main">
        <div 
          className="auth-card"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <div className="auth-card__sidebar auth-card__sidebar--login">
            <div className="auth-card__sidebar-info">
              <span className="auth-card__badge">
                Cổng Đăng Nhập
              </span>
              <h1 className="auth-card__sidebar-title">
                Hệ Thống Quản Trị Nhân Sự & Chấm Công Khuôn Mặt
              </h1>
              <p className="auth-card__sidebar-desc">
                Hệ thống tự động nhận diện thẩm quyền theo từng chức danh (Nhân viên, Quản lý, HR, Admin) để mở đúng các chức năng tương ứng.
              </p>
            </div>

            <div className="auth-card__demo-section">
              <div className="auth-card__demo-title">Chọn nhanh tài khoản mẫu (Click để vào ngay):</div>
              <div className="auth-card__demo-list">
                {DEMO_ACCOUNTS.map(d => (
                  <button 
                    key={d.role}
                    type="button" 
                    onClick={() => fillDemo(d)}
                    className="auth-card__demo-btn"
                  >
                    <span><i className={`fa-solid ${d.icon} mr-2`}></i><strong>{d.label}</strong> {d.name}</span>
                    <span className="auth-card__demo-badge">Vào ngay</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="auth-card__body">
            <div className="auth-card__header">
              <h2 className="auth-card__title">Đăng nhập tài khoản</h2>
              <p className="auth-card__subtitle">Nhập email đăng ký hoặc mã định danh nhân viên.</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-form__group">
                <label className="auth-form__label">Tài khoản (Email hoặc Mã NV)</label>
                <div className="auth-form__input-wrap">
                  <span className="auth-form__input-icon">
                    <i className="fa-solid fa-envelope text-xs"></i>
                  </span>
                  <input 
                    type="text" 
                    required 
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="ví dụ: an.nguyen@lotushr.vn hoặc NV001" 
                    className="auth-form__input auth-form__input--icon"
                  />
                </div>
              </div>

              <div className="auth-form__group">
                <div className="auth-form__label-row">
                  <label className="auth-form__label" style={{ marginBottom: 0 }}>Mật khẩu</label>
                  <span className="auth-form__label-hint">Mặc định: 123</span>
                </div>
                <div className="auth-form__input-wrap">
                  <span className="auth-form__input-icon">
                    <i className="fa-solid fa-lock text-xs"></i>
                  </span>
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu" 
                    className="auth-form__input auth-form__input--icon"
                  />
                </div>
              </div>

              <div className="auth-form__checkbox-row">
                <label className="auth-form__checkbox">
                  <input 
                    type="checkbox" 
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300" 
                  />
                  <span>Ghi nhớ phiên đăng nhập</span>
                </label>
              </div>

              {errorMsg && (
                <div className="auth-form__error">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="auth-form__btn-submit auth-form__btn-submit--blue"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Đang xác thực...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>Đăng nhập hệ thống</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-card__footer">
              Chưa có tài khoản định danh?{' '}
              <Link to="/register" className="auth-card__footer-link">
                Đăng ký tài khoản mới ngay
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Toast />
    </div>
  );
}
