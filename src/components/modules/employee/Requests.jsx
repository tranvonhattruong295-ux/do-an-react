import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Requests() {
  const { currentUser, leaveRequests, setLeaveRequests, adjustRequests, setAdjustRequests, addToast } = useAuth();
  const [requestType, setRequestType] = useState('leave');
  const [date, setDate] = useState('16/11/2026');
  const [reason, setReason] = useState('Xin nghỉ phép cá nhân 01 ngày');

  const myLeaves = leaveRequests.filter(r => r.empCode === currentUser?.empCode);
  const myAdjusts = adjustRequests.filter(r => r.empCode === currentUser?.empCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requestType === 'leave') {
      const newLeave = {
        id: `NP-${100 + leaveRequests.length + 1}`,
        empCode: currentUser.empCode,
        empName: currentUser.userName,
        dept: currentUser.dept,
        date: date,
        days: 1,
        reason: reason,
        status: 'Chờ Quản lý duyệt',
        approverNote: ''
      };
      setLeaveRequests(prev => [newLeave, ...prev]);
      addToast('Đã gửi đơn nghỉ phép', 'Đơn đã được chuyển đến Người quản lý phòng ban để phê duyệt.', 'emerald');
    } else {
      const newAdjust = {
        id: `ĐC-${200 + adjustRequests.length + 1}`,
        empCode: currentUser.empCode,
        empName: currentUser.userName,
        dept: currentUser.dept,
        date: date,
        requestedTime: '08:00:00',
        reason: reason,
        status: 'Chờ Quản lý duyệt',
        approverNote: ''
      };
      setAdjustRequests(prev => [newAdjust, ...prev]);
      addToast('Đã gửi giải trình công', 'Đơn xin điều chỉnh giờ công đã được gửi tới Quản lý.', 'emerald');
    }
  };

  return (
    <div className="requests-module">
      <div className="requests-module__form-col hr-card rounded-2xl p-6">
        <h3 className="requests-module__title">Tạo Đơn Từ & Giải Trình Mới</h3>
        <p className="requests-module__desc">
          Đơn sau khi gửi sẽ chuyển đến Trưởng phòng duyệt. Nhân viên không được tự ý duyệt đơn của chính mình.
        </p>

        <form onSubmit={handleSubmit} className="requests-module__form">
          <div className="requests-module__group">
            <label className="requests-module__label">Loại đề xuất</label>
            <select 
              value={requestType} 
              onChange={(e) => setRequestType(e.target.value)}
              className="requests-module__select"
            >
              <option value="leave">Đơn xin Nghỉ phép (Phép năm / Ốm)</option>
              <option value="adjust">Đơn giải trình Quên chấm công / Đi công tác</option>
            </select>
          </div>

          <div className="requests-module__group">
            <label className="requests-module__label">Ngày áp dụng</label>
            <input 
              type="text" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="requests-module__input" 
            />
          </div>

          <div className="requests-module__group">
            <label className="requests-module__label">Lý do chi tiết</label>
            <textarea 
              rows={3} 
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="requests-module__textarea" 
            />
          </div>

          <button 
            type="submit" 
            className="requests-module__btn-submit"
          >
            Gửi Đơn Lên Quản Lý Phê Duyệt
          </button>
        </form>
      </div>

      <div className="requests-module__list-col hr-card rounded-2xl p-6">
        <h3 className="requests-module__title">Trạng Thái Đơn Từ Cá Nhân Đã Gửi</h3>
        <p className="requests-module__desc">
          Dữ liệu đồng bộ trực tiếp với phòng Quản lý để đảm bảo bảng chấm công được đối soát kịp thời.
        </p>

        <div className="requests-module__card-list">
          {myLeaves.map((r, idx) => (
            <div key={idx} className="requests-module__item-card">
              <div className="requests-module__item-info">
                <div className="requests-module__item-top">
                  <span className="requests-module__item-code">{r.id}</span>
                  <span className="font-bold text-slate-900">Nghỉ phép: {r.days} ngày</span>
                  <span className="text-slate-500">• Ngày {r.date}</span>
                </div>
                <div className="text-slate-600 mt-1">Lý do: "{r.reason}"</div>
                {r.approverNote && (
                  <div className="text-emerald-700 font-medium text-[11px] mt-1">
                    <i className="fa-solid fa-circle-check mr-1"></i>{r.approverNote}
                  </div>
                )}
              </div>
              <span className={`requests-module__status-pill ${
                r.status === 'Đã phê duyệt' 
                  ? 'requests-module__status-pill--approved' 
                  : r.status === 'Từ chối'
                  ? 'requests-module__status-pill--rejected'
                  : 'requests-module__status-pill--pending'
              }`}>
                {r.status}
              </span>
            </div>
          ))}

          {myAdjusts.map((r, idx) => (
            <div key={idx} className="requests-module__item-card">
              <div className="requests-module__item-info">
                <div className="requests-module__item-top">
                  <span className="requests-module__item-code">{r.id}</span>
                  <span className="font-bold text-slate-900">Điều chỉnh giờ vào: {r.requestedTime}</span>
                  <span className="text-slate-500">• Ngày {r.date}</span>
                </div>
                <div className="text-slate-600 mt-1">Giải trình: "{r.reason}"</div>
                {r.approverNote && (
                  <div className="text-emerald-700 font-medium text-[11px] mt-1">
                    <i className="fa-solid fa-circle-check mr-1"></i>{r.approverNote}
                  </div>
                )}
              </div>
              <span className={`requests-module__status-pill ${
                r.status === 'Đã phê duyệt' 
                  ? 'requests-module__status-pill--approved' 
                  : r.status === 'Từ chối'
                  ? 'requests-module__status-pill--rejected'
                  : 'requests-module__status-pill--pending'
              }`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
