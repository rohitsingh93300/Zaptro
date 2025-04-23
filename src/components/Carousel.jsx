import React from 'react'
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';
import { getData } from '../context/DataContext';

const Carousel = () => {
  const navigate = useNavigate()
  const {data} = getData()

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
        <AiOutlineArrowLeft class="arrows"  style={{ ...style, display: "block",borderRadius:"50px", background: "#f53347", color: "white" , position:"absolute", padding:"2px", left: "50px"}}  onmouseover="this.style.backgroundColor='#555';"/>
      </div>
    )
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} >
        <AiOutlineArrowRight class="arrows"  style={{ ...style, display: "block",borderRadius:"50px", background: "#f53347", color: "white" , position:"absolute", padding:"2px", right: "50px"}}/>
      </div>
    )
  }
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    // arrows:true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };
  return (
    <div className=''>
    <Slider {...settings} className=' mx-auto  '>
      {
        data?.slice(0, 7)?.map((item, index) => {
          return <div key={index} className='bg-gradient-to-r  from-[#0f0c29] via-[#302b63] to-[#24243e]  -z-10'>
            <div className=' flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center my-20 md:my-0 px-4'>

              <div className='space-y-3 md:space-y-6'>
                <h3 className='text-red-500 font-semibold font-sans text-sm'>Powering Your World with the Best in Electronics.</h3>
                <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
                <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
                <button className='bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2' onClick={() => navigate(`/products/${item.id}`)}>Shop Now</button>
              </div>
              <div className=''>
                <img src={item.image} alt="" className=' rounded-full  w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400' onClick={() => navigate(`/products/${item.id}`)} />

              </div>
            </div>
          </div>
        })
      }
    </Slider>
    <Category />
    </div>
  )
}

export default Carousel
