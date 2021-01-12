import React, { useState, memo } from 'react';
import style from './Search.module.scss';

function Search(props) {
  
  const [SearchTerm, setSearchTerm] = useState('');
  
  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <React.Fragment>
      <i 
        className={`material-icons ${style.icon}`}

      >
        search
      </i>
      <input
        type='search'
        className={style.input}
        placeholder='input search text'
        onChange={searchHandler}
        value={SearchTerm}
      />
    </React.Fragment>
  )
}

export default memo(Search);
