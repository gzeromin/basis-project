import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent page refresh
    
    let body = {
      email: Email,
      name: Name,
      password: Password
    }

    if(Password !== ConfirmPassword) {
      return alert('password != confirmPassword');
    }

    dispatch(registerUser(body))
      .then(res => {
        if(res.payload.success) {
          props.history.push('/login');
        } else {
          alert("Fail to sign up");
        }
      });

  }

  return (
    <form
      className='center'
      onSubmit={onSubmitHandler}
    >
      <label>Email</label>
      <input 
        className='center-input'
        type="email" 
        value={Email} 
        onChange={onEmailHandler} 
      />
      <br/>
      <label>Name</label>
      <input 
        className='center-input'
        type="text" 
        value={Name} 
        onChange={onNameHandler} 
      />
      <br/>
      <label>Password</label>
      <input 
        className='center-input'
        type="password" 
        value={Password} 
        onChange={onPasswordHandler} 
      />
      <br/>
      <label>Confirm Password</label>
      <input 
        className='center-input'
        type="password" 
        value={ConfirmPassword} 
        onChange={onConfirmPasswordHandler} 
      />
      <br />
      <button 
        className='center-button'
        type="submit"
      >
        Sign Up
      </button>
    </form>
  )
}

export default withRouter(RegisterPage);
