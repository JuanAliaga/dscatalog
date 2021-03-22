import React from 'react';
import './styles.scss';
import {ReactComponent as AuthImage} from 'core/assets/images/auth.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Index';

const Auth = () =>{
    return (
        <div className="auth-container">
            <div className="auth-info">
                <h1 className="auth-title">Divulgue seus produtos <br/>no DsCatalog</h1>
                <p className="auth-subtitle">
                    Faça parte do nosso catalogo de divulgação e <br/> aumente a venda de seus produtos
                </p>
                <AuthImage/>
            </div>
            <div className="auth-content">
                <Switch>
                    <Route path="/auth/login">
                        <Login/>
                    </Route>
                        <Route path="/auth/register"> 
                            <h1>registrar</h1>
                        </Route>
                        <Route path="/auth/recover">
                            <h1>recuperar</h1>
                        </Route>
                </Switch>
                
            </div>
        </div>
    ) 
}

export default Auth;