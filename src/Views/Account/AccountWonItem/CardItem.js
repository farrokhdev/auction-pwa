import React from 'react'
import { Link } from 'react-router-dom';
import TransferToPay from './TransferToPay';


function CardItem(props) {
    let numeral = require('numeral');

    return (
        <>
            <div className="fw-block">
                <div className="row">
                    <div className="col-4 col-lg-2">
                        <div className="img-block">
                            <img src={props?.exactUrl} width="493" height="621" alt="Smart Auction" className="img-fluid" />
                            <div className="tags-block">
                                <div className="auction-category won">برنده شده</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 col-lg-10">
                        <div className="flex-between">
                            <div className="flex-col">
                                <h5 className="artist-name">{props.artist}</h5>
                                <h5 className="auction-house-name">{props.artworkTitle}</h5>
                                <Link to="/"><p className="mrgt10 auction-house-name text-secondary">از{props.Link}</p></Link>

                                <p className={props.paymentMethod === "OFFLINE" && "d-none"} >پس از پرداخت
                                    <Link to="/">{props.Link} </Link>
                                    جهت ارسال اثر با شما تماس خواهند گرفت..
                                </p>

                                <p className={props.paymentMethod === "ONLINE" && "d-none"}>
                                    <Link to="/">{props.listWonPurchasse?.latest_auction?.house?.home_auction_name} </Link>
                                    جهت ارسال و نحوه پرداخت با شما تماس خواهد گرفت.
                                </p>

                                <p className="showdate mr-2">
                                    <span className="ml-2">تاریخ خرید :</span>
                                    <span className="mx-2">{props.date}</span>
                                </p>
                            </div>

                        </div>
                        <TransferToPay
                            paymentMethod={props.paymentMethod}
                            price={props.price}
                            currency={props.currency}
                            artist={props.artist}
                            artworkTitle={props.artworkTitle}
                            homAuction={props.Link}
                            url={props?.exactUrl}
                        />
                        <div className="flex-between align-items-baseline mrgt15">
                            <div className="flex-col">
                                <span className="price-title">تخمین:</span>
                                <div className="price">
                                    <span>{`${numeral(props?.minPice).format('0,0')} - ${numeral(props?.maxPrice).format('0,0')}`}  </span>
                                    <span className="unit">تومان</span>
                                </div>
                            </div>
                            <div className="flex-col right-align">
                                <span className="price-title">پیشنهاد شما:</span>
                                <div className="price">
                                    <span>{numeral(props.price).format('0,0')}</span>
                                    <span className="unit">تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardItem;