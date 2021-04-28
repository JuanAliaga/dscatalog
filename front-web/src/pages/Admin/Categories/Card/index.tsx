import { Category } from 'core/types/Product';
import React from 'react';
import './styles.scss'

type Props = {
    category:Category;
    onRemove:(categoryId:number)=> void;
}
const Card = ({category,onRemove}:Props) => {
    return (
        <div className="card-item-admin card-base border-radius-10">
            <div className="row">
                <div className="col-10 border-right">
                    <h3 className="item-text">{category.name}</h3>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <button type="button" className="btn btn-styles btn-outline-danger " onClick={()=> onRemove(category.id)}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default Card;