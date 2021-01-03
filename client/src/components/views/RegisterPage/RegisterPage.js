import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Message from './Sections/Message';
import style from './RegisterPage.module.scss';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [Messages, setMessages] = useState([]);

  const InterviewText = [
    '안녕^^ 간단한 가입 인터뷰 시작할게. 이름이나 별명 알려줘~',
    `이름 ${Name}로 등록해도 괜찮아?(Y/N)`,
    '그럼 다시 입력해봐',
    '메일 주소 알려줭',
    '이 메일주소 맞앙?',
    '그럼 메일 주소 다시 적어줭',
    '비밀번호는 뭘로 할끄양?',
    '맞게 썻나 다시 써봐바',
    '헐 잘못썼는데? 다시 써봐바',
    '나한테 하고싶은 말 있엉?',
    '그럼 메일 오면 url타고 다시 들어왕. 방문해줘서 고마웡 ^-^**'
  ];
  const [InterviewOrder, setInterviewOrder] = useState(0);
  const [TypeRadio, setTypeRadio] = useState(false);
  const [RadioValue, setRadioValue] = useState(null);

  useEffect(() => {
    console.log(InterviewOrder);
    switch(InterviewOrder) {
      case 1: setTypeRadio(true);  console.log('type chgd'); break;
    }

    eventHandler(InterviewOrder);

  }, [InterviewOrder]);

  const saveMessage = (conversation) => {
    const newMsg = Messages.concat(conversation);
    setMessages(newMsg);
    console.log(conversation);
    console.log(newMsg);
    console.log(Messages);

  }

  const textHandler = (text) => {
    
    let conversation = {
      who: 'user',
      text
    }

    switch(InterviewOrder) {
      case 0: 
        setName(text);
        break;
      case 1:
        break;
      default: 
        break;
    }
    saveMessage(conversation);
    setInterviewOrder(InterviewOrder + 1);
  }

  const eventHandler = (order) => {
    console.log(order);
    const text = InterviewText[order];
    console.log(text);
    let conversation = {
      who: 'jmin',
      text
    }

    saveMessage(conversation);
  }

  const keyPressHandler = (e) => {
    if(e.key === 'Enter') {
      if(!e.target.value) {
        return alert('you need to type some first');
      }

      textHandler(e.target.value);

      e.target.value = '';
    }
  }

  const radioHandler = (v) => {
    console.log(v);
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

  const renderOneMessage = (message, i) => {
    return  <Message 
              key={i}
              who={message.who}
              text={message.text} 
            />
  };

  let renderMessage = () => {
    if(Messages) {
      return Messages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    }

    return null;
  };

  let inputBox;
  if(!TypeRadio) {
    inputBox =  <input 
                  className={style['register-box-input']}
                  type='text'
                  placeholder='Send a message...☆☆'
                  onKeyPress={keyPressHandler}
                />
  } else {
    inputBox =  <div className={style['register-box-input']}>
                  <input 
                    type='radio'
                    value='Y'
                    onChange={radioHandler}
                  /> Y
                  <input 
                    type='radio'
                    value='N'
                    onChange={radioHandler}
                  /> N
                  <button onClick={keyPressHandler}>선택</button>
                </div>
  }

  return (
    <div className={style.register}>
      <div className={style['register-title']}>
        ☆ INTERVIEW ☆
      </div>
      <div className={style['register-box']}>
        <div className={style['register-box-board']}>
          {renderMessage()}
        </div>
        <input 
          className={style['register-box-input']}
          type='text'
          placeholder='Send a message...☆☆'
          onKeyPress={keyPressHandler}
        />
      </div>
    </div>
  )
}

export default withRouter(RegisterPage);
