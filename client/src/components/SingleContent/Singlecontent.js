import './singlecontent.css';

import { img_300, unavailable } from '../SingleContent/config/config';
import {Button} from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import ContentModal from '../Contentmodel/Contentmodel';
import React from 'react';
import favorite from '../favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Singlecontent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {
    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color="primary"> </Badge>
            <img className="poster"
             src={ poster ? `${img_300}/${poster}`: unavailable} alt={title}></img>
             <b className="title">{title}</b>
             <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
            
            </ContentModal>
    )
}

export default Singlecontent
