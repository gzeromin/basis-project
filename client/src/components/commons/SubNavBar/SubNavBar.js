import React from 'react'
import style from './SubNavBar.module.scss';
import { Link } from 'react-router-dom';
import FuncMenu from './Sections/Constants/FuncMenu';
import { Badge } from 'antd';
import { ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

function SubNavBar(props) {
  const user = useSelector(state => state.user);
  const funcMenus = FuncMenu[props.subRoot];

  let renderMenus = funcMenus.map((funcMenu, index) => {
    if(funcMenu.icon) {
      let icon;
      switch(funcMenu.icon) {
        case 'shopping-cart': 
          icon = <ShoppingCartOutlined 
            style={{ fontSize:'2.7rem'}}          
          />;
          break;
        default: 
          icon = <SmileOutlined  />;
          break;
      }
      let cartCount = 0;
      {
        user.userData && user.userData.cart
          && user.userData.cart.map(v => {
            cartCount = cartCount + v.quantity;
        });
      }
      return (
        <div 
          key={index}
          style={{
            padding: '1.2rem .7rem'
          }}
        >
          <Badge
            size='small'
            count={cartCount}
          > 
            <a
              className="head-example"
              href={"/"+props.subRoot+"/"+funcMenu.name}
            >
              { icon }
            </a>
          </Badge>
          <br/>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <Link
            
            to={"/"+props.subRoot+"/"+funcMenu.name}
          >
            {funcMenu.name}
          </Link>
          <br/>
        </div>
      )
    }

  });
  return (
    <div className={style.subNavBar}>
      {renderMenus}
    </div>
  )
}

export default SubNavBar
