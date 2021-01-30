import React, { memo } from 'react';
import SubNavBar from "../../commons/SubNavBar/SubNavBar";

import Default from './Default/Default';
import Lotto from './Lotto/Lotto';
import LottoCls from './Lotto/LottoCls';
import TicTacToe from './TicTacToe/TicTacToe';
import MineSearch from './MineSearch/MineSearch';

function ZeroCho(props) {

  let showPage = <Default/>;
  if(props.match.params.subFunc === 'lotto') {
    showPage = <Lotto />
  } else if(props.match.params.subFunc === 'lottoCls') {
    showPage = <LottoCls />
  } else if(props.match.params.subFunc === 'ticTacToe') {
    showPage = <TicTacToe />
  } else if(props.match.params.subFunc === 'mineSearch') {
    showPage = <MineSearch />
  }

  return (
    <div>
      <SubNavBar subRoot='zeroCho' />
      <div className='overflow-y views-sub'>
        {showPage}
      </div>
    </div>
  )
}

export default memo(ZeroCho);
