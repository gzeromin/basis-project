import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import SubNavBar from "../../SubNavBar/SubNavBar";

function SubscriptionPage() {

  const [Videos, setVideos] = useState([]);
  const [funcMenus, setFuncMenus] = useState([
    'upload',
    'subScription'
  ]);

  let variable = { userFrom: localStorage.getItem('userId')};

  useEffect(() => {
    axios.post('/api/video/getSubscriptionVideos', variable).then(res => {
      if(res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert('Failed to get subscription videos');
      }
    })
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div key={index}>
        <a href={`/video/${video._id}`}>
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
    <div>
      <SubNavBar funcMenus={funcMenus} />
      <div className='views-sub'>
        <div>Subscribed Videos</div>
        <hr/>
        { renderCards }
      </div>
    </div>
  )
}

export default SubscriptionPage