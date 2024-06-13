import './Star.css'

const Star = ({ fillPercentage }) => {
    return (
        <span
            style={{
                display: 'inline-block',
                position: 'relative',
                fontSize: '2rem',
                color: 'gray'
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    width: `${fillPercentage}%`,
                    color: 'black'
                }}
            >
                ★
            </span>
            ★
        </span>
    );
}

export default Star
