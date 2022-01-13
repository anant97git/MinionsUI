import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ActionAreaCard from "../components/ActionAreaCard";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { useCookies } from 'react-cookie';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    // { width: 768, itemsToShow: 3 },
    // { width: 1200, itemsToShow: 4 },
];

const World = () => {

    const [worldNews, setWorldNews] = useState([]);
    const [useremail, setUseremail] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [normalWorldNews, setNormalWorldNews] = useState([]);
    const [cookies, setCookie,removeCookie] = useCookies(['user']);

    useEffect(() => {

        console.log('top 10 world news');

        const getTrendingWorldNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&coverage=International&user=' + cookies.Email;

        fetch(getTrendingWorldNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                setWorldNews(response.result.doc);

                setDataLoaded(true);

            })
            .catch(error => console.log(error))

    }, [])

    useEffect(() => {

        console.log('normal world news');

        const getNormalWorldNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=50&wt=json&coverage=International&user=' + cookies.Email;

        fetch(getNormalWorldNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                setNormalWorldNews(response.result.doc);

            })
            .catch(error => console.log(error))

    }, [])

    const normalWorldNewsList = normalWorldNews.map((news) => (
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
                    {console.log('siz of doc :- ', worldNews.length, dataLoaded)}
                    {dataLoaded ? worldNews.map((document) =>
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
                {normalWorldNewsList}
            </div>
        </>
    )
}

export default World;