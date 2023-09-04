import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Home = () => {
    const [allShoe, setAllShoe]= useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:5000/shoes')
        .then(res=>res.json())
        .then(data=>setAllShoe(data));
        
    },[])
    console.log(allShoe);
    return (
        <div className='w-[75%] mx-auto'>
            <h1 className='text-2xl text-center my-4 font-semibold'>Check Your <span className='text-orange-500'>Favorites</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {
                allShoe.map(singleShoe => <ProductCard 
                    key={singleShoe.id}
                    singleShoe={singleShoe}
                    ></ProductCard>)
            }
            </div>
        </div>
    );
};

export default Home;