import React, { memo, useEffect, useRef } from 'react';
import Tr from './Tr';
import style from './TicTacToe.module.scss';

export default memo(function Table({ onClick, tableData, dispatch }) {
  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(
  //     tableData === ref.current[0]
  //   );
  //   ref.current = [tableData, dispatch];
  // }, [tableData, dispatch]);


  return (
    <table className={style.tictactoe}>
      <tbody>
        {
          Array(tableData.length).fill().map((tr,i) => 
            <Tr 
              key={`tr-${i}`}
              rowIndex={i}
              rowData={tableData[i]}
              dispatch={dispatch}
            />
          )
        }
      </tbody>
    </table>
  )
});
