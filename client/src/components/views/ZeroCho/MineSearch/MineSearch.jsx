import React, { createContext, memo, useReducer, useMemo, useEffect, useRef } from 'react';
import Table from './Table';
import Form from './Form';
import style from './MineSearch.module.scss';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0
}

export const TableContext = createContext({
  tableData: [],
  halted: false,
  dispatch: () => {}
});

const initialState = {
  data: {row: 0, cell: 0, mine: 0},
  tableData: [],
  timer: 0,
  result: '',
  halted: false
}

const plantMine = (row, cell, mine) => {
  const candidate = Array(row*cell).fill().map((arr, i) => i);
  const shuffle = [];
  while(candidate.length > row*cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for(let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for(let j=0; j<cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for(let k=0; k<shuffle.length; k++) {
    const ver = Math.floor(shuffle[k]/cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

export const START_GAME = 'start_game';
export const CLICK_CELL = 'click_cell';
const INCREMENT_TIMER = 'increment_timer';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...initialState,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine
        },
        tableData: plantMine(
          parseInt(action.row),
          parseInt(action.cell),
          parseInt(action.mine)
        )
      }
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = action.result;
      let halted = false;
      let result = '';
      let openedCount = 0;
      tableData.map(row => {
        row.map(cell => {
          if( cell >= 0) openedCount++;
        });
      });
      if( state.data.row * state.data.cell - state.data.mine === openedCount) {
        halted = true;
        result = `You are win! ${state.timer}seconds...`;
      } else if (action.result === CODE.CLICKED_MINE) {
        halted = true;
        result = 'you are lose';
      }
      return {
        ...state,
        tableData,
        halted,
        result
      }
    case INCREMENT_TIMER:
      return {
        ...state,
        timer: state.timer + 1
      }
    default:
      break;
  }
}

function MineSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, halted, result } = state;
  
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]); // cacheing

  useEffect(() => {
    let timer;
    if((state.data.row * state.data.cell !== 0) && !halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    }
  }, [state.data, halted]);

  return (
    <TableContext.Provider
      value={value}
    >
      <Form
      />
      <div>{timer}</div>
      <Table
      />
      <div className={style.result}>{result}</div>
    </TableContext.Provider>
  )
}

export default memo(MineSearch);
