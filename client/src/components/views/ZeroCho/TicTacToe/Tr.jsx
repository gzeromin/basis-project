import React, { memo, useEffect, useRef } from 'react';
import Td from './Td';
export default memo(function Tr({ rowData, rowIndex, dispatch }) {

  
  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(
  //     rowData === ref.current[0],
  //     rowIndex === ref.current[1],
  //     dispatch === ref.current[2]
  //   );
  //   ref.current = [rowData, rowIndex, dispatch];
  // }, [rowData, rowIndex, dispatch]);

  
  return (
    <tr>
      {
        rowData.map((td,i) => 
          <Td
            rowIndex={rowIndex}
            cellIndex={i}
            key={`td-${i}`}
            dispatch={dispatch}
            cellData={rowData[i]}
          />
        )
      }
    </tr>
  )
});