import React, { memo, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate =  Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while ( candidate.length > 0 ) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1));
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) =>  p - c);
  return [...winNumbers, bonusNumber];
}

function Lotto() {
  const [WinBalls, setWinBalls] = useState([]);
  const timeouts = useRef([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [WinNumbers, setWinNumbers] = useState(lottoNumbers);
  const [Bonus, setBonus] = useState(null);
  const [Redo, setRedo] = useState(false);

  useEffect(() => {
    for(let i=0; i<WinNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, WinNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(WinNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      })
    }
  }, [timeouts.current]);

  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, []);

  return (
    <>
      <div>당첨 숫자</div>
      <div id='결과창'>
        {WinBalls.map((v) => <Ball key={`ball-${v}`} number={v} />)}
      </div>
      <div>보너스!</div>
      { Bonus && <Ball number={Bonus} />}
      {
        Redo &&
        <button onClick={onClickRedo}>one more time!</button>
      }
    </>
  )
}

export default memo(Lotto);
