import { toast } from 'react-toastify';

const toastMiddleware = () => next => (action) => {
  if (action.toast) {
    const options = { ...action.toast.options, type: action.toast.type };
    toast(action.toast.message, options);
  }
  return next(action);
};

export default toastMiddleware;
