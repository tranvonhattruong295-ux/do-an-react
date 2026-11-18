import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Leave() {
  const { currentUser, leaveRequests, setLeaveRequests, addToast } = useAuth();

  const handleDecision = (id, newStatus) => {
    setLeaveRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          approverNote: `Duyệt bởi Trưởng phòng: ${currentUser?.userName}`
        };
      }
      return req;
    }));
    addToast('Xử lý đơn nghỉ phép', `Đã chuyển trạng thái đơn ${id} thành "${newStatus}".`, newStatus === 'Đã phê duyệt' ? 'emerald' : 'rose');
  };

  return (
    <div className="hr-card rounded-2xl p-6 manager-card">
      <div className="manager-card__header">
        <h3 className="manager-card__title">
          Danh Sách Đơn Xin Nghỉ Phép Cần Phê Duyệt ({currentUser?.dept})
        </h3>
        <p className="manager-card__desc">
          Thẩm quyền dành riêng cho <strong>Người Quản lý</strong> ({currentUser?.userName}). Kết quả phê duyệt sẽ trả về ngay cho Nhân viên và HR.
        </p>
      </div>

      <div className="manager-card__requests-list">
        {leaveRequests.map((req, idx) => (
          <div key={idx} className="manager-card__request-item">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{req.id}</span>
                <span className="font-bold text-slate-900 text-sm">{req.empName} ({req.empCode})</span>
                <span className="text-slate-500">• {req.dept}</span>
              </div>
              <div className="text-slate-700 font-medium">
                Xin nghỉ: <strong className="text-blue-700">{req.days} ngày</strong> vào ngày <strong>{req.date}</strong>
              </div>
              <div className="text-slate-500 italic">Lý do: "{req.reason}"</div>
              {req.approverNote && (
                <div className="text-emerald-700 font-medium text-[11px] pt-1">
                  <i className="fa-solid fa-circle-check mr-1"></i>{req.approverNote}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {req.status === 'Chờ Quản lý duyệt' ? (
                <>
                  <button 
                    type="button" 
                    onClick={() => handleDecision(req.id, 'Đã phê duyệt')}
                    className="manager-card__btn-approve"
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>Phê duyệt</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDecision(req.id, 'Từ chối')}
                    className="manager-card__btn-reject"
                  >
                    <i className="fa-solid fa-xmark"></i>
                    <span>Từ chối</span>
                  </button>
                </>
              ) : (
                <span className={`px-3 py-1.5 rounded-full font-bold border ${
                  req.status === 'Đã phê duyệt' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {req.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
