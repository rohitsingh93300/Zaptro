import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState()

    //fetching all data from api   
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

    return <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext);