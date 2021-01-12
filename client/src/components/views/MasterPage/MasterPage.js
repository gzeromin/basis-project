import React from 'react';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";
import DefaultPage from './DefaultPage/DefaultPage';
import MembersPage from './MembersPage/MembersPage';
function MasterPage(props) {
  
  const funcMenus = [
    'members',
  ];

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'members') {
    showPage = <MembersPage {...props} />;
  } else if(props.match.params.subFunc === 'member') {

  }

  return (
    <div>
      <SubNavBar 
        subRoot='master'
        funcMenus={funcMenus} 
      />
      <div className='views-sub'>
        { showPage }
      </div>
    </div>
  )
}

export default MasterPage;