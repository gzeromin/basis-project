import React from 'react';
import { useSelector } from 'react-redux';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";

import DefaultPage from './DefaultPage/DefaultPage';
import FavoritePage from './FavoritePage/FavoritePage';
import DetailPage from './DetailPage/DetailPage';

function MoviePage(props) {

  const user = useSelector(state => state.user);

  let showPage = <DefaultPage />;
  if(props.match.params.subFunc === 'favorite') {
    showPage = <FavoritePage />
  } else if(props.match.params.subFunc === 'detail') {
    showPage = <DetailPage {...props} />
  }

  return (
    <div>
      {user.userData
        && user.userData.isAuth 
        &&
          <SubNavBar subRoot='movie' />
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
  );
}

export default MoviePage;