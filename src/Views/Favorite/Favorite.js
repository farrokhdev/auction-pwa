import React, { useState } from 'react'
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import ArtworkItem from './ArtworkItem';
import Sales from './Sales';

function Favorite() {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");

    function callback(key) {
        console.log(key);
        setActiveKey(key)
    }


    return (
        <>
            <div className="container">
                <div className="top-header flex-between">
                    <h2 className="main-title">علاقه‌مندی‌ها</h2>
                    <Link to="/account/messages">
                        <button type="button" className="notification new-notice">
                            <i className="fal fa-bell"></i>
                        </button>
                    </Link>
                </div>

                <div className="main-content" id="auctions">
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="آثار" key="1" className="nav-link nav-item " >
                            <ArtworkItem />
                        </TabPane>
                        <TabPane tab="حراج" key="2" className="nav-link nav-item " >
                            <Sales />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Favorite;