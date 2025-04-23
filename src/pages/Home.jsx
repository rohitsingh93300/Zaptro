import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Features from '../components/Features';
import MidBanner from '../components/MidBanner';
import { getData } from '../context/DataContext';

const Home = () => {
  const { fetchAllProducts } = getData()
  
  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className='overflow-x-hidden -z-10 '>
      <Carousel />
      <MidBanner />
      <Features />
    </div>
  )
}

export default Home
