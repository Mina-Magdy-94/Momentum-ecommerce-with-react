import './Rating.css'
import Star from './star/Star'


const Rating = ({ rate, count }) => {


    const calculateFillPercentage = (starIndex) => {
        const starValue = starIndex + 1;
        if (rate >= starValue) {
            return 100;
        } else if (rate > starIndex && rate < starValue) {
            return (rate - starIndex) * 100;
        } else {
            return 0;
        }
    };
    return (
        <div className='d-flex align-items-center justify-content-start col-gap-1'>
            {[1, 2, 3, 4, 5].map((value, index) => (
                <Star key={value} size={35} style={{ cursor: 'pointer' }} fillPercentage={calculateFillPercentage(index)} />
            ))}
            <span >{`(${count ? count : '0'} Reviews)`}</span>
        </div>
    )
}

export default Rating
