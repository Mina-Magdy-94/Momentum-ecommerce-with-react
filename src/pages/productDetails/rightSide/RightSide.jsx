import { useState } from 'react'
import Rating from '../../../components/rating/Rating'
import './RightSide.css'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/slices/cartSlice'


const RightSide = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState('blue')
    const [selectedCount, setSelectedCount] = useState(1);
    const { addToCart } = cartActions


    const dispatch = useDispatch()



    const addProductToCart = () => {
        dispatch(addToCart({ ...product, count: +selectedCount }))
    }


    return (
        <div className="d-flex flex-column justify-content-start row-gap-3 col-md-4 px-md-3">
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
    )
}

export default RightSide
