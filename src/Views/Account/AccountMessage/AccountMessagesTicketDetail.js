import React,{useState} from 'react'
import AccountHeader from '../../../components/AccountHeader'
import avatar from '../../../assets/img/avatar.jpg';
import UserMessagesTicketDetails from './UserMessagesTicketDetails';

function AccountMessagesTicketDetail() {


    return (
        <>
            <div className="container bg-white">

                <AccountHeader linkBack={"/account/messages"} titlePage={"تیکت"} />
                <div className="main-content" id="Ticket-detail"> 
            
                    {/* <UserMessagesTicketDetails /> */}
                    <div className="ticket-block">
                        <div className="d-flex flex-between">
                            <div className="img-block flex-start">
                                <div className="img-artists">
                                    <img src={avatar} width="534" height="534" alt="avatar" className="img-fluid" />
                                </div>
                                <div className="flex-col">
                                    <h5 className="artist-name">نیما حیدری</h5>
                                </div>
                            </div>
                            <div className="flex-col">
                                <span className="ticket-date">دیروز | 14:00</span>
                            </div>
                        </div>
                        <div className="fw-block">
                            <h6 className="default">چگونه می‌توان یک اثر خریداری کرد؟</h6>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                        </div>
                    </div>
                    <div className="ticket-block support">
                        <div className="d-flex flex-between">
                            <div className="img-block flex-start">
                                <div className="img-artists">
                                    <img src={avatar} width="534" height="534" alt="avatar" className="img-fluid" />
                                </div>
                                <div className="flex-col">
                                    <h5 className="artist-name">پشتیبانی</h5>
                                </div>
                            </div>
                            <div className="flex-col">
                                <span className="ticket-date">دیروز | 14:00</span>
                            </div>
                        </div>
                        <div className="fw-block">
                            <h6 className="default">چگونه می‌توان یک اثر خریداری کرد؟</h6>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                        </div>
                    </div>
                    <div className="ticket-block support">
                        <div className="d-flex flex-between">
                            <div className="img-block flex-start">
                                <div className="img-artists">
                                    <img src={avatar} width="534" height="534" alt="avatar" className="img-fluid" />
                                </div>
                                <div className="flex-col">
                                    <h5 className="artist-name">پشتیبانی</h5>
                                </div>
                            </div>
                            <div className="flex-col">
                                <span className="ticket-date">دیروز | 14:00</span>
                            </div>
                        </div>
                        <div className="fw-block">
                            <h6 className="default">چگونه می‌توان یک اثر خریداری کرد؟</h6>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="input-group send-txt">
                    <input type="text" className="default-input" placeholder="متن خود را اینجا بنویسید." />
                    <button type="button" className="btn-send"><i className="fal fa-chevron-circle-right"></i></button>
                </div>
            </footer>
        </>
    )
}

export default AccountMessagesTicketDetail;