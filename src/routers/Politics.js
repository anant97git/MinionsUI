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


const Politics = () => {

    const [politicsNews, setPoliticsNews] = useState([]);
    const [useremail, setUseremail] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [normalPoliticsNews, setNormalPoliticsNews] = useState([]);

    const [cond, setCond] = useState(0);

    useEffect(() => {

        console.log(' top 10 politics news');
        const getPoliticsNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=10&wt=json&category=Politics&user=' + useremail;

        fetch(getPoliticsNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                setPoliticsNews(response.result.doc);

                setDataLoaded(true);
            })
            .catch(error => console.log(error))

    }, [])

    useEffect(() => {

        console.log('normal politics news');

        const getNormalPoliticsNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=10&recordscount=50&wt=json&category=Politics&user=' + useremail;

        fetch(getNormalPoliticsNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                if (Array.isArray(response.result.doc)) {
                    setNormalPoliticsNews(response.result.doc);
                }
            })
            .catch(error => console.log(error))

    }, [])

    const normalPoliticsNewsList = (normalPoliticsNews.length === 0) ?
        <div>
            <h1>No data obtained</h1>
        </div> :
        (normalPoliticsNews.map((news) => (
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
                    {console.log('siz of doc :- ', politicsNews.length, dataLoaded)}
                    {dataLoaded ? politicsNews.map((document) =>
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
                {normalPoliticsNewsList}
            </div>
        </>
    )
}

export default Politics;