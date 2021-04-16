import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Products from './components/Products';
import PrivateRoute from 'core/components/Routes/PrivateRoute';

import './styles.scss';
import Users from './Users';
import Categories from './Categories';

const Admin = () =>{
    return (
    <div className="admin-container">
        <NavBar/>
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products/>
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <Categories/>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <Users/>
                </PrivateRoute>
                
            </Switch>
        </div>
    </div>
    )
}

export default Admin;
