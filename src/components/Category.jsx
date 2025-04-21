import React from 'react'
import { useNavigate } from 'react-router-dom';

const Category = ({ data }) => {
    const navigate = useNavigate()
    const getUniqueCategory = (data, property) => {
        let newVal = data.map((curElem) => {
            return curElem[property];
        });
        newVal = [...new Set(newVal)]
        return newVal
    }

    const categoryOnlyData = getUniqueCategory(data, "category")
    return (
    <div className=' bg-[#101829]'>

        <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4'>
            {
                categoryOnlyData.map((item, index) => {
                    return <div>
                        <button className='uppercase bg-gray-100  px-3 py-1 rounded-md cursor-pointer' onClick={()=>navigate(`/category/${item}`)}>{item}</button>
                    </div>
                })
            }
        </div>
    </div>
    )
}

export default Category
