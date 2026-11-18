import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ROLES } from '../../../config/roles';

export default function Accounts() {
  const { employees, setEmployees, setUsers, addToast } = useAuth();

  const handleRoleChange = (idx, newRole) => {
    const targetEmp = employees[idx];
    if (targetEmp.code === 'AD001') {
      addToast('Cảnh báo bảo mật', 'Tài khoản Quản trị viên tối cao AD001 là duy nhất và cố định.', 'amber');
      return;
    }
    const updated = [...employees];
    updated[idx].role = newRole;
    setEmployees(updated);

    setUsers(prev => prev.map(u => {
      if (u.code === targetEmp.code || (u.email && u.email.toLowerCase() === (targetEmp.email || '').toLowerCase())) {
        return { ...u, role: newRole };
      }
      return u;
    }));

    addToast('Admin cập nhật phân quyền', `Đã phân quyền "${ROLES[newRole]?.name}" cho ${targetEmp.name}.`, 'emerald');
  };

  return (
    <div className="hr-card rounded-2xl p-6 admin-accounts">
      <div className="admin-accounts__header">
        <h3 className="admin-accounts__title">Quản Lý Tài Khoản & Phân Quyền Vai Trò (RBAC)</h3>
        <p className="admin-accounts__desc">
          Quyền hạn độc quyền của Quản trị viên (Admin): Cấp phát thẩm quyền Quản lý, HR và Nhân viên cho nhân sự toàn công ty.
        </p>
      </div>

      <div className="admin-accounts__banner">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-shield-halved text-amber-600"></i>
          <span><strong>Chính sách hệ thống:</strong> Chỉ có duy nhất 1 Quản trị viên tối cao (AD001). Cán bộ đăng ký mới là Nhân viên, Admin có quyền nâng cấp lên Quản lý hoặc HR.</span>
        </div>
        <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">Tổng: {employees.length} tài khoản</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 whitespace-nowrap">
              <th className="py-3 px-4 font-semibold">Mã NV</th>
              <th className="py-3 px-4 font-semibold">Tên tài khoản</th>
              <th className="py-3 px-4 font-semibold">Phòng ban</th>
              <th className="py-3 px-4 font-semibold">Vai trò gán quyền</th>
              <th className="py-3 px-4 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70">
            {employees.map((e, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70">
                <td className="py-3 px-4 font-bold text-amber-700 whitespace-nowrap">{e.code}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{e.name}</div>
                  <div className="text-[11px] text-slate-400">{e.email}</div>
                </td>
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{e.dept}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {e.code === 'AD001' ? (
                    <span className="admin-accounts__crown-badge">
                      <i className="fa-solid fa-crown text-amber-600"></i>
                      <span>4. Quản trị viên Tối cao (Duy nhất)</span>
                    </span>
                  ) : (
                    <select 
                      value={e.role} 
                      onChange={(evt) => handleRoleChange(idx, evt.target.value)}
                      className="admin-accounts__select"
                    >
                      <option value="employee">1. Nhân viên</option>
                      <option value="manager">2. Người Quản lý</option>
                      <option value="hr">3. Bộ phận Nhân sự (HR)</option>
                    </select>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Hoạt động
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
