import { makePrivateRequest } from 'core/utils/request';
import BaseForm from 'pages/Admin/components/BaseForm';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Role } from 'core/types/Product';

type FormState ={
    firstName: string,
	lastName:string,
	email:string,
	password:string,
	roles:Role[]
}
type ParamsType={
    userId:string;
}

const OPTIONS = [
    { value: { authority:'ROLE OPERATOR'}, label: 'ROLE OPERATOR' },
    { value: { authority:'ROLE ADMIN'}, label: 'ROLE ADMIN' },
  ]
const Form = () =>{
    const {register,handleSubmit, errors,setValue,control} = useForm<FormState>();
    const history = useHistory();
    const {userId} = useParams<ParamsType>();
    const isEditing = userId !== 'create';
    const formTitle = isEditing ? 'Editar um Produto' : 'Cadastrar um Produto';

    useEffect(()=>{
        if(isEditing){
            makePrivateRequest({url:`/users/${userId}`})
            .then(response =>{
                setValue('firstName', response.data.firstName);
                setValue('lastName', response.data.lastName);
                setValue('email',response.data.email);
                setValue('roles',response.data.roles);     
        })
        }
    },[userId,isEditing,setValue]);
   
    const onSubmit =(data:FormState) =>{
       makePrivateRequest({
           url: isEditing ? `/users/${userId}` : '/users',
           method: isEditing ? 'PUT' : 'POST',
           data
        })
       .then(()=>{
        toast.info('Usuario cadastrado com sucesso');
        history.push('/admin/users');
       })
       .catch(()=>{
           toast.error('Erro ao salvar usuario');
       })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6 mt-5">
                        <div className="margin-bottom-30">
                            <input 
                            ref={register({required: "Campo obrigatório",
                            minLength:{value:2, message: "O campo deve ter no minimo 2 caracteres"},
                            maxLength:{value:60, message: "O campo deve ter no maximo 60 caracteres"}
                            })}
                            name="firstName"
                            type="text" 
                            className="form-control input-base" 
                            
                            placeholder="Nome"
                            >
                            </input>
                            {errors.firstName && (
                                                    <div className="invalid-feedback d-block">{errors.firstName.message}</div>
                        )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                            ref={register({required: "Campo obrigatório",
                            minLength:{value:2, message: "O campo deve ter no minimo 2 caracteres"},
                            maxLength:{value:60, message: "O campo deve ter no maximo 60 caracteres"}
                            })}
                            name="lastName"
                            type="text" 
                            className="form-control input-base" 
                            
                            placeholder="Sobrenome"
                            >
                            </input>
                            {errors.lastName && (
                                                    <div className="invalid-feedback d-block">{errors.lastName.message}</div>
                        )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                            ref={register({required: "Campo obrigatório",
                            minLength:{value:5, message: "O campo deve ter no minimo 5 caracteres"},
                            maxLength:{value:60, message: "O campo deve ter no maximo 60 caracteres"}
                            })}
                            name="email"
                            type="text" 
                            className="form-control input-base" 
                            
                            placeholder="Email"
                            >
                            </input>
                            {errors.email && (
                                                    <div className="invalid-feedback d-block">{errors.email.message}</div>
                        )}
                        </div>
                        {isEditing ? <div/> :  <div className="margin-bottom-30">
                            <input 
                            ref={register({required: "Campo obrigatório",
                            minLength:{value:5, message: "O campo deve ter no minimo 5 caracteres"},
                            maxLength:{value:60, message: "O campo deve ter no maximo 60 caracteres"}
                            })}
                            name="password"
                            type="password" 
                            className="form-control input-base" 
                            
                            placeholder="Senha"
                            >
                            </input>
                            {errors.password && (
                                                    <div className="invalid-feedback d-block">{errors.password.message}</div>
                        )}
                        </div>}
                       
                        <div className="margin-bottom-30">
                                <Controller
                                as={Select}
                                name="roles"
                                rules={{required:true}}
                                control={control}
                                options={OPTIONS}
                                classNamePrefix="categories-select"
                                placeholder="Roles"
                                defaultValue=""
                                isMulti
                                />
                                 {errors.roles && (
                                                    <div className="invalid-feedback d-block">Campo Obrigatório</div>
                        )}
                        </div>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;
