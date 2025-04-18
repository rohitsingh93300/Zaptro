import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductListView = ({ product, cartItem, setCartItem }) => {
    const navigate = useNavigate()
    return (

        <div className='space-y-4 mt-2 rounded-md'>
            <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
                <img src={product.image} alt="" className='h-60 w-60 rounded-md cursor-pointer' onClick={()=>navigate(`/products/${product.id}`)}/>
                <div className='space-y-2'>
                    <h1 className='font-bold text-xl hover:text-red-400'>{product.title}</h1>
                    <p className=' font-semibold flex items-center text-lg '>$<span className='text-4xl'>{product.price}</span>  ({product.discount}% off)</p>
                    <p>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />
                    Or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span></p>
                    <button className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to cart</button>
                </div>
            </div>
        </div>

    )
}

export default ProductListView
