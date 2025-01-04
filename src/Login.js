import { useState } from "react";
const DelvexLogo = require('./img/delvexcommunity_logo-removebg-preview.png')

const LoginPage = ({setLoggedinAdmin, navigate}) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ name, password })
      });
      const data = await response.json();

      if(response.ok){
        setMessage(data.message)
        setLoggedinAdmin(name)
        localStorage.setItem('loggedinAdmin', name)
        navigate('/dashboard')
      }else{
        setMessage(data.message)
        navigate('/login')
      }
    } catch (error) {
      navigate('/login');
      setMessage('Something went wrong!!')
      console.error("Error logging in:", error);
    }
  }

  return (
    <div className="loginPage">
      <div className="loginn">
        <span>
          <img src={DelvexLogo} alt="logo"/>
        </span>
        <span style={{padding:'0px 15px'}}>Welcome to <b style={{marginLeft:'3px', cursor:'pointer'}}>Delvex</b></span>
      </div>
      <div className="loginSection">
        <div className="loginHeading">Login</div>
        {message && <p style={{textAlign:'center', color:'red', margin:'0px'}}>{message}</p>}
        <form onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
          <div className="inputs">
            <span>Name:-</span>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John"
              required
              autoFocus
            />
          </div>

          <div className="inputs">
            <span>Password:-</span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="*******"
              required
            />
            <span className="togglePassword">
              <i className={`bx ${showPassword ? "bxs-show" : "bxs-hide"}`} onClick={() => setShowPassword(!showPassword)}></i>
            </span>
            {/* <span className="showPassword">Show Password <input type='checkbox' onChange={() => setShowPassword(!showPassword)} /></span> */}
          </div>

          <div className="buttonDiv"><button className="loginButton" type="submit">Login</button></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;