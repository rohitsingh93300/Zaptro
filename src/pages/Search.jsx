import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductListView from '../components/ProductListView'
import { ChevronLeft } from 'lucide-react';
import Loading from "../assets/Loading4.webm"

const Search = () => {
  const params = useParams()
  const [searchData, setSearchData] = useState([])
  const navigate = useNavigate()
  const getFilteredData = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${params.category}`)
      const data = res.data.products
      setSearchData(data)
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getFilteredData()
    window.scrollTo(0, 0);
  }, [])

  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
            <button className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1  items-center' onClick={() => navigate('/')}><ChevronLeft /> Back</button>
            {
              searchData.map((product, index) => {
                return <ProductListView key={index} product={product} />
              })
            }
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
  )
}

export default Search
