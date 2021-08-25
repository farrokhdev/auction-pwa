import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import pic1thumb from '../../../assets/img/pic1-thumb.jpg';
import axios from "../../../utils/request";
import { BASE_URL } from "../../../utils";
import { stringify } from 'qs';
function LastAuctionsSection(props) {

    const [products, setProducts] = useState(false)

// console.log("props?.artwork_id --->>>>" , typeof(props?.artwork_id));

    const getAuction = () => {
        axios.get(`${BASE_URL}/sale/product/?auctions__id=${stringify(props?.artwork_id)}&page_size=8`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setProducts(resp.data?.data?.result)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getAuction()

    }, [])


    const settings = {
        rtl: true,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,

                }
            }
        ]
    };

    return (
        <>
            <div className="fw-block">
                <h6 className="default">موراد بیشتر در این حراج</h6>
                <div className="owl-carousel auction-details-img mrgt10 dirltr">
                    <Slider className="mt-1 mb-2" {...settings}>
                        {products ? products.map((item, key) => {
                            return (

                                <div className=" " key={key}>
                                    <div className="artwork-img">

                                        <img src={item?.media.exact_url} width="998" height="880" alt=""
                                            className="img-fluid px-1" />


                                    </div>

                                </div>
                            )
                        }) : ""}

                    </Slider>
                </div>
            </div>
        </>
    )
}

export default LastAuctionsSection;