import { Outlet } from "react-router-dom";
import {MDBIcon } from 'mdb-react-ui-kit';
import "./NavBar.css"
import BottomMenu from "./BottomMenu"

const onLogout = (removeUser) => {
    removeUser()
    window.location.reload(false);
}

const NavBar = ({user, removeUser}) => {

    const logout = () => onLogout(removeUser)

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
                <BottomMenu user = {user} logout = {logout} />
            </div>
        </nav>
  
        <Outlet />
      </>
    )
}

export default NavBar;