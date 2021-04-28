import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import {CategoriesResponse, Category,} from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/CategoryCardLoader'


const List = () =>{
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/categories/create');
    }

    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();
    console.log(categoriesResponse);

    const getCategories = useCallback(() => {
        const params ={
            page:activePage,
            linesPerPage:4,
            direction: 'DESC',
            orderBy:'id',
            name:name
        }

        setIsLoading(true);
        makeRequest({url: '/categories', params})
            .then(response => setCategoriesResponse(response.data))
            .finally(() =>{
                setIsLoading(false);
            })
    },[activePage,name,category])

    useEffect(()=>{
        getCategories();
    },[getCategories]);

    const onRemove = (categoryId: number)=>{
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        
        if(confirm){
            makePrivateRequest({
                url:`/categories/${categoryId}`,
                method: 'DELETE'
            })
            .then(()=>{
                toast.info('Categoria removida com sucesso');
                getCategories();
            })
            .catch(()=>{
                toast.error('Erro ao remover categoria');
            })
        }
    }

    const handleChangeName = (name:string) =>{
        setActivePage(0);
        setName(name);
    }

    const handleChangeCategory= (category:Category)=>{
        setActivePage(0);
        setCategory(category);
    }

    const clearFilters = ()=>{
        setActivePage(0);
        setCategory(undefined);
        setName('');
    }

    return (
        <div className="admin-products-list">
            <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleCreate}>
                ADICIONAR
            </button>
            <ProductFilters name={name} category={category} handleChangeCategory={handleChangeCategory} handleChangeName={handleChangeName} clearFilters={clearFilters}/>
            </div>
        <div className="admin-list-container">
            {isLoading ? <CardLoader/> : categoriesResponse?.content.map(category => (
                <Card category={category} key={category.id} onRemove={onRemove}/>
                )
                )
            }
        </div>
        {categoriesResponse && (
       <Pagination 
       totalPages={categoriesResponse?.totalPages}
       activePage={activePage}
       onChange={page => setActivePage(page)}
       />
       )}
        </div>
    )
}

export default List;