import React, { useState } from 'react'
import { Button } from 'antd';
import Chooseartwork from './ChooseArtwork';

function AuctionRegistrationFavorite(props) {

    const [selectProduct, setSelectProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [auction, setAuction] = useState(0);
    const [next, setNext] = useState(false);
    const { setSelectComponent, selectComponent, setSelectProducts } = props;

    const sendData = () => {

        setLoading(true)
        let temp = {}

        for (let i in selectProduct) {
            temp[selectProduct[i].id] = ""
        }

        setSelectProducts(temp)
        setNext(true)
        setSelectComponent(selectComponent + 1)

    }

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <Chooseartwork selectProduct={selectProduct} setSelectProduct={setSelectProduct} auction={auction} id={props.id} />
                </div>
                <div className="btns">
                    {selectProduct && selectProduct.length >= 1 ?
                        <Button loading={loading} className="btn-main" htmlType="submit" onClick={() => sendData()}> ثبت و ادامه </Button>
                        : ''}

                    {next ?
                        <Button className="btn-main " loading={loading} onClick={() => { setSelectComponent(selectComponent + 1) }}>ادامه</Button>
                        : ""
                    }
                </div>
            </div>
        </>
    )
}

export default AuctionRegistrationFavorite;