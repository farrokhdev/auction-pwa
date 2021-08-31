import React, { useState , useEffect } from 'react';
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Tabs } from 'antd';
import Announcements from './Announcements';
import Tickets from './Tickets';
import authService from '../../../services/auth.service';

function AccountMessages() {

    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [messagesBox, setMessagesBox] = useState([])

    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }

    useEffect(() => {
        authService.messageBox()
            .then(res => {
                setMessagesBox(res.data.data.result)
        }
    )
    }, [])

    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"پیام‌ها"} />
                <div className="main-content" id="auctions">
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="اعلان‌ها" key="1" className="nav-link nav-item " >
                            <Announcements messagesBox={messagesBox}  />
                        </TabPane>
                        <TabPane tab="تیکت‌ها" key="2" className="nav-link nav-item" >
                            <Tickets messageBox={messagesBox} setMessagesBox={setMessagesBox} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AccountMessages;