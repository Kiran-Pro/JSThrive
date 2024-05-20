import React, { useState } from 'react';
import './Mini.css'; 

interface MiniIDEProps {
  defaultHTML?: string;
  defaultCSS?: string;
  defaultJS?: string;
}

const Mini_IDE: React.FC<MiniIDEProps> = ({ defaultHTML, defaultCSS, defaultJS }) => {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [js, setJs] = useState(defaultJS);

  const handleHtmlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(event.target.value);
  };

  const handleCssChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCss(event.target.value);
  };

  const handleJsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJs(event.target.value);
  };

  return (
    <div className="codepen-container2">
      <div className="editors2">
        <div className="editor2">
          <div className="editor-header2">HTML</div>
          <textarea
            className="code2 html-code2"
            value={html}
            onChange={handleHtmlChange}
            placeholder="Write your HTML code here..."
          ></textarea>
        </div>
        <div className="editor2">
          <div className="editor-header2">CSS</div>
          <textarea
            className="code2 css-code2"
            value={css}
            onChange={handleCssChange}
            placeholder="Write your CSS code here..."
          ></textarea>
        </div>
        <div className="editor2">
          <div className="editor-header2">JavaScript</div>
          <textarea
            className="code2 js-code2"
            value={js}
            onChange={handleJsChange}
            placeholder="Write your JavaScript code here..."
          ></textarea>
        </div>
      </div>
      <div className="preview2">
        <iframe
          title="CodePen Preview"
          className="preview-frame2"
          srcDoc={`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`}
        ></iframe>
      </div>
    </div>
  );
};

export default Mini_IDE;
