import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductListView from '../components/ProductListView'

const Search = () => {
    const params = useParams()
    const [searchData , setSearchData] = useState([])
    const getFilteredData = async()=>{
        try {
            const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${params.category}`)
            const data = res.data.products
            setSearchData(data)
            console.log(data);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        getFilteredData()
    },[])

  return (
    <div>
      <div className='max-w-6xl mx-auto mt-10'>
        {
            searchData.map((product, index)=>{
                return <ProductListView key={index} product={product}/>
            })
        }
      </div>
    </div>
  )
}

export default Search
