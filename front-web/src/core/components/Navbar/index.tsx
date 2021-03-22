import React, { useEffect, useState } from 'react';
import './styles.scss';
import {Link, NavLink, useLocation} from 'react-router-dom';
import { getAccessTokenDecoded, isAllowedByRole, logout } from 'core/utils/auth';

const Navbar = () =>{
    const [currentUser,setCurrentUser]= useState('');
    const location = useLocation();

    useEffect(()=>{
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    },[location]);

    const handleLogout = (event:React.MouseEvent<HTMLAnchorElement,MouseEvent>) =>{
        event.preventDefault();
        logout();
    }

    return (
        <nav className= "row bg-primary main-nav">
            <div className="col-3 ">
                <Link to="/" className="nav-logo-txt">
                <h4>DsCatalog</h4>
                </Link>
            </div>
            <div className="col-6 ">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" className="navlink" activeClassName="active" exact>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className="navlink" activeClassName="active">
                            CATALOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin"  className="navlink" activeClassName="active">
                                ADMIN
                        </NavLink>
                    </li>
                    
                        
                </ul>
            </div>
            <div className="col-3 text-right ">
                {currentUser && (
                    <>
                    {currentUser} 
                    <a href="#logout" 
                    className="navlink active d-inline"
                    onClick={handleLogout}
                    > LOGOUT</a>
                    </>
                )}
                {!currentUser && (
                    <Link to="/auth/login" className="navlink active">LOGIN</Link>
                )}
                
            </div>
        </nav>
    );
}

export default Navbar;