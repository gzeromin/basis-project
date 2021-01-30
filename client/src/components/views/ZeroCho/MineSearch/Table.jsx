import React, { memo, useContext, useEffect, useRef } from 'react';
import Tr from './Tr';
import style from './MineSearch.module.scss';
import { 
  TableContext
} from './MineSearch';

export default memo(function Table({}) {
  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(
  //     tableData === ref.current[0]
  //   );
  //   ref.current = [tableData, dispatch];
  // }, [tableData, dispatch]);
  const { dispatch, tableData } = useContext(TableContext);


  return (
    <table className={style.mineSearch}>
      <tbody>
        { tableData.map((row, index) =>
          <Tr 
            key={`tr-${index}`}
            rowData={row}
            rowIndex={index}
          />
        ) }
      </tbody>
    </table>
  )
});
