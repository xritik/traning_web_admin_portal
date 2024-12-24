import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const navigate = useNavigate();
  const [loggedinAdmin, setLoggedinName] = useState(localStorage.getItem('loggedinAdmin') || '');
  const [message, setMessage] = useState('');
  console.log('loggedinAdmin:- ',loggedinAdmin);

  useEffect(() => {
    if (loggedinAdmin) {
      localStorage.setItem('loggedinAdmin', loggedinAdmin);
    } else {
      localStorage.removeItem('loggedinAdmin');
    }
  }, [loggedinAdmin]);

  const logout = () => {
    localStorage.removeItem('loggedinAdmin');
    navigate('/login');
    setMessage('Successfully logged out')
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoggedinName={setLoggedinName} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/login" element={<Login setLoggedinName={setLoggedinName} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/dashboard" element={<Dashboard logout={logout} navigate={navigate} message={message} setMessage={setMessage} />} />
      </Routes>
    </div>
  );
}

export default App;