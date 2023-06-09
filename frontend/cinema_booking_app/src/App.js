import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/menu/NavBar";
import Footer from './components/Footer';
import CinemaHalls from './pages/CinemaHalls';
import AddMovie from './pages/AddMovie';
import AdminPanel from './pages/AdminPanel';
import useLocalStorage, {userRoleKey} from './hooks/LocalStorageHook';
import "./pages/Style.css";
import MakeReservation from './pages/MakeReservation';

function App() {

    const [user, setUser, removeUser] = useLocalStorage(userRoleKey, "")
    return (
      <div className='page-container'>
          <BrowserRouter>
          <Routes>
            <Route path="/" element = {<NavBar user={user} removeUser = {removeUser}/>}>
              <Route path='/' element={<Home isAdmin={user === "ROLE_ADMIN"} isUser={user === "ROLE_USER"}/>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<LogIn setUser={setUser}  />} />
              <Route path='/logout' element={<Logout removeUser={removeUser}  />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/movie/add' element={<AddMovie />} />
              <Route path="/movie/details" element={<MovieDetails isAdmin={user === "ROLE_ADMIN"} isUser={user === "ROLE_USER"}/>} />
              <Route path="/halls" element={<CinemaHalls />} />
              <Route path="/reservations" element={<MakeReservation isUser={user === "ROLE_USER"}/>}  />
              <Route path="/profile" element={<Profile />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer/>
      </div>
    );
}

export default App;