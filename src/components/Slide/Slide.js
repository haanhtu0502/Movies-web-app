import React, { useEffect, useState } from 'react'
import tmdbApi, { movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import './Slide.scss'
import { useNavigate } from 'react-router';

const Slide = () => {



    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: 1
            }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params });
                
                setMovieItems(
                    response.results[
                    Math.floor(Math.random() * response.results.length - 1)
                    ]
                );

                
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, [])

    const navigate = useNavigate();

    const background = apiConfig.originalImage(movieItems.backdrop_path ? movieItems.backdrop_path : movieItems.poster_path);
    return (
        <div >
            <div className='hero-slide__item' style={{
                backgroundImage: `url(${background})`,
            }}
            >
                <div className='hero-slide__item__content container'>
                    <div className='hero-slide__item__content__info '>
                        <h2 className='title'>{movieItems.title}</h2>
                        <div className='overview'>{movieItems.overview}</div>
                        <div className='btns'>
                            <button
                                className="btn "
                                onClick={() => navigate('/movie/' + movieItems.id)}
                            >
                                 Detail
                            </button>                  
                           
                        </div>
                    </div>
                    <div className='hero-slide__item__content__poster '>
                        <img src={apiConfig.w500Image(movieItems.poster_path)} />
                        
                    </div>
                </div>
            </div>
           
        </div>
    )
}





export default Slide