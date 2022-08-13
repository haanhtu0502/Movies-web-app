import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import CastList from './CastList';

import tmdbApi from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';

import './Detail.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite } from '../app/favouriteSlice';

const Detail = () => {

  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  const [favorite, setFavorite] = useState();

  const favMovie = useSelector(state => state.favourite)
  const isAdded = favMovie.filter((i) => i.id === id);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0)
      setFavorite({
        id: id,
        category: category,
        img: apiConfig.w500Image(response.poster_path)
      })

    }
    getDetail();
  }, [category, id])


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFavoriteButton = (value) => {
    const action = addFavourite(value);
    dispatch(action);
    // navigate("/favorite");
  }

  return (
    <>
      {
        item && (
          <>
            <div className='banner' style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>
            </div>
            <div className='mb-3 movie-content container'>
              <div className='movie-content__poster'>
                <div className='movie-content__poster__img' style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>

                </div>
              </div>
              <div className='movie-content__info'>
                <div className='title'>
                  {item.title || item.name}
                </div>
                <div className='genres'>
                  {
                    item.genres && item.genres.slice(0, 5).map((genre, i) => (
                      <span key={i}>{genre.name}</span>
                    ))
                  }
                </div>
                <p className='overview'>{item.overview}</p>
                <div className='cast'>
                  <div className='section__header'>
                    <h2>Casts</h2>
                  </div>
                  <CastList id={id} />
                  {
                    isAdded.length == 0 ?
                      <button onClick={() => handleFavoriteButton(favorite)} className='btn mt-2 btn-outline small '>Add to favourite</button>
                      :
                      <button className='btn small mt-2 disabled'>Movie added</button>
                  }


                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Detail