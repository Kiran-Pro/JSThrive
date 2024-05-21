import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Certificate.css";
import stamp from "../../assets/stamp.png";
import sign from "../../assets/signature.png";

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
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: [canvas.width * 0.264583, canvas.height * 0.264583],
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("certificate.pdf");
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-content">
          <h1>Certificate of Completion</h1>
          <p>This certificate is proudly presented to</p>
          <h2>{user.displayName || "Unknown"}</h2>
          <p>For successfully completing the</p>
          <h3>JSThrive: JavaScript Basics Learning</h3>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <img
            width={150}
            style={{ position: "relative", left: "480px" }}
            src={sign}
            alt=""
          />
          <img
            width={200}
            style={{ marginTop: "-6rem", marginLeft: "19rem" }}
            src={stamp}
            alt=""
          />
        </div>
      </div>
      <button className="button" onClick={generatePDF}>
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
