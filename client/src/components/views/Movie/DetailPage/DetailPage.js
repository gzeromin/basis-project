import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from '../../../commons/Comment/Comment';
import LikeDislikes from '../../../commons/LikeDislikes/LikeDislikes';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../../Config';
import GridsCards from '../commons/GridCards';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import style from './DetailPage.module.scss';

function DetailPage(props) {

  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    postId: movieId
  }

  useEffect(() => {
    
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);

    axios.post('/api/comment/getComments', movieVariable).then(res => {
      if(res.data.success) {
        setCommentLists(res.data.comments);
      } else {
        alert('Failed to get comments Info');
      }
    });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  }

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint).then(result =>  result.json()).then(result => {
      setMovie(result);
      setLoadingForMovie(false);
      
      let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      fetch(endpointForCasts).then(result => result.json()).then(result => {
        setCasts(result.cast);
      })
      setLoadingForCasts(false);
    }).catch(err => {
      console.error('Error: ', err);
    })
  }

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  }

  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ?
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
        :
        <div>loading...</div>
      }

      {/* Body */}
      <div className={style.wrapper}>
        <div className={style['wrapper-flex']}>
          <Favorite 
            movieInfo={Movie} 
            movieId={movieId}
            userFrom={localStorage.getItem('userId')}
          />
        </div>

        {/** Movie Info */}
        {!LoadingForMovie ?
          <MovieInfo movie={Movie} />
          :
          <div>loading...</div>
        }

        <br/>
        {/** Actors Grid */}
        <div className={style['wrapper-actors']}>
          <button onClick={toggleActorView}>
            Toggle Actor View
          </button>
        </div>

        {ActorToggle &&
          <div className={style['wrapper-actorList']}>
            {
              !LoadingForCasts ? Casts.map((cast, index) => (
                cast.profile_path &&
                  <GridsCards
                    key={index}
                    image={cast.profile_path ?
                      `${IMAGE_BASE_URL}w500${cast.profile_path}`
                      :
                      null}
                    characterName={cast.name}
                  />
              )) :
              <div>loading...</div>
            }
          </div>
        }

        <br/>

        <div className={style['wrapper-flex']}>
          <LikeDislikes
            movieId={movieId}
            userId={localStorage.getItem('userId')}
          />
        </div>

        {/** Comments */}
        <Comments 
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>

      {/* Comments */}


    </div>
  )
}

export default DetailPage;
