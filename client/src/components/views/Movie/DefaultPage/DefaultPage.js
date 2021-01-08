import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../../Config';
import axios from 'axios';
import GridCards from '../commons/GridCards';
import MainImage from '../commons/MainImage';
import style from './DefaultPage.module.scss';

function DefaultPage() {

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint).then(res => res.json()).then(res => {
      setMovies([...Movies, ...res.results]);
      setMainMovieImage(res.results[0]);
      setCurrentPage(res.page);
    });
  }

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint);
  }

  return (
    <div className={`overflow-y ${style.wrapper}`}>
      {
        MainMovieImage &&
          <MainImage 
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
      }

      <div className={style.movies}>
        <h2>Movies by latest</h2>
        <hr />
        <div className={style['movies-list']}>
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards 
                moviePage
                image={movie.poster_path ?
                  `${IMAGE_BASE_URL}w500${movie.poster_path}` : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={style.moreMovies}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  )
}

export default DefaultPage;
