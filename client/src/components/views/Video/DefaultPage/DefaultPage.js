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
        key={index}
      >
        <a href={`/video/detail?id=${video._id}`}>
          <img alt='thumbnail' src={`http://localhost:9090/${video.thumbnail}`} />
          <div className="duration">
            <span>{minutes}:{seconds}</span>
          </div>
        </a>
        <br/>
        <img alt='avatar' src={video.writer.image} />
        <span>{video.title}</span>
        <span>{video.writer.name}</span>
        <br/>
        <span>{video.views}</span>
        - <span>{moment(video.createAt).format('MMM Do YY')}</span>
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
