import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { Link, withRouter } from 'react-router-dom';
import Message from './Sections/Message';
import style from './RegisterPage.module.scss';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Comment, setComment] = useState('');

  const [Messages, setMessages] = useState([]);

  const [FailRegister, setFailRegister] = useState("");

  const InterviewText = [
    '안녕^^ 간단한 가입 인터뷰 시작할게. 이름이나 별명 알려줘~',
    `이름 ${Name}로 등록해도 괜찮아?(Y/N)`,
    '그럼 다시 입력해봐',
    '메일 주소 알려줭',
    `메일주소 ${Email} 맞앙?`,
    '그럼 메일 주소 다시 적어줭',
    '비밀번호는 뭘로 할끄양?',
    '맞게 썻나 다시 써봐바',
    '헐 잘못썼는데? 다시 써봐바',
    '헐 잘못썼는데? 다시 써봐바',
    '나한테 하고싶은 말 있엉?',
    '그럼 메일 오면 url타고 다시 들어왕. 방문해줘서 고마웡 ^-^**',
    `헐, 가입 실패했어. 이유는 아마... ${FailRegister}..?!?! 다시 도전하겠오?`,
    '그럼 이만 안뇽~~'
  ];
  const [InterviewOrder, setInterviewOrder] = useState(0);
  const [InputType, setInputType] = useState('text');

  useEffect(() => {
    switch(InterviewOrder) {
      case 1: 
      case 4:
      case 12:
        setInputType('radio');
        break;
      case 3:
      case 5:
        setInputType('email');
        break;
      case 6: 
      case 7:
      case 8:
        setInputType('password');
        break;
      case 11:
      case 13:
        setInputType('link');
        break;
      default: 
        setInputType('text');
        break;
    }
    eventHandler(InterviewOrder);
  }, [InterviewOrder]);

  const saveMessage = (conversation) => {
    if(InputType === 'password' && conversation.who === 'user') {
      let newText = '';
      for(var i=0; i<conversation.text.length; i++) {
        newText = newText + '●';
      }
      conversation.text = newText;
    }
    setMessages(Messages.concat(conversation));

    setTimeout(() => {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }, 3);
  }

  const textHandler = (text) => {
    
    let conversation = {
      who: 'user',
      text
    }
    saveMessage(conversation);
    switch(InterviewOrder) {
      case 0:
      case 2:
        setName(text);
        setInterviewOrder(1);
        break;
      case 1:
      case 4:
        if(text === 'Y') {
          setInterviewOrder(InterviewOrder + 2);
        } else if(text === 'N') {
          setInterviewOrder(InterviewOrder + 1);
        }
        break;
      case 3:
      case 5:
        setEmail(text);
        setInterviewOrder(4);
        break;
      case 6:
        setPassword(text);
        setInterviewOrder(7);
        break;
      case 7:
      case 8:
      case 9:
        if(text === Password) {
          setInterviewOrder(10);
        } else {
          if(InterviewOrder === 8) {
            setInterviewOrder(9);
          } else {
            setInterviewOrder(8);
          }
        }
        break;
      case 10:
        setComment(text);
        onSubmitHandler();
        break;
      case 12:
        if(text === 'Y') {
          setInterviewOrder(0);
        } else if(text === 'N') {
          setInterviewOrder(13);
        }
        break;
      default:
        break;
    }
  }

  const eventHandler = (order) => {
    const text = InterviewText[order];
    let conversation = {
      who: 'jmin',
      text
    }

    saveMessage(conversation);
  }

  const inputHandler = (e) => {
    var mailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/;

    switch(InputType) {
      case 'radio':
        textHandler(radioValue);
        break;
      case 'email':
        if(e.key === 'Enter') {
          if(!e.target.value) {
            return alert('you need to type some first');
          } else if(!e.target.value.match(mailFormat)) {
            return alert('you need to type mail address sample@mail.com');
          }
    
          textHandler(e.target.value);
    
          e.target.value = '';
        }
        break;
      default:
        if(e.key === 'Enter') {
          if(!e.target.value) {
            return alert('you need to type some first');
          }
    
          textHandler(e.target.value);
    
          e.target.value = '';
        }
        break;
    }
  }

  let radioValue = 'Y';
  const radioHandler = (e) => {
    radioValue = e.target.value;
  }

  const onSubmitHandler = (event) => {
    //event.preventDefault(); // prevent page refresh
    
    let body = {
      email: Email,
      name: Name,
      password: Password,
      comment: Comment
    }


    dispatch(registerUser(body))
      .then(res => {
        if(res.payload.success) {
          setInterviewOrder(11);
        } else {
          let errMsg = '';
          for(var err in res.payload.err.keyValue) {
            errMsg = errMsg + err + ' ';
          }
          setFailRegister(errMsg);
          setInterviewOrder(12);
        }
      });

  }

  let renderMessage = () => {
    if(Messages) {
      return Messages.map((message, i) => {
        return <Message 
                  key={i}
                  who={message.who}
                  text={message.text} 
                />;
      });
    }

    return null;
  };

  let inputBox;
  if(InputType === 'radio') {
    inputBox =  <div className={style['register-box-radio']}>
                  <div className={style['register-box-radio-item']}>
                    <input 
                      type='radio'
                      name='yn'
                      value='Y'
                      checked
                      onChange={radioHandler}
                    /> Y
                  </div>
                  <div className={style['register-box-radio-item']}>
                    <input 
                      type='radio'
                      name='yn'
                      value='N'
                      onChange={radioHandler}
                    /> N
                  </div>
                  <button
                    className={style['register-box-radio-button']}
                    onClick={inputHandler}
                  >
                    선택
                  </button>
                </div>
  } else if(InputType === 'password') {
    inputBox =  <input 
                  className={style['register-box-text']}
                  type='password'
                  placeholder='password...☆☆'
                  onKeyPress={inputHandler}
                />
  } else if(InputType === 'email') {
    inputBox =  <input 
                  className={style['register-box-text']}
                  type='email'
                  placeholder='mail address...☆☆'
                  onKeyPress={inputHandler}
                />
  } else if(InputType === 'link') {
    inputBox =  <div className={style['register-box-link']}>
                  <Link to='/'>
                    메인페이지로 가기
                  </Link>
                </div>
  } else {
    inputBox =  <input 
                  className={style['register-box-text']}
                  type='text'
                  placeholder='Send a message...☆☆'
                  onKeyPress={inputHandler}
                />
  }
  const boxRef = useRef(null);
  return (
    <div className={style.register}>
      <div className={style['register-title']}>
        ☆ INTERVIEW ☆
      </div>
      <div className={style['register-box']}>
        <div 
          className={style['register-box-board']}
          ref={boxRef}
        >
        {renderMessage()}
        </div>
        {inputBox}
      </div>
    </div>
  )
}

export default withRouter(RegisterPage);
