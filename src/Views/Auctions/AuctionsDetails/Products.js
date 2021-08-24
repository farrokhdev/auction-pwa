import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Products(props) {
    const [activeKey, setActiveKey] = useState("1");
    let numeral = require('numeral');
 
    return (
        <>
            {
                props.product.map((item) => {
                    return (
                        <div className="fw-block">

                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <div className="img-block">
                                        <Link to={`/auctions/one-artwork/${item?.id}`}>
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
                                               onClick={() =>
                                                props.addBookmark(
                                                    item?.following?.bookmark?.is_active?
                                                    item?.following?.bookmark?.id :
                                                        item?.id, item?.following?.bookmark?.is_active)
                                            }
                                                type="button"
                                                className={"btn-favorite " + (item?.following?.bookmark?.is_active ? "active" : "")}
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