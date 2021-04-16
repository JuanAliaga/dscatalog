import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from 'pages/Admin/components/BaseForm';
import React from 'react';
import { useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';

import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type FormState ={
    name:string;
}
type ParamsType={
    categoryId:string;
}

const Form = () =>{
    const {register,handleSubmit, errors,setValue} = useForm<FormState>();
    const history = useHistory();
    const {categoryId} = useParams<ParamsType>();
    const isEditing = categoryId !== 'create';
    const formTitle = isEditing ? 'Editar um Produto' : 'Cadastrar um Produto';
   
    const onSubmit =(data:FormState) =>{
       makePrivateRequest({
           url: isEditing ? `/categories/${categoryId}` : '/categories',
           method: isEditing ? 'PUT' : 'POST',
           data
        })
       .then(()=>{
        toast.info('Produto cadastrado com sucesso');
        history.push('/admin/categories');
       })
       .catch(()=>{
           toast.error('Erro ao salvar produto');
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
                            minLength:{value:5, message: "O campo deve ter no minimo 5 caracteres"},
                            maxLength:{value:60, message: "O campo deve ter no maximo 60 caracteres"}
                            })}
                            name="name"
                            type="text" 
                            className="form-control input-base" 
                            
                            placeholder="Nome"
                            >
                            </input>
                            {errors.name && (
                                                    <div className="invalid-feedback d-block">{errors.name.message}</div>
                        )}
                        </div>
                        
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;
