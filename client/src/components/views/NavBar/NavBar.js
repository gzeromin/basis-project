import React from 'react'
import axios from 'axios'
import style from './NavBar.module.scss';
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
      <Link 
        className={style['login-area']}
        to="/login"
      >
        <i className='material-icons'>login</i>
      </Link>
    )
  } else {
    login = (
      <i 
        className={'material-icons '+style['login-area']}
        onClick={logoutHandler}
      >
        logout
      </i>
    )
  }

  return (
    <div className={style['nav']}>
      {user.userData && user.userData.isAdmin
        && <Link to="/master/home">Master</Link>
      }
      <Link to="/video/home">Video</Link>
      &nbsp;
      <Link to="/movie/home">Movie</Link>
      {login} 
    </div>
  )
}

export default withRouter(NavBar)
