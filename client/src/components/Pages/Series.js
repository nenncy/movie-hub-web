import {History, useHistory} from "react-router-dom";
import { use, useEffect, useState } from "react";

import Custompagination from '../Pagination/Custompagination';
import Genres from '../Geners/Genres';
import React from 'react';
import SingleContent from '../SingleContent/Singlecontent';
import axios from 'axios';
import useGenre from '../hooks/customgenres';

const Series = () => {

  const history= useHistory();
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    
    const fetchSeries = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=60b7301de715242846997fe01f1b96fd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        // console.log(data);
      };
    
      useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
        // eslint-disable-next-line
      }, [genreforURL, page]);
    
      
  if(!localStorage.getItem('token')){
    history.push("/login");
}
   
    
    return (
        <div>
         <div>
             <span className="pageTitle">TV SERIES</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
        <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <Custompagination setPage={setPage}numOfPages={numOfPages} />
        </div>
        </div>
    )
}

export default Series
