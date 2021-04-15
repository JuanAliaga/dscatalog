import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import './styles.scss';
import {Link} from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import { Category, ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';

const Catalog = () =>{

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();
    console.log(productsResponse);

    const getProducts= useCallback(()=>{
        const params ={
            page:activePage,
            linesPerPage:5,
            name:name,
            categoryId:category?.id
        }
    
        setIsLoading(true);
        makeRequest({url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() =>{
                setIsLoading(false);
            })
    },[activePage,name,category])
    //quando o componente iniciar, busca a lista de proudutos
    // quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinamicamente

    useEffect(()=>{
        getProducts();
    },[getProducts]);

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
    <div className="catalog-container">
        <div className="d-flex justify-content-between">
            <h1 className= "catalog-title">Catálogo de produtos</h1>
            <ProductFilters name={name} category={category} handleChangeCategory={handleChangeCategory} handleChangeName={handleChangeName} clearFilters={clearFilters}/>
        </div>
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
