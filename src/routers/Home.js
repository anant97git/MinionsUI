import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import { SliderData } from './SliderData';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ActionAreaCard from "../components/ActionAreaCard";
import { Title } from "@mui/icons-material";
import './Home.css';


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  // { width: 768, itemsToShow: 3 },
  // { width: 1200, itemsToShow: 4 },
];



function Home() {


  const [dataLoaded, setDataLoaded] = useState(false);

  const [documents, setDocuments] = useState([]);

  const [normalNews, setNormalNews] = useState([]);


  const [useremail, setUseremail] = useState(null);

  useEffect(() => {

      console.log(window.location.href);
      if (window.location.href.includes("ticketId") && window.location.href.includes("status")) {
  
        const queryParams = new URLSearchParams(window.location.search);
        const ticketId = queryParams.get('ticketId');
        console.log(ticketId)
        const getUserDetailApi = 'http://jssostg.indiatimes.com/sso/crossdomain/v1liteUserProfile?responsetype=json&type=JSON&update=true&siteId=eec5b06ed436ddefdb4c3a59c5ea0468&channel=minions&ticketId=' + ticketId;
        console.log(getUserDetailApi)
  
        axios.get('https://serene-caverns-15409.herokuapp.com/' + getUserDetailApi).then((response) => {
  
          if(response.data.code === "200")
          {
            console.log("Home",response.data.primaryEmailId)
            const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&user='+response.data.primaryEmailId;
            console.log(getTrendingNewsApi);
            setUseremail(response.data.primaryEmailId);
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
        
            const getNormalNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=10&recordscount=100&wt=json&user='+response.data.primaryEmailId;
        
            fetch(getNormalNewsApi)
              .then(response => response.json())
              .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));
                setNormalNews(response.result.doc)
                normalNews.forEach(element => {
                  console.log('el :', element)
                });
                setDataLoaded(true);
              })
              .catch(error => console.log(error))
            }
        }).catch(error => console.log(error))
        console.log("--- " + ticketId);
        console.log('getNews');
    }}, [window.location.href]);

  useEffect(() => {
    console.log('getNews');

    const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&user='+useremail;
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

    const getNormalNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=10&recordscount=100&wt=json&user='+useremail;

    fetch(getNormalNewsApi)
      .then(response => response.json())
      .then(response => {
        console.log('type of response :- ', typeof response);
        console.log('response :-  ', response);
        console.log('type of doc :- ', typeof response.result.doc);
        console.log('doc :-  ', response.result.doc);
        console.log(Array.isArray(response.result.doc));

        setNormalNews(response.result.doc)

        normalNews.forEach(element => {
          console.log('el :', element)
        });

        setDataLoaded(true);
      })
      .catch(error => console.log(error))

  }, [])

  const normalNewsList = normalNews.map((news) => (
    <div>
      <div className='box'>
        <h3>{news.title}</h3>
        {news.subject}
        {/* <p>{news.story}</p> */}
        <br />
        <font color="blue"> <a href={news.key_source} target="_blank">Read fully story</a> </font>
      </div><br />
    </div>
  )
  )


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
              msid={document.datasourceId !== undefined ? document.datasourceId : null}
            />{console.log('dl 2', dataLoaded)}</Item>
          ) : null}
        </Carousel>
      </div>
      <hr />

      <div>
        {normalNewsList}
      </div>

    </>
  );
}

export default Home;


