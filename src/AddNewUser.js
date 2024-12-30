import React, { useEffect, useState } from 'react'
import girl_image  from './img/girl-laptop.png'
import { Link } from 'react-router-dom';

const AddNewUser = ({logout, navigate}) => {

  const loggedinAdmin = localStorage.getItem('loggedinAdmin');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  
  useEffect (() => {
    if(!loggedinAdmin){
        localStorage.removeItem('loggedinAdmin');
        navigate('/login')
        console.log(loggedinAdmin);
    }
  }, [ navigate ]);

  const handleAddUser = async () => {
    if(password === confirmPassword){
      try {
        const response = await fetch('http://localhost:5000/user',{
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({ name, password })
        });
        const data = await response.json();
  
        if(response.ok){
          alert('User successfully added!!')
          navigate('/dashboard')
        }else{
          setMessage(data.message)
          navigate('/add_new_user')
        }
      } catch (error) {
        navigate('/add_new_user');
        setMessage('Something went wrong!!')
        console.error("Error logging in:", error);
      }
    }else{
      setMessage('Password and confirm password are not same!!')
    }
  }


  return (
    <div className='add_new_user_section'>
      <div className='add_user_part1'>
        <span className='back'>
          <Link to={'/dashboard'}><i class='bx bx-arrow-back'></i></Link>
        </span>

        <div className='addUserPage'>
          <div className="addUserSection">
            <div>
              <div className="loginHeading">Add new user</div>
              {message && <p style={{textAlign:'center', color:'red', margin:'0px'}}>{message}</p>}
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleAddUser() }}>
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
              <div className="inputs">
                <span>Verify:-</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  required
                />
                <span className="togglePassword">
                  <i className={`bx ${showPassword ? "bxs-show" : "bxs-hide"}`} onClick={() => setShowPassword(!showPassword)}></i>
                </span>
                {/* <span className="showPassword">Show Password <input type='checkbox' onChange={() => setShowPassword(!showPassword)} /></span> */}
              </div>

              <div className="addUserButton"><button type="submit">Add user</button></div>

            </form>
          </div>
        </div>

      </div>
      <div className='add_user_part2'>
        <img src={girl_image} alt='img'/>
      </div>
    </div>
  )
}

export default AddNewUser