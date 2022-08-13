import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import PageHeader from '../components/page_header/PageHeader'
import { removeFavourite } from '../app/favouriteSlice';
import './Favorite.scss'

function Favorite() {

  const favMovie = useSelector(state => state.favourite);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const hadleRemoveButton = (value) => {
    const action = removeFavourite(value);
    console.log(action);
    dispatch(action);
  }

  return (
    <>
      <PageHeader>
        Favorites
      </PageHeader>
      {
        favMovie.length === 0 ?
          <div className='title-center'>
            <h1>No movie in your list</h1>
          </div> :
          <div className='container'>
            <div className='section'>
              <div className='movie-grid '>
                {
                  favMovie.map((item, i) => (
                    <div>
                      <img onClick={() => navigate("/" + item.category + "/" + item.id)} key={i} className='movie-poster' src={item.img} alt="" />
                      <button onClick={() => hadleRemoveButton(item.id)} className='btn small'>Remove</button>
                    </div>

                  ))
                }
              </div>
            </div>
          </div>



      }
    </>
  )
}

export default Favorite