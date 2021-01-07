import React, { useState } from 'react';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";
import { useSelector } from 'react-redux';

import DefaultPage from './DefaultPage/DefaultPage';
import UploadPage from './UploadPage/UploadPage';
import SubscriptionPage from './SubscriptionPage/SubscriptionPage';

function Video(props) {

  const user = useSelector(state => state.user);
  const funcMenus = [
    'upload',
    'subScription'
  ];

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'upload') {
    showPage = <UploadPage />
  } else if(props.match.params.subFunc === 'subScription'){
    showPage = <SubscriptionPage />
  }

  return (
    <div>
      {user.userData
        && user.userData.isAuth 
        &&
          <SubNavBar 
            subRoot='video'
            funcMenus={funcMenus} 
          />
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