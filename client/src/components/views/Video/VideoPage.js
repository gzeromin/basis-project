import React from 'react';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";
import { useSelector } from 'react-redux';

import DefaultPage from './DefaultPage/DefaultPage';
import UploadPage from './UploadPage/UploadPage';
import SubscriptionPage from './SubscriptionPage/SubscriptionPage';
import DetailPage from './DetailPage/DetailPage';

function Video(props) {

  const user = useSelector(state => state.user);

  let showPage = <DefaultPage className='overflow-y'/>;
  if(props.match.params.subFunc === 'upload') {
    showPage = <UploadPage />
  } else if(props.match.params.subFunc === 'subScription'){
    showPage = <SubscriptionPage />
  } else if(props.match.params.subFunc === 'detail') {
    showPage = <DetailPage {...props} />
  }

  return (
    <div>
      {user.userData
        && user.userData.isAuth 
        &&
          <SubNavBar subRoot='video' />
      }
      <div className={`${user.userData
                        && user.userData.isAuth ? 
                        'views-sub' 
                        : 
                        ''
                      }`}>
        { showPage }
      </div>
    </div>
  )
}

export default Video;