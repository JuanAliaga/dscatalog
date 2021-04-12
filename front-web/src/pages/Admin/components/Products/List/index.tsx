import Pagination from 'core/components/Pagination';
import {ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';

const List = () =>{
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    console.log(productsResponse);
    //quando o componente iniciar, busca a lista de proudutos
    // quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinamicamente

    useEffect(()=>{
        const params ={
            page:activePage,
            linesPerPage:4,
            direction: 'DESC',
            orderBy:'id'
        }

        setIsLoading(true);
        makeRequest({url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() =>{
                setIsLoading(false);
            })
    },[activePage]);

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary" onClick={handleCreate}>
                ADICIONAR
            </button>
        <div className="admin-list-container">
            {productsResponse?.content.map(product => (
                <Card product={product} key={product.id}/>
                )
                )
            }
        </div>
        {productsResponse && (
       <Pagination 
       totalPages={productsResponse?.totalPages}
       activePage={activePage}
       onChange={page => setActivePage(page)}
       />
       )}
        </div>
    )
}

export default List;
