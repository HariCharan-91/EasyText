import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from './pages/Hero/Hero'
import Images from './pages/Images/Images'
import Highlights from './pages/Highlights/Highlight'
import './App.css'
import Navbar from './components/Navbar/Navbar';

export default function App() {

return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        ></Route>
        <Route
          path="/Images"
          element={<Images />}
        ></Route>
        <Route
          path="/Highlights"
          element={<Highlights />}
        ></Route>
      </Routes>
    </Router>
  )
}
