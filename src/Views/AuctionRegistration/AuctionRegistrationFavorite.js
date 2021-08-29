import React, { useState } from 'react'
import AccountHeader from '../../components/AccountHeader';
import pic1thumb from '../../assets/img/pic1-thumb.jpg';
import {Card , Button} from "antd";
import Footer from '../../components/footer';
import Chooseartwork from './ChooseArtwork';
function AuctionRegistrationFavorite(props) {

    const {setSelectComponent, selectComponent, setSelectProducts} = props
    const [selectProduct, setSelectProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [auction, setAuction] = useState(0)
    const [next, setNext] = useState(false)
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


    console.log("selectProduct=====>",selectProduct)
    return (
        <>
            <div className="container">
                <div className="row mt-3">
                     <Chooseartwork selectProduct={selectProduct} setSelectProduct={setSelectProduct} auction={auction} id={props.id} />
                </div>

                <div className="btns">
                    {selectProduct && selectProduct.length >= 1 ?<Button loading={loading} className="btn-main" htmlType="submit" onClick={()=>sendData()}>
                         ثبت و ادامه
                    </Button> :''}
                    {next ? <Button className="btn-main " loading={loading} onClick={() => {
                        setSelectComponent(selectComponent + 1)
                    }}>
                        ادامه
                    </Button> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default AuctionRegistrationFavorite;