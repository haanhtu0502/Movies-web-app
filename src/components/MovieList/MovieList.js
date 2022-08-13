import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import './MovieList.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link,useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieList = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, [])

    const navigate= useNavigate();

    return (
        <div className='movie-list'>

            {
                items.map((item, i) =>
                (
                    <img key={i} onClick={()=>navigate(props.category+"/"+item.id)} className='movie-poster' src={apiConfig.w500Image(item.poster_path)} alt="" />
                ))
            }

        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList