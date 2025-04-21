import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import Loading from "../assets/Loading4.webm"
import FilterSection from '../components/FilterSection';
import notfound from "../assets/notfound.json"
import Lottie from 'lottie-react';
import { FaFilter } from "react-icons/fa6";

const Product = ({ cartItem, setCartItem, data, setData }) => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [brand, setBrand] = useState("All")
    // const [priceRange, setPriceRange] = useState(500)
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [page, setPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false)

    const toggleFilter = () => {
        setOpenFilter(!openFilter)
    }

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
    const handlePaginationBug = () => {
        if (page > dynamicPage) {
            setPage(1)
        }
    }
    useEffect(() => {
        fetchAllProducts()
        handlePaginationBug()
    }, [])

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || item.category === category) &&
        (brand === "All" || item.brand === brand) &&
        item.price >= priceRange[0] && item.price <= priceRange[1]
    )



    const dynamicPage = Math.ceil(filteredData.length / 8)

    const getPages = (current, total) => {
        const pages = [];

        if (total <= 5) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 3) {
                pages.push(1, 2, 3, '...', total);
            } else if (current >= total - 2) {
                pages.push(1, '...', total - 2, total - 1, total);
            } else {
                pages.push(1, '...', current - 1, current, current + 1, '...', total);
            }
        }

        return pages;
    }

    const pageHandler = (selectedPage) => {
        setPage(selectedPage)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const getUniqueData = (data, property) => {
        let newVal = data.map((curElem) => {
            return curElem[property];
        });
        newVal = ["All", ...new Set(newVal)]
        return newVal
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        setOpenFilter(false)
        console.log(e.target.value);

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
                                onChange={(e) => { setBrand(e.target.value), setOpenFilter(false) }}
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
                    data.length > 0 ? (
                        <div className='flex gap-8'>
                            <FilterSection cartItem={cartItem} data={data} search={search} setSearch={setSearch} category={category} setCategory={setCategory} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} getUniqueData={getUniqueData} categoryOnlyData={categoryOnlyData} brandOnlyData={brandOnlyData} handleCategoryChange={handleCategoryChange} />
                            <div>
                                {
                                    filteredData.length > 0 ? (
                                        <div className='flex flex-col justify-center items-center '>
                                            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-7 mt-10'>
                                                {

                                                    filteredData.slice(page * 8 - 8, page * 8).map((product, index) => {
                                                        return <ProductCard key={index} product={product} cartItem={cartItem} setCartItem={setCartItem} />
                                                    })
                                                }
                                            </div>
                                            <div className='mt-10 space-x-4 '>
                                                <button disabled={page === 1} className={`${page === 1 ? "bg-red-400" : "bg-red-500"} text-white px-3 py-1 rounded-md cursor-pointer`} onClick={() => pageHandler(page - 1)}>Prev</button>
                                                {
                                                    // [...Array(dynamicPage)].map((_, i) => {
                                                    //     return <span key={i} onClick={() => pageHandler(i + 1)} className={`${page === i + 1 ? "font-bold" : ""} cursor-pointer`}>{i + 1}</span>
                                                    // })
                                                    getPages(page, dynamicPage).map((item, index) => {
                                                        return (
                                                            <span
                                                                key={index}
                                                                onClick={() => typeof item === "number" && pageHandler(item)}
                                                                className={`cursor-pointer ${item === page ? "font-bold text-red-600" : ""}`}
                                                            >
                                                                {item}
                                                            </span>
                                                        );
                                                    })
                                                }
                                                <button disabled={page === dynamicPage} className={`${page === dynamicPage ? "bg-red-400" : "bg-red-500"} text-white px-3 py-1 rounded-md cursor-pointer`} onClick={() => pageHandler(page + 1)}>Next</button>
                                            </div>
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
