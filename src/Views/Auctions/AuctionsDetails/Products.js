import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import pic1 from "../../../assets/img/pic1.jpg"
import { AuctionType } from '../../../utils/converTypePersion';
function Products(props) {


    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({});
    let numeral = require('numeral');

    const [Active, setActive] = useState(false);

    const Like = () => {
        setActive(!Active)
    }


    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }
    return (
        <>
            {
                props.product.map((item) => {
                    return (
                        <div className="fw-block">

                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <div className="img-block">
                                        <Link to="/auctions/one-artwork">
                                            <img src={item.media.exact_url} width="493" height="621" alt="Smart Auction"
                                                className="img-fluid" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-8 col-lg-10">
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <h5 className="artist-name">{item?.artwork_title}</h5>
                                            <h5 className="auction-house-name">{item?.latest_auction?.house?.home_auction_name}</h5>
                                        </div>
                                        <div className="flex-col">
                                            <button
                                                // onClick={() =>
                                                //     Like(
                                                //         item?.following?.follow?.is_active ?
                                                //             item?.following?.follow?.id :
                                                //             item?.id, item?.following?.follow?.is_active)}
                                                type="button"
                                                className={"btn-favorite " + (Active ? "active" : "")}
                                            ></button>
                                        </div>
                                    </div>
                                    <div className="flex-between align-items-baseline mrgt15">
                                        <div className="flex-col">
                                            <div className="price">
                                                <span>{`${numeral(item?.min_price).format('0,0')} - ${numeral(item?.max_price).format('0,0')}`}  </span>
                                                <span className="unit">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <span className="price-title">پیشنهاد شروع:</span>
                                            <div className="price">
                                                <span>{numeral(item.price).format('0,0')}</span>
                                                <span className="unit">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </>
    )
}

export default Products;