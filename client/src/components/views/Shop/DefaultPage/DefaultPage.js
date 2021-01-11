/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import style from './DefaultPage.module.scss';
import axios from 'axios';
import Cards from './Sections/Cards/Cards';
import CheckboxList from './Sections/Filters/CheckboxList';
import RadioList from './Sections/Filters/RadioList';
import Search from './Sections/Search/Search';

import { continents, price } from '../Constants';

function DefaultPage(props) {

  const [ProductList, setProductList] = useState([]);
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  })
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [SearchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit
    }
    getProductList(body);
  }, []);

  const getProductList = (body) => {
    axios.post('/api/product/products', body).then(res => {
      if(res.data.success) {
        if(body.loadMore) {
          setProductList([...ProductList, ...res.data.productList]);
        } else {
          setProductList(res.data.productList);
        }
        setPostSize(res.data.productList.length);
      } else {
        alert('Fail to get product');
      }
    });
  };

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
      searchTerm: SearchTerm
    };

    getProductList(body);
    setSkip(0);

  }

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for(let key in data) {
      if(data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = {...Filters };
    newFilters[category] = filters;
    if(category === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };
  
  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProductList(body);
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters
    }

    getProductList(body);
    setSkip(skip);
  };

  return (
    <div className={`overflow-y ${style.wrapper}`}>
      <h2>
        Let's Travel Anywhere
        <i className='material-icons'> tour </i>
      </h2>

      {/** Filters */}
      <div className={style.filters}>
        <CheckboxList list={continents} handleFilters={filters => handleFilters(filters, 'continents')}/>
        <RadioList list={price} handleFilters={filters => handleFilters(filters, 'price')}/>
      </div>

      {/** Search */}
      <div className={style.search}>
        <Search refreshFunction={updateSearchTerm} />
      </div>

      {/** Cards */}
      <Cards ProductList={ProductList} history={props.history}/>
      <br/>

      {/** Load more cards */}
      {PostSize >= Limit &&
        <div className={style.loadMore}>
          <button
            onClick={loadMoreHandler}
          >
            Land more
          </button>
        </div>
      }
    </div>
  )
}

export default DefaultPage;
