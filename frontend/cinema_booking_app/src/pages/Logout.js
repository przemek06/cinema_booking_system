import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';


const Logout = ({removeUser}) => {
    const navigate  = useNavigate()

    useEffect(() => {
        removeUser()
    });

    return (
        <>      </>
    );
}

export default Logout;