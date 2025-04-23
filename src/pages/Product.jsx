import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import Loading from "../assets/Loading4.webm"
import FilterSection from '../components/FilterSection';
import notfound from "../assets/notfound.json"
import Lottie from 'lottie-react';
import { FaFilter } from "react-icons/fa6";
import { useCart } from '../context/CartContext';
import { getData } from '../context/DataContext';
import Pagination from '../components/Pagination';

const Product = () => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [brand, setBrand] = useState("All")
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [page, setPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false)
    const { fetchAllProducts, data } = getData()
    const { cartItem } = useCart()

    const toggleFilter = () => {
        setOpenFilter(!openFilter)
    }

    const handlePaginationBug = () => {
        if (page > dynamicPage) {
            setPage(1)
        }
    }
    useEffect(() => {
        fetchAllProducts()
        handlePaginationBug()
        window.scrollTo(0, 0);
    }, [])

    const filteredData = data?.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || item.category === category) &&
        (brand === "All" || item.brand === brand) &&
        item.price >= priceRange[0] && item.price <= priceRange[1]
    )



    const dynamicPage = Math.ceil(filteredData?.length / 8)



    const pageHandler = (selectedPage) => {
        setPage(selectedPage)
        window.scrollTo(0, 0);
    }

    const getUniqueData = (data, property) => {
        let newVal = data?.map((curElem) => {
            return curElem[property];
        });
        newVal = ["All", ...new Set(newVal)]
        return newVal
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        setPage(1)
        setOpenFilter(false)
    }

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
        setPage(1)
        setOpenFilter(false)
    }

    const categoryOnlyData = getUniqueData(data, "category")
    const brandOnlyData = getUniqueData(data, "brand")

    return (
        <div>
            <div className='max-w-6xl mx-auto px-4 mb-10'>
                {/* <h1 className='font-semibold text-4xl mt-10'>All Products</h1> */}
                <div className={`bg-gray-100 flex justify-between items-center md:hidden ${openFilter ? "rounded-t-md" : "rounded-md"} px-4 p-2 mt-5 `}>
                    <h1 className='font-semibold text-xl'>Filters</h1>
                    <FaFilter onClick={toggleFilter} />
                </div>
                {
                    openFilter ? <div className='bg-gray-100 p-2 md:hidden'>
                        <input type="text" placeholder='Search...'
                            className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <h1 className='mt-5 font-semibold text-xl'>Category</h1>
                        <div className='flex flex-col gap-2 mt-3'>
                            {
                                categoryOnlyData.map((item, index) => {
                                    return <div key={index} className='flex gap-2' >
                                        <input type="checkbox" name={item} id="" checked={category === item} value={item} onChange={handleCategoryChange} />
                                        <button className='cursor-pointer uppercase' value={item}>{item}</button>
                                    </div>
                                })
                            }
                        </div>
                        <div className='mt-5'>
                            <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
                            <select name="" id="" className='bg-white w-full p-2 border-gray-200 border-2 rounded-md form-select'
                                value={brand}
                                onChange={handleBrandChange}
                            >
                                {
                                    brandOnlyData.map((item, index) => {
                                        return <option key={index} className='option' value={item} >{item.toUpperCase()}</option>
                                    })
                                }

                            </select>
                            <div className='mt-5'>
                                <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
                                <div className='flex flex-col gap-2'>
                                    <label>Price Range: ${priceRange[0]}- ${priceRange[1]}</label>
                                    <input type="range" min="0" max="5000" value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    />

                                </div>
                            </div>
                            <button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'
                                onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0, 5000]); setOpenFilter(false) }}
                            >Reset Filters</button>
                        </div>
                    </div> : ""
                }
                {
                    data?.length > 0 ? (
                        <div className='flex gap-8'>
                            <FilterSection cartItem={cartItem} data={data} search={search} setSearch={setSearch} category={category} setCategory={setCategory} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} getUniqueData={getUniqueData} categoryOnlyData={categoryOnlyData} brandOnlyData={brandOnlyData} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} />
                            <div>
                                {
                                    filteredData.length > 0 ? (
                                        <div className='flex flex-col justify-center items-center '>
                                            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-7 mt-10'>
                                                {

                                                    filteredData.slice(page * 8 - 8, page * 8).map((product, index) => {
                                                        return <ProductCard key={index} product={product} />
                                                    })
                                                }
                                            </div>
                                            <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                                        </div>


                                    ) : (
                                        <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10  '>
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
