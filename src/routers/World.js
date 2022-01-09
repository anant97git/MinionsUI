import React from "react";
import { useState, useEffect } from 'react';

const World = () => {

    const [worldNews, setWorldNews] = useState([]);

    useEffect(() => {

        console.log('world news');

        const getWorldNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=0&recordscount=50&wt=json&coverage=International';

        fetch(getWorldNewsApi)
            .then(response => response.json())
            .then(response => {
                console.log('type of response :- ', typeof response);
                console.log('response :-  ', response);
                console.log('type of doc :- ', typeof response.result.doc);
                console.log('doc :-  ', response.result.doc);
                console.log(Array.isArray(response.result.doc));

                setWorldNews(response.result.doc)

                // worldNews.forEach(element => {
                //     console.log('el :', element)
                // });

            })
            .catch(error => console.log(error))

    }, [])

    const worldNewsList = worldNews.map((news) => (
        <div>
            <center>
                <h3>{news.title}</h3>
                {news.subject}
                {/* <p>{news.story}</p> */}
                <br />
                <font color="blue"> <a href={news.key_source}>Read fully story</a> </font>
                <br />
            </center>
        </div>)
    )

    return (
        <div>
            <div className='dummyClass'>
                <h1>Hello World</h1>
            </div>
            <div>
                {worldNewsList}
            </div>
        </div>
    )
}

export default World;