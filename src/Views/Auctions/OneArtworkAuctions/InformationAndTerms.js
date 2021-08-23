import React from 'react'

function InformationAndTerms(props) {

    console.log('Auction >>>> ', props?.Auction);
    return (
        <div className="fw-block" >
            <p>{props?.Auction.details}</p>
            <h6 className="default w-25">نحوه پرداخت</h6>
            <p>{props?.Auction.payment_method}</p>
            <h6 className="default w-25">حمل و نقل</h6>
            <p>{props?.Auction.transportation}</p>
            <h6 className="default w-25">بازگشت</h6>
            <p>{props?.Auction.return_rules}</p>
            <h6 className="default w-25">سایر</h6>
            <p>{props?.Auction.other}</p>
            <h6 className="default" style={{ width: "98px" }}>پیشنهاد افزایش</h6>
            <div className="flex-between mrgt10">
                <div className="flex-col">
                    <span className="price-title">قیمت:</span>
                    <div className="price">

                        {props?.Auction?.steps?.map((rangePrice, index) => (
                            <p>
                                {`${index === 0 ? 0 : props?.Auction?.steps[index - 1].threshold} -  ${rangePrice.threshold}`}
                                <span className="unit"> تومان </span></p>
                            // console.log("threshold -->>>",rangePrice.threshold)
                            // <p>{rangePrice.threshold}</p>
                        ))}

                    </div>
                </div>
                <div className="flex-col">
                    <span className="price-title"> افزایش : </span>
                    <div className="price">
                        <span>{props?.Auction?.steps?.map((rangePrice, index) => (
                            <p>
                                {rangePrice.step}
                                <span className="unit"> تومان </span>
                            </p>
                        ))}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationAndTerms;