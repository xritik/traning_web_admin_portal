import { useState } from "react";

const LoginPage = ({setLoggedinAdmin, navigate}) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login',{
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
      <div className="loginSection">
        <div>
          <div className="loginHeading">Login</div>
          {message && <p style={{textAlign:'center', color:'red'}}>{message}</p>}
        </div>
        <form onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
          <div>
            <label style={{marginLeft:'5px'}} htmlFor="username">Name*</label>
            <div style={{display:'flex', justifyContent:'center'}}>
              <input
                type="text"
                id="username"
                name="username"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label style={{marginLeft:'5px'}} htmlFor="password">Password*</label>
            <div style={{display:'flex', justifyContent:'center'}}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <span className="showPassword">Show Password <input type='checkbox' onChange={() => setShowPassword(!showPassword)} /></span>
          </div>

          <div className="buttonDiv"><button className="loginButton" type="submit">Login</button></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;