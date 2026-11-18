import React from 'react';

export default function History({ logs }) {
  return (
    <div className="lg:col-span-6 hr-card rounded-2xl p-6 checkin-history">
      <div className="checkin-history__header">
        <h3 className="checkin-history__title">Lịch sử Chấm công Cá nhân Gần đây</h3>
        <span className="checkin-history__counter">
          {logs.length} lượt
        </span>
      </div>

      <div className="checkin-history__list">
        {logs.length > 0 ? (
          logs.map((log, idx) => (
            <div key={idx} className="checkin-history__item">
              <div className="flex items-center gap-3">
                {log.snapshot ? (
                  <img src={log.snapshot} alt="Face Scan" className="checkin-history__thumb-img" />
                ) : (
                  <div className="checkin-history__thumb-box">
                    <i className="fa-solid fa-camera"></i>
                  </div>
                )}
                <div className="checkin-history__meta">
                  <div className="checkin-history__main-line">
                    Ngày {log.date} • Giờ vào: <span className="checkin-history__time">{log.checkIn}</span>
                  </div>
                  <div className="checkin-history__sub-line">{log.method} • {log.liveness}</div>
                </div>
              </div>
              <span className={`checkin-history__status-pill ${
                log.status.includes('Đúng') 
                  ? 'checkin-history__status-pill--ontime' 
                  : 'checkin-history__status-pill--late'
              }`}>
                {log.status}
              </span>
            </div>
          ))
        ) : (
          <div className="checkin-history__empty">
            Chưa có lượt chấm công nào trong phiên làm việc.
          </div>
        )}
      </div>
    </div>
  );
}
