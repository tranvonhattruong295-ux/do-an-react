import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Toast() {
  const { toasts } = useAuth();

  const iconNameMap = {
    blue: 'fa-circle-info',
    emerald: 'fa-circle-check',
    teal: 'fa-circle-check',
    amber: 'fa-triangle-exclamation',
    rose: 'fa-shield-halved'
  };

  return (
    <div className="toast-container">
      {toasts.map(t => {
        const tone = t.tone || 'blue';
        const iconName = iconNameMap[tone] || 'fa-circle-info';

        return (
          <div key={t.id} className={`toast toast--${tone}`}>
            <div className={`toast__icon-box toast__icon-box--${tone}`}>
              <i className={`fa-solid ${iconName}`}></i>
            </div>
            <div className="toast__content">
              <div className="toast__title">{t.title}</div>
              <div className="toast__message">{t.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
