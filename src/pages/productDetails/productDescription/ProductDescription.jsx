import { useState } from 'react';
import './ProductDescription.css'
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";


const ProductDescription = ({ description }) => {
    const [isShowDescriptionAccordion, setIsShowDescriptionAccordion] = useState(false)

    return (
        <div className="d-flex flex-column justify-content-center align-items-center row-gap-4 col-lg-11 mt-lg-5 mx-auto px-lg-5">
            <div className='col-12'>
                <section className='description-section d-flex justify-content-between align-items-center'>
                    <p className='fs-4'>About this piece</p>
                    {!isShowDescriptionAccordion && <IoIosArrowDropdown cursor={'pointer'} size={40} onClick={() => setIsShowDescriptionAccordion(true)} />}
                    {isShowDescriptionAccordion && <IoIosArrowDropup cursor={'pointer'} size={40} onClick={() => setIsShowDescriptionAccordion(false)} />}
                </section>
                <hr />
            </div>
            {isShowDescriptionAccordion && <p className='col-12'>{description}</p>}
        </div>
    )
}

export default ProductDescription
