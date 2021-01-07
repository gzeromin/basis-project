import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './SideVideo.module.scss';

function SideVideo() {
  
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getVideos').then(res => {
      if(res.data.success) {
        setSideVideos(res.data.videos);
      } else {
        alert('Failed to get Videos');
      }
    });
  }, []);

  const sideVideoItem = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div className={style.wrapper} key={index}>
        <div className={style.sideVideo}>
          <a className={style['sideVideo-link']} href={`/video/detail/${video._id}`}>
            <img className={style['sideVideo-link-image']} src={`http://localhost:9090/${video.thumbnail}`} alt='thumbnail' />
          </a>
        </div>
        <div className={style.sideVideoInfo}>
          <a href={`/video/detail/${video._id}`}>
            <span className={style['sideVideoInfo-title']}>{video.title}</span><br/>
            <span>{video.writer.name}</span><br/>
            <span>{video.views}</span><br/>
            <span>{minutes} : {seconds}</span><br/>
          </a>
        </div>
      </div>
    )
  });

  return (
    <React.Fragment>
      {sideVideoItem}
    </React.Fragment>
  )
}

export default SideVideo
