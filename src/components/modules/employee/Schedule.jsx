import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Schedule() {
  const { currentUser, attendanceLogs } = useAuth();
  const myLogs = attendanceLogs.filter(l => l.empCode === currentUser?.empCode);

  return (
    <div className="hr-card rounded-2xl p-6 employee-schedule">
      <div className="employee-schedule__header">
        <div>
          <h3 className="employee-schedule__title">
            Lịch Phân Ca & Bảng Công Cá Nhân — {currentUser?.userName} ({currentUser?.empCode})
          </h3>
          <p className="employee-schedule__desc">
            Ca làm việc được phân công bởi Bộ phận Nhân sự: <strong>Ca Hành chính (08:00 - 17:30, Thứ 2 - Thứ 6)</strong>. Nhân viên chỉ có quyền xem.
          </p>
        </div>
        <span className="employee-schedule__quota-tag">
          Quỹ phép năm còn lại: 10.5 ngày
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 whitespace-nowrap">
              <th className="py-3 px-4 font-semibold">Ngày làm việc</th>
              <th className="py-3 px-4 font-semibold">Ca được phân</th>
              <th className="py-3 px-4 font-semibold">Giờ Vào</th>
              <th className="py-3 px-4 font-semibold">Giờ Ra</th>
              <th className="py-3 px-4 font-semibold">Phương thức</th>
              <th className="py-3 px-4 font-semibold">Trạng thái công</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70">
            {myLogs.map((l, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{l.date}</td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">Ca Hành chính (08:00 - 17:30)</td>
                <td className="py-3.5 px-4 font-semibold text-blue-600 whitespace-nowrap">{l.checkIn}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">{l.checkOut}</td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <i className={l.method.includes('Khuôn') ? 'fa-solid fa-camera text-blue-600' : 'fa-solid fa-qrcode text-amber-600'}></i>
                    <span>{l.method}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
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
