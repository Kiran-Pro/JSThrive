import { Link } from 'react-router-dom';
import './HomePage.css';
import Logout from '../UserAuthentication/Logout';
import CodeEditor from '../../components/codeEditor/codeEditor';
import { useState } from 'react';

const HomePage = () => {
  const [code, setCode] = useState<string>('function hello() {\n  console.log("Hello, world!");\n}');

  const handleChange = (value: string) => {
    setCode(value);
  };
  return (
    
    <div className="home-page container">
      <div className="card">
        <h1>Hola JSThrivers!</h1>
        <p>Embark on your journey to learn JavaScript with interactive lessons and challenges _/\_</p>
        <h3>Buckle up fellas :) </h3>
        <h3>If you don't have an account Register here</h3>
        <Link to="/register">
      <button>Register</button>
    </Link>
    <h3>If you have account Login here</h3>
    <Link to="/login">
      <button>Login</button>
    </Link>
   <Logout/>
      </div>
      <div>
      <h1>Code Editor Example</h1>
      <CodeEditor defaultValue={code} onChange={handleChange} />
    </div>
    </div>
  );
};

export default HomePage;
