import ButtonIcon from 'core/components/buttonIcon';
import React from 'react';
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss'
import { makeLogin } from 'core/utils/request';

type FormData ={
    username: string;
    password:string;
}
const Login = () =>{
    const {register, handleSubmit} = useForm();
    const onSubmit = (data:FormData) => {
        console.log(data);
        makeLogin(data)
    }
    return (
        <div>
            <AuthCard title="Login">
                <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
                   
                    <input className="form-control input-base margin-bottom-30" type="email" placeholder="Email" name="username" ref={register} ></input>
                    <input className="form-control input-base" type="password" placeholder="Password" name="password" ref={register}></input>
                    

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