import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import style from './LoginPage.module.scss';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent page refresh
    
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(res => {
        if(res.payload.success) {
          window.localStorage.setItem('userId', res.payload.data._id);
          props.history.push('/');
        } else {
          alert(res.payload.message);
        }
      });
  }

  return (
    <form 
      className={style['login']}
      onSubmit={onSubmitHandler}
    >
      <label>Email</label>
      <input
        className={style['login-input']}
        type="email" 
        value={Email} 
        onChange={onEmailHandler} 
      />
      <br/>
      <label>Password</label>
      <input 
        className={style['login-input']}
        type="password" 
        value={Password} 
        onChange={onPasswordHandler} 
      />
      <br />
      <button 
        className={style['login-button']}
        type="submit"
      >
        Login
      </button>
      <Link
        className={style['login-button']}
        to="/register"
      >
        Register
      </Link>
    </form>
  )
}

export default withRouter(LoginPage);
