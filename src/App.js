import React from 'react';
import './App.css';
import TopNav from './components/TopNav';
import { SideNav } from './components/SideNav';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import RowAndColumnSpacing from './components/RowAndColumnSpacing';
import Bollywood from './routers/Bollywood';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import Home from './routers/Home';

function App() {
  return (
    <div className="App">
      <TopNav />
      <ResponsiveAppBar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Bollywood" element={<Bollywood />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
