import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'

const EditProductPage = () => {
  const params = useParams()
  const { state } = useContext(UserContext)

  const [files, setFiles] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [topProduct, setTopProduct] = useState('')

  const [imagesPath, setImagesPath] = useState([])

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `https://gulkazapi.onrender.com/api/products/${id}`,
        )
        const {
          name,
          description,
          countInStock,
          category,
          price,
          topProduct,
          images,
        } = await response.json()

        setName(name)
        setDescription(description)
        setCountInStock(countInStock)
        setCategory(category)
        setPrice(price)
        setTopProduct(topProduct)
        setImagesPath(images)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData(params.id)
  }, [params.id])

  const submitForm = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    // each file should be appended separately
    files.forEach((element) => formData.append('image', element))

    formData.append('name', name)
    formData.append('description', description)
    formData.append('countInStock', countInStock)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('topProduct', topProduct)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${state.userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `https://gulkazapi.onrender.com/api/products/${params.id}`,
      formData,
      config,
    )

    console.log('data', data)

    setImagesPath(data.images)
  }

  return (
    <div className="NewProductPage">
      <h1>Edit Product Page</h1>
      <form onSubmit={submitForm}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="countInStock">CountInStock</label>
          <input
            id="countInStock"
            name="countInStock"
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="topProduct">Top product</label>
          <select
            id="topProduct"
            name="topProduct"
            value={topProduct && topProduct}
            onChange={(e) => setTopProduct(e.target.value)}
          >
            <option hidden>--</option>
            <option value={'false'}>No</option>
            <option value={'true'}>Yes</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="imageUpload">Choose a picture:</label>
          <input
            name="imageUpload"
            onChange={(e) => {
              const filesArray = Object.values(e.target.files)
              setFiles(filesArray)
              // setPreview(filesArray)
              // setPreviewState(true)
            }}
            type="file"
            accept="image/*"
            multiple
          />
        </div>
        {/* {previewState &&
          preview?.map((element, index) => {
            const link = URL.createObjectURL(element)
            return (
              <img src={link} key={index} width="100" alt="preview product" />
            )
          })}
        {previewState && <p>Just a preview!</p>} */}

        {imagesPath &&
          imagesPath.map((element, index) => {
            return (
              <div key={index}>
                <img src={`/${element.fileName}`} width="100" alt="product" />
                <p>{element.originalname}</p>
              </div>
            )
          })}
        <button type="Submit">Edit</button>
      </form>
    </div>
  )
}

export default EditProductPage
