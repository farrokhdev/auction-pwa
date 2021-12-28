import React, { useState, useEffect } from 'react'
import { Tabs } from "antd";
import SpecialAuctions from './SpecialAuctions';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { message } from 'antd';
import classnames from 'classnames';

function Auctions() {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data,] = useState({})
    const [loading, setLoading] = useState(false)
    const [Notification, setNotification] = useState({})


    useEffect(() => {
        getNotification()
    }, [])

    const getNotification = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/messaging/inbox/unread_count/`)
            .then(resp => {
                setLoading(false)

                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setNotification(resp.data?.data?.result)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }
    return (
        <>
            <div className="container">
                <div className="top-header flex-between">
                    <h2 className="main-title">حراج‌ها</h2>
                    <Link to="/account/messages">
                        <button type="button"
                            className={classnames({
                                "notification new-notice": Notification?.count,
                                "notification": !Notification?.count,
                            })}
                        >
                            <i className="fal fa-bell"></i>
                        </button>
                    </Link>
                </div>

                <div className="main-content" id="auctions">
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="ویژه" key="1" className="nav-link nav-item " >
                            <SpecialAuctions data="withParams" activeKey={activeKey} />
                        </TabPane>
                        <TabPane tab="تقویم" key="2" className="nav-link nav-item " >
                            <SpecialAuctions data="withoutParams" activeKey={activeKey} />

                        </TabPane>
                        <TabPane tab="نزدیک من" key="3" className="nav-link nav-item " >
                            {/* <MyLocationAuctions /> */}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Auctions;