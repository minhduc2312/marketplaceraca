import React from 'react';
import '../../styles/elemon.css';
import { numberWithCommas } from '../NFTs/NFTs';

const InfoCard = ({ elemon }) => {
    const rarity = ['B', 'A', 'S', 'SS', 'SSS'];
    const classes = [
        'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
    ]
    const isOwner = elemon.ownerAddress === '0x10201091597635eC7b8e208306E6aDCC7c167925';
    const URI = 'https://app.elemon.io';
    const bodyPart = [elemon.bodyPart1, elemon.bodyPart2, elemon.bodyPart3, elemon.bodyPart4, elemon.bodyPart5, elemon.bodyPart6];

    return (
        <div className="character-item owner">
            <div className="head">
                <p className="id">ID: {elemon.tokenId}</p>
                <div className="character-type">
                    <img alt='' img-rarity="" src={`${URI}/assets/images/rarity_${rarity[elemon.rarity - 1]}.png`} />
                </div>
            </div>
            <div className="content">
                <div className="img">
                    <div className="img-left">
                        <div className="icon">
                            <img alt='' src={`${URI}/assets/images/element/${classes[elemon.class - 1]}.png`} /></div>
                        <p className="icon_text">
                            <span>
                                <img alt='' src={`${URI}/assets/images/purity_${elemon.purity === 0 ? 'Hybrid' : 'Pure'}.png`} style={{ width: '100%' }} />
                            </span>
                        </p>
                    </div>
                    <img  alt='' src={`https://statics.elemon.io/avatar/${elemon.baseCardId}/${elemon.baseCardId}_${bodyPart.join('_')}.png`} className="main" />
                    <div className={`img_aura quality_${elemon.quality}`}></div>
                </div>
                <div className="text">
                    <p className="price">
                        <img  src={`${URI}/assets/images/busd_ticker.png`} width="40" alt="" />
                        {elemon.lastPrice / 1000000000000000000} BUSD
                    </p>
                    <div className="element">
                        <div className="icon">
                            <img  src={`${URI}/assets/images/icon-power.png`} alt="" />

                        </div>
                        <p className="element__name" data-power="">{numberWithCommas(elemon.point)}</p>
                    </div>
                    <a rel="noreferrer" target='_blank' href={`https://app.elemon.io/elemon/${elemon.tokenId}`} className={`box__btn buy ${isOwner ? 'owner' : ''}`} type="button">
                        {isOwner ? 'My Elemon' : "Info"}
                    </a>
                </div>
            </div>

        </div>

    );
};

export default InfoCard;
