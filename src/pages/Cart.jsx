import React, { useEffect, useState } from 'react'
import { GiShoppingBag } from 'react-icons/gi'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { FaRegTrashAlt } from "react-icons/fa";
import { useUser } from '@clerk/clerk-react';
import emptyCart from "../assets/empty-cart.png"
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItem, setCartItem, location, getLocation }) => {
    const { user } = useUser()
    const navigate = useNavigate()

    console.log(user);

    const updateQuantity = (cartItem, productId, action) => {
        setCartItem(cartItem.map(item => {
            if (item.id === productId) {
                let newUnit = item.quantity;
                if (action === "increase") {
                    newUnit = newUnit + 1
                } else if (action === "decrease") {
                    newUnit = newUnit - 1
                }
                return newUnit > 0 ? { ...item, quantity: newUnit } : null;
            }
            return item;
        }).filter(item => item != null) // remove items with quantity 0
        )


    }




    const deleteItem = (productId) => {
        setCartItem(cartItem.filter(item => item.id !== productId))
    }
    const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
    return (
        <div className='mt-10 max-w-6xl mx-auto px-4 md:px-0 mb-5'>

            {
                cartItem.length > 0 ? <div>
                    <h1 className='font-bold text-2xl'>My Cart({cartItem.length})</h1>
                    <div className=''>
                        <div className='mt-10 '>

                            {
                                cartItem.map((item, index) => {
                                    return <div key={index} className='bg-gray-100 md:p-5 p-3 rounded-md flex items-center justify-between mt-3 w-full'>
                                        <div className='flex items-center gap-4'>
                                            <img src={item.image} alt="" className='w-20 h-20 rounded-md' />
                                            <div>
                                                <h1 className='md:w-[300px] line-clamp-2'>{item.title}</h1>
                                                <p className='text-red-500 font-semibold text-lg'>${item.price}</p>
                                            </div>
                                        </div>
                                        <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                                            <button className='cursor-pointer' onClick={() => updateQuantity(cartItem, item.id, "decrease")}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className='cursor-pointer' onClick={() => updateQuantity(cartItem, item.id, "increase")}>+</button>
                                        </div>
                                        <span className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                                            <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' onClick={() => deleteItem(item.id)} />
                                        </span>

                                    </div>
                                })
                            }
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20'>
                            <div className='bg-gray-100 rounded-md p-4 md:p-7 mt-4 space-y-2 '>
                                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>
                                <div className='space-y-2'>
                                    <div className='flex flex-col space-y-1'>
                                        <label htmlFor="">Full Name</label>
                                        <input type="text" placeholder='Enter Your Name' value={user.fullName} className='p-2 rounded-md' />
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <label htmlFor="">Address</label>
                                        <input type="text" placeholder='Enter Your Address' className='p-2 rounded-md' value={location.county} />
                                    </div>
                                    <div className='flex w-full gap-5'>
                                        <div className='flex flex-col space-y-1 w-full'>
                                            <label htmlFor="">State</label>
                                            <input type="text" placeholder='Enter Your state' className='p-2 rounded-md w-[150px] md:w-full' value={location.state} />
                                        </div>
                                        <div className='flex flex-col space-y-1 w-full'>
                                            <label htmlFor="">PostCode</label>
                                            <input type="text" placeholder='Enter Your postcode' className='p-2 rounded-md w-[150px] md:w-full' value={location.postcode} />
                                        </div>

                                    </div>
                                    <div className='flex md:w-full gap-5'>

                                        <div className='flex flex-col space-y-1 md:w-full'>
                                            <label htmlFor="">Country</label>
                                            <input type="text" placeholder='Enter Your Number' className='p-2 rounded-md w-[150px] md:w-full' value={location.country} />
                                        </div>
                                        <div className='flex flex-col space-y-1 md:w-full'>
                                            <label htmlFor="">Phone no</label>
                                            <input type="text" placeholder='Enter Your Number' className='p-2 rounded-md w-[150px] md:w-full' />
                                        </div>
                                    </div>
                                    <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Submit</button>

                                </div>
                                <div className='flex items-center justify-center w-full text-gray-700'>
                                -------OR--------
                                </div>
                                <div className='flex justify-center'>
                                <button className='bg-red-500 text-white px-3 py-2 rounded-md ' onClick={getLocation}>Detect Location</button> 
                                </div>


                            </div>
                            <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
                                <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>
                                <div className='flex justify-between items-center'>
                                    <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items total</h1>
                                    <p>${totalPrice}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery charge</h1>
                                    <p className='text-red-500 font-semibold'><span className='text-gray-600 line-through'>$25</span> FREE</p>
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling charge</h1>
                                    <p className='text-red-500 font-semibold'>$5</p>
                                </div>
                                <hr className='text-gray-200 mt-2' />
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-semibold text-lg'>Grand total</h1>
                                    <p className='font-semibold text-lg'>${totalPrice + 5}</p>
                                </div>
                                <div>
                                    <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                                    <div className='flex gap-3'>
                                        <input type="text" placeholder='Enter code' className='p-2 rounded-md w-full' />
                                        <button className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
                                    </div>
                                </div>
                                <button className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'>Proceed to Checkout</button>
                            </div>
                        </div>


                    </div>
                </div> : <div className='flex flex-col gap-3 justify-center items-center h-[600px] '>
                    <h1 className='text-red-500/80 font-bold text-2xl md:text-5xl text-muted'>Oh no! your cart is empty</h1>
                    <img src={emptyCart} alt="" className='w-[400px]' />
                    <button className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer' onClick={() => navigate('/products')}>Continue Shopping</button>
                </div>
            }

        </div>
    )
}

export default Cart
