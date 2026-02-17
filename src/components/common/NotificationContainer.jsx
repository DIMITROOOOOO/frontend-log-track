import { useNotificationStore } from '../../stores/useNotificationStore';

export default function NotificationContainer() {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  if (notifications.length === 0) return null;

  return (
    <div style={styles.container}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function Notification({ notification, onClose }) {
  const typeStyles = {
    success: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      color: '#065f46',
      border: '1px solid #10b981',
      icon: '✓',
    },
    error: {
      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      color: '#991b1b',
      border: '1px solid #ef4444',
      icon: '✕',
    },
    warning: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      color: '#92400e',
      border: '1px solid #f59e0b',
      icon: '⚠',
    },
    info: {
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      color: '#1e40af',
      border: '1px solid #3b82f6',
      icon: 'ℹ',
    },
  };

  const style = typeStyles[notification.type] || typeStyles.info;

  return (
    <div style={{ ...styles.notification, ...style }}>
      <span style={styles.icon}>{style.icon}</span>
      <span style={styles.message}>{notification.message}</span>
      <button onClick={onClose} style={styles.closeBtn}>
        ✕
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '1.5rem',
    right: '1.5rem',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '400px',
  },
  notification: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    borderRadius: '10px',
    fontSize: '0.9375rem',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    animation: 'slideInRight 0.3s ease-out',
  },
  icon: {
    fontSize: '1.25rem',
    fontWeight: '700',
  },
  message: {
    flex: 1,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    fontSize: '1.125rem',
    cursor: 'pointer',
    opacity: 0.7,
    padding: '0.25rem',
    lineHeight: 1,
    transition: 'opacity 0.2s',
  },
};
