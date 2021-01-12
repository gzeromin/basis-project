import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";

import DefaultPage from './DefaultPage/DefaultPage';
import UploadPage from './UploadPage/UploadPage';
import DetailPage from './DetailPage/DetailPage';
import CartPage from './CartPage/CartPage';

function ShopPage(props) {

  const user = useSelector(state => state.user);
  const funcMenus = [
    'upload',
    'cart'
  ];

  let showPage = <DefaultPage {...props} />;
  if(props.match.params.subFunc === 'upload') {
    showPage = <UploadPage {...props} />;
  } else if(props.match.params.subFunc === 'detail') {
    showPage = <DetailPage {...props} />
  } else if(props.match.params.subFunc === 'cart') {
    showPage = <CartPage {...props} />
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

export default memo(ShopPage);
