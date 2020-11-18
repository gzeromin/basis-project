import React from 'react'
import axios from 'axios'
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function NavBar(props) {

  const logoutHandler = () => {
    axios.get('/api/user/logout').then(res => {
      if(res.data.success) {
        props.history.push("/login");
      } else {
        alert("fail to logout");
      }
    });
  }

  return (
    <div className='nav'>
      NavBar
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(NavBar)
