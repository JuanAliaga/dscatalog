import React, { useEffect, useState } from 'react';
import {ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg'
import './styles.scss'
import Select from 'react-select';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Product';

type Props = {
    name?:string;
    category?:Category;
    handleChangeName:(value:string)=>void;
    handleChangeCategory:(value:Category)=>void;
    clearFilters:()=>void;
}

const ProductFilters = ({name,handleChangeName,handleChangeCategory,clearFilters,category}:Props) =>{
    const [isLoadingCategories,setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>();
    

    useEffect(()=>{
        setIsLoadingCategories(true)
        makeRequest({url:'/categories/'})
            .then(response => setCategories(response.data.content))
            .finally(()=>setIsLoadingCategories(false));
    },[])
    
   
    return(
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input className="form-control" value={name} type="text" placeholder="Pesquisar" onChange={event =>handleChangeName(event.target.value)}/>
                <SearchIcon/>
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                value={category}
                rules={{required:true}}
                options={categories}
                isLoading={isLoadingCategories}
                getOptionLabel={(option:Category)=> option.name}
                getOptionValue={(option:Category)=> String(option.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                placeholder="Categorias"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
                />
                <button className="btn btn-outline-secondary border-radius-10" onClick={clearFilters}>
                    Limpar Filtro
                </button>       
            </div>
    )
}

export default ProductFilters;