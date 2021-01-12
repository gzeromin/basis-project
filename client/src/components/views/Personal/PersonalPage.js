import React, { memo } from 'react';
import style from './PersonalPage.module.scss';

import PersonalBar from "./PersonalBar/PersonalBar";

import DefaultPage from './DefaultPage/DefaultPage';
import WhiteBoard from './WhiteBoard/WhiteBoard';

function PersonalPage(props) {
  
  const funcMenus = [
    'home',
    'happy-stamp',
    'white-board',
    'pic-to-log'
  ];

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'white-board') {
    showPage = <WhiteBoard />;
  }
  return (
    <div>
      <div className={style['personal-bar']}>
        <PersonalBar 
          subRoot='personal' 
          funcMenus={funcMenus} 
        />
      </div>
      <div className={style['personal-view']}>
        { showPage }
      </div>
    </div>
  )
}

export default memo(PersonalPage);
