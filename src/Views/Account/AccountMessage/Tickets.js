import React from 'react'
import { Link } from 'react-router-dom';

function Tickets() {
    return (
        <>
            <div className="" id="pills-ticket" role="tabpanel" aria-labelledby="pills-ticket-tab">
                <Link to="/account/ticket-detail">
                    <button type="button" className="btn-main"><i className="fal fa-plus"></i>تیکت جدید</button>
                </Link>
                <div className="fw-block ">
                    <div className="flex-between align-items-baseline">
                        <div className="flex-col">
                            <h6 className="default">چگونه می‌توان یک اثر خریداری کرد؟</h6>
                        </div>
                    </div>
                    <p className="">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p>
                </div>
            </div>
        </>
    )
}

export default Tickets;