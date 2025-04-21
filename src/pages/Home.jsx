import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Category from '../components/Category';
import Features from '../components/Features';
import MidBanner from '../components/MidBanner';

const Home = ({ data, setData }) => {
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

  return (
    <div className='overflow-x-hidden -z-10 '>
      <Carousel data={data}/>
      
      <MidBanner/>
      <Features/>
    </div>
  )
}

export default Home
