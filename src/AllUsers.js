import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const DelvexLogo = require('./img/delvexcommunity_logo-removebg-preview.png')

const AllUsers = ({logout, navigate}) => {

  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState('');
  const loggedinAdmin = localStorage.getItem('loggedinAdmin');
  
  useEffect (() => {
    if(!loggedinAdmin){
        localStorage.removeItem('loggedinAdmin');
        navigate('/login')
        console.log(loggedinAdmin);
    }else{
      const getUsers = async () => {
        try{
          const response = await fetch('http://localhost:5000/user')
          const data = await response.json()
    
          if(response.ok){
            setAllUsers(data.users);
          }else{
            setMessage('Something went wrong');
          }
        }catch (err) {
          console.log('Error fetching users', err);
        }
      }
      getUsers();
    }
  }, [ navigate ]);


  return (
    <div className='allUsersSection'>
      <nav>
        <div className='nav'>
          <div className='nav1'>
            <img src={DelvexLogo} alt='logo' style={{width:'65px'}}/>
            <span className='brandName'>DELVEX</span>
          </div>
          <div className='nav2'>
            <Link className='link' to={'/dashboard'}>Dashboard</Link>
            <Link className='link' to={'/add_new_user'} >Add new user</Link>
          </div>
          <div className='nav3'>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className='usersSection'>
        <h1 className='allUsersHeading'>Your all added users</h1>
        <div className='dataTable'>
          <table>
            <thead>
              <tr>
                <th>S. no.</th>
                <th>Name</th>
                <th>Password</th>
                <th>Role</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {
                allUsers.map((user, i) => {
                  return(
                    <tr key={user._id}>
                      <td>{i + 1}.</td>
                      <td>{user.name}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllUsers