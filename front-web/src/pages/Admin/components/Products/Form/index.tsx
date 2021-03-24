import React from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import { makePrivateRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory } from 'react-router';

type FormState ={
    name:string;
    price:string;
    category:string;
    description:string;
    imgUrl:string;
}

const Form = () =>{
    const {register,handleSubmit, errors} = useForm<FormState>();
    const history = useHistory();

   
    const onSubmit =(data:FormState) =>{
       makePrivateRequest({url:'/products',method:'POST',data})
       .then(()=>{
        toast.info('Produto cadastrado com sucesso');
        history.push('/admin/products');
       })
       .catch(()=>{
           toast.error('Erro ao salvar produto');
       })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="Cadastrar um Produto">
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
                        <div className="margin-bottom-30">
                            <input 
                            ref={register({required: "Campo obrigatório"})}
                            name="price"
                            type="text" 
                            className="form-control  input-base" 
                            
                            placeholder="Preço"
                            >
                            </input>
                            {errors.price && (
                                                    <div className="invalid-feedback d-block">{errors.price.message}</div>
                        )}
                        </div>                              
                        <div className="margin-bottom-30">
                        <input 
                            ref={register({required: "Campo obrigatório"})}
                            name="imgUrl"
                            type="text" 
                            className="form-control input-base" 
                            
                            placeholder="Imagem do produto"
                            >
                            </input>
                            {errors.imgUrl && (
                                                    <div className="invalid-feedback d-block">{errors.imgUrl.message}</div>
                        )}
                        </div>                       
                    </div>
                    <div className="col-6">
                        <textarea name="description"                         
                            ref={register({required: "Campo obrigatório"})}
                            className="form-control"
                            cols={30} 
                            rows={18}>

                        </textarea>
                        {errors.description && (
                                                    <div className="invalid-feedback d-block">{errors.description.message}</div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;
