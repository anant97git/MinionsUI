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

function App() {
  return (
    <div className="App">
      <TopNav />
      <ResponsiveAppBar />

      <BrowserRouter>
        <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route path='/home' element={<Home/>} />
          <Route path="/bollywood" element={<Bollywood />} />
          <Route path="/world" element={<World/>} />
          <Route path="/india" element={<India/>} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
