import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";

import DefaultPage from './DefaultPage/DefaultPage';
import UploadPage from './UploadPage/UploadPage';

function ShopPage(props) {

  const user = useSelector(state => state.user);
  const funcMenus = [
    'upload',
  ];

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'upload') {
    showPage = <UploadPage {...props} />;
  }
  return (
    <div>
      {user.userData
        && user.userData.isAuth 
        &&
          <SubNavBar 
            subRoot='shop' 
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

export default ShopPage;
