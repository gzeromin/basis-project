import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
  
  const onClickHandler = () => {
    axios.get('/api/user/logout').then(res => {
      if(res.data.success) {
        props.history.push("/login");
      } else {
        alert("fail to logout");
      }
    });
  }

  return (
    <div>
      LandingPage
      <button onClick={onClickHandler}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(LandingPage);
