import React, { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { 
  TableContext,
  CODE,
  CLICK_CELL
} from './MineSearch';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444'
      }
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red'
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow'
      }       
    default:
      break;
  }
}

const getTdText = (code) => {
  console.log('getTdText');
  switch (code) {
    case CODE.NORMAL:
    case CODE.OPENED:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return 'X';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code;
  }
}

function Td({cellData, cellIndex, rowIndex}) {

  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(
  //     rowIndex === ref.current[0],
  //     cellIndex === ref.current[1],
  //     dispatch === ref.current[2],
  //     cellData === ref.current[3]
  //   );
  //   ref.current = [rowIndex, cellIndex, dispatch, cellData];
  // }, [rowIndex, cellIndex, dispatch, cellData]);

  const { dispatch, halted, tableData } = useContext(TableContext);

  const getAroundCount = (ver, hor) => {
    let around = [];
    if(ver - 1 >= 0) {
      around.push(tableData[ver - 1][hor - 1]);
      around.push(tableData[ver - 1][hor]);
      around.push(tableData[ver - 1][hor + 1]);
    }
    around.push(tableData[ver][hor - 1]);
    around.push(tableData[ver][hor + 1]);
    if(ver + 1 < tableData.length) {
      around.push(tableData[ver + 1][hor - 1]);
      around.push(tableData[ver + 1][hor]);
      around.push(tableData[ver + 1][hor + 1]);
    }
    const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
    return count;
  }

  const openAroundCells = (ver, hor) => {
    const near = [];
    if(ver - 1 >= 0) {
      near.push([ver-1, hor-1]);
      near.push([ver-1, hor]);
      near.push([ver-1, hor+1]);
    }
      near.push([ver, hor-1]);
      near.push([ver, hor+1]);
    if(ver + 1 < tableData.length) {
      near.push([ver+1, hor-1]);
      near.push([ver+1, hor]);
      near.push([ver+1, hor+1]);
    }
    near.filter(v => !!v).forEach(v => {
      if(tableData[v[0]][v[1]] && ![CODE.MINE].includes(tableData[v[0]][v[1]])) {
        onClickTd(v[0], v[1]);
      }
    })
  }
  const clicked = [];
  const onClickTd = useCallback(
    (ver, hor) => {
      if(halted) return;
      let result = -100;
      if(clicked.includes(ver+','+hor)){
        return;
      } else {
        clicked.push(ver+','+hor);
      }
      switch(tableData[ver][hor]) {
        case CODE.NORMAL:
          result = getAroundCount(ver, hor);
          if(result === 0) {
            openAroundCells(ver, hor);
          }
          break;
        case CODE.MINE:
          result = CODE.CLICKED_MINE;
          break;
        default: break;
      }
      if(result !== -100) {        
        dispatch({
          type: CLICK_CELL,
          row: ver,
          cell: hor,
          result
        });
      }
    },
    [tableData, halted],
  )

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();
      if(halted) return;
      let result = -100;
      switch(cellData) {
        case CODE.NORMAL:
          result = CODE.FLAG;
          break;
        case CODE.MINE:
          result = CODE.FLAG_MINE;
          break;
        case CODE.FLAG:
          result = CODE.QUESTION;
          break;
        case CODE.FLAG_MINE:
          result = CODE.QUESTION_MINE;
          break;
        case CODE.QUESTION:
          result = CODE.NORMAL;
          break;
        case CODE.QUESTION_MINE:
          result = CODE.MINE;
          break;
        default: 
          break;
      }
      if(result !== -100) {
        dispatch({
          type: CLICK_CELL,
          row: rowIndex,
          cell: cellIndex,
          result
        });
      }
    },
    [cellData, halted],
  )
  return (
    useMemo(() => <td
      style={getTdStyle(cellData)}
      onClick={() => onClickTd(rowIndex, cellIndex)}
      onContextMenu={onRightClickTd}
    >
      {getTdText(cellData)}
    </td>, [cellData])
  )
}

export default memo(Td);
