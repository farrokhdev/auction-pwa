import React,{useState} from 'react'
import avatar from '../../../assets/img/avatar.jpg';




function UserMessagesTicketDetails() {
    return (
        <>
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
        </>
    )
}

export default UserMessagesTicketDetails;