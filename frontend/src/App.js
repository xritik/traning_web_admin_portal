import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AddNewUser from './AddNewUser';
import AllUsers from './AllUsers';

function App() {
  const navigate = useNavigate();
  const [loggedinAdmin, setLoggedinAdmin] = useState(localStorage.getItem('loggedinAdmin') || '');
  const [message, setMessage] = useState('');
  const HOST = `${window.location.hostname}`;
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
        <Route path="/" element={<Login HOST={HOST} setLoggedinAdmin={setLoggedinAdmin} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/login" element={<Login HOST={HOST} setLoggedinAdmin={setLoggedinAdmin} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/dashboard" element={<Dashboard HOST={HOST} logout={logout} navigate={navigate} message={message} setMessage={setMessage} />} />
        <Route path="/add_new_user" element={<AddNewUser HOST={HOST} logout={logout} navigate={navigate} />} />
        <Route path="/all_users" element={<AllUsers HOST={HOST} logout={logout} navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;