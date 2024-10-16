import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setHomeProducts } from '../redux/homeProductsSlice';

const useFetchAllProducts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://ecommerce-platform-backend-ogt2oko7q-khuzzzis-projects.vercel.app/", { withCredentials: true });
                console.log(response)
                if(response.data.status !== 200){
                    console.log(response)
                    dispatch(setHomeProducts(response.data))
                }
                dispatch(setHomeProducts(response.data.allProducts));
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, [dispatch]);

    return { loading, error };
};

export default useFetchAllProducts;
