import React, { useState } from 'react';
import Collapse from '../../../../../commons/Components/Collapse/Collapse';
import style from './Filters.module.scss';

function CheckboxList(props) {

  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const newChecked = [...Checked];
    const currentIndex = Checked.indexOf(value);

    if(currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxList = () => props.list && props.list.map((value, index) => (
    <div 
      key={index}
      className={style.item}
    >
      <input
        type='checkbox' 
        onChange={() => handleToggle(value._id)}
        checked={Checked.indexOf(value._id) === -1 ? false : true}
      />&nbsp;
      {value.name}
    </div>
  ));

  return <Collapse header={'Continents'} contents={renderCheckboxList()} />;
}

export default CheckboxList;
