import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../components/Breadcrums";
import Loading from "../assets/Loading4.webm"
import { toast } from "react-toastify";


const SingleProduct = ({cartItem, setCartItem}) => {
  const [quantity, setQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState("")
  const params = useParams()

    // useEffect(() => {
    //     const storedCart = localStorage.getItem("cart");
    //     if (storedCart) {
    //       setCartItem(storedCart);
    //     }
    //   }, []);

    const addToCart = (product)=>{
      // setCartItem([...cartItem, item])
      const itemInCart = cartItem.find((item) => item.id === product.id);
      if (itemInCart) {
        // Increase quantity if already in cart
        const updatedCart = cartItem.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItem(updatedCart);
        toast.warn("Product is already in the cart")
      } else {
        // Add new item with quantity 1
        setCartItem([...cartItem, { ...product, quantity: 1 }]);
        toast.success("Product is added to cart")
      }
      console.log(cartItem);
      
             
  }

  

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/${params.id}`)
      const product = res.data.product
      setSingleProduct(product)
      console.log(product);


    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getSingleProduct()
  }, [])

  const OriginalPrice = Math.round(singleProduct.price + (singleProduct.price * singleProduct.discount / 100))
  return (
    <>
      {singleProduct ? <div className="px-4 md:px-0 pb-4">
        <Breadcrums title={singleProduct.title} />
        <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="w-full ">
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="rounded-2xl w-full object-cover "
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800">{singleProduct.title}</h1>
            <div className="text-gray-700">{singleProduct.brand?.toUpperCase()} /{singleProduct.category?.toUpperCase()} /{singleProduct.model}</div>
            <p className="text-xl text-red-500 font-bold ">${singleProduct.price} <span className="line-through text-gray-700">${OriginalPrice}</span> <span className="bg-red-500 text-white p-2 rounded-md">{singleProduct.discount}% discount</span></p>
            <p className="text-gray-600">
              {singleProduct.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button onClick={()=>addToCart(singleProduct)} className="px-6 py-2 text-lg bg-red-500 text-white rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div> : <div className='flex items-center justify-center h-screen'>
        <video muted autoPlay loop >
          <source src={Loading} type='video/webm' />
        </video>
      </div>}

    </>
  );
};

export default SingleProduct;
