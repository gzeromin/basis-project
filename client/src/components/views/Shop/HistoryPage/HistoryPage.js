import React from 'react';
import style from './HistoryPage.module.scss';

function HistoryPage(props) {
  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>History</h1>
      </div>
      <br/>
      <table className={style.table}>
        <thead>
          <tr className={style.tr}>
            <th className={style.th}>No</th>
            <th className={style.th}>Payment Id</th>
            <th className={style.th}>Price</th>
            <th className={style.th}>Quantity</th>
            <th className={style.th}>Date of Purchase</th>
          </tr>
        </thead>
        <tbody>
          {
            props.user && props.user.history &&
            props.user.history.map((item, index)=> (
              <tr key={item.id} className={style.tr}>
                <td className={style.td}>{index}</td>
                <td className={style.td}>{item.id}</td>
                <td className={style.td}>{item.price}</td>
                <td className={style.td}>{item.quantity}</td>
                <td className={style.td}>{item.price}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default HistoryPage;
