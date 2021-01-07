import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";

import DefaultPage from './DefaultPage/DefaultPage';

function BookPage(props) {

  const user = useSelector(state => state.user);
  const funcMenus = [
    'gg',
  ];

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'favorite') {
    //
  }
  return (
    <div>
      {user.userData
        && user.userData.isAuth 
        &&
          <SubNavBar 
            subRoot='book' 
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

export default BookPage;
