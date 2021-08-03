import React, { useState } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import { Tabs } from "antd";
import MyAuctionAccepted from './MyAuctionAccepted';
import Footer from "../../../components/footer";
import MyAuctionPending from './MyAuctionPending';
import MyAuctionFailed from './MyAuctionFailed';

function AccountMyAuctions() {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})


    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }

    return (
        <>
            <div className="container bg-white">

                <AccountHeader titlePage={"حراج‌های من"} />
                <div className="main-content" id="auctions">
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="تایید شده" key="1" className="nav-link nav-item " >
                            <MyAuctionAccepted data={data} getProfile={setData} />
                        </TabPane>
                        <TabPane tab="در حال بررسی" key="2" className="nav-link nav-item " >
                            <MyAuctionPending />
                        </TabPane>
                        <TabPane tab="رد شده" key="3" className="nav-link nav-item " >
                            <MyAuctionFailed />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AccountMyAuctions;