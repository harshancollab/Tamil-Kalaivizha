// import React, { useState, useEffect } from 'react';

// const Alert = ({ message, type = 'success', onClose, duration = 5000 }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     if (duration > 0) {
//       const timer = setTimeout(() => {
//         setIsVisible(false);
//         if (onClose) setTimeout(onClose, 300); // Allow time for fade out animation
//       }, duration);
//       return () => clearTimeout(timer);
//     }
//   }, [duration, onClose]);

//   const handleClose = () => {
//     setIsVisible(false);
//     if (onClose) setTimeout(onClose, 300); // Allow time for fade out animation
//   };

//   // Color styles based on alert type
//   const colors = {
//     success: {
//       bg: 'bg-green-50',
//       border: 'border-green-400',
//       text: 'text-green-800',
//       icon: 'text-green-500'
//     },
//     error: {
//       bg: 'bg-red-50',
//       border: 'border-red-400',
//       text: 'text-red-800',
//       icon: 'text-red-500'
//     },
//     warning: {
//       bg: 'bg-yellow-50',
//       border: 'border-yellow-400',
//       text: 'text-yellow-800',
//       icon: 'text-yellow-500'
//     },
//     info: {
//       bg: 'bg-blue-50',
//       border: 'border-blue-400',
//       text: 'text-blue-800',
//       icon: 'text-blue-500'
//     }
//   };

//   const color = colors[type] || colors.info;

//   return (
//     <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//       <div className={`${color.bg} ${color.border} ${color.text} border rounded-md p-4 shadow-md max-w-md flex items-start`}>
//         <div className="flex-shrink-0 mr-3">
//           {type === 'success' && (
//             <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//           )}
//           {type === 'error' && (
//             <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           )}
//           {type === 'warning' && (
//             <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//           )}
//           {type === 'info' && (
//             <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//           )}
//         </div>
//         <div className="flex-1 font-medium">{message}</div>
//         <button 
//           type="button" 
//           className={`ml-4 ${color.text} hover:${color.text} focus:outline-none`}
//           onClick={handleClose}
//         >
//           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };


// export default Alert



import React, { useState, useEffect } from 'react';

/**
 * Enhanced Alert component with optional confirmation buttons for delete operations
 * 
 * @param {string} message - Alert message text
 * @param {string} type - Alert type: 'success', 'error', 'warning', 'info', 'delete'
 * @param {function} onClose - Function to call when alert is closed
 * @param {number} duration - Auto-close duration in milliseconds, 0 to disable auto-close
 * @param {function} onConfirm - Function to call when confirmation button is clicked (for delete alerts)
 * @param {string} confirmText - Text for confirmation button (default: "Delete")
 * @param {string} cancelText - Text for cancel button (default: "Cancel")
 */
const Alert = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 5000, 
  onConfirm = null, 
  confirmText = "Delete", 
  cancelText = "Cancel" 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const isDeleteConfirm = type === 'delete' && onConfirm !== null;
  
  // For confirmation alerts, disable auto-close
  const effectiveDuration = isDeleteConfirm ? 0 : duration;

  useEffect(() => {
    if (effectiveDuration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) setTimeout(onClose, 300); // Allow time for fade out animation
      }, effectiveDuration);
      return () => clearTimeout(timer);
    }
  }, [effectiveDuration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300); // Allow time for fade out animation
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  // Color styles based on alert type
  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: 'text-green-500',
      button: 'bg-green-500 hover:bg-green-600'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: 'text-red-500',
      button: 'bg-red-500 hover:bg-red-600'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: 'text-yellow-500',
      button: 'bg-yellow-500 hover:bg-yellow-600'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: 'text-blue-500',
      button: 'bg-blue-500 hover:bg-blue-600'
    },
    delete: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: 'text-red-500',
      button: 'bg-red-500 hover:bg-red-600'
    }
  };

  const color = colors[type] || colors.info;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`${color.bg} ${color.border} ${color.text} border rounded-md p-4 shadow-md max-w-md`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {type === 'success' && (
              <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {(type === 'error' || type === 'delete') && (
              <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'warning' && (
              <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'info' && (
              <svg className={`w-5 h-5 ${color.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1 font-medium">{message}</div>
          {!isDeleteConfirm && (
            <button
              type="button"
              className={`ml-4 ${color.text} hover:${color.text} focus:outline-none`}
              onClick={handleClose}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Confirmation buttons for delete alerts */}
        {isDeleteConfirm && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              className="py-1 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`py-1 px-3 ${color.button} text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-500`}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;