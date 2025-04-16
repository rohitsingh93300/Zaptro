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
        <div className='max-w-6xl mx-auto flex justify-around mt-7'>
            {
                categoryOnlyData.map((item, index) => {
                    return <div>
                        <button className='uppercase bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer' onClick={()=>navigate(`/category/${item}`)}>{item}</button>
                    </div>
                })
            }
        </div>
    )
}

export default Category
