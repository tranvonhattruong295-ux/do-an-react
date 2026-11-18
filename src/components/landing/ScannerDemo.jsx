import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ScannerDemo() {
  const { addToast } = useAuth();
  const [scenario, setScenario] = useState('normal');

  const scenarios = {
    normal: {
      badgeText: 'Khuôn mặt thật (Pass)',
      badgeType: 'normal',
      iconClass: 'fa-solid fa-user-tie text-blue-600',
      tickIcon: 'fa-check',
      label: 'Nguyễn Văn An (NV001) • Độ khớp 99.6%',
      subType: 'normal',
      subIcon: 'fa-circle-check',
      subText: 'Đã ghi nhận giờ VÀO ca sáng: 07:55:10'
    },
    liveness: {
      badgeText: 'Chặn giả mạo (Spoof)',
      badgeType: 'liveness',
      iconClass: 'fa-solid fa-mobile-screen-button text-rose-500',
      tickIcon: 'fa-xmark',
      label: 'Cảnh báo: Phát hiện ảnh chụp / video phát lại',
      subType: 'liveness',
      subIcon: 'fa-triangle-exclamation',
      subText: 'Từ chối chấm công và ghi nhật ký cảnh báo an ninh'
    },
    backup: {
      badgeText: 'Dự phòng QR/OTP',
      badgeType: 'backup',
      iconClass: 'fa-solid fa-qrcode text-amber-600',
      tickIcon: 'fa-rotate',
      label: 'Mã QR Dự phòng • Nguyễn Văn An (NV001)',
      subType: 'backup',
      subIcon: 'fa-clock',
      subText: 'Đã ghi nhận chấm công dự phòng và đồng bộ bảng công'
    }
  };

  const current = scenarios[scenario];

  const handleTest = (type) => {
    setScenario(type);
    if (type === 'normal') {
      addToast('Chấm công thành công', 'Khuôn mặt khớp 99.6% và vượt qua kiểm tra thực thể sống 3D.', 'emerald');
    } else if (type === 'liveness') {
      addToast('Đã chặn giả mạo Liveness', 'Hệ thống phát hiện ảnh phẳng 2D và không ghi nhận công.', 'rose');
    } else {
      addToast('Chấm công dự phòng', 'Đã ghi nhận qua mã QR nội bộ khi camera bảo trì.', 'amber');
    }
  };

  return (
    <div id="section-checkin-demo" className="demo-scanner">
      <div className="demo-scanner__header">
        <div className="demo-scanner__dots">
          <span className="demo-scanner__dot demo-scanner__dot--rose"></span>
          <span className="demo-scanner__dot demo-scanner__dot--amber"></span>
          <span className="demo-scanner__dot demo-scanner__dot--emerald"></span>
          <span className="demo-scanner__title">Mô Phỏng AI Face Scanner</span>
        </div>
        <span className={`demo-scanner__badge demo-scanner__badge--${current.badgeType}`}>
          {current.badgeText}
        </span>
      </div>

      <div className="demo-scanner__viewport">
        <div className="demo-scanner__circle-wrap">
          <div className={`demo-scanner__circle demo-scanner__circle--${current.badgeType} animate-float`}>
            <i className={`${current.iconClass} demo-scanner__icon`}></i>
            <div className={`demo-scanner__tick demo-scanner__tick--${current.badgeType}`}>
              <i className={`fa-solid ${current.tickIcon}`}></i>
            </div>
          </div>
        </div>

        <div className="demo-scanner__label">
          {current.label}
        </div>
        <div className={`demo-scanner__subtext demo-scanner__subtext--${current.subType}`}>
          <i className={`fa-solid ${current.subIcon} mr-1`}></i>
          {current.subText}
        </div>
      </div>

      <div className="demo-scanner__footer">
        <div className="demo-scanner__footer-title">Thử nghiệm các tình huống kiểm tra AI:</div>
        <div className="demo-scanner__tabs">
          <button 
            type="button" 
            onClick={() => handleTest('normal')}
            className={`demo-scanner__tab ${scenario === 'normal' ? 'demo-scanner__tab--normal-active' : 'demo-scanner__tab--normal-inactive'}`}
          >
            1. Quét hợp lệ
          </button>
          <button 
            type="button" 
            onClick={() => handleTest('liveness')}
            className={`demo-scanner__tab ${scenario === 'liveness' ? 'demo-scanner__tab--liveness-active' : 'demo-scanner__tab--liveness-inactive'}`}
          >
            2. Chặn giả mạo
          </button>
          <button 
            type="button" 
            onClick={() => handleTest('backup')}
            className={`demo-scanner__tab ${scenario === 'backup' ? 'demo-scanner__tab--backup-active' : 'demo-scanner__tab--backup-inactive'}`}
          >
            3. Dự phòng QR
          </button>
        </div>
      </div>
    </div>
  );
}
