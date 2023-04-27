import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import useLocalStorage, {userRoleKey} from './hooks/LocalStorageHook';

function App() {

    const [user, setUser, removeUser] = useLocalStorage(userRoleKey, "")
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element = {<NavBar user={user} removeUser = {removeUser}/>}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LogIn setUser={setUser}  />} />
            <Route path='/logout' element={<Logout removeUser={removeUser}  />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="movie/details" element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>

    );
}

export default App;