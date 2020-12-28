import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from '../../../commons/Comment/Comment';
import LikeDislikes from '../../../commons/LikeDislikes/LikeDislikes';
import style from './DetailPage.module.scss';

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [ Video, setVideo ] = useState([]);
  const [ CommentLists, setCommentLists ] = useState([]);

  const videoVariable= {
    videoId: videoId
  }

  useEffect(() => {
    axios.post('/api/video/getVideoDetail', videoVariable).then(res => {
      if (res.data.success) {
        setVideo(res.data.videoDetail);
      } else {
        alert('Failed to get video Info');
      }
    });
    
    axios.post('/api/comment/getComments', videoVariable).then(res => {
      if(res.data.success) {
        setCommentLists(res.data.comments);
      } else {
        alert('Failed to get video Info');
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  }

  if (Video.writer) {

    const subscribeButton = (Video.writer._id !== localStorage.getItem('userId') &&
      <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />);
    return (
      <div>
        <div className={style.postPage}>
          <video className={style.videoDetail} src={`http://localhost:9090/${Video.filepath}`} controls></video>
          <LikeDislikes videoId={videoId} userId={localStorage.getItem('userId')} />
          {subscribeButton}        
          <img alt='avatar' src={Video.writer && Video.writer.image} />
          <span>{Video.title}</span>
          <span>{Video.description}</span>
          <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
        </div>
        <div className={style.sidePage}>
          <SideVideo />
        </div>
      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default VideoDetailPage
