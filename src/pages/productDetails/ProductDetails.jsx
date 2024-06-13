import { useNavigate, useParams } from 'react-router-dom'
import './ProductDetails.css'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Rating from '../../components/rating/Rating'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'
const ProductDetails = () => {
  const { id } = useParams()
  const baseURL = "https://fakestoreapi.com/products"
  const [product, setProduct] = useState({})
  const [error, setError] = useState({})
  const [selectedColor, setSelectedColor] = useState('blue')
  const [selectedCount, setSelectedCount] = useState(1);
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToCart } = cartActions




  const getProductById = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/${id}`)
      setProduct(response.data)
    } catch (err) {
      setError(err.message)
    }
  }, [baseURL, id])


  const addProductToCart = () => {
    dispatch(addToCart({ ...product, count: +selectedCount }))
  }


  useEffect(() => {
    getProductById()
  }, [getProductById])


  return (
    <div className='container'>

      <p className=''>{product?.category?.toUpperCase()}</p>
      {product?.id && (
        <div className='d-flex justify-content-between '>
          <div className="right d-flex flex-column justify-content-center align-items-center col-md-8 bg-secondary border relative" style={{ height: '600px', background: 'rgb(245,243,241)' }}>
            <img src={product?.image} alt={product?.title} style={{ width: '450px', height: '450px' }} />
          </div>
          <div className="left d-flex flex-column justify-content-start row-gap-3 col-md-4 px-md-2">
            <div>
              <h5>{product?.title}</h5>
              <Rating {...product?.rating} />
              <p style={{ fontSize: '1.5rem' }}>${product?.price}</p>
            </div>

            <div>

              <div>Select size</div>
              <div className="d-flex flex-wrap justify-content-start gap-2">
                {['5 x 8', '10x8'].map((opt) => (<div key={opt} className="product-options">{opt}</div>))}
              </div>
            </div>
            <div>
              <div>Color : <span className='fw-bold'>{selectedColor.toUpperCase()}</span></div>
              <div className="d-flex justify-content-start gap-2">
                {['blue', 'green'].map((circle) => <div key={circle} className={`rounded-circle p-1 ${selectedColor === circle ? 'active-circle' : ''}`} onClick={() => setSelectedColor(circle)}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: `${circle}`, cursor: 'pointer' }}></div>
                </div>)}
              </div>
            </div>
            <div className='d-flex justify-content-start gap-2'>
              <select className="form-select w-25 col-3" aria-label="Large select example" value={selectedCount} onChange={(e) => setSelectedCount(e.target.value)} >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <button className='btn btn-warning col-8' onClick={addProductToCart}> Add To Cart</button>
            </div>
          </div>
        </div>
      )}
      {/* {!!product.id && error && (<div className='alert alert-danger'>{error}</div>)} */}
    </div>
  )
}

export default ProductDetails
