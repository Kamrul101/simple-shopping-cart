/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/prop-types
const ProductCard = ({singleShoe}) => {
    const { img,name,price}=singleShoe;
    return (

<div className="card w-full md:w-96 bg-base-100 shadow-xl">
  <figure><img src={img} className='h-[250px]' alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Product: {name}</h2>
    <p>Price: ${price}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-neutral text-white">Add To Cart</button>
    </div>
  </div>
</div>

    );
};

export default ProductCard;