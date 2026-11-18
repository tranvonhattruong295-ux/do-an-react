import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Camera from './Camera';
import History from './History';

export default function Checkin() {
  const { currentUser, attendanceLogs, setAttendanceLogs } = useAuth();

  const myLogs = attendanceLogs.filter(l => l.empCode === currentUser?.empCode);

  const handleCheckinSuccess = (newLog) => {
    setAttendanceLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Camera onCheckinSuccess={handleCheckinSuccess} />
      <History logs={myLogs} />
    </div>
  );
}