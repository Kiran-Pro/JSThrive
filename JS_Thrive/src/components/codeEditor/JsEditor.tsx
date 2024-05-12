import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chaos';

interface CompactCodeEditorProps {
  defaultCode: string;
}

const JsEditor: React.FC<CompactCodeEditorProps> = ({ defaultCode }) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');

  const executeCode = () => {
    try {
      let logOutput = '';
      const originalConsoleLog = console.log;
      console.log = (...messages) => {
        logOutput += messages.join(' ');
      };

      new Function(code)();

      setOutput(logOutput);
      console.log = originalConsoleLog;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setOutput(error.toString());
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
    
      <AceEditor
        mode="javascript"
        theme="chaos"
        onChange={setCode}
        value={code}
        name="js-editor"
        editorProps={{ $blockScrolling: true }}
        width="50%"
        height="250px"
      />
      <div style={{ width: '48%', position: 'relative', minHeight: '150px', border: '1px solid #ccc', padding: '10px', paddingTop: '40px',backgroundColor:'white',color:"black",fontSize:"1.3rem" }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output}</pre>
        <button
          onClick={executeCode}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            padding: '5px 10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Execute Code
        </button>
      </div>
    </div>
  );
};

export default JsEditor;
