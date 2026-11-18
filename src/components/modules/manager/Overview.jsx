import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Overview() {
  const { currentUser, employees, attendanceLogs } = useAuth();
  
  const deptMembers = employees.filter(e => e.dept === currentUser?.dept);
  const deptLogs = attendanceLogs.filter(l => l.dept === currentUser?.dept);

  return (
    <div className="space-y-6">
      <div className="hr-card rounded-2xl p-6 manager-card">
        <div className="manager-card__header">
          <h3 className="manager-card__title">
            Dữ Liệu Nhân Sự & Chấm Công Thuộc: {currentUser?.dept}
          </h3>
          <p className="manager-card__desc">
            Người quản lý chỉ xem được nhân sự thuộc phòng ban mình phụ trách (Chế độ xem — việc thêm/xóa hồ sơ gốc thuộc về HR).
          </p>
        </div>

        <div className="manager-card__stat-grid">
          <div className="manager-card__stat-item manager-card__stat-item--blue">
            <span className="manager-card__stat-label manager-card__stat-label--blue">Tổng nhân sự phòng</span>
            <div className="manager-card__stat-value">{deptMembers.length} người</div>
          </div>
          <div className="manager-card__stat-item manager-card__stat-item--emerald">
            <span className="manager-card__stat-label manager-card__stat-label--emerald">Đã chấm công hôm nay</span>
            <div className="manager-card__stat-value">{deptLogs.length} lượt</div>
          </div>
          <div className="manager-card__stat-item manager-card__stat-item--amber">
            <span className="manager-card__stat-label manager-card__stat-label--amber">Đi muộn</span>
            <div className="manager-card__stat-value">
              {deptLogs.filter(l => l.status.includes('muộn')).length} người
            </div>
          </div>
          <div className="manager-card__stat-item manager-card__stat-item--purple">
            <span className="manager-card__stat-label manager-card__stat-label--purple">Nghỉ phép</span>
            <div className="manager-card__stat-value">0 người</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 whitespace-nowrap">
                <th className="py-3 px-4 font-semibold">Mã NV</th>
                <th className="py-3 px-4 font-semibold">Họ và tên</th>
                <th className="py-3 px-4 font-semibold">Chức danh</th>
                <th className="py-3 px-4 font-semibold">Ca làm việc</th>
                <th className="py-3 px-4 font-semibold">FaceID</th>
                <th className="py-3 px-4 font-semibold">Trạng thái tài khoản</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {deptMembers.map((e, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-blue-600 whitespace-nowrap">{e.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">{e.name}</td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{e.title}</td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{e.shift}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 font-semibold ${e.faceEnrolled ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <i className={`fa-solid ${e.faceEnrolled ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-amber-500'}`}></i>
                      <span>{e.faceEnrolled ? 'Đã kích hoạt' : 'Chưa có'}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {e.accountStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
