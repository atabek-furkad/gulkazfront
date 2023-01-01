import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProductForm = ({
  product,
  setProduct,
  loading,
  error,
  fetchData,
  pathList,
  setPathList,
}) => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)

  const unlinkFiles = async () => {
    if (pathList.length > 0) {
      await axios.post('/api/upload/unlink', pathList)
    }
  }

  const uploadFileHandler = async (e) => {
    setUploading(true)

    await unlinkFiles()

    // object of objects turning into array of objects
    const arrayOfFiles = Object.values(e.target.files)

    const galleryData = new FormData()

    arrayOfFiles.forEach((index) => galleryData.append('image', index))

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/api/upload', galleryData, config)

    const tempImagePaths = await data.map((element) => element.path)

    setPathList(tempImagePaths)

    setProduct({
      ...product,
      images: tempImagePaths,
    })

    setUploading(false)
  }

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchData()
        }}
      >
        {loading && <h2>Processing...</h2>}
        {error && <h2>{error}</h2>}
        {error && <h2>Fill all the inputs</h2>}

        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="countInStock">CountInStock</label>
          <input
            id="countInStock"
            name="countInStock"
            type="number"
            value={product.countInStock}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={product.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="topProduct">Top product</label>
          <select
            id="topProduct"
            name="topProduct"
            value={product && product.topProduct}
            onChange={handleInputChange}
          >
            <option hidden>--</option>
            <option value={'false'}>No</option>
            <option value={'true'}>Yes</option>
          </select>
        </div>

        <div className="input-container">
          {uploading && <h2>Uploading...</h2>}
          <label htmlFor="imageUpload">Choose a picture:</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            multiple="multiple"
            // accept="image/png, image/jpeg, image/png"
            // onChange={uploadFileHandler}
          />
        </div>
        {/* {pathList
          ? pathList.map((image, index) => {
              const path = image.slice(15)
              return <img width="100" key={index} src={path} alt="" />
            })
          : product.images.map((element, index) => {
              const path = element.slice(15)
              return <img src={path} alt="product" width="100" key={index} />
            })} */}
        <button type="Submit">Create</button>
        <button
          onClick={(e) => {
            e.preventDefault()
            navigate('/profile')
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ProductForm
