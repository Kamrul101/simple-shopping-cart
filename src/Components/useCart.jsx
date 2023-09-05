import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';

const useCart = () => {
    const {user}= useContext(AuthContext);
    const [cart, setCart]=useState([]);
    const URL = `https://simple-shopping-card-server.vercel.app/cart?email=${user?.email}`;
    useEffect(()=>{
        fetch(URL)
        .then(res=> res.json())
        .then(data=>setCart(data))
    },[URL])
    return [cart];
};

export default useCart;