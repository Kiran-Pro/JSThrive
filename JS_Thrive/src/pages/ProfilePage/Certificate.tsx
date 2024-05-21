import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Certificate.css';

interface User {
  displayName: string | null;
  email: string | null;
}

interface CertificateProps {
  user: User;
}

const Certificate: React.FC<CertificateProps> = ({ user }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const input = certificateRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
        pdf.save('certificate.pdf');
      });
    }
  };

  return (
    <div>
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-content">
          <h1>Certificate of Completion</h1>
          <p>This certificate is proudly presented to</p>
          <h2>{user.displayName || 'Unknown'}</h2>
          <p>For successfully completing the</p>
          <h3>JSThrive: JavaScript Basics Learning</h3>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <button onClick={generatePDF}>Download Certificate</button>
    </div>
  );
};

export default Certificate;
