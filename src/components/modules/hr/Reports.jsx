import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Reports() {
  const { attendanceLogs, leaveRequests, adjustRequests, timesheetLocked, setTimesheetLocked, addToast } = useAuth();

  const approvedLeaves = leaveRequests.filter(r => r.status === 'Đã phê duyệt').length;
  const approvedAdjusts = adjustRequests.filter(r => r.status === 'Đã phê duyệt').length;

  const handleToggleLock = () => {
    setTimesheetLocked(prev => !prev);
    if (!timesheetLocked) {
      addToast('Đã chốt công & xuất báo cáo', 'Bộ phận Nhân sự đã khóa bảng công tháng 11 và tạo file đối soát lương.', 'emerald');
    } else {
      addToast('Đã mở khóa bảng công', 'Đã mở khóa để tiếp tục kiểm tra điều chỉnh.', 'blue');
    }
  };

  return (
    <div className="hr-card rounded-2xl p-6 hr-reports">
      <div className="hr-reports__header">
        <div>
          <h3 className="hr-reports__title">
            Tổng Hợp Chấm Công Toàn Công Ty & Xuất Báo Cáo Tính Lương
          </h3>
          <p className="hr-reports__desc">
            Bộ phận Nhân sự tổng hợp dữ liệu FaceID, đối soát các đơn đã được Quản lý duyệt và tiến hành chốt bảng công chính thức.
          </p>
        </div>
        <button 
          type="button" 
          onClick={handleToggleLock}
          className={`hr-reports__btn-lock ${
            timesheetLocked ? 'hr-reports__btn-lock--locked' : 'hr-reports__btn-lock--open'
          }`}
        >
          <i className={`fa-solid ${timesheetLocked ? 'fa-lock' : 'fa-file-export'}`}></i>
          <span>{timesheetLocked ? 'Đã Chốt Công & Xuất File (Khóa)' : 'Chốt Bảng Công Tháng 11 & Xuất Báo Cáo'}</span>
        </button>
      </div>

      <div className="hr-reports__stat-grid">
        <div className="hr-reports__stat-card">
          <span className="hr-reports__stat-label">Tổng lượt chấm công ghi nhận</span>
          <div className="hr-reports__stat-value">{attendanceLogs.length} lượt</div>
        </div>
        <div className="hr-reports__stat-card">
          <span className="hr-reports__stat-label">Đơn từ hợp lệ đã duyệt</span>
          <div className="hr-reports__stat-value hr-reports__stat-value--emerald">{approvedLeaves + approvedAdjusts} đơn</div>
        </div>
        <div className="hr-reports__stat-card">
          <span className="hr-reports__stat-label">Trạng thái kỳ công tháng</span>
          <div className={`text-lg font-black mt-1 ${timesheetLocked ? 'hr-reports__stat-value--emerald' : 'hr-reports__stat-value--amber'}`}>
            {timesheetLocked ? 'Đã khóa sổ & Xuất file' : 'Đang mở đối soát'}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 whitespace-nowrap">
              <th className="py-3 px-4 font-semibold">Nhân viên</th>
              <th className="py-3 px-4 font-semibold">Phòng ban</th>
              <th className="py-3 px-4 font-semibold">Ngày</th>
              <th className="py-3 px-4 font-semibold">Giờ Vào</th>
              <th className="py-3 px-4 font-semibold">Phương thức</th>
              <th className="py-3 px-4 font-semibold">Kết quả FaceID</th>
              <th className="py-3 px-4 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70">
            {attendanceLogs.map((l, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70">
                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{l.empName} ({l.empCode})</td>
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{l.dept}</td>
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{l.date}</td>
                <td className="py-3 px-4 font-semibold text-blue-600 whitespace-nowrap">{l.checkIn}</td>
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{l.method}</td>
                <td className="py-3 px-4 text-emerald-600 font-medium whitespace-nowrap">{l.liveness}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    l.status.includes('Đúng')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
