import ButtonIcon from 'core/components/buttonIcon';
import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss'
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData ={
    username: string;
    password:string;
}
const Login = () =>{
    const {register, handleSubmit} = useForm();
    const [hasError,setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data:FormData) => {
        console.log(data);
        makeLogin(data)
        .then(response=>{
            setHasError(false);
            saveSessionData(response.data);
            history.push('/admin');
        })
        .catch(() => {
            setHasError(true);
        })
    }
    return (
        <div>
            <AuthCard title="Login">
                {hasError && (<div className="alert alert-danger">Usuario ou senha invalidos</div>)}
                <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
                   
                    <input className="form-control input-base margin-bottom-30" type="email" placeholder="Email" name="username" ref={register({required:true})} ></input>
                    <input className="form-control input-base" type="password" placeholder="Password" name="password" ref={register({required:true})}></input>
                    

                    <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                    </Link>
                    <div className="login-submit">
                    <ButtonIcon text="Logar"/>
                    </div>
                    <div className="text-center">
                        <span className="not-registered">
                            Não tem cadastro?
                            <Link to="/admin/auth/register" className="login-link-register">
                                Cadastrar
                            </Link>
                        </span>
                    </div>
                </form>
            </AuthCard>
            

        </div>
    )
}

export default Login;