import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ActionAreaCard from "../components/ActionAreaCard";
import Carousel from "react-elastic-carousel";
import Item from "./Item";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  // { width: 768, itemsToShow: 3 },
  // { width: 1200, itemsToShow: 4 },
];

const India = () => {

  const [countryNews, setCountryNews] = useState([]);
  const [useremail, setUseremail] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (window.location.href.includes("ticketId") && window.location.href.includes("status")) {

      const queryParams = new URLSearchParams(window.location.search);
      const ticketId = queryParams.get('ticketId');
      const getUserDetailApi = 'http://jssostg.indiatimes.com/sso/crossdomain/v1liteUserProfile?responsetype=json&type=JSON&update=true&siteId=eec5b06ed436ddefdb4c3a59c5ea0468&channel=minions&ticketId=' + ticketId;
      console.log(getUserDetailApi)

      axios.get('https://serene-caverns-15409.herokuapp.com/' + getUserDetailApi).then((response) => {
        if (response.data.code === "200") {
          const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&category=India&user=' + response.data.primaryEmailId;
          setUseremail(response.data.primaryEmailId);
          fetch(getTrendingNewsApi)
            .then(response => response.json())
            .then(response => {
              setDocuments(response.result.doc)
              documents.forEach(element => {
                console.log('el :', element)
              });

              setDataLoaded(true);
            })
            .catch(error => console.log(error))

          // const getIndiaNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=India&user=' + response.data.primaryEmailId;
          // fetch(getIndiaNewsApi)
          //   .then(response => response.json())
          //   .then(response => {
          //     setCountryNews(response.result.doc)
          //     countryNews.forEach(element => {
          //       console.log('el :', element)
          //     });
          //   })
          //   .catch(error => console.log(error))

        }
      }).catch(error => console.log(error))
    }
  }, [window.location.href]);


  useEffect(() => {

    const getTrendingNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&category=India&user=' + useremail;
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

  useEffect(() => {

    console.log('india news');
    const getIndiaNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=10&recordscount=50&wt=json&category=India&user=' + useremail;

    fetch(getIndiaNewsApi)
      .then(response => response.json())
      .then(response => {
        console.log('type of response :- ', typeof response);
        console.log('response :-  ', response);
        console.log('type of doc :- ', typeof response.result.doc);
        console.log('doc :-  ', response.result.doc);
        console.log(Array.isArray(response.result.doc));

        setCountryNews(response.result.doc)

        countryNews.forEach(element => {
          console.log('el :', element)
        });

      })
      .catch(error => console.log(error))

  }, [])

  const countryNewsList = countryNews.map((news) => (
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
      {/* <div className='dummyClass'> 
                <h1>Hello India</h1>
            </div> */}

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
        {countryNewsList}
      </div>
    </>
  )
}

export default India;