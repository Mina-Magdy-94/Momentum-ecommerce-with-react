import './LeftSide.css'

import React from 'react'

const LeftSIde = ({ product: { image, title } }) => {
    return (
        <div className="d-flex justify-content-center align-items-center col-12 col-md-8 border relative" style={{ height: '600px', background: 'rgb(245,243,241)' }}>
            <img src={image} alt={title} style={{ width: '450px', height: '450px' }} />
        </div>
    )
}

export default LeftSIde
