import React, { useRef, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

interface CodeEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue = '', onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<unknown>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const editor = CodeMirror.fromTextArea(textareaRef.current, {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'default'
      });

      editor.on('change', (cm) => {
        const value = cm.getValue();
        if (onChange) {
          onChange(value);
        }
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
    };
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current && defaultValue !== editorRef.current.getValue()) {
      editorRef.current.setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <textarea ref={textareaRef} defaultValue={defaultValue} />
    </div>
  );
};

export default CodeEditor;
