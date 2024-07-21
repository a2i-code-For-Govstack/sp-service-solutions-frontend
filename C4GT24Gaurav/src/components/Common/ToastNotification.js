// src/common/ToastNotification.js
import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, note) => {
  const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case 'success':
      toast.success(note, config);
      break;
    case 'error':
      toast.error(note, config);
      break;
    case 'info':
      toast.info(note, config);
      break;
    case 'warning':
      toast.warn(note, config);
      break;
    default:
      toast(note, config);
      break;
  }
};

// Attach showToast to the window object
window.showToast = showToast;

const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
};

export default ToastNotification;
