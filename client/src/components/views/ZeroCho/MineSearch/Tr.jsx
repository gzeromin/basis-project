import React, { memo, useContext, useEffect, useRef } from 'react';
import Td from './Td';
import { 
  TableContext
} from './MineSearch';

export default memo(function Tr({ rowData, rowIndex }) {

  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(
  //     rowData === ref.current[0],
  //     rowIndex === ref.current[1],
  //     dispatch === ref.current[2]
  //   );
  //   ref.current = [rowData, rowIndex, dispatch];
  // }, [rowData, rowIndex, dispatch]);

  const { dispatch, tableData } = useContext(TableContext);

  
  return (
    <tr>
      { rowData.map((cell, index) => 
        <Td
          key={`td-${index}`}
          cellData={cell}
          cellIndex={index}
          rowIndex={rowIndex}
        />
      )}
    </tr>
  )
});