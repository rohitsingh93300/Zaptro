import React from 'react'
import Slider from "react-slick";
import carousel1 from "../assets/carousel1.webp"
import carousel2 from "../assets/carousel2.webp"
import carousel3 from "../assets/carousel3.webp"
import carousel4 from "../assets/carousel4.webp"
import carousel5 from "../assets/carousel5.webp"
import carousel6 from "../assets/carousel6.jpg"
import carousel7 from "../assets/carousel7.avif"
import carousel8 from "../assets/carousel8.avif"
import carousel9 from "../assets/carousel9.avif"
import carousel10 from "../assets/carousel10.avif"
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Carousel = ({ data }) => {
  const navigate = useNavigate()
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} >
        <AiOutlineArrowLeft class="arrows" style={{ color: "white" }} />
      </div>
    )
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} >
        <AiOutlineArrowRight class="arrows" style={{ color: "white" }} />
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
    <Slider {...settings} className='max-w-7xl mx-auto '>
      {
        data.slice(0, 7).map((item, index) => {
          return <div key={index} className=''>
            <div className=' flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center my-20 md:my-0 px-4'>

              <div className='space-y-3 md:space-y-6'>
                <h3 className='text-red-500 font-semibold font-sans'>Powering Your World with the Best in Electronics.</h3>
                <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px]'>{item.title}</h1>
                <p className='md:w-[500px] line-clamp-3'>{item.description}</p>
                <button className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2' onClick={() => navigate(`/products/${item.id}`)}>Shop Now</button>
              </div>
              <div className=''>
                <img src={item.image} alt="" className=' rounded-full  w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-200' onClick={() => navigate(`/products/${item.id}`)} />

              </div>
            </div>
          </div>
        })
      }

      {/* <div>
      <img src={carousel2} alt="" />
      </div>
      <div>
      <img src={carousel3} alt="" />
      </div>
      <div>
      <img src={carousel4} alt="" />
      </div>
      <div>
      <img src={carousel5} alt="" />
      </div>
      <div>
      <img src={carousel6} alt="" />
      </div>
      <div>
      <img src={carousel7} alt="" />
      </div>
      <div>
      <img src={carousel8} alt="" />
      </div>
      <div>
      <img src={carousel9} alt="" />
      </div>
      <div>
      <img src={carousel10} alt="" />
      </div> */}
    </Slider>
  )
}

export default Carousel
