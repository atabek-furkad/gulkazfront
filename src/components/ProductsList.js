import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from 'axios'

const ProductsList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        'https://gulkazapi.onrender.com/api/products',
      )
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
