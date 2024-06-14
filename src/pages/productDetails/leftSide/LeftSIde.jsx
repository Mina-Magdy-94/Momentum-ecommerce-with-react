import './LeftSide.css'

import React from 'react'

const LeftSIde = ({ product: { image, title } }) => {
    return (
        <div className="img-container d-flex justify-content-center align-items-center col-12 col-md-8 border relative">
            <img src={image} />
        </div>
    )
}

export default LeftSIde
