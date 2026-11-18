import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Stations() {
  const { addToast } = useAuth();
  const [stationA, setStationA] = useState(true);
  const [stationB, setStationB] = useState(true);
  const [sensitivity, setSensitivity] = useState(99.5);
  const [allowQr, setAllowQr] = useState(true);

  const handleSave = () => {
    addToast('Lưu cấu hình thành công', 'Thông số các trạm camera AI FaceID đã được đồng bộ xuống thiết bị.', 'emerald');
  };

  return (
    <div className="hr-card rounded-2xl p-6 admin-stations">
      <div className="admin-stations__header">
        <h3 className="admin-stations__title">
          Cấu Hình Điểm Chấm Công AI & Thuật Toán Chống Giả Mạo
        </h3>
        <p className="admin-stations__desc">
          Quản trị viên thiết lập thông số kỹ thuật cho mạng lưới camera FaceID, kích hoạt Liveness 3D và phương thức dự phòng.
        </p>
      </div>

      <div className="admin-stations__grid">
        <div className="admin-stations__card">
          <div className="admin-stations__card-title">Danh sách trạm camera AI</div>
          
          <label className="admin-stations__item-toggle">
            <div>
              <div className="font-bold text-slate-800">Trạm Sảnh A (Cửa chính tầng 1)</div>
              <div className="text-[11px] text-slate-400">IP: 192.168.1.101 • Camera AI HD</div>
            </div>
            <input 
              type="checkbox" 
              checked={stationA} 
              onChange={(e) => setStationA(e.target.checked)} 
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="admin-stations__item-toggle">
            <div>
              <div className="font-bold text-slate-800">Trạm Sảnh B (Cổng sau văn phòng)</div>
              <div className="text-[11px] text-slate-400">IP: 192.168.1.102 • Camera AI 3D Liveness</div>
            </div>
            <input 
              type="checkbox" 
              checked={stationB} 
              onChange={(e) => setStationB(e.target.checked)} 
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>

        <div className="admin-stations__card">
          <div className="admin-stations__card-title">Thông số thuật toán & Dự phòng</div>

          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>Độ nhạy nhận diện khuôn mặt</span>
              <span className="text-blue-600 font-bold">{sensitivity}%</span>
            </div>
            <input 
              type="range" 
              min="90" 
              max="99.9" 
              step="0.1" 
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="text-[11px] text-slate-400 mt-1">Độ chính xác càng cao thì khả năng từ chối giả mạo càng mạnh.</div>
          </div>

          <label className="admin-stations__item-toggle">
            <div>
              <div className="font-bold text-slate-800">Cho phép chấm công dự phòng bằng QR</div>
              <div className="text-[11px] text-slate-400">Kích hoạt khi camera bảo trì hoặc mất mạng</div>
            </div>
            <input 
              type="checkbox" 
              checked={allowQr} 
              onChange={(e) => setAllowQr(e.target.checked)} 
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      <div className="admin-stations__footer">
        <button 
          type="button" 
          onClick={handleSave}
          className="admin-stations__btn-save"
        >
          Lưu Cấu Hình Trạm Chấm Công
        </button>
      </div>
    </div>
  );
}
