import React from 'react';

interface CodeSandboxEmbedProps {
  src: string;
}

const Sandbox: React.FC<CodeSandboxEmbedProps> = ({ src }) => {
  const embeddedSrc = `${src}?embed=&fontsize=14&hidenavigation=1&initialpath=/`;

  return (
    <div style={{ maxWidth: '100%' }}>
      <iframe
        style={{
          width: "100%",
          height: 900,
          outline: "1px solid #252525",
          border: 0,
          borderRadius: 8,
          marginBottom: 16,
          zIndex: 100
        }}
        src={embeddedSrc}
      ></iframe>
    </div>
  );
};

export default Sandbox;
