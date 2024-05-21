import React from 'react';
import { useLocation } from 'react-router-dom';
import Certificate from './Certificate';

const CertificatePage: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <div>No user information available</div>;
  }

  return <Certificate user={user} />;
};

export default CertificatePage;
