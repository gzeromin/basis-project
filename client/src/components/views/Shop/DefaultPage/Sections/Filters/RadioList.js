import React, { useState } from 'react';
import Collapse from '../../../../../commons/Components/Collapse/Collapse';
import style from './Filters.module.scss';

function RadioList(props) {

  const [Value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  const renderRadioList = () => props.list && props.list.map((value, index) => (
    <div 
      key={index}
      className={style.item}
    >
      <input 
        key={index}
        type='radio' 
        name='price'
        value={value._id}
        onChange={handleChange}
        checked={value._id === parseInt(Value, 10)}
      />&nbsp;
      {value.name}
    </div>
  ));

  return <Collapse header={'Price'} contents={renderRadioList()} />;
}

export default RadioList;
