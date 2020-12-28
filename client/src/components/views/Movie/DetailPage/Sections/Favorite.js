import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorite(props) {

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime
  }

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variables).then(res => {
      if(res.data.success) {
        setFavoriteNumber(res.data.favoriteNumber);
      } else {
        alert('Fail to get number info');
      }
    });
    
    axios.post('/api/favorite/favorited', variables).then(res =>{
      if(res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        alert('Fail to get info');
      }
    });
  }, []);

  const onClickFavorite = () => {
    if(Favorited) {
      axios.post('/api/favorite/removeFromFavorite', variables).then(res => {
        if(res.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert('Fail to delete from favorite list');
        }
      })
    } else {
      axios.post('/api/favorite/addToFavorite', variables).then(res => {
        if(res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Fail to add to favorite list');
        }
      });
    }
  }
  return (
    <div>
      <button onClick={onClickFavorite}>
        {Favorited ? 'Not Favorite' : 'Add to Favorite '}
        {FavoriteNumber}
      </button>
    </div>
  )
}

export default Favorite;
