import React, { useEffect, useState } from 'react';
import style from './FavoritePage.module.scss';
import axios from 'axios';
import {IMAGE_BASE_URL} from '../../../Config';

function FavoritePage() {

  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    
    fetchFavoredMovie();

  }, []);

  const fetchFavoredMovie = () => {
    axios.post('/api/favorite/getFavoredMovie', {
      userFrom: localStorage.getItem('userId')
    }).then(res => {
      if(res.data.success) {
        setFavorites(res.data.favorites);
      } else {
        alert('Fail to get movie info');
      }
    })
  };

  const onClickDelete = (movieId, userFrom) => {
    const variable = {
      movieId,
      userFrom
    }

    axios.post('/api/favorite/removeFromFavorite', variable).then(res => {
      if(res.data.success) {
        fetchFavoredMovie();
      } else {
        alert('Fail to delete from list');
      }
    });
  }

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite && favorite.moviePost ?
          <img src={`${IMAGE_BASE_URL}w300${favorite.moviePost}`}/>
          :
          "no image"
        }
      </div>
    );
    return (
      <tr key={index}>
        <td className={style.hoverTest}>
          {favorite.movieTitle}
          {content}
        </td>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>
            Remove
          </button>
        </td>
      </tr>
    )
  });
  
  return (
    <div className={style.wrapper}>
      <h2> Favorite Movies </h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          { renderCards }
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage;
