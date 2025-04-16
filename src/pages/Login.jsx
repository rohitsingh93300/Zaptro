import React, { useState } from 'react'


const Login = () => {
    const [input, setInput] = useState("")
    const handleChange=()=>{

    }
    const changeFileHandler=()=>{

    }
    const handleSubmit=()=>{

    }
  return (
    <div className="  ">
    <div className='flex justify-center max-w-6xl mx-auto items-center h-screen  px-2 md:px-0'>
      
         <div className="w-full max-w-md p-6 bg-gray-50 shadow-lg rounded-2xl">
        <div>
          <div>
            <h1 className="text-center text-xl font-semibold">Create an account</h1>
          </div>
          <p className='text-gray-600 mt-2 text-sm font-serif text-center mb-7'>Enter your details below to create your account</p>
        </div>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className='flex gap-3'>
              <div className='space-y-1'>
                <label>First Name</label>
                <input type="text"
                  placeholder="John"
                  name="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                  className='bg-white p-1 rounded-md px-2 mt-1'
                />
              </div>

              <div className='space-y-1'>
                <label>Last Name</label>
                <input type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                   className='bg-white p-1 rounded-md px-2 mt-1'
                />
              </div>
            </div>
            <div className='space-y-1'>
              <label>Email</label>
              <input type="email"
                placeholder="john.doe@example.com"
                name="email"
                value={input.email}
                onChange={handleChange}
                className='bg-white p-1 rounded-md px-2 w-full mt-1'
              />
            </div>
        
            <div className='space-y-1'>
              <label>Description</label>
              <textarea placeholder="Enter Your bio" name="description" value={input.description} onChange={handleChange} 
              className='bg-white p-1 rounded-md px-2 mt-1 w-full'/>
            </div>

            <div className=''>
              <label htmlFor="name" >
                Picture
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full bg-white p-1 rounded-md px-2 mt-1 "
              />
            </div>

            <button type="submit" className="w-full bg-red-500 text-white px-3 py-1 rounded-md">Create Account</button>
            <p className='text-center text-gray-600'>Already have an account? <span className='underline cursor-pointer text-red-500'>Sign in</span></p>
          </form>
        </div>
      </div>
      
     
      {/* {
        val && <div className="w-full max-w-md py-10 px-12 shadow-lg rounded-2xl bg-blue-50 flex flex-col items-center justify-start">
          <div className='flex justify-between w-full'>
            <h1 className='font-bold text-2xl text-gray-700'>Profile</h1>
            <button onClick={deleteHandler} variant="outline" ><Trash2 className='text-red-600' /></button>
          </div>
          <Avatar className="w-40 h-40 border-3 border-blue-500">
            <AvatarImage src={fileUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className='font-bold text-4xl text-gray-700'>{val.firstName} {val.lastName}</h1>
          <h3><span className='font-semibold'>Username :</span> {val.username}</h3>
          <p><span className='font-semibold'>Email : </span>{val.email}</p>
          <p><span className='font-semibold'>Description : </span>{val.description}</p>

        </div>
      } */}

    </div>
  </div>
  )
}

export default Login
