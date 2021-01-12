import React from 'react';
import { SERVER } from '../../../../Config';
import style from './UserCardBlock.module.scss';

function UserCardBlock(props) {

  const renderCartImage = (images) => {
    if(images.length > 0) {
      let image = images[0];
      return `${SERVER}/${image.thumbnail}`;
    }
  }
  const renderItems = () => (
    props.products && props.products.map((product, index) => (
      <tr key={index} className={style.tr}>
        <td className={style.td}>
          <img style={{ width: '7rem' }} alt='product'
            src={renderCartImage(product.images)} />
        </td>
        <td className={style.td}>
          {product.quantity} EA
        </td>
        <td className={style.td}>
          $ {product.price}
        </td>
        <td className={style.td}>
          <button onClick={() => props.removeItem(product._id)}>
            Remove
          </button>
        </td>
      </tr>
    ))
  )

  return (
    <div>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.tr}>
            <th className={style.td}>Product Image</th>
            <th className={style.td}>Product Quantity</th>
            <th className={style.td}>Product Price</th>
            <th className={style.td}>Remove from Cart</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {renderItems()}
        </tbody>
      </table>
    </div>
  )
}

export default UserCardBlock;
