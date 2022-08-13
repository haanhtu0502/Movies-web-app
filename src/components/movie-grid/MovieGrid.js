import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './MovieGrid.scss';




const MovieGrid = props => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [keyword, setKeyword] = useState('');


    const navigate = useNavigate();


    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === '') {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages)
        }
        getList();
        console.log(keyword);
    }, [props.category, keyword]);

    const loadMore = async () => {

        let response = null;
        if (keyword === '') {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    function handleKeyword(searchTerm) {
        setKeyword(searchTerm);
    }
    return (
        <>
            <div className='section mb-3'>

                <MovieSearch category={props.category} handleKeyword={handleKeyword} />

            </div>
            <div className='movie-grid'>
                {
                    items.map((item, i) => (
                        <>
                            <img onClick={() => navigate("/" + props.category + "/" + item.id)} key={i} className='movie-poster' src={apiConfig.w500Image(item.poster_path)} alt="" />
                            
                        </>

                    ))
                    
                }
            </div>
            {
                page < totalPage ? (
                    <div className='movie-grid__loadmore'>
                        <button
                            className={`btn-outline btn small`}
                            onClick={loadMore}
                        >
                            Load More
                        </button>
                    </div>
                ) : null
            }
        </>
    )
}

const MovieSearch = props => {

    const typingTimeoutRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchItemChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            props.handleKeyword(value);
        }, 300)
    }


    return (
        <div className='movie-search'>
            <input
                type="text"
                placeholder="Enter keyword"
                value={searchTerm}
                onChange={handleSearchItemChange}
            />
           
        </div>

    )
}

export default MovieGrid;