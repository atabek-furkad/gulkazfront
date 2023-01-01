import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Product from '../components/Product'

const ProfilePage = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/products')
        if (response.status >= 400 && response.status < 600) {
          console.log(response)
          throw new Error(response.statusText)
        }
        const dataJson = await response.json()
        setProducts(dataJson)
      } catch (error) {
        setError(error.message)
        console.log('error', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="ProfilePage">
      <h1>Protected Admin Profile Page</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Link to="/profile/new-product">Create New Product</Link>
      {products &&
        products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}

      <div></div>
    </div>
  )
}

export default ProfilePage
