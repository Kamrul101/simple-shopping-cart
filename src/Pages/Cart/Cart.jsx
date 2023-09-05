import React, { useContext, useEffect, useState } from 'react';
import MyCartCard from './MyCartCard';
import { AuthContext } from '../../Providers/AuthProviders';
import useCart from '../../Components/useCart';
import Swal from 'sweetalert2';

const Cart = () => {
    const [cart]=useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
    const handleDelete = (item) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://simple-shopping-card-server.vercel.app/cart/${item._id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                    
                  Swal.fire("Deleted!", 
                  "Your file has been deleted.",
                    "success");
                }
              });
          }
        });
      };
    return (
        <div className="w-full md:w-[80%] mx-auto">
      <div className="font-semibold flex justify-evenly py-5">
        <h2 className="text-3xl">Total Items: {cart.length}</h2>
        <h2 className="text-3xl">Total Price: ${total}</h2>
        <button className="btn btn-warning btn-sm">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Shoe</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <MyCartCard
                key={item._id}
                item={item}
                index={index}
                handleDelete={handleDelete}
              ></MyCartCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Cart;