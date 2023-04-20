import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';


function App() {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element = {<NavBar/>}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LogIn />} />
            <Route path="movie/details" element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>

    );
}

export default App;