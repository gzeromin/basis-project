import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import style from './DefaultPage.module.scss';

function DefaultPage(props) {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getVideos').then(res => {
      if(res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert('failed to get videos');
      }
    });
  }, []);
  
  const renderCards = Videos.map((video, index) => {
    if(!video.writer) return;
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    
    return (
      <div 
        key={index} className={style.card}
      >
        <div className={style.video}>
          <a href={`/video/detail?id=${video._id}`}>
            <img 
              className={style.thumbnail}
              alt='thumbnail' 
              src={`http://localhost:9090/${video.thumbnail}`} 
            />
            <div className={style.duration}>
              <span className={style['duration-text']}>{minutes}:{seconds}</span>
            </div>
          </a>
        </div>
        <div className={style.info}>
          <div className={style.left}>
            <img 
              className={style.avatar}
              alt='avatar' 
              src={`http://localhost:9090/${video.writer.image}`} 
            />
          </div>
          <div className={style.right}>
            <span className={style.title}>{video.title}</span>
            <span className={style.writer}>{video.writer.name}</span>
            <div className={style.foot}>
              <span className={style.views}>{video.views}回視聴</span>
              <span className={style.date}>{moment(video.createAt).format('MMM Do YY')}</span>
            </div>
          </div>
        </div>
      </div>
    ) 
  });

  return (
    <div className='overflow-y'>
      <div>Recommended</div>
      <hr/><br/>
      <div className={style.wrapper}>
        {renderCards}
      </div>
    </div>
  ) 
}

export default DefaultPage;
