import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";

import DefaultPage from './DefaltPage/DefaultPage';
import FavoritePage from './FavoritePage/FavoritePage';

function MoviePage(props) {

  const user = useSelector(state => state.user);
  const [funcMenus, setFuncMenus] = useState([
    'favorite',
  ]);

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'favorite') {
    showPage = <FavoritePage />
  }

  return (
    <div>
      {user.userData 
        && user.userData.isLogin 
        && user.userData.isAuth 
        &&
          <SubNavBar 
            subRoot='movie' 
            funcMenus={funcMenus} 
          />
      }
      <div className={`${user.userData 
                        && user.userData.isLogin 
                        && user.userData.isAuth ? 
                        'views-sub' 
                        : 
                        ''
                      }`}>
        { showPage }
      </div>
    </div>
  );
}

export default MoviePage;