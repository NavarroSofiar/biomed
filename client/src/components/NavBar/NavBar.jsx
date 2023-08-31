import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import './NavBar.modules.css'

const NavBar = ({ keycloak }) => {
    const navigate = useNavigate()
    const handleLogin = () => {
        keycloak.login();
    };
    const handleLogout = () => {
        keycloak.logout();
        navigate('/')

    };

    const isAdmin = () => {
        return keycloak.tokenParsed && keycloak.tokenParsed.realm_access && keycloak.tokenParsed.realm_access.roles.includes('app-admin');
    }


    return (
        <div className='containerDiv'>
            
                <div >
                    <h1 className='title'>BioMed Manager</h1>
                </div>
                {isAdmin() && (
                    <Link to="/admin">
                        <button className='btnReload'>Admin</button>
                    </Link>
                )}
                {isAdmin() && (
                    <Link to="/admin/create-job">
                        <button className='btnReload'>Create Job</button>
                    </Link>
                )}
                {(!keycloak.authenticated &&
                    <button className='btnReload' onClick={handleLogin}>Log In</button>)}
                {!!keycloak.authenticated && (
                    <button className='btnReload' onClick={handleLogout}>Logout ({keycloak.tokenParsed.preferred_username})
                    </button>
                )}
            </div>
      
    );
}

export default NavBar;