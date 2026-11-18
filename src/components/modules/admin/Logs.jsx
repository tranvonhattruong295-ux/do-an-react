import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Logs() {
  const { currentUser, systemLogs, setSystemLogs, addToast } = useAuth();

  const handleBackup = () => {
    const now = new Date().toLocaleTimeString('vi-VN');
    const newLog = {
      time: now,
      actor: currentUser?.empCode || 'AD001',
      event: 'Quản trị viên thực hiện sao lưu toàn bộ cơ sở dữ liệu hệ thống thành công.'
    };
    setSystemLogs(prev => [newLog, ...prev]);
    addToast('Sao lưu thành công', `Bản sao lưu dữ liệu toàn hệ thống đã tạo lúc ${now}.`, 'emerald');
  };

  return (
    <div className="hr-card rounded-2xl p-6 admin-logs">
      <div className="admin-logs__header">
        <div>
          <h3 className="admin-logs__title">Nhật Ký Kiểm Toán Hệ Thống & Sao Lưu Dữ Liệu</h3>
          <p className="admin-logs__desc">
            Quản trị viên theo dõi cảnh báo an ninh thời gian thực và đảm bảo tính sẵn sàng của dữ liệu.
          </p>
        </div>
        <button 
          type="button" 
          onClick={handleBackup}
          className="admin-logs__btn-backup"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <span>Tạo Bản Sao Lưu Ngay</span>
        </button>
      </div>

      <div className="admin-logs__list">
        {systemLogs.map((l, idx) => (
          <div key={idx} className="admin-logs__item">
            <div className="admin-logs__icon-box">
              <i className={l.event.includes('Cảnh báo') ? 'fa-solid fa-triangle-exclamation text-rose-600' : 'fa-solid fa-server text-blue-600'}></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{l.actor}</span>
                <span className="text-[11px] text-slate-400">• {l.time}</span>
              </div>
              <div className={`mt-0.5 leading-relaxed ${l.event.includes('Cảnh báo') ? 'text-rose-700 font-semibold' : 'text-slate-600'}`}>
                {l.event}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
