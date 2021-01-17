import React from 'react';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";
import DefaultPage from './DefaultPage/DefaultPage';
import MembersPage from './MembersPage/MembersPage';
function MasterPage(props) {


  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'members') {
    showPage = <MembersPage {...props} />;
  } else if(props.match.params.subFunc === 'member') {

  }

  return (
    <div>
      <SubNavBar subRoot='master'/>
      <div className='views-sub'>
        { showPage }
      </div>
    </div>
  )
}

export default MasterPage;
