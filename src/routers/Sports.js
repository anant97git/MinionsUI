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

const Sports = () => {

    const [sportsNews, setSportsNews] = useState([]);
    const [useremail, setUseremail] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [normalSportsNews, setNormalSportsNews] = useState([]);
    const [cookies, setCookie,removeCookie] = useCookies(['user']);


    const [cond, setCond] = useState(0);

    useEffect(() => {

        console.log(' top 10 sports news');
        const getSportsNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&category=Sports&user=' + cookies.Email;

        fetch(getSportsNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                setSportsNews(response.result.doc);

                setDataLoaded(true);
            })
            .catch(error => console.log(error))

    }, [])


    useEffect(() => {

        console.log('normal Sports news');

        const getNormalSportsNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=10&recordscount=50&wt=json&category=Sports&user=' + cookies.Email;

        fetch(getNormalSportsNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                if (Array.isArray(response.result.doc)) {
                    setNormalSportsNews(response.result.doc);
                }
            })
            .catch(error => console.log(error))

    }, [])

    // Note :- It has some issues
    const normalSportsNewsList = (normalSportsNews.length === 0) ?
        <div>
            <h1>No data obtained</h1>
        </div> :
        (normalSportsNews.map((news) => (
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
        ))

    return (
        <>
            {/* <div className='dummyClass'> 
                <h1>Hello India</h1>
            </div> */}

            <div className="App1">
                <Carousel breakPoints={breakPoints}>
                    {console.log('dl 1', dataLoaded)}
                    {console.log('siz of doc :- ', sportsNews.length, dataLoaded)}
                    {dataLoaded ? sportsNews.map((document) =>
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
                {normalSportsNewsList}
            </div>
        </>
    )
}

export default Sports;