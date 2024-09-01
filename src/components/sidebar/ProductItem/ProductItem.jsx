import './ProductItem.css'
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci"
import { useDispatch, } from "react-redux";
import { cartActions } from "../../../store/slices/cartSlice";
const { removeFromCard, increaseProductCountByOne } = cartActions
import { decreaseProductCountByOneThunk } from "../../../store/slices/cartSlice"

export const ProductItem = ({ item, index }) => {
    const dispatch = useDispatch()
    const removeProduct = (productId) => {
        dispatch(removeFromCard(productId))
    }

    const decreaseByOne = (productId) => {
        dispatch(decreaseProductCountByOneThunk(productId));
    }

    const increaseByOne = (productId) => {
        dispatch(increaseProductCountByOne(productId))
    }

    return (
        <div key={item.id} className="product-item">
            <div className="item-left">
                <img src={item.image} alt={`product ${index + 1}`} height="55" />
                <div className="d-flex justify-content-between align-items-center">
                    <CiCircleMinus size={25} style={{ cursor: 'pointer' }} onClick={() => decreaseByOne(item.id)} />
                    <span>{item.count}</span>
                    <CiCirclePlus size={25} style={{ cursor: 'pointer' }} onClick={() => increaseByOne(item.id)} />
                </div>
            </div>
            <div className="item-right">
                {/* row one in the right div */}
                <div className="row-1 d-flex justify-content-between align-items-start">
                    <h6>{item.title}</h6>
                    <span>${item.price}</span>
                </div>
                {/* row two in the right div */}
                <div className="row-2 d-flex justify-content-between align-items-start">
                    <span style={{ fontSize: '10px' }}>In stock! Ships in 5–10 business days</span>
                    <span style={{ fontSize: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => removeProduct(item.id)}>remove</span>
                </div>
                <hr />
            </div>
        </div>
    )
}
