import { User } from 'core/types/Product';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'

type Props = {
    user:User;
    onRemove:(productId:number)=> void;
}
const Card = ({user,onRemove}:Props) => {
    return (
        <div className="card-item-admin card-base border-radius-10">
            <div className="row">
                <div className="col-5 border-right">
                    <h3 className="item-text">{user.firstName} {user.lastName}</h3>
                </div>
                <div className="col-4">
                    <h3 className="item-text">{user.email}</h3>
                </div>
                <div className="col-3 d-flex ">
                <Link to={`/admin/users/${user.id}`} key={user.id} type="button" className="btn btn-styles btn-outline-secondary mr-5">
                    Editar
                </Link>
                <button type="button" className="btn btn-styles btn-outline-danger " onClick={()=> onRemove(user.id)}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default Card;