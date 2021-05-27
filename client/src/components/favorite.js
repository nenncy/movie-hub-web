import {useEffect, useState} from 'react';

import {Button} from '@material-ui/core';
import React from 'react';
import axios from 'axios';

const FavoriteCompo =(props)=>{

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }


    useEffect(() => {

       

        axios.post('/favorite/favoriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favoriteNumber)
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get favoriteNumber')
                }
            })

        axios.post('/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get Favorite Info')
                }
            })

    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            // When already added 

            axios.post('/favorite/removeFromFavorite', variable)
            .then(response=> {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1 )
                    setFavorited(!Favorited)
                } else {
                    alert(' Failed to remove from favorite')
                }
            })



        } else {
            //When Not adding yet 
        
            axios.post('/favorite/addToFavorite', variable)
            .then(response=> {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert(' Failed to add to Favirotes')
                }
            })
        
        }
    }


    return (
        <div>
            <Button style={{color:"white"}} onClick={onClickFavorite} >{Favorited ? " remove from Favortie " : " Add to Favorite"}{FavoriteNumber}</Button>

        </div>
    )
}

export default FavoriteCompo;
