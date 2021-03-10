import ButtonIcon from 'core/components/buttonIcon';
import React, { useState } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss'
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData ={
    username: string;
    password:string;
}

type LocationState ={
    from :string;
}
const Login = () =>{
    const {register, handleSubmit,errors} = useForm();
    const [hasError,setHasError] = useState(false);
    const history = useHistory();
    let location = useLocation<LocationState>();

    let { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data:FormData) => {
        console.log(data);
        makeLogin(data)
        .then(response=>{
            setHasError(false);
            saveSessionData(response.data);
            history.replace(from);
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
                   <div className="margin-bottom-30">
                        <input className={`form-control input-base ${errors.username ? 'is-invalid': '' }`} type="email" placeholder="Email" name="username" 
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email inválido"
                            }
                          })}
                           ></input>
                        {errors.username && (
                                                    <div className="invalid-feedback d-block">{errors.username.message}</div>
                        )}
                    </div>
                    <div>
                        <input className={`form-control input-base ${errors.password ? 'is-invalid': '' }`}  type="password" placeholder="Password" name="password" ref={register({required:true})}></input>
                        {errors.password && (
                                                    <div className="invalid-feedback d-block">Campo Invalido</div>
                        )}
                    </div>
                    

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