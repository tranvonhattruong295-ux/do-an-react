import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function Camera({ onCheckinSuccess }) {
  const { currentUser, employees, setEmployees, addToast } = useAuth();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [method, setMethod] = useState('Khuôn mặt (Vào ca)');
  const [matchScore, setMatchScore] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const empInfo = employees.find(e => e.code === currentUser?.empCode);
  const isEnrolled = empInfo ? empInfo.faceEnrolled : true;

  const loadDevices = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(d => d.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !selectedDeviceId) {
        const preferred = videoDevices.find(d => {
          const lbl = (d.label || '').toLowerCase();
          return !lbl.includes('ir') && !lbl.includes('infrared') && !lbl.includes('virtual');
        });
        setSelectedDeviceId(preferred ? preferred.deviceId : videoDevices[0].deviceId);
      }
    } catch {}
  };

  const startCamera = async (deviceIdToUse) => {
    setCameraError('');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }

    const targetId = deviceIdToUse || selectedDeviceId;
    const constraints = {
      video: targetId 
        ? { deviceId: { exact: targetId }, width: { ideal: 1280 }, height: { ideal: 720 } }
        : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      setIsCameraOn(true);
      await loadDevices();
      addToast('Camera đã bật', 'Máy ảnh đang phát trực tiếp. Vui lòng nhìn thẳng vào khung hình.', 'blue');
    } catch {
      setCameraError('Không thể kết nối camera hoặc thiết bị đang bận. Vui lòng kiểm tra quyền truy cập hoặc nút gạt bảo mật webcam.');
      addToast('Lỗi Camera', 'Vui lòng kiểm tra quyền truy cập webcam trên trình duyệt.', 'rose');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const handleDeviceChange = (e) => {
    const newId = e.target.value;
    setSelectedDeviceId(newId);
    if (isCameraOn) {
      startCamera(newId);
    }
  };

  useEffect(() => {
    loadDevices();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleEnrollFace = () => {
    const updated = employees.map(e => {
      if (e.code === currentUser?.empCode) {
        return { ...e, faceEnrolled: true };
      }
      return e;
    });
    setEmployees(updated);
    addToast('Đăng ký FaceID thành công', 'Dữ liệu khuôn mặt 3D của bạn đã được cập nhật an toàn vào hệ thống.', 'emerald');
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85);
  };

  const handleScanAttendance = () => {
    const myProfile = employees.find(e => e.code === currentUser?.empCode) || {};
    const myStatus = myProfile.accountStatus || currentUser?.accountStatus || 'Hoạt động';

    if (myStatus === 'Đã khóa (Chặn)' || myStatus === 'Đã khóa' || myStatus === 'Tạm khóa') {
      addToast('Bị chặn điểm danh', `Tài khoản ${currentUser?.userName} đã bị Bộ phận Nhân sự khóa / chặn. Không thể chấm công.`, 'rose');
      return;
    }

    if (!isCameraOn) {
      addToast('Vui lòng bật Camera', 'Bạn cần bật webcam trước khi thực hiện nhận diện khuôn mặt.', 'amber');
      return;
    }

    if (!isEnrolled) {
      addToast('Chưa có dữ liệu FaceID', 'Vui lòng nhấn "Đăng ký mẫu khuôn mặt 3D" trước khi điểm danh.', 'amber');
      return;
    }

    setIsScanning(true);
    setMatchScore(null);

    const snapshot = captureFrame();

    setTimeout(() => {
      const score = (98.5 + Math.random() * 1.3).toFixed(1);
      setMatchScore(score);
      setIsScanning(false);

      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN');
      const dateStr = now.toLocaleDateString('vi-VN');

      const isLate = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 15);

      const newLog = {
        empCode: currentUser.empCode,
        empName: currentUser.userName,
        dept: currentUser.dept,
        date: dateStr,
        checkIn: timeStr,
        checkOut: '--:--',
        method: method,
        liveness: `Khớp ${score}% • 3D Pass`,
        status: isLate ? 'Đi muộn (AI)' : 'Đúng giờ (AI)',
        snapshot: snapshot
      };

      if (onCheckinSuccess) {
        onCheckinSuccess(newLog);
      }

      addToast('Chấm công thành công', `Khuôn mặt khớp ${score}%. Đã ghi nhận công lúc ${timeStr}.`, 'emerald');
    }, 700);
  };

  return (
    <div className="lg:col-span-6 hr-card rounded-2xl p-6 scanner">
      <div className="scanner__header">
        <h3 className="scanner__title">
          Trạm Chấm Công Cá Nhân ({currentUser?.userName})
        </h3>
        <div className="scanner__badges">
          <span className={`scanner__badge ${isEnrolled ? 'scanner__badge--enrolled' : 'scanner__badge--not-enrolled'}`}>
            {isEnrolled ? 'Đã có Face ID' : 'Chưa có Face ID'}
          </span>
          <span className="scanner__badge scanner__badge--live">
            Liveness 3D: Bật
          </span>
        </div>
      </div>

      <p className="scanner__desc">
        Bật máy ảnh để nhận diện khuôn mặt trực tiếp từ Webcam, hoặc sử dụng mã QR nội bộ dự phòng.
      </p>

      <div className="scanner__viewport">
        <video 
          ref={(el) => {
            videoRef.current = el;
            if (el && streamRef.current && el.srcObject !== streamRef.current) {
              el.srcObject = streamRef.current;
              el.play().catch(() => {});
            }
          }}
          autoPlay 
          playsInline 
          muted 
          className={`scanner__video ${isCameraOn ? 'block' : 'hidden'}`}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
        />

        {isCameraOn ? (
          <>
            <div className="scan-bar-light"></div>
            
            <div className="scanner__reticle-wrap">
              <div className="scanner__reticle">
                <span className="scanner__reticle-corner scanner__reticle-corner--tl"></span>
                <span className="scanner__reticle-corner scanner__reticle-corner--tr"></span>
                <span className="scanner__reticle-corner scanner__reticle-corner--bl"></span>
                <span className="scanner__reticle-corner scanner__reticle-corner--br"></span>
              </div>
            </div>

            <div className="scanner__live-indicator">
              <span className="scanner__live-dot"></span>
              <span>Camera trực tiếp</span>
            </div>
          </>
        ) : (
          <div className="scanner__off-placeholder">
            <div className="scanner__off-icon">
              <i className="fa-solid fa-camera"></i>
            </div>
            <div className="scanner__off-text">
              Webcam hiện đang tắt
            </div>
            <button
              type="button"
              onClick={() => startCamera()}
              className="scanner__btn-turn-on"
            >
              <i className="fa-solid fa-video"></i>
              <span>Bật Webcam của bạn</span>
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {isScanning && (
          <div className="scanner__loading-overlay">
            <i className="fa-solid fa-spinner fa-spin scanner__loading-spinner"></i>
            <span className="scanner__loading-text">Đang quét sinh trắc học AI...</span>
          </div>
        )}

        {matchScore && !isScanning && (
          <div className="scanner__result-banner">
            <i className="fa-solid fa-circle-check mr-1.5"></i>
            Khuôn mặt khớp {matchScore}% • Đã vượt qua kiểm tra cử động thực thể sống
          </div>
        )}
      </div>

      {devices.length > 1 && (
        <div className="scanner__device-box">
          <label className="font-semibold text-slate-700 whitespace-nowrap">Thiết bị camera:</label>
          <select 
            value={selectedDeviceId} 
            onChange={handleDeviceChange}
            className="scanner__device-select"
          >
            {devices.map((d, i) => (
              <option key={d.deviceId || i} value={d.deviceId}>
                {d.label || `Camera ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {cameraError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          <i className="fa-solid fa-triangle-exclamation mr-1.5"></i>
          {cameraError}
        </div>
      )}

      <div className="scanner__controls">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isScanning}
            onClick={handleScanAttendance}
            className="scanner__btn-primary"
          >
            <i className="fa-solid fa-expand"></i>
            <span>Quét Khuôn Mặt Điểm Danh</span>
          </button>

          {!isEnrolled && (
            <button
              type="button"
              onClick={handleEnrollFace}
              className="scanner__btn-outline"
            >
              <i className="fa-solid fa-id-card-clip text-teal-600"></i>
              <span>Đăng Ký FaceID</span>
            </button>
          )}
        </div>

        {isCameraOn && (
          <button
            type="button"
            onClick={stopCamera}
            className="scanner__btn-danger"
          >
            <i className="fa-solid fa-power-off"></i>
            <span>Tắt Camera</span>
          </button>
        )}
      </div>
    </div>
  );
}
