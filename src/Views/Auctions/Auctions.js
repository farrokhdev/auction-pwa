import React, { useState } from 'react'
import { Tabs } from "antd";
import SpecialAuctions from './SpecialAuctions';
import Footer from '../../components/footer';
import DateAuctions from "./DateAuctions";
import { Link } from 'react-router-dom';
function Auctions() {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data,] = useState({})


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
                        <button type="button" className="notification new-notice">
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
                            {/* <DateAuctions data={data} getProfile={setData} /> */}
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