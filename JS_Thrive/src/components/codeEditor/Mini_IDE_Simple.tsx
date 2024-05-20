import React, { useState } from 'react';
import './Mini_simple.css'; 

interface Mini_Simple{
  htmlCode:string;
  cssCode?:string;
}

const Mini_IDE_Simple: React.FC<Mini_Simple> = ({htmlCode, cssCode}) => {
  const [html, setHtml] = useState(htmlCode);
  
  const [css, setCss] = useState(cssCode);

  const handleHtmlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(event.target.value);
  };

  const handleCssChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCss(event.target.value);
  };

  return (
    <div className="codepen-container">
      <div className="editors">
        <div className="editor">
          <div className="editor-header">HTML</div>
          <textarea
            className="code html-code"
            value={html}
            onChange={handleHtmlChange}
            placeholder="Write your HTML code here..."
          ></textarea>
        </div>
        <div className="editor">
          <div className="editor-header">CSS</div>
          <textarea
            className="code css-code"
            value={css}
            onChange={handleCssChange}
            placeholder="Write your CSS code here..."
          ></textarea>
        </div>
      </div>
      <div className="preview">
        <iframe
          title="CodePen Preview"
          className="preview-frame"
          srcDoc={`<html><head><style>${css}</style></head><body>${html}</body></html>`}
        ></iframe>
      </div>
    </div>
  );
};

export default Mini_IDE_Simple;
