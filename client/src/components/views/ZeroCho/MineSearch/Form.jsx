import React, {memo, useCallback, useContext, useState} from 'react';
import style from './MineSearch.module.scss';
import { 
  TableContext,
  START_GAME
} from './MineSearch';

function Form() {
  const [form, setForm] = useState({
    row: 10,
    cell: 10,
    mine: 20
  });
  const { dispatch } = useContext(TableContext);
  
  const inputHandler = useCallback((target, value) => {
    const newForm = {...form};
    newForm[target] = value;
    setForm(newForm);
  }, [form]);

  const onClickBtn = () => {
    dispatch({
      type: START_GAME,
      ...form
    })
  }

  return (
    <div className={style.form}>
      <input 
        type='number' 
        placeholder='row' 
        value={form.row} 
        onChange={(e) => inputHandler('row', e.target.value)} 
      />
      <input 
        type='number' 
        placeholder='cell' 
        value={form.cell} 
        onChange={(e) => inputHandler('cell', e.target.value)} 
      />
      <input 
        type='number' 
        placeholder='mine' 
        value={form.mine} 
        onChange={(e) => inputHandler('mine', e.target.value)} 
      />
      <button
        onClick={onClickBtn}
      >
        start!
      </button>
    </div>
  )
}

export default memo(Form);
