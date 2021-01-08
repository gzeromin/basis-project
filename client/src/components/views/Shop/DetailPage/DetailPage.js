import React, { useEffect } from 'react';
import { getQueryString } from '../../../../utils/stringUtils';
import axios from 'axios';

function DetailPage(props) {
  const productId = getQueryString(props.location.search)['id'];

  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(res => {
      if(res.data.success) {
        console.log(res.data.product);
      } else {
        alert('Fail to get detail info');
      }
    });
  }, []);
  
  return (
    <div>
      d
    </div>
  )
}

export default DetailPage;
