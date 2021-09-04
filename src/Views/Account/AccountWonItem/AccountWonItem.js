import React, { useState, useEffect } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import CardItem from './CardItem';
import axios from '../../../utils/request';
import { BASE_URL } from '../../../utils';
import { LIST_MY_WON_PERCHACE } from '../../../utils/constant';
import { Pagination, Spin } from 'antd';
import momentJalaali from 'moment-jalaali'
import { convertMouthToPersian } from '../../../utils/converTypePersion';

function AccountWonItem() {

    const [listWonPurchasse, setListWonPurchasse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countPurchase, setCountPurchase] = useState(0)
    const [params, setParams] = useState({
        page: 1,
        page_size: 9,
    })

    useEffect(() => {
        getMyWonPurchase()
    }, [])

    const getMyWonPurchase = () => {
        axios.get(`${BASE_URL}${LIST_MY_WON_PERCHACE}`)
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {
                    setListWonPurchasse(resp.data.data.result)
                    setCountPurchase(resp.data.total)
                }

            })
            .catch(err => {
                setLoading(false)
                console.error(err);
            })
    }

    const handeSelectPage = (e) => {
        setParams({
            ...params, page: e
        })
    }

    return (
        <>
            <Spin spinning={loading}>
                <div className="container bg-white">
                    <AccountHeader titlePage={"موارد برنده شده"} />
                    <div className="main-content" id="mybids">

                        {!loading && !!listWonPurchasse?.length ? listWonPurchasse?.map(item =>
                            <CardItem
                                artist={item?.persian_artist_name}
                                artworkTitle={item?.artwork_title}
                                exactUrl={item?.media?.exact_url}
                                Link={item?.latest_auction?.house?.home_auction_name}
                                ArtworkLink=" گالری آرتیبیشن"
                                date={item?.bidding_details?.max_bid_date ?
                                    `${momentJalaali(item?.bidding_details?.max_bid_date).format(`jDD`)}  
                                     ${convertMouthToPersian(momentJalaali(item?.bidding_details?.max_bid_date).format(`jMM`))}   
                                     ${momentJalaali(item?.bidding_details?.max_bid_date).format(`jYYYY`)}`
                                    : ''}
                                currency={item?.latest_auction?.currency}
                                price={item?.bidding_details?.max_bid ? item?.bidding_details?.max_bid : ''}
                                maxPrice={item?.max_price}
                                minPice={item?.min_price}
                                paymentMethod={item?.payment_method} />) : null}
                    </div>
                </div>

                <Pagination
                    style={{ direction: 'ltr', textAlign: 'center' }}
                    showSizeChanger
                    responsive
                    onShowSizeChange={(current, pageSize) => { getMyWonPurchase(pageSize) }}
                    onChange={(e) => handeSelectPage(e)}
                    defaultCurrent={1}
                    total={countPurchase}
                    pageSizeOptions={[9, 18, 36, 48]}
                    defaultPageSize={9}
                />
                
            </Spin>
            <Footer />
        </>
    )
}

export default AccountWonItem;