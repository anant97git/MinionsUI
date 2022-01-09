import React from "react";
import { useState, useEffect } from 'react';

const India = () => {

    const [countryNews, setCountryNews] = useState([]);

    useEffect(() => {

        console.log('india news');
        const getIndiaNewsApi = 'http://172.29.38.107:8082/minions/search/trendingNews?start=51&recordscount=50&wt=json&category=India';

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
                <h1>Hello India</h1>
            </div>
            <div>
                {countryNewsList}
            </div>
        </div>
    )
}

export default India;