import React from 'react'
import axios from 'axios'
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get('/api/user/logout').then(res => {
      if(res.data.success) {
        props.history.push("/login");
      } else {
        alert("fail to logout");
      }
    });
  }

  let login;
  if(user.userData && !user.userData.isAuth) {
    login = (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )
  } else {
    login = (
      <div>
        <Link to="/video/upload">Video</Link>
        <button
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className='nav'>
      NavBar
      {login}
      
    </div>
  )
}

export default withRouter(NavBar)
