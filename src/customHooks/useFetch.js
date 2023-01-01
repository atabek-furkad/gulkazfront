import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const useFetch = (url, method) => {
  const { state } = useContext(UserContext)
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    description: '',
    countInStock: '',
    category: '',
    price: '',
    images: [],
    topProduct: '',
  })

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const config = {
    method,
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${state.userInfo.token}`,
    },
    body: JSON.stringify({
      name: product.name,
      description: product.description,
      countInStock: product.countInStock,
      category: product.category,
      price: product.price,
      // images: product.imageUpload,
      topProduct: product.topProduct,
    }),
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(url, config)
      console.log('response', response)
      if (response.status >= 400 && response.status < 600) {
        console.log(response)
        throw new Error(response.statusText)
      }
      const received = await response.json()
      setProduct(received)
      navigate('/profile')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { product, setProduct, error, loading, fetchData }
}

export default useFetch
