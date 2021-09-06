import React, { useState , useEffect } from 'react';
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Tabs } from 'antd';
import Announcements from './Announcements';
import Tickets from './Tickets';
import authService from '../../../services/auth.service';
import queryString from 'query-string';

function AccountMessages() {

    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [messagesBox, setMessagesBox] = useState([])
    const [countMessage, setCountMessage] = useState(0)
    const [params, setParams] = useState({
        page : 1 , 
        pageSize : 10
    })
    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }

    useEffect(() => {
        getMessageBox()
    }, [params])

    const queries = queryString.stringify(params);
    const getMessageBox = () => {
        authService.messageBox(queries)
        .then(res => {
            setMessagesBox(res.data.data.result)
            setCountMessage(res.data.data.count)
        })
    }


    const handleChangeStatusMessage = (id) => {
        setMessagesBox(state=> {
            return state.map(item => {
                if(item.id === id){
                    return {
                        ...item , is_read : true
                    }
                }else{
                    return item
                }
            })
        })
     }


     const handeSelectPage = (e) => {
        setParams({
            ...params , page: e
        })
    }

    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"پیام‌ها"} />
                <div className="main-content" id="auctions">
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="اعلان‌ها" key="1" className="nav-link nav-item " >
                            <Announcements 
                                messagesBox={messagesBox} 
                                handleChangeStatusMessage={handleChangeStatusMessage} 
                                getMessageBox={getMessageBox} 
                                countMessage={countMessage}
                                setParams={setParams}
                                params={params}
                                handeSelectPage={handeSelectPage}
                            />
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