import Pagination from 'core/components/Pagination';
import {ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoader'

const List = () =>{
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    console.log(productsResponse);

    const getProducts = useCallback(() => {
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
    },[activePage])
    //quando o componente iniciar, busca a lista de proudutos
    // quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinamicamente

    useEffect(()=>{
       getProducts();
    },[getProducts]);

    const onRemove = (productId: number)=>{
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        
        if(confirm){
            makePrivateRequest({
                url:`/products/${productId}`,
                method: 'DELETE'
            })
            .then(()=>{
                toast.info('Produto removido com sucesso');
                getProducts();
            })
            .catch(()=>{
                toast.error('Erro ao remover produto');
            })
        }
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary" onClick={handleCreate}>
                ADICIONAR
            </button>
        <div className="admin-list-container">
            {isLoading ? <CardLoader/> : productsResponse?.content.map(product => (
                <Card product={product} key={product.id} onRemove={onRemove}/>
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
