import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Products from './components/Products';
import PrivateRoute from 'core/components/Routes/PrivateRoute';

import './styles.scss';

const Admin = () =>{
    return (
    <div className="admin-container">
        <NavBar/>
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products/>
                    <h1>Produtos</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                <h1>Categorias</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                <h1>Usuarios</h1>
                </PrivateRoute>
                
            </Switch>
        </div>
    </div>
    )
}

export default Admin;
