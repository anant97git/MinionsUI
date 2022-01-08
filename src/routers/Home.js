import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import { SliderData } from './SliderData';
import axios from 'axios';
import { useState, useEffect } from 'react';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const getNews = () => {
  console.log('getNews');
}

function Home() {

  useEffect(() => {
    const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json';
    console.log(getTrendingNewsApi);

    axios.get('https://serene-caverns-15409.herokuapp.com/' + getTrendingNewsApi)
      .then(response => console.log(response))
      .catch(error => console.log(error))

    // axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => console.log('new req :- ' + response))
    //   .catch(error => console.log('neq error :- ' + error))

  }, [])

  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
      <div className="App1">
        <Carousel breakPoints={breakPoints}>
          {SliderData.map((slide) => {
            return (<Item><img src={slide.image} alt='travel image' className='image' /></Item>)
          })}
        </Carousel>
      </div>
      <hr />
      <div>

      </div>
      <h1><a onClick={getNews}>Get News</a></h1>
    </>
  );
}

export default Home;


// Trending news api :-
// http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json

// Normal api :- (not logged in)
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json

// for India
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=India


// for India Business
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=India%20Business

// for News
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=News

// for Science
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=Science


// for person (with keyword of modi)
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&keyword=Modi


// for city basis (goa)
// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&coverage=Goa

// http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&coverage=Delhi