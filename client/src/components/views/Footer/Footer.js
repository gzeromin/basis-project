import React from 'react'
import style from './Footer.module.scss';

function Footer() {
  return (
    <div className={style['my-footer']}>
      <div className={style['my-footer-text']}>JMIN</div>
      <div className={style['my-footer-copyright']}>
        <p>Copyright &copy; 2021 j.min All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer