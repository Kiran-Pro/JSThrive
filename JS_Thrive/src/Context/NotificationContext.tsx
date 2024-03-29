import React, { createContext, useContext, useState, ReactNode } from 'react';
import './index.css'

interface NotificationContextType {
  message: string;
  showMessage: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showMessage = (newMessage: string) => {
    setMessage(newMessage);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000); // Hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ message, showMessage }}>
      {children}
      {visible && <NotificationBanner message={message} />}
    </NotificationContext.Provider>
  );
};

const NotificationBanner: React.FC<{message: string}> = ({ message }) => (
  <div className="notification-banner">
    {message}
  </div>
);
