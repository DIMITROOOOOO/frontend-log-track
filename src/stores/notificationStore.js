const listeners = new Set();
let state = {
  notifications: [],
};

export function getNotificationState() {
  return state;
}

export function pushNotification(notification) {
  state = {
    ...state,
    notifications: [notification, ...state.notifications],
  };
  listeners.forEach((listener) => listener(state));
}

export function subscribeNotifications(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
