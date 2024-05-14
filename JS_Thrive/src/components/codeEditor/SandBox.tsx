import React from 'react';

interface CodeSandboxEmbedProps {
  src: string;
}

const Sandbox: React.FC<CodeSandboxEmbedProps> = ({ src }) => {
  const embeddedSrc = `${src}?embed=&fontsize=14&hidenavigation=1&initialpath=/`;

  return (
    <div className="sandbox-container" style={{ maxWidth: '100%' }}>
      <iframe
        src={embeddedSrc}
        style={{ width: '100%', height: '300px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
        title="CodeSandbox Sandbox"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Sandbox;
