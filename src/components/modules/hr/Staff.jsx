import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Staff() {
  const { employees, setEmployees, users, setUsers, addToast } = useAuth();
  const [filterTab, setFilterTab] = useState('all');

  const [editingEmp, setEditingEmp] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDept, setEditDept] = useState('Phòng Kỹ thuật & Công nghệ');
  const [editTitle, setEditTitle] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCompanyCode, setEditCompanyCode] = useState('CT1');
  const [editStatus, setEditStatus] = useState('Hoạt động');

  const [deleteTarget, setDeleteTarget] = useState(null);

  const pendingEmployees = (employees || []).filter(e => e.accountStatus === 'Chờ duyệt');
  const blockedEmployees = (employees || []).filter(e => e.accountStatus === 'Đã khóa (Chặn)' || e.accountStatus === 'Đã khóa');
  const activeEmployees = (employees || []).filter(e => e.accountStatus === 'Hoạt động' || (!e.accountStatus && e.accountStatus !== 'Chờ duyệt' && e.accountStatus !== 'Từ chối' && e.accountStatus !== 'Đã khóa (Chặn)'));

  const displayedEmployees = (employees || []).filter(e => {
    const st = e.accountStatus || 'Hoạt động';
    if (filterTab === 'pending') return st === 'Chờ duyệt';
    if (filterTab === 'active') return st === 'Hoạt động';
    if (filterTab === 'blocked') return st === 'Đã khóa (Chặn)' || st === 'Đã khóa';
    return true;
  });

  const handleOpenEdit = (emp) => {
    if (!emp) return;
    setEditingEmp(emp);
    setEditName(emp.name || '');
    setEditDept(emp.dept || 'Phòng Kỹ thuật & Công nghệ');
    setEditTitle(emp.title || '');
    setEditEmail(emp.email || '');
    setEditCompanyCode(emp.companyCode || 'CT1');
    setEditStatus(emp.accountStatus || 'Hoạt động');
  };

  const handleToggleTopEdit = () => {
    if (editingEmp) {
      setEditingEmp(null);
    } else if (employees && employees.length > 0) {
      handleOpenEdit(employees[0]);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingEmp) return;

    const targetCode = editingEmp.code;

    const updatedEmployees = employees.map(emp => {
      if (emp.code === targetCode) {
        return {
          ...emp,
          name: editName.trim(),
          dept: editDept,
          title: editTitle.trim(),
          email: editEmail.trim().toLowerCase(),
          companyCode: editCompanyCode.trim().toUpperCase(),
          accountStatus: editStatus
        };
      }
      return emp;
    });

    const updatedUsers = users.map(u => {
      if (u.code === targetCode || (u.email && u.email.toLowerCase() === (editingEmp.email || '').toLowerCase())) {
        return {
          ...u,
          name: editName.trim(),
          dept: editDept,
          email: editEmail.trim().toLowerCase(),
          companyCode: editCompanyCode.trim().toUpperCase(),
          accountStatus: editStatus
        };
      }
      return u;
    });

    setEmployees(updatedEmployees);
    setUsers(updatedUsers);

    try {
      localStorage.setItem('lotushr_employees', JSON.stringify(updatedEmployees));
      localStorage.setItem('lotushr_users', JSON.stringify(updatedUsers));
    } catch {}

    const statusMsg = editStatus === 'Đã khóa (Chặn)' 
      ? `Đã khóa/chặn tài khoản của ${editName.trim()} (${targetCode}). Nhân sự sẽ không thể đăng nhập hoặc điểm danh.`
      : `Đã cập nhật hồ sơ của ${editName.trim()} (${targetCode}).`;

    addToast('Cập nhật hồ sơ thành công', statusMsg, editStatus === 'Đã khóa (Chặn)' ? 'amber' : 'emerald');
    setEditingEmp(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.code === 'AD001') {
      addToast('Không thể xóa', 'Tài khoản Quản trị viên tối cao AD001 được bảo vệ vĩnh viễn.', 'amber');
      setDeleteTarget(null);
      return;
    }

    const targetCode = deleteTarget.code;
    const targetEmail = (deleteTarget.email || '').toLowerCase();
    const targetName = deleteTarget.name;

    const nextEmps = employees.filter(e => e.code !== targetCode);
    const nextUsers = users.filter(u => u.code !== targetCode && (!targetEmail || (u.email || '').toLowerCase() !== targetEmail));

    setEmployees(nextEmps);
    setUsers(nextUsers);

    try {
      localStorage.setItem('lotushr_employees', JSON.stringify(nextEmps));
      localStorage.setItem('lotushr_users', JSON.stringify(nextUsers));
    } catch {}

    if (editingEmp?.code === targetCode) {
      setEditingEmp(null);
    }

    addToast('Đã xóa nhân sự', `Đã xóa vĩnh viễn hồ sơ của ${targetName} (${targetCode}) khỏi hệ thống.`, 'rose');
    setDeleteTarget(null);
  };

  const handleApprove = (targetEmp) => {
    setEmployees(prev => {
      const nextEmps = prev.map(e => {
        if (e.code === targetEmp.code) {
          return { ...e, accountStatus: 'Hoạt động' };
        }
        return e;
      });
      try {
        localStorage.setItem('lotushr_employees', JSON.stringify(nextEmps));
      } catch {}
      return nextEmps;
    });

    setUsers(prev => {
      const nextUsers = prev.map(u => {
        if (u.code === targetEmp.code || (u.email && u.email.toLowerCase() === (targetEmp.email || '').toLowerCase())) {
          return { ...u, accountStatus: 'Hoạt động' };
        }
        return u;
      });
      try {
        localStorage.setItem('lotushr_users', JSON.stringify(nextUsers));
      } catch {}
      return nextUsers;
    });

    addToast('HR đã duyệt thành công', `Đã phê duyệt cho ${targetEmp.name} (${targetEmp.code}) chính thức vào công ty ${targetEmp.companyCode || ''}.`, 'emerald');
  };

  const handleReject = (targetEmp) => {
    setEmployees(prev => {
      const nextEmps = prev.map(e => {
        if (e.code === targetEmp.code) {
          return { ...e, accountStatus: 'Từ chối' };
        }
        return e;
      });
      try {
        localStorage.setItem('lotushr_employees', JSON.stringify(nextEmps));
      } catch {}
      return nextEmps;
    });

    setUsers(prev => {
      const nextUsers = prev.map(u => {
        if (u.code === targetEmp.code || (u.email && u.email.toLowerCase() === (targetEmp.email || '').toLowerCase())) {
          return { ...u, accountStatus: 'Từ chối' };
        }
        return u;
      });
      try {
        localStorage.setItem('lotushr_users', JSON.stringify(nextUsers));
      } catch {}
      return nextUsers;
    });

    addToast('HR đã từ chối', `Đã từ chối hồ sơ của ${targetEmp.name}.`, 'rose');
  };

  return (
    <div className="staff">
      <div className="staff__header">
        <div className="staff__title-group">
          <h3 className="staff__title">Quản Lý Hồ Sơ Nhân Sự & Phê Duyệt Gia Nhập Công Ty</h3>
          <p className="staff__desc">
            Thẩm quyền thuộc về Bộ phận Nhân sự (HR): Duyệt hồ sơ, chỉnh sửa thông tin, khóa chặn tài khoản nghỉ việc và xóa nhân sự.
          </p>
        </div>
        <button 
          type="button" 
          onClick={handleToggleTopEdit}
          className="staff__btn-toggle-edit"
        >
          <i className="fa-solid fa-pen-to-square"></i>
          <span>{editingEmp ? `Đóng form sửa (${editingEmp.name})` : 'Sửa hồ sơ nhân viên'}</span>
        </button>
      </div>

      {pendingEmployees.length > 0 && (
        <div className="staff__pending-alert">
          <div className="staff__pending-top">
            <div className="staff__pending-indicator-box">
              <span className="staff__pending-dot"></span>
              <span className="staff__pending-heading">
                Có {pendingEmployees.length} hồ sơ nhân sự mới đăng ký gia nhập công ty đang chờ duyệt
              </span>
            </div>
            <span className="staff__pending-tag">
              Yêu cầu chờ HR xử lý
            </span>
          </div>

          <div className="staff__pending-grid">
            {pendingEmployees.map(p => {
              const isSelected = editingEmp?.code === p.code;

              return (
                <div 
                  key={p.code} 
                  onClick={() => handleOpenEdit(p)}
                  className={`staff__pending-card ${isSelected ? 'staff__pending-card--selected' : ''}`}
                >
                  <div className="staff__pending-card-top">
                    <div>
                      <div className="staff__pending-card-name-row">
                        <span>{p.name}</span>
                        <span className="staff__pending-card-code-tag">
                          Mã CT: {p.companyCode || 'CT1'}
                        </span>
                        {isSelected && (
                          <span className="staff__pending-card-editing-tag">
                            Đang mở sửa
                          </span>
                        )}
                      </div>
                      <div className="staff__pending-card-email">{p.email}</div>
                      <div className="staff__pending-card-dept">
                        {p.dept} &bull; <span>{p.title}</span>
                      </div>
                    </div>
                    <span className="staff__pending-card-emp-code">
                      {p.code}
                    </span>
                  </div>

                  <div className="staff__pending-card-bottom">
                    <span className="staff__pending-card-face">
                      <i className={`fa-solid ${p.faceEnrolled ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-slate-400'}`}></i>
                      <span>{p.faceEnrolled ? 'Đã quét khuôn mặt 3D' : 'Chưa có khuôn mặt'}</span>
                    </span>
                    <div className="staff__pending-card-actions" onClick={(e) => e.stopPropagation()}>
                      <button 
                        type="button" 
                        onClick={() => handleReject(p)}
                        className="staff__btn-pending-reject"
                      >
                        <i className="fa-solid fa-xmark"></i>
                        <span>Từ chối</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleApprove(p)}
                        className="staff__btn-pending-approve"
                      >
                        <i className="fa-solid fa-user-check"></i>
                        <span>Duyệt</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {editingEmp && (
        <form onSubmit={handleSaveEdit} className="staff__form">
          <div className="staff__form-header">
            <div className="staff__form-header-left">
              <i className="fa-solid fa-pen-to-square"></i>
              <span className="staff__form-title">
                Đang chỉnh sửa hồ sơ: {editingEmp.name}
              </span>
              <span className="staff__form-badge-code">
                Mã: {editingEmp.code}
              </span>
              <span className="staff__form-badge-company">
                Mã CT: {editCompanyCode}
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => setEditingEmp(null)} 
              className="staff__form-close-btn"
              title="Đóng form chỉnh sửa"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="staff__form-grid-4">
            <div className="staff__form-group">
              <label className="staff__form-label">Họ và tên *</label>
              <input 
                type="text" 
                required 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                className="staff__form-input"
              />
            </div>

            <div className="staff__form-group">
              <label className="staff__form-label">Phòng ban trực thuộc *</label>
              <select 
                value={editDept} 
                onChange={(e) => setEditDept(e.target.value)} 
                className="staff__form-select"
              >
                <option value="Phòng Kỹ thuật & Công nghệ">Phòng Kỹ thuật & Công nghệ</option>
                <option value="Phòng Nhân sự (HR)">Phòng Nhân sự (HR)</option>
                <option value="Phòng Tài chính - Kế toán">Phòng Tài chính - Kế toán</option>
                <option value="Phòng Hạ tầng & Bảo mật">Phòng Hạ tầng & Bảo mật</option>
                <option value="Phòng Kinh doanh & Tiếp thị">Phòng Kinh doanh & Tiếp thị</option>
                <option value="Phòng Vận hành & Dịch vụ">Phòng Vận hành & Dịch vụ</option>
              </select>
            </div>

            <div className="staff__form-group">
              <label className="staff__form-label">Chức danh / Vị trí</label>
              <input 
                type="text" 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)} 
                className="staff__form-input"
              />
            </div>

            <div className="staff__form-group">
              <label className="staff__form-label">Mã công ty doanh nghiệp</label>
              <input 
                type="text" 
                value={editCompanyCode} 
                onChange={(e) => setEditCompanyCode(e.target.value.toUpperCase())} 
                className="staff__form-input staff__form-input--code"
              />
            </div>
          </div>

          <div className="staff__form-grid-2">
            <div className="staff__form-group">
              <label className="staff__form-label">Email liên hệ</label>
              <input 
                type="email" 
                value={editEmail} 
                onChange={(e) => setEditEmail(e.target.value)} 
                className="staff__form-input"
              />
            </div>

            <div className="staff__form-group">
              <label className="staff__form-label">Trạng thái hồ sơ & Phân quyền truy cập</label>
              <select 
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className={`staff__form-select ${
                  editStatus === 'Đã khóa (Chặn)' 
                    ? 'staff__form-select--blocked' 
                    : editStatus === 'Chờ duyệt'
                    ? 'staff__form-select--pending'
                    : ''
                }`}
              > 
                <option value="Hoạt động">Hoạt động</option>
                <option value="Đã khóa (Chặn)">Đã khóa - Nghỉ việc / Tạm dừng</option>
                <option value="Từ chối">Từ chối hồ sơ</option>
              </select>
            </div>
          </div>

          <div className="staff__form-footer">
            <span className="staff__form-note">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Chọn "Đã khóa (Chặn)" sẽ tự động chặn nhân sự đăng nhập và chặn chấm công khuôn mặt để tránh gian lận.</span>
            </span>

            <div className="staff__form-actions">
              <button 
                type="button" 
                onClick={() => setEditingEmp(null)} 
                className="staff__form-btn-cancel"
              >
                Hủy
              </button>
              <button 
                type="submit" 
                className="staff__form-btn-submit"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>Lưu thay đổi hồ sơ</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="staff__toolbar">
        <div className="staff__tabs">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`staff__tab-btn ${filterTab === 'all' ? 'staff__tab-btn--all' : ''}`}
          >
            <span>Tất cả</span>
            <span className="staff__tab-pill">{employees.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('active')}
            className={`staff__tab-btn ${filterTab === 'active' ? 'staff__tab-btn--active' : 'staff__tab-btn--active-inactive'}`}
          >
            <span>Hoạt động</span>
            <span className="staff__tab-pill">{activeEmployees.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('pending')}
            className={`staff__tab-btn ${filterTab === 'pending' ? 'staff__tab-btn--pending' : 'staff__tab-btn--pending-inactive'}`}
          >
            <span>Chờ HR duyệt</span>
            <span className={`staff__tab-pill ${filterTab === 'pending' ? 'staff__tab-pill--solid text-amber-800' : 'bg-amber-500 text-white'}`}>
              {pendingEmployees.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('blocked')}
            className={`staff__tab-btn ${filterTab === 'blocked' ? 'staff__tab-btn--blocked' : 'staff__tab-btn--blocked-inactive'}`}
          >
            <span>Đã khóa / Chặn</span>
            <span className={`staff__tab-pill ${filterTab === 'blocked' ? 'staff__tab-pill--solid text-rose-800' : 'bg-rose-500 text-white'}`}>
              {blockedEmployees.length}
            </span>
          </button>
        </div>

        <div className="staff__hint">
          <i className="fa-solid fa-hand-pointer"></i>
          <span>Nhấp dòng để sửa hồ sơ</span>
        </div>
      </div>

      <div className="staff__table-wrap">
        <table className="staff__table">
          <thead>
            <tr className="staff__table-head-row">
              <th className="staff__th">Mã NV</th>
              <th className="staff__th">Họ và tên</th>
              <th className="staff__th">Mã CT</th>
              <th className="staff__th">Phòng ban</th>
              <th className="staff__th">Chức danh</th>
              <th className="staff__th">Dữ liệu FaceID</th>
              <th className="staff__th">Trạng thái</th>
              <th className="staff__th staff__th--right">Xóa nhân sự</th>
            </tr>
          </thead>
          <tbody className="staff__table-body">
            {displayedEmployees.map((e, idx) => {
              const st = e.accountStatus || 'Hoạt động';
              const isSelected = editingEmp?.code === e.code;
              const isBlocked = st === 'Đã khóa (Chặn)' || st === 'Đã khóa';

              return (
                <tr 
                  key={idx} 
                  onClick={() => handleOpenEdit(e)}
                  className={`staff__row ${
                    isSelected 
                      ? 'staff__row--selected' 
                      : isBlocked
                      ? 'staff__row--blocked'
                      : ''
                  }`}
                  title="Nhấp để xem và chỉnh sửa hồ sơ nhân viên này"
                >
                  <td className="staff__td staff__td--code">
                    <div className="staff__code-box">
                      {isSelected ? (
                        <i className="fa-solid fa-caret-right text-teal-600 text-sm"></i>
                      ) : (
                        <i className="fa-solid fa-user text-slate-300 text-xs"></i>
                      )}
                      <span>{e.code}</span>
                      {isSelected && (
                        <span className="staff__selected-tag">
                          Đang chọn
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="staff__td">
                    <div className={`staff__user-name ${isSelected ? 'staff__user-name--selected' : ''}`}>{e.name}</div>
                    <div className="staff__user-email">{e.email}</div>
                  </td>
                  <td className="staff__td">
                    <span className="staff__company-pill">
                      {e.companyCode || 'CT1'}
                    </span>
                  </td>
                  <td className="staff__td staff__dept-text">{e.dept}</td>
                  <td className="staff__td staff__title-text">{e.title}</td>
                  <td className="staff__td">
                    <span className={`staff__face-tag ${e.faceEnrolled ? 'staff__face-tag--ok' : 'staff__face-tag--none'}`}>
                      <i className={`fa-solid ${e.faceEnrolled ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-amber-500'}`}></i>
                      <span>{e.faceEnrolled ? 'Đã có mẫu 3D' : 'Chưa có mẫu'}</span>
                    </span>
                  </td>
                  <td className="staff__td">
                    {st === 'Chờ duyệt' ? (
                      <span className="staff__status-badge staff__status-badge--pending">
                        Chờ HR duyệt
                      </span>
                    ) : st === 'Đã khóa (Chặn)' || st === 'Đã khóa' ? (
                      <span className="staff__status-badge staff__status-badge--blocked">
                        <i className="fa-solid fa-user-slash text-rose-600"></i>
                        <span>Đã khóa (Chặn)</span>
                      </span>
                    ) : st === 'Từ chối' ? (
                      <span className="staff__status-badge staff__status-badge--rejected">
                        Từ chối
                      </span>
                    ) : (
                      <span className="staff__status-badge staff__status-badge--active">
                        Hoạt động
                      </span>
                    )}
                  </td>
                  <td className="staff__td staff__td--right" onClick={(evt) => evt.stopPropagation()}>
                    <div className="staff__actions-cell">
                      {st === 'Chờ duyệt' && (
                        <>
                          <button 
                            type="button" 
                            onClick={() => handleReject(e)}
                            className="staff__btn-pending-reject"
                          >
                            Từ chối
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleApprove(e)}
                            className="staff__btn-pending-approve"
                          >
                            Duyệt
                          </button>
                        </>
                      )}

                      {e.code === 'AD001' ? (
                        <span className="staff__protected-tag">Bảo vệ</span>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => setDeleteTarget(e)}
                          className="staff__btn-delete"
                          title={`Xóa nhân sự ${e.name} (${e.code})`}
                        >
                          <i className="fa-solid fa-trash-can text-rose-600"></i>
                          <span>Xóa</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className="staff__modal-backdrop">
          <div className="staff__modal-card">
            <div className="staff__modal-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <div className="staff__modal-text">
              <h4 className="staff__modal-title">Xác Nhận Xóa Hồ Sơ Nhân Sự</h4>
              <p className="staff__modal-desc">
                Bạn có chắc chắn muốn xóa vĩnh viễn hồ sơ của nhân sự <strong className="text-slate-800">{deleteTarget.name}</strong> (Mã: <strong className="text-blue-700">{deleteTarget.code}</strong> - {deleteTarget.dept}) khỏi hệ thống không?
              </p>
            </div>

            <div className="staff__modal-warning">
              <i className="fa-solid fa-circle-exclamation text-amber-600 text-xs"></i>
              <span>Hành động này sẽ xóa toàn bộ tài khoản đăng nhập và hồ sơ của nhân sự này khỏi công ty. Thao tác không thể hoàn tác.</span>
            </div>

            <div className="staff__modal-actions">
              <button 
                type="button" 
                onClick={() => setDeleteTarget(null)}
                className="staff__modal-btn-cancel"
              >
                Hủy bỏ
              </button>
              <button 
                type="button" 
                onClick={handleConfirmDelete}
                className="staff__modal-btn-confirm"
              >
                <i className="fa-solid fa-trash-can"></i>
                <span>Xác nhận xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
