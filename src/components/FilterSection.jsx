import React from 'react'

const FilterSection = ({search, setSearch, category, setCategory, brand, setBrand, priceRange, setPriceRange, categoryOnlyData, brandOnlyData, handleCategoryChange, handleBrandChange }) => {


  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
      <input type="text" placeholder='Search...'
        className='bg-white p-2 rounded-md border-gray-400 border-2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* category only data */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {
          categoryOnlyData.map((item, index) => {
            return <div key={index} className='flex gap-2' >
              <input type="checkbox"  name={item} id="" checked={category === item} value={item} onChange={handleCategoryChange} />
              <button className='cursor-pointer uppercase' value={item}>{item}</button>
            </div>
          })
        }
      </div>
      {/* brand only data */}
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
      </div>
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
       onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0, 5000]) }}
      >Reset Filters</button>
    </div>
  )
}

export default FilterSection
