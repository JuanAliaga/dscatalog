import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import {Category, UsersResponse } from 'core/types/Product';
import { makePrivateRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/UserCardLoader';


const List = () =>{
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/users/create');
    }

    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,setName] = useState('');
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
    },[activePage,name])
   
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
    }

    const clearFilters = ()=>{
        setActivePage(0);
        setName('');
    }

    return (
        <div className="admin-products-list">
            <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleCreate}>
                ADICIONAR
            </button>
            <ProductFilters name={name}  handleChangeCategory={handleChangeCategory} handleChangeName={handleChangeName} clearFilters={clearFilters}/>
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