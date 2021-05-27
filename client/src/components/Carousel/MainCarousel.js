import "react-alice-carousel/lib/alice-carousel.css";
import './App.css';

import React, {Component} from 'react';

import AliceCarousel from 'react-alice-carousel';
import axios from 'axios'

export default class MainCarousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      galleryItems: [],
    };
}
 getData (){
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=60b7301de715242846997fe01f1b96fd`, {})
        .then(res => {
                const data = res.data.results
              const img = data.map(m => 
                <img src={m.poster_path} alt=""/>
              )
              this.setState({
                galleryItems: img
              })
            }).catch((error) => {
                console.log(error)
            })
  }
  responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  }
  componentDidMount() {
   this.getData()
}
  
  render() {
    return (
      <div>
        <AliceCarousel
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        disableAutoPlayOnAction={true}
      />
      </div>
    )
  }
}