import React, { useEffect, useState } from 'react';
import Auth from "../../../hoc/auth";
import axios from 'axios';
import moment from 'moment';
import SubNavBar from "../SubNavBar/SubNavBar";
import { useSelector } from 'react-redux';

function Video() {

  const [Videos, setVideos] = useState([]);
  const [funcMenus, setFuncMenus] = useState([
    'upload',
    'subScription'
  ]);

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

  const user = useSelector(state => state.user);
  let login;
  if(user.userData && !user.userData.isAuth) {
    login = (
      <div>
        <div>Recommended</div>
        <hr/>
        { renderCards }
      </div>
    )
  } else {
    login = (
      <div>
        <SubNavBar funcMenus={funcMenus} />
        <div className='views-sub'>
          <div>Recommended</div>
          <hr/>
          { renderCards }
        </div>
      </div>
    )
  }

  return (
    <div>
      {login}
    </div>
  )
}

export default Video;