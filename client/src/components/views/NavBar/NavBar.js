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
      <div className={style.inline}>
        <i 
          className={`material-icons ${style['login-area']}`}
          onClick={logoutHandler}
          >
          logout
        </i>
        {user.userData && user.userData.isAdmin
          &&  <Link to="/master/home">
                <i 
                  className={`material-icons ${style['login-area']}`}
                >
                  admin_panel_settings
                </i>
              </Link>
        }
        <Link to="/personal/home">
          <i 
            className={`material-icons ${style['login-area']}`}
          >
            account_circle
          </i>
        </Link>
      </div>
    )
  }

  return (
    <div className={style['nav']}>
      <Link to="/book/home">Book</Link>
      <Link to="/video/home">Video</Link>
      <Link to="/movie/home">Movie</Link>
      <Link to="/shop/home">Shop</Link>
      {login} 
    </div>
  )
}

export default withRouter(NavBar)
