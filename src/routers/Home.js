import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import { SliderData } from './SliderData';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ActionAreaCard from "../components/ActionAreaCard";
import { Title } from "@mui/icons-material";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];



function Home() {


  const [dataLoaded, setDataLoaded] = useState(false);

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
        console.log('getNews');

        const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json';
        console.log(getTrendingNewsApi);

        fetch(getTrendingNewsApi)
          .then(response => response.json())
          .then(response => {
            console.log('type of response :- ', typeof response);
            console.log('response :-  ', response);
            console.log('type of doc :- ', typeof response.result.doc);
            console.log('doc :-  ', response.result.doc);
            console.log(Array.isArray(response.result.doc));

            setDocuments(response.result.doc)

            documents.forEach(element => {
              console.log('el :', element)
            });

            setDataLoaded(true);

          })
          .catch(error => console.log(error))
  }, [])


  const getNews = () => {
    console.log('getNews');

    const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json';
    console.log(getTrendingNewsApi);

    fetch(getTrendingNewsApi)
      .then(response => response.json())
      .then(response => {
        console.log('type of response :- ', typeof response);
        console.log('response :-  ', response);
        console.log('type of doc :- ', typeof response.result.doc);
        console.log('doc :-  ', response.result.doc);
        console.log(Array.isArray(response.result.doc));

        setDocuments(response.result.doc)

        documents.forEach(element => {
          console.log('el :', element)
        });

        setDataLoaded(true);

      })
      .catch(error => console.log(error))
  }

  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
      <div className="App1">
        <Carousel breakPoints={breakPoints}>
          {console.log('dl 1', dataLoaded)}
          {console.log('siz of doc :- ', documents.length, dataLoaded)}
          {dataLoaded ? documents.map((document) =>
            <Item><ActionAreaCard
              title={document.title}
              subject={document.subject}
              story={document.story}
              key_source={document.key_source}
            />{console.log('dl 2', dataLoaded)}</Item>
          ) : null}
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