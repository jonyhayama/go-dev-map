export const ToastTypes = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

/**
 * ACTIONS
 */

export const buildToast = (message, type = 'default', options) => ({
  message,
  type,
  options,
});

/**
 * REDUCERS
 */

export default (message, type = 'default', options) => ({
  type: 'SHOW_TOAST',
  toast: buildToast(message, type, options),
});
