import React from 'react';
import style from './Message.module.scss';

function Message(props) {

  return (
    <div className={style.message}>
      <div className={`${
        props.who === 'user' ?
        style.user : style.jmin
      }`}>
        {props.text}
      </div>
    </div>
  )
}

export default Message;
