import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from 'axios'

const ProductsList = () => {
<<<<<<< HEAD
  const { fetchProducts, products, loading, error } =
    useContext(ProductsContext);

  useEffect(() => {
    fetchProducts('/api/products');
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>IS Loading...</h1>;
  }
=======
  const [products, setProducts] = useState([])
>>>>>>> parent of 13ab89e (implement useContext to handle the products, and modified productsList, profilesPage files using useContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="ProductsList">
      <h2>Products</h2>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductsList
