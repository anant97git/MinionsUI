import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import { SliderData } from './SliderData';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
      <div className="App1">
        <Carousel breakPoints={breakPoints}>
          {SliderData.map((slide) => {
            return(<Item><img src={slide.image} alt='travel image' className='image' /></Item>)
          })}
        </Carousel>
      </div>
    </>
  );
}

export default Home;
