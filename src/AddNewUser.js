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
              {message && <p style={{textAlign:'center', color:'red'}}>{message}</p>}
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleAddUser() }}>
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

              <div>
                <label style={{marginLeft:'5px'}} htmlFor="password">Confirm Password*</label>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
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