import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import axios from 'axios';
import GridCards from './commons/GridCards';
import style from './MoviePage.module.scss';

function MoviePage() {

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
    <div className={style.mainImage}>
      {
        MainMovieImage &&
        <div style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)
                        39%, rgba(0,0,0,0)
                        41%, rgba(0,0,0,0.65)
                        100%),
                        url('${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}'), 
                        #1c1c1c`,
          height: '500px',
          backgroundSize: '100%, cover',
          backgroundPosition: 'center, center',
          width: '100%',
          position: 'relative'
        }}>
          <div className={style['mainImage-info']}>
            <h2 className={style['mainImage-info-title']}>{MainMovieImage.original_title}</h2>
            <p className={style['mainImage-info-text']}>{MainMovieImage.overview}</p>
          </div>
        </div>
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
  );
}

export default MoviePage;