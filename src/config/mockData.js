export const DEFAULT_EMPLOYEES = [
  { code: 'NV001', name: 'Nguyễn Văn An', dept: 'Phòng Kỹ thuật & Công nghệ', title: 'Kỹ sư Phần mềm', shift: 'Ca Hành chính (08:00 - 17:30)', faceEnrolled: true, role: 'employee', accountStatus: 'Hoạt động', email: 'an.nguyen@lotushr.vn', companyCode: 'CT1' },
  { code: 'NV005', name: 'Đỗ Quang Minh', dept: 'Phòng Kỹ thuật & Công nghệ', title: 'Chuyên viên Kiểm thử', shift: 'Ca Hành chính (08:00 - 17:30)', faceEnrolled: true, role: 'employee', accountStatus: 'Hoạt động', email: 'minh.do@lotushr.vn', companyCode: 'CT1' },
  { code: 'QL003', name: 'Lê Minh Tuấn', dept: 'Phòng Kỹ thuật & Công nghệ', title: 'Trưởng phòng Kỹ thuật', shift: 'Ca Hành chính (08:00 - 17:30)', faceEnrolled: true, role: 'manager', accountStatus: 'Hoạt động', email: 'tuan.le@lotushr.vn', companyCode: 'CT1' },
  { code: 'HR002', name: 'Trần Thu Hà', dept: 'Phòng Nhân sự (HR)', title: 'Chuyên viên Nhân sự', shift: 'Ca Hành chính (08:00 - 17:30)', faceEnrolled: true, role: 'hr', accountStatus: 'Hoạt động', email: 'ha.tran@lotushr.vn', companyCode: 'CT1' },
  { code: 'NV004', name: 'Phạm Hoàng Yến', dept: 'Phòng Tài chính - Kế toán', title: 'Kế toán Tổng hợp', shift: 'Ca Hành chính (08:00 - 17:30)', faceEnrolled: false, role: 'employee', accountStatus: 'Hoạt động', email: 'yen.pham@lotushr.vn', companyCode: 'CT1' },
  { code: 'AD001', name: 'Phạm Quốc Bảo', dept: 'Phòng Hạ tầng & Bảo mật', title: 'Quản trị Hệ thống', shift: 'Ca Hành chính (08:00 - 17:30)', faceEnrolled: true, role: 'admin', accountStatus: 'Hoạt động', email: 'bao.pham@lotushr.vn', companyCode: 'CT1' }
];

export const DEFAULT_USERS = [
  { email: 'an.nguyen@lotushr.vn', code: 'NV001', name: 'Nguyễn Văn An', password: '123', dept: 'Phòng Kỹ thuật & Công nghệ', role: 'employee', accountStatus: 'Hoạt động', companyCode: 'CT1' },
  { email: 'tuan.le@lotushr.vn', code: 'QL003', name: 'Lê Minh Tuấn', password: '123', dept: 'Phòng Kỹ thuật & Công nghệ', role: 'manager', accountStatus: 'Hoạt động', companyCode: 'CT1' },
  { email: 'ha.tran@lotushr.vn', code: 'HR002', name: 'Trần Thu Hà', password: '123', dept: 'Phòng Nhân sự (HR)', role: 'hr', accountStatus: 'Hoạt động', companyCode: 'CT1' },
  { email: 'bao.pham@lotushr.vn', code: 'AD001', name: 'Phạm Quốc Bảo', password: '123', dept: 'Phòng Hạ tầng & Bảo mật', role: 'admin', accountStatus: 'Hoạt động', companyCode: 'CT1' },
  { email: 'minh.do@lotushr.vn', code: 'NV005', name: 'Đỗ Quang Minh', password: '123', dept: 'Phòng Kỹ thuật & Công nghệ', role: 'employee', accountStatus: 'Hoạt động', companyCode: 'CT1' },
  { email: 'yen.pham@lotushr.vn', code: 'NV004', name: 'Phạm Hoàng Yến', password: '123', dept: 'Phòng Tài chính - Kế toán', role: 'employee', accountStatus: 'Hoạt động', companyCode: 'CT1' }
];

export const INITIAL_ATTENDANCE_LOGS = [
  { date: '12/11/2026', empCode: 'NV001', empName: 'Nguyễn Văn An', dept: 'Phòng Kỹ thuật & Công nghệ', checkIn: '07:55:10', checkOut: '17:31:20', method: 'Khuôn mặt (Trạm Sảnh A)', liveness: 'Hợp lệ (99.6%)', status: 'Đúng giờ' },
  { date: '12/11/2026', empCode: 'NV005', empName: 'Đỗ Quang Minh', dept: 'Phòng Kỹ thuật & Công nghệ', checkIn: '08:14:05', checkOut: '17:30:00', method: 'Khuôn mặt (Trạm Sảnh A)', liveness: 'Hợp lệ (99.1%)', status: 'Đi muộn 14 phút' },
  { date: '11/11/2026', empCode: 'NV001', empName: 'Nguyễn Văn An', dept: 'Phòng Kỹ thuật & Công nghệ', checkIn: '08:20:00', checkOut: '17:35:00', method: 'Mã QR Dự phòng', liveness: 'Xác thực OTP', status: 'Đi muộn 20 phút' }
];

export const INITIAL_LEAVE_REQUESTS = [
  { id: 'NP-101', empCode: 'NV001', empName: 'Nguyễn Văn An', dept: 'Phòng Kỹ thuật & Công nghệ', date: '14/11/2026', days: 1, reason: 'Giải quyết việc gia đình (Nghỉ phép năm)', status: 'Chờ Quản lý duyệt', approverNote: '' },
  { id: 'NP-102', empCode: 'NV005', empName: 'Đỗ Quang Minh', dept: 'Phòng Kỹ thuật & Công nghệ', date: '15/11/2026', days: 0.5, reason: 'Khám sức khỏe định kỳ buổi sáng', status: 'Chờ Quản lý duyệt', approverNote: '' }
];

export const INITIAL_ADJUST_REQUESTS = [
  { id: 'ĐC-201', empCode: 'NV001', empName: 'Nguyễn Văn An', dept: 'Phòng Kỹ thuật & Công nghệ', date: '11/11/2026', requestedTime: '08:00:00', reason: 'Đi gặp khách hàng cùng Trưởng phòng buổi sáng, xin điều chỉnh giờ vào thành 08:00', status: 'Chờ Quản lý duyệt', approverNote: '' }
];

export const INITIAL_SYSTEM_LOGS = [
  { time: '07:55:10', actor: 'NV001', event: 'Chấm công khuôn mặt thành công tại Trạm Sảnh A (Liveness 99.6%)' },
  { time: '08:04:12', actor: 'Trạm Sảnh B', event: 'Cảnh báo: Chặn hành vi đưa ảnh tĩnh trên điện thoại vào camera chấm công' },
  { time: '08:15:00', actor: 'AD001', event: 'Hệ thống tự động sao lưu dữ liệu khuôn mặt và bảng công' }
];
