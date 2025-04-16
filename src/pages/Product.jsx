import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import Loading from "../assets/Loading4.webm"
import FilterSection from '../components/FilterSection';
import notfound from "../assets/notfound.json"
import Lottie from 'lottie-react';

const Product = ({ cartItem, setCartItem, data, setData }) => {
    
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    // const [priceRange, setPriceRange] = useState(500)
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [page, setPage] = useState(1);

    const fetchAllProducts = async () => {
        try {
            const res = await axios.get('https://fakestoreapi.in/api/products?limit=150')
            const userData = res.data.products
            console.log(userData);
            setData(userData)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchAllProducts()
    }, [])

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || item.category === category) &&
        (brand === "" || item.brand === brand) &&
        item.price >= priceRange[0] && item.price <= priceRange[1]
    )

    const dynamicPage = Math.ceil(filteredData.length / 8)

    const pageHandler = (selectedPage) => {
        setPage(selectedPage)
    }

    return (
        <div>
            <div className='max-w-6xl mx-auto'>
                {/* <h1 className='font-semibold text-4xl mt-10'>All Products</h1> */}
                {
                    data.length > 0 ? (
                        <div className='flex gap-8'>
                            <FilterSection cartItem={cartItem} data={data} search={search} setSearch={setSearch} category={category} setCategory={setCategory} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} />
                            <div>
                                {
                                    filteredData.length > 0 ? (
                                        <div className='flex flex-col justify-center items-center px-3 md:px-0'>
                                            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-7 mt-10'>
                                                {

                                                    filteredData.slice(page * 8 - 8, page * 8).map((product, index) => {
                                                        return <ProductCard key={index} product={product} cartItem={cartItem} setCartItem={setCartItem} />
                                                    })
                                                }
                                            </div>
                                            <div className='mt-10 space-x-4 hidden'>
                                                <button disabled={page === 1} className={`${page === 1 ? "bg-red-400" : "bg-red-500"} text-white px-3 py-1 rounded-md cursor-pointer`} onClick={() => pageHandler(page - 1)}>Prev</button>
                                                {
                                                    [...Array(dynamicPage)].map((_, i) => {
                                                        return <span key={i} onClick={() => pageHandler(i + 1)} className={`${page === i + 1 ? "font-bold" : ""} cursor-pointer`}>{i + 1}</span>
                                                    })
                                                }
                                                <button disabled={page === dynamicPage} className={`${page === dynamicPage ? "bg-red-400" : "bg-red-500"} text-white px-3 py-1 rounded-md cursor-pointer`} onClick={() => pageHandler(page + 1)}>Next</button>
                                            </div>
                                        </div>


                                    ) : (
                                        <div className='flex justify-center items-center h-[600px] w-[900px] mt-10  '>
                                            <Lottie animationData={notfound} classID='w-[500px]' />
                                        </div>
                                    )
                                }
                            </div>


                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-[400px]'>
                            <video muted autoPlay loop >
                                <source src={Loading} type='video/webm' />
                            </video>
                        </div>
                    )
                }





            </div>
        </div>
    )
}

export default Product
