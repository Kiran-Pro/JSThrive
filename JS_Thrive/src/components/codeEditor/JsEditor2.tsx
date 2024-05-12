import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chaos';

interface CompactCodeEditorProps {
  defaultCode: string;
  onExecute: (code: string) => void;
}

const JsEditor2: React.FC<CompactCodeEditorProps> = ({ defaultCode, onExecute }) => {
  const [code, setCode] = useState(defaultCode);

  const executeCode = () => {
    if (onExecute) {
      onExecute(code);
    }
  };

  return (
    <div className="editor-container" style={{ margin: '20px auto', maxWidth: '600px', textAlign: 'center' }}>
      <AceEditor
        mode="javascript"
        theme="chaos"
        onChange={setCode}
        value={code}
        name="js-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="200px"
      />
      <button 
      className='button'
        onClick={executeCode} 
        style={{ 
          fontSize: '0.8rem', 
          padding: '0.5rem', 
          backgroundColor: 'var(--highlight-color)',
          color: 'white',
          marginTop: '10px'
        }}
      >
    Run it
      </button>
    </div>
  );
};

export default JsEditor2;