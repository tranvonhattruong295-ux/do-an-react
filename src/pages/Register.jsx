import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Toast from '../components/common/Toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { users, setUsers, employees, setEmployees, addToast } = useAuth();

  const [companyCode, setCompanyCode] = useState('CT1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Phòng Kỹ thuật & Công nghệ');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [faceConsent, setFaceConsent] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [registeredInfo, setRegisteredInfo] = useState(null);

  const getPlaceholderByDept = (selectedDept) => {
    switch (selectedDept) {
      case 'Phòng Kỹ thuật & Công nghệ':
        return 'ví dụ: Kỹ sư Phần mềm / QA Tester';
      case 'Phòng Tài chính - Kế toán':
        return 'ví dụ: Kế toán Tổng hợp / Thu chi';
      case 'Phòng Kinh doanh & Tiếp thị':
        return 'ví dụ: Chuyên viên Kinh doanh / Marketing';
      case 'Phòng Vận hành & Dịch vụ':
        return 'ví dụ: Chuyên viên Hỗ trợ Vận hành';
      default:
        return 'ví dụ: Chuyên viên chuyên môn';
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanCompanyCode = (companyCode || '').trim().toUpperCase();
    if (!cleanCompanyCode) {
      setErrorMsg('Vui lòng nhập mã công ty để xác định doanh nghiệp bạn gia nhập!');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setErrorMsg('Email này đã được đăng ký trên hệ thống! Vui lòng đăng nhập.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const nvList = (employees || [])
        .filter(emp => emp && emp.code && emp.code.startsWith('NV'))
        .map(emp => parseInt(emp.code.replace('NV', ''), 10))
        .filter(n => !isNaN(n));

      const maxNum = nvList.length > 0 ? Math.max(...nvList) : 0;
      const nextNum = maxNum + 1;
      const nextCode = `NV${nextNum < 10 ? '00' + nextNum : nextNum < 100 ? '0' + nextNum : nextNum}`;

      const newUser = {
        email: cleanEmail,
        code: nextCode,
        name: name.trim(),
        password: password,
        dept: dept,
        role: 'employee',
        accountStatus: 'Chờ duyệt',
        companyCode: cleanCompanyCode,
        registeredAt: new Date().toLocaleDateString('vi-VN')
      };

      const newEmp = {
        code: nextCode,
        name: name.trim(),
        dept: dept,
        title: title.trim() || 'Nhân viên chuyên trách',
        shift: 'Ca Hành chính (08:00 - 17:30)',
        faceEnrolled: faceConsent,
        role: 'employee',
        accountStatus: 'Chờ duyệt',
        companyCode: cleanCompanyCode,
        email: cleanEmail,
        registeredAt: new Date().toLocaleDateString('vi-VN')
      };

      setUsers(prev => {
        const nextUsers = [...(Array.isArray(prev) ? prev : []), newUser];
        try {
          localStorage.setItem('lotushr_users', JSON.stringify(nextUsers));
        } catch {}
        return nextUsers;
      });

      setEmployees(prev => {
        const nextEmps = [...(Array.isArray(prev) ? prev : []), newEmp];
        try {
          localStorage.setItem('lotushr_employees', JSON.stringify(nextEmps));
        } catch {}
        return nextEmps;
      });

      setRegisteredInfo({
        name: name.trim(),
        code: nextCode,
        dept: dept,
        email: cleanEmail,
        companyCode: cleanCompanyCode
      });

      setLoading(false);
      setSubmittedSuccess(true);
      addToast('Đã gửi hồ sơ thành công', `Hồ sơ đã được chuyển đến HR công ty ${cleanCompanyCode} để phê duyệt.`, 'teal');
    }, 450);
  };

  const handleResetForm = () => {
    setSubmittedSuccess(false);
    setName('');
    setEmail('');
    setTitle('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
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
            to="/login" 
            className="auth-page__btn-switch"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Đã có tài khoản? Đăng nhập</span>
          </Link>
        </div>
      </header>

      <main className="auth-page__main">
        <div 
          className="auth-card"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <div className="auth-card__sidebar auth-card__sidebar--register">
            <div className="auth-card__sidebar-info">
              <span className="auth-card__badge">
                Cổng Đăng Ký Nhân Viên Mới
              </span>
              <h1 className="auth-card__sidebar-title">
                Gia Nhập Doanh Nghiệp LotusHR FaceID
              </h1>
              <p className="auth-card__sidebar-desc">
                Tự nhập mã công ty để định danh doanh nghiệp, đăng ký thông tin cá nhân và gửi hồ sơ để Bộ phận Nhân sự (HR) phê duyệt.
              </p>
            </div>

            <div className="auth-card__checklist">
              <div className="auth-card__check-item">
                <i className="fa-solid fa-building-circle-check text-amber-300"></i>
                <span>Tùy chọn nhập mã công ty linh hoạt</span>
              </div>
              <div className="auth-card__check-item">
                <i className="fa-solid fa-circle-check text-emerald-300"></i>
                <span>Tự động cấp mã định danh Nhân viên (NV...)</span>
              </div>
              <div className="auth-card__check-item">
                <i className="fa-solid fa-user-check text-teal-300"></i>
                <span>Hồ sơ chuyển đến tài khoản HR phê duyệt</span>
              </div>
              <div className="auth-card__check-item">
                <i className="fa-solid fa-shield-halved text-amber-300"></i>
                <span>Quản lý, HR & Admin do hệ thống cấp riêng</span>
              </div>
            </div>
          </div>

          <div className="auth-card__body">
            {submittedSuccess && registeredInfo ? (
              <div className="auth-card__success-box">
                <div className="auth-card__success-icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                
                <div className="auth-card__success-text">
                  <h2 className="auth-card__success-title">Gửi Hồ Sơ Thành Công!</h2>
                  <p className="auth-card__success-desc">
                    Hồ sơ của bạn đã được chuyển đến tài khoản của <strong>Bộ phận Nhân sự (HR)</strong> thuộc công ty <strong>{registeredInfo.companyCode}</strong> để kiểm tra và phê duyệt.
                  </p>
                </div>

                <div className="auth-card__success-details">
                  <div className="auth-card__success-row">
                    <span className="auth-card__success-label">Mã doanh nghiệp:</span>
                    <span className="auth-card__success-code-pill">
                      {registeredInfo.companyCode}
                    </span>
                  </div>
                  <div className="auth-card__success-row">
                    <span className="auth-card__success-label">Họ và tên nhân viên:</span>
                    <span className="auth-card__success-val">{registeredInfo.name}</span>
                  </div>
                  <div className="auth-card__success-row">
                    <span className="auth-card__success-label">Mã nhân viên dự kiến:</span>
                    <span className="auth-card__success-emp-pill">{registeredInfo.code}</span>
                  </div>
                  <div className="auth-card__success-row">
                    <span className="auth-card__success-label">Phòng ban đăng ký:</span>
                    <span className="auth-card__success-val" style={{ fontWeight: 600 }}>{registeredInfo.dept}</span>
                  </div>
                  <div className="auth-card__success-row auth-card__success-row--last">
                    <span className="auth-card__success-label">Trạng thái phê duyệt:</span>
                    <span className="auth-card__success-status-tag">
                      <i className="fa-solid fa-hourglass-half fa-spin text-amber-500"></i>
                      <span>Chờ HR duyệt vào công ty</span>
                    </span>
                  </div>
                </div>

                <div className="auth-card__success-note">
                  <i className="fa-solid fa-circle-info text-amber-600 mt-0.5"></i>
                  <span>Bạn có thể thông báo người phụ trách HR đăng nhập vào LotusHR để duyệt hồ sơ của bạn vào công ty.</span>
                </div>

                <div className="auth-card__success-actions">
                  <Link 
                    to="/login"
                    className="auth-card__btn-go-login"
                  >
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>Tới trang Đăng nhập</span>
                  </Link>
                  <button 
                    type="button" 
                    onClick={handleResetForm}
                    className="auth-card__btn-reset"
                  >
                    Đăng ký hồ sơ khác
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="auth-card__header">
                  <h2 className="auth-card__title">Đăng ký hồ sơ nhân viên mới</h2>
                  <p className="auth-card__subtitle">Nhập mã công ty và điền thông tin để chuyển hồ sơ đến HR duyệt.</p>
                </div>

                <div className="auth-card__flow-box">
                  <i className="fa-solid fa-building-circle-check text-teal-600 mt-0.5 text-xs"></i>
                  <div>
                    <strong>Quy trình gia nhập:</strong> Tài khoản sau khi đăng ký sẽ chuyển thẳng vào danh sách <strong>Chờ HR duyệt</strong>. Sau khi HR phê duyệt, bạn có thể đăng nhập điểm danh.
                  </div>
                </div>

                <form onSubmit={handleRegister} className="auth-form">
                  <div className="auth-form__group">
                    <label className="auth-form__label">Mã công ty doanh nghiệp *</label>
                    <input 
                      type="text" 
                      required 
                      value={companyCode}
                      onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
                      placeholder="Nhập mã công ty (ví dụ: CT1, CT2...)" 
                      className="auth-form__input auth-form__input--code"
                    />
                  </div>

                  <div className="auth-form__grid-2">
                    <div className="auth-form__group">
                      <label className="auth-form__label">Họ và tên *</label>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ví dụ: Nguyễn Hoàng Long" 
                        className="auth-form__input"
                      />
                    </div>
                    <div className="auth-form__group">
                      <label className="auth-form__label">Email cá nhân / liên hệ *</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ví dụ: hoanglong@gmail.com" 
                        className="auth-form__input"
                      />
                    </div>
                  </div>

                  <div className="auth-form__grid-2">
                    <div className="auth-form__group">
                      <label className="auth-form__label">Phòng ban trực thuộc *</label>
                      <select 
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        className="auth-form__select"
                      >
                        <option value="Phòng Kỹ thuật & Công nghệ">Phòng Kỹ thuật & Công nghệ</option>
                        <option value="Phòng Tài chính - Kế toán">Phòng Tài chính - Kế toán</option>
                        <option value="Phòng Kinh doanh & Tiếp thị">Phòng Kinh doanh & Tiếp thị</option>
                        <option value="Phòng Vận hành & Dịch vụ">Phòng Vận hành & Dịch vụ</option>
                      </select>
                    </div>
                    <div className="auth-form__group">
                      <label className="auth-form__label">Chức danh / Vị trí</label>
                      <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={getPlaceholderByDept(dept)} 
                        className="auth-form__input"
                      />
                    </div>
                  </div>

                  <div className="auth-form__grid-2">
                    <div className="auth-form__group">
                      <label className="auth-form__label">Mật khẩu * (Tối thiểu 6 ký tự)</label>
                      <input 
                        type="password" 
                        required 
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu" 
                        className="auth-form__input"
                      />
                    </div>
                    <div className="auth-form__group">
                      <label className="auth-form__label">Xác nhận mật khẩu *</label>
                      <input 
                        type="password" 
                        required 
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu" 
                        className="auth-form__input"
                      />
                    </div>
                  </div>

                  <div style={{ paddingTop: '0.25rem' }}>
                    <label className="auth-form__checkbox auth-form__checkbox--consent">
                      <input 
                        type="checkbox" 
                        checked={faceConsent}
                        onChange={(e) => setFaceConsent(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 mt-0.5" 
                      />
                      <span>
                        Tôi đồng ý đăng ký dữ liệu khuôn mặt 3D sinh trắc học để phục vụ việc điểm danh tự động.
                      </span>
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
                    className="auth-form__btn-submit auth-form__btn-submit--teal"
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Đang gửi hồ sơ đến HR...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i>
                        <span>Gửi hồ sơ đăng ký gia nhập công ty</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-card__footer">
                  Đã có tài khoản?{' '}
                  <Link to="/login" className="auth-card__footer-link">
                    Đăng nhập ngay
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Toast />
    </div>
  );
}
