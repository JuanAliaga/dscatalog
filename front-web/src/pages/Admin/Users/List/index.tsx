import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import {Category, ProductsResponse, UsersResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/UserCardLoader';


const List = () =>{
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();
    console.log(usersResponse);

    const getUsers = useCallback(() => {
        const params ={
            page:activePage,
            linesPerPage:4,
            direction: 'DESC',
            orderBy:'id',
            firstName:name,
        }

        setIsLoading(true);
        makePrivateRequest({url: '/users', params})
            .then(response => setUsersResponse(response.data))
            .finally(() =>{
                setIsLoading(false);
            })
    },[activePage,name,category])
    //quando o componente iniciar, busca a lista de proudutos
    // quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinamicamente

    useEffect(()=>{
       getUsers();
    },[getUsers]);

    const onRemove = (userId: number)=>{
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        
        if(confirm){
            makePrivateRequest({
                url:`/users/${userId}`,
                method: 'DELETE'
            })
            .then(()=>{
                toast.info('Produto removido com sucesso');
                getUsers();
            })
            .catch(()=>{
                toast.error('Erro ao remover produto');
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
            {isLoading ? <CardLoader/> : usersResponse?.content.map(user => (
                <Card user={user} key={user.id} onRemove={onRemove}/>
                )
                )
            }
        </div>
        {usersResponse && (
       <Pagination 
       totalPages={usersResponse?.totalPages}
       activePage={activePage}
       onChange={page => setActivePage(page)}
       />
       )}
        </div>
    )
}

export default List;