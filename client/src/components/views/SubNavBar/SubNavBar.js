import React, { useEffect } from 'react'
import style from './SubNavBar.module.scss';
import { Link } from 'react-router-dom';

function SubNavBar(props) {

  let menu = props.funcMenus.map((funcMenu, index) => {
    console.log(funcMenu);
    return (
      <div>
        <Link 
          key={index} 
          to={"/video/"+funcMenu}
        >
          {funcMenu}
        </Link>
        <br/>
      </div>
    )
  });

  return (
    <div className={style.subNavBar}>
      {menu}
    </div>
  )
}

export default SubNavBar