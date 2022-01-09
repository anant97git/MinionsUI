import React from 'react';
import './App.css';
import TopNav from './components/TopNav';
import { SideNav } from './components/SideNav';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import RowAndColumnSpacing from './components/RowAndColumnSpacing';
import Bollywood from './routers/Bollywood';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import Home from './routers/Home';
import World from './routers/World';
import India from './routers/India';
import Inline from './components/Inline';
import Sports from './routers/Sports';

function App() {
  return (
    <div className="App">
      <TopNav />
      <ResponsiveAppBar />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/bollywood" element={<Bollywood />} />
          <Route path="/world" element={<World />} />
          <Route path="/india" element={<India />} />
          <Route path="/sports" element={<Sports />} />
        </Routes>
      </BrowserRouter>
      {/* <SideNav/> */}
      {/* <Inline/> */}

    </div>
  );
}

export default App;
