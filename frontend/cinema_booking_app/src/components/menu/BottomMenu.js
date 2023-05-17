import { Link } from "react-router-dom";

const AdminBottomMenu = ({logout}) => {
    return (
        <div className="bottom-menu">
            <Link to="/about">ABOUT</Link>
            <Link to="/">NOW PLAYING</Link>
            <Link to="/movie/add">ADD MOVIE</Link>
            <Link to="/halls">HALLS</Link>
            <Link to="/profile">PROFILE</Link>
            <Link to="/" onClick={() => logout()} >LOGOUT</Link>
        </div>
    );
}

const UserBottomMenu = ({logout}) => {
    return (
        <div className="bottom-menu">
            <Link to="/about">ABOUT</Link>
            <Link to="/">NOW PLAYING</Link>
            <Link to="/profile">PROFILE</Link>
            <Link to="/" onClick={() => logout()}  >LOGOUT</Link>
        </div>
    );
}

const AnonBottomMenu = () => {

    return (
        <div className="bottom-menu"> 
            <Link to="/about">ABOUT</Link>
            <Link to="/">NOW PLAYING</Link>
            <Link to="/login">LOGIN</Link>
        </div>
    );
}

const BottomMenu = ({user, logout}) => {
    switch(user) {
        case "ROLE_ADMIN":
            return <AdminBottomMenu logout = {logout}/>
        case "ROLE_USER":
            return <UserBottomMenu logout = {logout}/>
        default:
            return <AnonBottomMenu />
    }
}

export default BottomMenu;