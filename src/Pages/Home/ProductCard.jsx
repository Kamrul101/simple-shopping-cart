/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
const ProductCard = ({singleShoe}) => {
    const { _id,img,name,price}=singleShoe;
    const {user}= useContext(AuthContext);
    const handleAddToCart = singleShoe =>{
        console.log(singleShoe);
        if(user && user.email ){
          const cartItem ={itemId: _id,img,name,price,email:user.email}
          fetch('https://simple-shopping-card-server.vercel.app/cart',{
            method: "POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(cartItem)
          })
          .then(res=> res.json())
          .then(data =>{
            if(data.insertedId){
              
              Swal.fire(
                'Good job!',
                'You added to cart',
                'success'
              )
            }
          })
        }
        else{
          Swal.fire(
            'Please Login!',
          )
        }
      }
    return (

<div className="card w-full md:w-96 bg-base-100 shadow-xl">
  <figure><img src={img} className='h-[250px]' alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Product: {name}</h2>
    <p>Price: ${price}</p>
    <div className="card-actions justify-end">
      <button onClick={()=> handleAddToCart(singleShoe)}  className="btn btn-neutral text-white">Add To Cart</button>
    </div>
  </div>
</div>

    );
};

export default ProductCard;