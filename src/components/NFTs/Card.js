import { useSelector } from "react-redux";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Card = (props) => {

    const { name = "undefined", id = "#0000", image_url = '', fixed_price = '0000' } = props.nft;
    const { raca } = useSelector(state => state.price)
    return (
        <div className='nft'>
            <div className="imgBox">
                <img className='image-nft' alt={name} src={image_url || "/marketplaceraca/nft.png"} />
            </div>
            <div className="textBox">
                <p className='name-nft'>{name} #{id}</p>
                <div className='separate'></div>
                <div className='price'>
                    <p style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: '32px',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        margin: '0'
                    }}>Price</p>
                    <p className='priceNum'>{`${numberWithCommas(fixed_price)} (~${(fixed_price * raca).toFixed(2)})`}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;