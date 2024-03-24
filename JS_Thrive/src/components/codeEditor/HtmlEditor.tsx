import React, { useRef, useState, useEffect } from 'react';
import AceEditor from 'react-ace';

// Import the required scripts and styles for Ace Editor
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';

interface HtmlEditorProps {
  defaultCode: string;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ defaultCode }) => {
  const [code, setCode] = useState(defaultCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Initialize the code with defaultCode when the component mounts
    setCode(defaultCode);
  }, [defaultCode]); // This will re-run if defaultCode changes

  const executeCode = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const iframeDoc = iframeRef.current.contentWindow.document;
      iframeDoc.open();
      // Include a style tag to apply the Poppins font
      const style = `<style>body { font-family: 'Poppins', sans-serif; }</style>`;
      iframeDoc.write(style + code); // Apply the style along with the user's code
      iframeDoc.close();
    } else {
      console.error('Failed to access iframe content window');
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '20px', marginBottom: '20px' }}>
      <AceEditor
        mode="html"
        theme="chaos"
        onChange={(newValue) => setCode(newValue)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={code} // Ensure the editor displays the current state
        width="calc(50% - 10px)"
        height="200px"
      />
      <div style={{ position: 'relative', width: 'calc(50% - 10px)', height: '200px' }}>
        <iframe
          ref={iframeRef}
          style={{ width: '100%', height: '100%', backgroundColor: "whitesmoke",fontFamily:"arial" }}
          title="code-output"
        ></iframe>
        <button
          onClick={executeCode}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 9999,
            padding: '5px 10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default HtmlEditor;
