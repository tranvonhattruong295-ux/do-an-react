export const MODULES = [

  {
    id: 'emp-face-checkin',
    title: 'Chấm công Khuôn mặt & Dự phòng',
    category: 'Nghiệp vụ Nhân viên',
    icon: 'fa-camera',
    roles: ['employee'],
    desc: 'Nhân viên thực hiện chấm công vào/ra ca làm việc bằng nhận diện khuôn mặt (có kiểm tra thực thể sống Liveness) hoặc mã QR dự phòng khi camera lỗi.',
    resultText: 'Trả về kết quả chấm công tức thời cho Nhân viên'
  },
  {
    id: 'emp-my-schedule-attendance',
    title: 'Lịch làm việc & Bảng công cá nhân',
    category: 'Nghiệp vụ Nhân viên',
    icon: 'fa-calendar-days',
    roles: ['employee'],
    desc: 'Nhân viên tra cứu lịch phân ca làm việc cá nhân trong tuần và kiểm tra lịch sử giờ vào/ra, số công tích lũy của bản thân.',
    resultText: 'Trả về bảng công và lịch ca làm cá nhân'
  },
  {
    id: 'emp-submit-requests',
    title: 'Gửi đơn Nghỉ phép & Điều chỉnh công',
    category: 'Nghiệp vụ Nhân viên',
    icon: 'fa-paper-plane',
    roles: ['employee'],
    desc: 'Nhân viên tạo đơn xin nghỉ phép hoặc gửi giải trình điều chỉnh giờ công khi đi công tác/quên chấm công.',
    resultText: 'Gửi đơn lên hệ thống & nhận thông báo khi Quản lý duyệt'
  },

  {
    id: 'mgr-dept-overview',
    title: 'Dữ liệu Nhân sự & Công Phòng ban',
    category: 'Nghiệp vụ Người Quản lý',
    icon: 'fa-building-user',
    roles: ['manager'],
    desc: 'Người quản lý xem danh sách nhân viên thuộc phòng ban mình phụ trách, theo dõi quân số đi làm, đi muộn hoặc đang nghỉ phép trong ngày.',
    resultText: 'Trả về dữ liệu nhân sự và bảng công của phòng ban'
  },
  {
    id: 'mgr-approve-leave',
    title: 'Phê duyệt Đơn xin Nghỉ phép',
    category: 'Nghiệp vụ Người Quản lý',
    icon: 'fa-calendar-check',
    roles: ['manager'],
    desc: 'Người quản lý xem xét các đơn xin nghỉ phép của nhân viên trong bộ phận và quyết định Phê duyệt hoặc Từ chối.',
    resultText: 'Trả kết quả duyệt phép về cho Nhân viên & Bộ phận Nhân sự'
  },
  {
    id: 'mgr-approve-adjust',
    title: 'Phê duyệt Điều chỉnh Chấm công',
    category: 'Nghiệp vụ Người Quản lý',
    icon: 'fa-file-signature',
    roles: ['manager'],
    desc: 'Người quản lý kiểm tra lý do giải trình quên chấm công của nhân viên để Phê duyệt cập nhật lại giờ công hợp lệ.',
    resultText: 'Cập nhật lại giờ công và chuyển HR tổng hợp'
  },

  {
    id: 'hr-profiles-depts',
    title: 'Quản lý Hồ sơ & Phòng ban, Chức vụ',
    category: 'Nghiệp vụ Bộ phận Nhân sự (HR)',
    icon: 'fa-id-card-clip',
    roles: ['hr'],
    desc: 'Bộ phận Nhân sự quản lý toàn bộ hồ sơ nhân viên, hợp đồng, cơ cấu phòng ban và trạng thái đăng ký dữ liệu khuôn mặt.',
    resultText: 'Chuẩn hóa hồ sơ nhân sự và sơ đồ phòng ban toàn công ty'
  },
  {
    id: 'hr-shifts-assign',
    title: 'Quản lý Ca làm việc & Phân lịch',
    category: 'Nghiệp vụ Bộ phận Nhân sự (HR)',
    icon: 'fa-clock',
    roles: ['hr'],
    desc: 'Bộ phận Nhân sự thiết lập khung giờ các ca làm việc và phân lịch làm việc cho nhân viên các phòng ban.',
    resultText: 'Cập nhật lịch phân ca làm cơ sở đối chiếu chấm công'
  },
  {
    id: 'hr-attendance-reports',
    title: 'Tổng hợp, Chốt công & Xuất Báo cáo',
    category: 'Nghiệp vụ Bộ phận Nhân sự (HR)',
    icon: 'fa-chart-pie',
    roles: ['hr'],
    desc: 'Bộ phận Nhân sự kiểm tra dữ liệu chấm công toàn công ty, thực hiện Chốt bảng công tháng và xuất báo cáo thống kê.',
    resultText: 'Xuất bảng chốt công chính thức và biểu đồ thống kê'
  },

  {
    id: 'admin-accounts-rbac',
    title: 'Quản lý Tài khoản & Phân quyền',
    category: 'Nghiệp vụ Quản trị viên (Admin)',
    icon: 'fa-user-lock',
    roles: ['admin'],
    desc: 'Quản trị viên tạo tài khoản đăng nhập, gán quyền hạn (Nhân viên, Quản lý, Nhân sự, Quản trị viên) và quản lý phiên.',
    resultText: 'Đảm bảo đúng người đúng quyền trên toàn hệ thống'
  },
  {
    id: 'admin-station-config',
    title: 'Cấu hình Điểm chấm công & AI Liveness',
    category: 'Nghiệp vụ Quản trị viên (Admin)',
    icon: 'fa-sliders',
    roles: ['admin'],
    desc: 'Quản trị viên cấu hình danh sách trạm camera chấm công, độ nhạy nhận diện khuôn mặt và bật bắt buộc kiểm tra thực thể sống.',
    resultText: 'Áp dụng thông số kỹ thuật cho các trạm chấm công AI'
  },
  {
    id: 'admin-logs-backup',
    title: 'Nhật ký Hệ thống, Cảnh báo & Sao lưu',
    category: 'Nghiệp vụ Quản trị viên (Admin)',
    icon: 'fa-server',
    roles: ['admin'],
    desc: 'Quản trị viên tra cứu toàn bộ lịch sử truy cập, cảnh báo tự động khi có hành vi giả mạo và thực hiện sao lưu định kỳ.',
    resultText: 'Trả về nhật ký kiểm toán và bản sao lưu an toàn'
  }
];
