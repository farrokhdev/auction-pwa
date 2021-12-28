import React, { useEffect, useState } from "react";
import axios from "../../utils/request";
import { BASE_URL } from "../../utils";
import { LIST_PRODUCTS } from "../../utils/constant";
import { Avatar, Card, Checkbox, message, Spin } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

function Chooseartwork(props) {
    const { selectProduct, setSelectProduct, auction } = props;
    const { Meta } = Card;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [dataCount, setDataCount] = useState(0);

    useEffect(() => {
        setSelectProduct([])
        getData()
    }, [auction])
    const getData = (e = "") => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/product/?auctions__id=${props.id}`)
            .then(resp => {
                setLoading(false)
                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    const res = resp.data?.data?.result;
                    setData(res)
                    setDataCount(resp.data?.data?.count)
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
            <Spin spinning={loading}>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="input-group search">
                                    <input
                                        type="text"
                                        className="default-input"
                                        placeholder="جستجوی اثر، خانه حراج"
                                        onChange={(e) => getData(e.target.value)}
                                    />
                                    <button type="button" className="btn-advancesearch">
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-3 num-artwork">
                                <span className="font12">آثار انتخاب شده: </span>
                                <span className="num-artwork-item pinkcolor">{selectProduct?.length}</span>
                                <span className="num-artwork-item">از</span>
                                <span className="num-artwork-item">{dataCount}</span>
                            </div>
                        </div>
                        <div className="chooseartwork-custome">
                            <div className="row mt-3">
                                {
                                    data && data.length ? data.map((item, i) => 
                                        <div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
                                          <div className="my-3">
                                            <Card
                                                style={{ width: "100%" }}
                                                cover={
                                                  <img
                                                  style={{
                                                    backgroundImage: `url(${item?.media?.exact_url ?
                                                        item?.media?.exact_url : ""})`, height: "19rem"
                                                }}
                                                    className="img-fluid image-custom-back"
                                                    //   alt="بدون تصویر"
                                                    //   src={item?.media?.exact_url}
                                                  />
                                                }
                                            >
                                              <Meta
                                                  avatar={<Checkbox checked={selectProduct.some(t=>item?.id===t?.id)} onChange={e=>{
                                                    if(e.target.checked)
                                                      setSelectProduct([...selectProduct,item])
                                                    else {
                                                      let t=selectProduct.filter(t=>t?.id!==item?.id)
                                                        setSelectProduct(t)
                                                    }

                                                  }}/>}
                                                  title={item.artwork_title}
                                                  description={item?.technique}
                                              />
                                            </Card>
                                          </div>
                                            </div>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </>
    );
}

export default Chooseartwork;


