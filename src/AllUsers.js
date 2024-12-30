import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const DelvexLogo = require('./img/delvexcommunity_logo-removebg-preview.png')

const AllUsers = ({logout, navigate}) => {

  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserName, setEditingUserName] = useState('');
  const [editingUserPassword, setEditingUserPassword] = useState('');
  const [editingUserRole, setEditingUserRole] = useState('');
  const loggedinAdmin = localStorage.getItem('loggedinAdmin');

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
  
  useEffect (() => {
    if(!loggedinAdmin){
        localStorage.removeItem('loggedinAdmin');
        navigate('/login')
        console.log(loggedinAdmin);
    }else{
      getUsers();
    }
  }, [ navigate, loggedinAdmin ]);

  
  const handleToEdit = (user) => {
    setEditingUserId(user._id);
    setEditingUserName(user.name);
    setEditingUserPassword(user.password);
    setEditingUserRole(user.role);
  }
  
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditingUserName('');
    setEditingUserPassword('');
    setEditingUserRole('');
  }

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/user',{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({editingUserId, editingUserName, editingUserPassword, editingUserRole})
      });
      const data = await response.json();
      if(response.ok) {
        alert(data.message);
        handleCancelEdit();
        getUsers();
      }else if(response.status === 404){
        alert(data.message)
        handleCancelEdit();
      }else if(response.status === 500){
        alert(data.message)
        handleCancelEdit();
      } else{
        alert('Something went wrong, Please try again!!')
        handleCancelEdit();
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong, Please try again!!')
      handleCancelEdit();
    }
  }

  const handleDelete = async (user) => {
    const confirmation = window.confirm(`Are you sure to delete user '${user.name}'`)

    if(confirmation){
      try {
        const response = await fetch(`http://localhost:5000/user/${user._id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });      
        const data = await response.json();
        if(response.ok) {
          alert(data.message);
          handleCancelEdit();
          getUsers();
        }else if(response.status === 404){
          alert(data.message)
          handleCancelEdit();
        }else if(response.status === 500){
          alert(data.message)
          handleCancelEdit();
        } else{
          alert('Something went wrong, Please try again!!')
          handleCancelEdit();
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong, Please try again!!')
        handleCancelEdit();
      }
    }
    
  }


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
                <th>To Edit</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, i) => (
                <tr key={user._id} onClick={() => handleToEdit(user)}>
                  <td>{i + 1}</td>
                  {editingUserId === user._id ? (
                    <>
                      {/* Render inputs for editable row */}
                      <td style={{padding:'0px'}}>
                        <input
                          type="text"
                          name="name"
                          autoFocus
                          value={editingUserName}
                          onChange={(e) => setEditingUserName(e.target.value)}
                          size={editingUserName.length || 5}
                        />
                      </td>
                      <td style={{padding:'0px'}}>
                        <input
                          type="text"
                          name="password"
                          value={editingUserPassword}
                          onChange={(e) => setEditingUserPassword(e.target.value)}
                          size={editingUserPassword.length || 5}
                        />
                      </td>
                      <td style={{padding:'0px'}}>
                        {/* <input
                          type="text"
                          name="role"
                          value={editingUserRole}
                          onChange={(e) => setEditingUserRole(e.target.value)}
                          size={editingUserRole.length || 5}
                        /> */}
                        <select
                            className='selectRole'
                            required
                            name='selectRole'
                            value={editingUserRole}
                            onChange={(e) =>setEditingUserRole(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <option value="read">Read</option>
                            <option value="write">Write</option>
                            <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td style={{ padding:'0px'}}>
                        <button style={{backgroundColor:'green'}} className='saveButton' onClick={(e) => {e.stopPropagation(); handleSave(); }}>Save</button>
                        <button style={{backgroundColor:'rgb(239, 80, 80)'}} className='cancelButton'onClick={(e) => { e.stopPropagation(); handleCancelEdit(); }}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.name}</td>
                      {/* <td>{user.password}</td> */}
                      <td>*******</td>
                      <td>{user.role}</td>
                      <td style={{padding:'0px'}}>
                        <button style={{backgroundColor:'rgb(255, 255, 91)'}} className='editButton' onClick={() => handleToEdit(user)}>Edit</button>
                        <button style={{backgroundColor:'rgb(239, 80, 80)'}} className='editButton' onClick={(e) => { e.stopPropagation(); handleDelete(user)}}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllUsers