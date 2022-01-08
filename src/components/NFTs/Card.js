
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Card = (props) => {

    const { name = "undefined", id = "#0000", image_url = '', fixed_price = '0000' } = props.nft;
    return (
        <div className='nft'>
            <div className="imgBox">
                <img className='image-nft' alt={name} src={image_url || "/marketplaceraca/nft.png"} />
            </div>
            <div className="textBox">
                <p className='name-nft'>{name&&""}#{id}</p>
                <div className='separate'></div>
                <div className='price'>
                    <p style={{
                        color: 'rgba(56, 56, 56, .4)',
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight:'32px',
                        whiteSpace:'nowrap',
                        textOverflow:'ellipsis',
                        overflow:'hidden',
                        margin: '0'
                    }}>Price</p>
                    <p className='priceNum'>{numberWithCommas(fixed_price)}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;