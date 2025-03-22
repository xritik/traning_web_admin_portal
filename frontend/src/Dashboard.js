import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
const DelvexLogo = require('./img/delvexcommunity_logo-removebg-preview.png')

const Dashboard = ({logout, navigate}) => {
  const loggedinAdmin = localStorage.getItem('loggedinAdmin');

  useEffect (() => {
    if(!loggedinAdmin){
        localStorage.removeItem('loggedinAdmin');
        navigate('/login')
        console.log(loggedinAdmin);
    }
  }, [ navigate ]);


  return (
    <div className='dashboardSection'>
      <div className='dashboardPage'>
        <nav>
          <div className='nav'>
            <div className='nav1'>
              <img src={DelvexLogo} alt='logo' style={{width:'65px'}}/>
              <span className='brandName'>DELVEX</span>
            </div>
            <div className='nav2'>
              <Link className='link' to={'/all_users'}>All users</Link>
              <Link className='link' to={'/add_new_user'} >Add new user</Link>
            </div>
            <div className='nav3'>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </nav>
        <div className='dashboard'>
          <div className='part1'>Welcome to</div>
          <div className='part2'>Admin pannel</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard