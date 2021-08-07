import React, { useState } from 'react';
import { Tabs } from "antd";
import PresentBids from './PresentBids';
import PastBids from './PastBids';
import Footer from '../../components/footer';


function MyBids() {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})


    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }


    return (
        <>
            <div className="container">
                <div className="top-header flex-between">
                    <h2 className="main-title">پیشنهادها</h2>
                    <button type="button" className="notification new-notice">
                        <i className="fal fa-bell"></i>
                    </button>
                </div>
                <div className="main-content" id="auctions">
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="فعلی" key="1" className="nav-link nav-item " >
                            <PresentBids data={data} getProfile={setData} />
                        </TabPane>
                        <TabPane tab="گذشته" key="2" className="nav-link nav-item " >
                            <PastBids data={data} getProfile={setData} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyBids;