import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { ACCOUNT_WALLET } from '../../utils/constant';
import { message, Modal } from 'antd';
import ModalWallet from './ModalWallet';

function AuctionRegistrationValue(props) {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [msg, setMsg] = useState(false);
    const { setSelectComponent, selectComponent, selectProducts } = props
    let numeral = require('numeral');

    useEffect(() => {
        getData()
        document.documentElement.scrollTop = 0;
    }, [])

    const getData = () => {
        setLoading(true)

        axios.get(`${BASE_URL}${ACCOUNT_WALLET}`)
            .then(resp => {
                setLoading(false)
                if ((resp.data.code === 200)) {
                    const res = resp.data?.data?.result;
                    setData(res)
                    axios.post(`${BASE_URL}/accounting/wallet/check-inventory/products/`, {
                        "product_ids": selectProducts
                    })
                        .then(resp => {
                            if (resp.data.code === 200) {
                                setMsg(resp.data.data.result)
                            }
                        })
                        .catch(err => {
                            message.error(err.response.data.data.error_message);
                        })
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    return (
        <>
            <div className="container container-form">
                <div className="wallet-container">
                    <div className="price-block text-center">
                        <span className="price">
                            {numeral(data?.total_inventory).format('0,0') ?? 0}
                            <span className="price-unit">تومان</span>
                        </span>
                        <span className="price-lable">مانده حساب شما</span>
                        <div className="price-block">{msg}</div>
                    </div>
                    <Link data-bs-toggle="modal" data-bs-target="#charge-modal"> چقدر باید شارژ کنم؟ </Link>
                    <button type="button" className="btn-outline-pink" onClick={() => setIsModalVisible(true)}> افزایش اعتبار </button>
                </div>
                <div className="button-group mt-3">
                    <button type="button" className="btn-gray me-2" onClick={() => {
                        setSelectComponent(selectComponent - 1)
                    }}>
                        بازگشت
                    </button>
                    <button type="button" className="btn-default" onClick={() => {
                        setSelectComponent(selectComponent + 1)
                    }}>
                        ادامه
                    </button>
                </div>
            </div>
            <Modal centered
                title={
                    <div className='d-flex align-items-center justify-content-between'>
                        <span>افزایش موجودی</span>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setIsModalVisible(false)}
                        />
                    </div>
                }
                className="text-end" width={1000} visible={isModalVisible}
                onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)} footer={[]}>
                <ModalWallet setSelectComponent={setSelectComponent} selectComponent={selectComponent}
                    setIsModalVisible={setIsModalVisible} refreshTable={getData}
                    title={"افزودن حساب بانکی جدید"} />
            </Modal>


            <div className="modal fade" id="charge-modal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog  text-center">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className=" g-0 d-flex justify-content-center align-items-baseline">
                                <div className="main-title">
                                    <h5 className="default titr">
                                        چقدر باید شارژ کنم؟
                                    </h5>
                                </div>
                                <button type="button"
                                    style={{ marginRight: '15rem' }}
                                    className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body textalign-center">
                            <div className="recharge-txt">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم<strong> 1000 تومان</strong> از صنعت چاپ
                                    و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                    سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                                    بهبود ابزارهای کاربردی می باشد</p>
                            </div>
                            <div class="value-list">
                                <div class="flex-around">
                                    <div class="flex-col">
                                        <h6 class="default">1000-2000<span class="unit"> تومان</span></h6>
                                    </div>
                                    <div class="flex-col">
                                        <h6 class="default">200<span class="unit"> تومان</span></h6>
                                    </div>
                                </div>
                                <div class="flex-around">
                                    <div class="flex-col">
                                        <h6 class="default">1000-2000<span class="unit"> تومان</span></h6>
                                    </div>
                                    <div class="flex-col">
                                        <h6 class="default">200<span class="unit"> تومان</span></h6>
                                    </div>
                                </div>
                                <div class="flex-around">
                                    <div class="flex-col">
                                        <h6 class="default">1000-2000<span class="unit"> تومان</span></h6>
                                    </div>
                                    <div class="flex-col">
                                        <h6 class="default">200<span class="unit"> تومان</span></h6>
                                    </div>
                                </div>
                                <div class="flex-around">
                                    <div class="flex-col">
                                        <h6 class="default">1000-2000<span class="unit"> تومان</span></h6>
                                    </div>
                                    <div class="flex-col">
                                        <h6 class="default">200<span class="unit"> تومان</span></h6>
                                    </div>
                                </div>
                                <div class="flex-around">
                                    <div class="flex-col">
                                        <h6 class="default">1000-2000<span class="unit"> تومان</span></h6>
                                    </div>
                                    <div class="flex-col">
                                        <h6 class="default">200<span class="unit"> تومان</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuctionRegistrationValue;