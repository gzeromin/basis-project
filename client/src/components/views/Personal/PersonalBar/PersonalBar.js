/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone';

import style from '../PersonalPage.module.scss';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { saveImage } from '../../../../_actions/user_action';

function PersonalBar(props) {
  const user = useSelector(state => state.user);
  const devMode = useSelector(state => state.common.devMode);

  const dispatch = useDispatch();

  let menu = props.funcMenus.map((funcMenu, index) => {
    return (
      <div key={index} >
        <Link
          to={"/"+props.subRoot+"/"+funcMenu}
        >
          {funcMenu}
        </Link>
        <br/>
      </div>
    )
  });

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0]);
    dispatch(saveImage(formData, config));
  }

  let renderImage;
  if(user.userData && user.userData.image) {
    renderImage = (
      <img 
        className={style.image} 
        src={`http://localhost:9090/${user.userData.image}`}
      />
    )
  } else {
    renderImage = (
      <i className={`material-icons ${style.icon}`}>add</i>
    )
  }
  return (
    <div>
      <Dropzone multiple={false} onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <div className={style.dropBox} {...getRootProps()}>
            <input {...getInputProps()} multiple/>
            {renderImage}
          </div>
        )}
      </Dropzone>
      {user.userData &&
        <div className={style.name}>
          {user.userData.name}
          {devMode &&
            <Link to='/personal/settings'>
              <i className={`material-icons ${style.icon}`}>
                settings
              </i>
            </Link>
          }
        </div>
      }

      {menu}
    </div>
  )
}

export default PersonalBar;
