import React, { useState, useEffect } from 'react';
import './Html.css';
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/themes/prism.css';

interface HtmlEditorProps {
  initialHtml: string; // Initial HTML code
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ initialHtml }) => {
  const [html, setHtml] = useState(initialHtml);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(event.target.value);
  };

  useEffect(() => {
    // Call Prism.highlightAll() after component mount to highlight code
    Prism.highlightAll();
  }, [html]); // Re-highlight code whenever html changes

  return (
    <div className="html-editor">
      <div className="editor">
        <div className="editor-header">HTML Editor</div>
        <textarea
          className="code"
          value={html}
          onChange={handleChange}
          placeholder="Write your HTML code here..."
        ></textarea>
      </div>
      <div className="preview">
        <div className="preview-header">Preview</div>
        <div className="preview-content">
          <iframe
            title="Preview"
            className="preview-frame"
            srcDoc={html}
            sandbox="allow-scripts"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HtmlEditor;
