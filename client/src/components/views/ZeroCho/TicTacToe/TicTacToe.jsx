import React, { memo, useState, useReducer, useCallback, useEffect, useRef } from 'react';
import Table from './Table';
import style from './TicTacToe.module.scss';
const { produce } = require('immer');

const initialState = {
  winner: '',
  turn: 'x',
  tableData: [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  recentCell: [-1, -1]
}

const SET_WINNTER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
const CHANGE_TURN = 'CHANGE_TURN';
const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SET_WINNTER:
        draft.winner = action.winner;
        break;
      case CLICK_CELL:
        draft.tableData[action.row][action.cell] = state.turn;
        draft.recentCell = [action.row, action.cell];
        break;
      case CHANGE_TURN:
        draft.turn = state.turn === 'o' ? 'x' : 'o';
        break;
      case RESET_GAME:
        draft = {
          ...initialState,
          winner: state.winner
        }
        break;
      default:
        break;
    }
  });
}

function TikTakTo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('o');
  // const [tableData, setTableData] = useState([
  //   ['','',''],
  //   ['','',''],
  //   ['','','']
  // ]);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0) {
      return;
    }
    //Game over
    let end = true;
    tableData.map(row => {
      row.map(cell => {
        if(cell === '') {
          end = false;
        }
      })
    });

    if(
        (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) ||
        (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) ||
        (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) ||
        (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn)
      ) {
        // 승리
        dispatch({
          type: SET_WINNTER,
          winner: turn
        });
        end = true;
    } else {
      dispatch({
        type: CHANGE_TURN
      });
    }
    
    if(end) {
      dispatch({
        type: RESET_GAME
      });
    }
  }, [recentCell]);

  const onClickTable = useCallback(
    () => {
      dispatch({
        type: SET_WINNTER,
        winner: 'o'
      });
    },
    [],
  )
  return (
    <>
      <Table
        onClick={onClickTable}
        tableData={tableData}
        dispatch={dispatch}
      ></Table>
      { winner && 
        <div className={style.result}>
          {winner}님의 승리
        </div>
      }
    </>
      
  )
}

export default memo(TikTakTo);
