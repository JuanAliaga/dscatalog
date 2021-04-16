import React, { useEffect, useState } from 'react';
import {useForm, Controller} from 'react-hook-form';
import {toast} from 'react-toastify';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import Select from 'react-select';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router';
import { Category } from 'core/types/Product';
import PriceField from './PriceField'

export type FormState ={
    name:string;
    price:string;
    categories:Category[];
    description:string;
    imgUrl:string;
}

type ParamsType={
    productId:string;
}

const Form = () =>{
    const {register,handleSubmit, errors,setValue,control} = useForm<FormState>();
    const history = useHistory();
    const {productId} = useParams<ParamsType>();
    const [isLoadingCategories,setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar um Produto' : 'Cadastrar um Produto';

    useEffect(()=>{
        if(isEditing){
            makeRequest({url:`/products/${productId}`})
            .then(response =>{
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('description',response.data.description);
                setValue('imgUrl',response.data.imgUrl);     
                setValue('categories', response.data.categories)
        })
        }
    },[productId,isEditing,setValue]);
   
    useEffect(()=>{
        setIsLoadingCategories(true)
        makeRequest({url:'/categories/'})
            .then(response => setCategories(response.data.content))
            .finally(()=>setIsLoadingCategories(false));
    },[])

    const onSubmit =(data:FormState) =>{
       makePrivateRequest({
           url: isEditing ? `/products/${productId}` : '/products',
           method: isEditing ? 'PUT' : 'POST',
           data
        })
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
                        <div className="margin-bottom-30">
                                <Controller
                                as={Select}
                                name="categories"
                                rules={{required:true}}
                                control={control}
                                options={categories}
                                isLoading={isLoadingCategories}
                                getOptionLabel={(option:Category)=> option.name}
                                getOptionValue={(option:Category)=> String(option.id)}
                                classNamePrefix="categories-select"
                                placeholder="Categoria"
                                defaultValue=""
                                isMulti
                                />
                                 {errors.categories && (
                                                    <div className="invalid-feedback d-block">Campo Obrigatório</div>
                        )}
                        </div>
                        <div className="margin-bottom-30">
                           <PriceField control={control}/>
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
