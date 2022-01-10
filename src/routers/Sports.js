import React from "react";
import { useState, useEffect } from 'react';
import './boxDesign.css';



const Sports = () => {

    const [sportsNews, setSportsNews] = useState([]);

    const [cond, setCond] = useState(0);

    useEffect(() => {

        console.log('sports news');
        const getSportsNewApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=Sports';

        fetch(getSportsNewApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                setSportsNews(response.result.doc)

                console.log('spot :- ', sportsNews);
                console.log('length of array :- ', sportsNews.length)

                // worldNews.forEach(element => {
                //     console.log('el :', element)
                // });

            })
            .catch(error => console.log(error))

    }, [])

    // Note :- It has some issues
    const sportsNewsList = sportsNews.map((news) => (
        <div>
            <div className='box'>
                <h3>{news.title}</h3>
                {news.subject}
                {/* <p>{news.story}</p> */}
                <br />
                <font color="blue"> <a href={news.key_source}>Read fully story</a> </font>
            </div><br />
        </div>
    )
    )

    return (
        <div>
            <div className='dummyClass'>
                <h1>Hello Sports</h1>
            </div>
            <div>
                {sportsNewsList}
            </div>
        </div>
    )
}

export default Sports;