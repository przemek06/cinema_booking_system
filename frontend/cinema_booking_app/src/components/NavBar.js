import { Outlet, Link } from "react-router-dom";
import {MDBIcon } from 'mdb-react-ui-kit';
import "./NavBar.css"


const NavBar = (user) => {
    return (
        <>
        <nav>
            <div className="logo">SILVER SCREEN CINEMA</div>
            <div className="menu">
                <div className="top-menu">
                    <a href='https://www.temporary-url.com/A9BA7'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                    <a href='https://www.temporary-url.com/A9BA7'>
                        <MDBIcon fab icon="twitter" />
                    </a>
                    <a href='https://www.temporary-url.com/A9BA7'>
                        <MDBIcon fab icon="youtube" />
                    </a>
                    <a href='https://www.temporary-url.com/A9BA7'>
                        <MDBIcon fab icon="instagram" />
                    </a>
                </div>
                <div className="bottom-menu">
                    <Link to="/about">ABOUT</Link>
                    <Link to="/login">SIGN-IN</Link>
                    <Link to="/">NOW PLAYING</Link>
                </div>
            </div>
        </nav>
  
        <Outlet />
      </>
    )
}

export default NavBar;