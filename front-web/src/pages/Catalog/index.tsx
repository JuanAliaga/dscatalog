import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import './styles.scss';
import {Link} from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';

const Catalog = () =>{

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
        linesPerPage:5
    }

    setIsLoading(true);
    makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() =>{
            setIsLoading(false);
        })
},[activePage]);

    return (
    <div className="catalog-container">
        <h1 className= "catalog-title">Catálogo de produtos</h1>
        <div className="catalog-products">
            {isLoading ? <ProductCardLoader/>:(productsResponse?.content.map(product =>(
                <Link to={`/products/${product.id}`} key={product.id}>
                    <ProductCard product = {product}/>
                    </Link>
            ))  
            )}
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

export default Catalog;
