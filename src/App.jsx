import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import SingleProduct from './pages/SingleProduct'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useUser } from '@clerk/clerk-react';
import axios from 'axios'
import Footer from './components/Footer'
import Search from './pages/Search'
import { useCart } from './context/CartContext'
// import axios from 'axios'


const App = () => {
  const [location, setLocation] = useState("")
  const [openDropdown, setOpenDropdown] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser();
  const {cartItem, setCartItem} = useCart()

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        console.log("location", exactLocation);
        setLocation(exactLocation)
        setOpenDropdown(false)
      } catch (error) {
        console.log(error);
      }
    })
  }

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
     
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} getLocation={getLocation} location={location} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/products' element={<Product/>}></Route>
          <Route path='/products/:id' element={<SingleProduct  />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/category/:category' element={<Search />}></Route>
          <Route path='/cart' element={
            <ProtectedRoutes user={user}>
              <Cart location={location} getLocation={getLocation}/>
            </ProtectedRoutes>
          }></Route>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
