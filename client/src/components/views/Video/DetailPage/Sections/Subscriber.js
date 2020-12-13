import React, {useEffect, useState} from 'react'
import axios from 'axios';
import style from './Subscriber.module.scss';

function Subscriber(props) {
  
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom
    }
    if(Subscribed) {
      // when we are already subscribed
      axios.post('/api/subscribe/unSubscribe', subscribeVariables).then(res => {
        if(res.data.success) {
          setSubscribeNumber(SubscribeNumber - 1);
          setSubscribed(!Subscribed);
        } else {
          alert('Failed to unsubscribe');
        }
      })
    } else {
      // when we are not subscribed yet
      axios.post('/api/subscribe/subscribe', subscribeVariables).then(res => {
        if(res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert('Failed to subscribe');
        }
      })
    }
  }
  
  useEffect(() => {
    const subscribeNumberVariables = {
      userTo: userTo,
      userFrom: userFrom
    };
    axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables).then(res => {
      if(res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert('Failed to get subscriber Number');
      }
    });
    axios.post('/api/subscribe/subscribed', subscribeNumberVariables).then(res => {
      if(res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert('Failed to get Subscribed Information');
      }
    })
  }, []);

  return (
    <div>
      <button
        className={`${Subscribed? style.Subscribed : style.Subscribe}`}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscriber
