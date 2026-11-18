import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Shifts() {
  const { employees, setEmployees, addToast } = useAuth();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedShift, setSelectedShift] = useState('Ca Hành chính (08:00 - 17:30)');

  const handleAssign = () => {
    if (employees[selectedIdx]) {
      const updated = [...employees];
      updated[selectedIdx].shift = selectedShift;
      setEmployees(updated);
      addToast('Đã phân ca làm việc', `Đã cập nhật "${selectedShift}" cho ${updated[selectedIdx].name}.`, 'emerald');
    }
  };

  return (
    <div className="hr-shifts">
      <div className="hr-shifts__form-col hr-card rounded-2xl p-6">
        <h3 className="hr-shifts__title">Phân Lịch Ca Làm Việc Cho Nhân Sự</h3>
        <p className="hr-shifts__desc">
          Chỉ Bộ phận Nhân sự (HR) có thẩm quyền cấu hình ca làm việc để làm căn cứ chấm công cho camera FaceID.
        </p>

        <div className="hr-shifts__form">
          <div className="hr-shifts__group">
            <label className="hr-shifts__label">Chọn nhân viên</label>
            <select 
              value={selectedIdx} 
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              className="hr-shifts__select"
            >
              {employees.map((e, idx) => (
                <option key={idx} value={idx}>{e.code} - {e.name} ({e.dept})</option>
              ))}
            </select>
          </div>

          <div className="hr-shifts__group">
            <label className="hr-shifts__label">Ca làm việc áp dụng</label>
            <select 
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="hr-shifts__select"
            >
              <option value="Ca Hành chính (08:00 - 17:30)">Ca Hành chính (08:00 - 17:30)</option>
              <option value="Ca Sáng (06:00 - 14:00)">Ca Sáng (06:00 - 14:00)</option>
              <option value="Ca Chiều (14:00 - 22:00)">Ca Chiều (14:00 - 22:00)</option>
              <option value="Ca Linh hoạt (Flexitime)">Ca Linh hoạt (Flexitime)</option>
            </select>
          </div>

          <button 
            type="button" 
            onClick={handleAssign}
            className="hr-shifts__btn"
          >
            Cập nhật Lịch phân ca
          </button>
        </div>
      </div>

      <div className="hr-shifts__list-col hr-card rounded-2xl p-6">
        <h3 className="hr-shifts__title">Danh Sách Ca Làm Việc Toàn Công Ty</h3>
        <div className="hr-shifts__list">
          {employees.map((e, idx) => (
            <div key={idx} className="hr-shifts__item">
              <div>
                <div className="hr-shifts__item-name">{e.name} ({e.code})</div>
                <div className="hr-shifts__item-dept">{e.dept}</div>
              </div>
              <span className="hr-shifts__badge">
                {e.shift}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
