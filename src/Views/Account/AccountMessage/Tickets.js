import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../../utils/request';
import { BASE_URL } from '../../../utils';
import { Pagination, message, Alert } from "antd";
import moment from "jalali-moment";

function Tickets() {

    const [Tickets, setTickets] = useState("");
    const [countTickets, setCountTickets] = useState(0);
    const [TicketDetail, setTicketDetail] = useState("");
    const [Messages, setMessages] = useState("");
    const [countMessages, setCountMessages] = useState(0);
    const [ReplyBody, setReplyBody] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const getTickets = (page = 1) => {
        axios.get(`${BASE_URL}/ticketing/?page=${page}`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setTickets(resp.data.data.result)
                    setCountTickets(resp.data.data.count)
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const getTicket = (id) => {
        axios.get(`${BASE_URL}/ticketing/${id}/`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setTicketDetail(resp.data.data.result)
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const getMessages = (page = 1) => {
        axios.get(`${BASE_URL}/messaging/inbox/?page=${page}`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setMessages(resp.data.data.result)
                    setCountMessages(resp.data.data.count)
                }

            })
            .catch(err => {
                console.error(err);
            })
    }


    useEffect(() => {
        getTickets()
        getMessages()
    }, [])

    function stateToFa(state) {
        switch (state) {
            case 'pending':
                return {
                    "title": "در انتظار بررسی",
                    "type": "pending",
                    "block": ""
                }
            case 'unread':
                return {
                    "title": "پاسخ داده شده",
                    "type": "replied",
                    "block": "unread"
                }
            case 'close':
                return {
                    "title": "بسته شده",
                    "type": "closed",
                    "block": ""
                }
            case 'read':
                return {
                    "title": "خوانده شده",
                    "type": "closed",
                    "block": ""
                }
            default:
                return {
                    "title": "",
                    "type": "",
                    "block": ""
                }
        }
    }

    const handeSelectPage = (e, type) => {
        if (type === 't')
            getTickets(e)
        else
            getMessages(e)
    }

    const closeTicket = (id) => {
        axios.get(`${BASE_URL}/ticketing/${id}/close/`)
            .then(resp => {
                console.log(resp)
                if (resp.data.code === 200) {
                    setTicketDetail(resp.data.data.result)
                    message.success("تیکت شما با موفقیت ارسال شد")
                    setTimeout(() => {
                        window.location.reload()
                    }, 700);
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleReply = (id) => {
        let payload = {
            "body": ReplyBody,
        }
        axios.post(`${BASE_URL}/panel/ticket/${id}/reply/`, payload)
            .then(resp => {
                if (resp.data.code === 201) {
                    setSuccess(true)
                    message.success("تیکت شما با موفقیت ارسال شد")
                    setTimeout(() => {
                        window.location.reload()
                    }, 700);
                }
            })
            .catch(err => {
                setError(true)
                console.log("Error Message", err);
            })
    }
    return (
        <>
            <div className="" id="pills-ticket" role="tabpanel" aria-labelledby="pills-ticket-tab">
                <Link to="/account/ticket-detail">
                    <button type="button" className="btn-main"><i className="fal fa-plus"></i>تیکت جدید</button>
                </Link>
                {/* <div className="fw-block ">
                    <div className="flex-between align-items-baseline">
                        <div className="flex-col">
                            <h6 className="default">چگونه می‌توان یک اثر خریداری کرد؟</h6>
                        </div>
                    </div>
                    <p className="">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p>
                </div> */}
                {Tickets ? Tickets.map((item, key) => {
                    return (
                        <div className={"fw-block " + (stateToFa(item?.state).block)} onClick={() => getTicket(item?.id)} data-bs-target="#readticket-view" data-bs-toggle="modal" key={key}>
                            <div className="flex-between align-items-baseline">
                                <div className="flex-col">
                                    <h6 className="default">{item?.title}</h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="">{item?.body}</p>
                                <span
                                    className={`ticket-state + ${(stateToFa(item?.state).type)}`}>{stateToFa(item?.state).title}</span>
                                {/* <span className="msg-date">{item?.date}</span> */}
                            </div>
                        </div>
                    )
                }) : ""}
                {/* <div className="row row-cols-1">
                    {Tickets ? Tickets.map((item, key) => {
                        return (
                            <div className="col" key={key}>
                                <div className={"msg-block " + (stateToFa(item?.state).block)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#readticket-view"
                                    onClick={() => getTicket(item?.id)}>
                                    <div className="ticket">
                                        <div className="ticket-right order-md-2">
                                            <span
                                                className={"ticket-state " + (stateToFa(item?.state).type)}>{stateToFa(item?.state).title}</span>
                                            <span className="msg-date">{item?.date}</span>
                                        </div>
                                        <div className="ticket-left order-md-1">
                                            <h5 className="default">پاسخ به "{item?.title}"</h5>
                                        </div>
                                    </div>
                                    <p>{item?.body}</p>
                                    <button type="button" className="btn btn-view">پاسخ</button>
                                </div>
                            </div>
                        )
                    }) : ""}

                </div> */}
                {countTickets > 10 ?
                    <Pagination
                        style={{ direction: 'ltr', textAlign: 'center' }}
                        responsive
                        onChange={(e) => handeSelectPage(e, 't')}
                        defaultCurrent={1}
                        total={countTickets}
                        defaultPageSize={10}
                    />
                    : ""}
            </div>


            {/* <div className="modal fade" id="readticket-view" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog w-800">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="container g-0 d-flex justify-content-between">
                                <div className="main-title">
                                    <h2 className="default titr">{TicketDetail?.title}</h2>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ticket-detail">
                                <div className="ticket-detail-header">
                                    <div className="td-left">
                                        <h6 className="default">پشتیبانی</h6>
                                    </div>
                                    <div className="td-right">
                                        <span
                                            className="msg-date">{TicketDetail ? moment(TicketDetail?.creation_date, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY') : ""}</span>
                                        <span
                                            className="msg-date">{TicketDetail ? moment(TicketDetail?.creation_date).locale('fa').format('hh:mm') : ""}</span>
                                    </div>
                                </div>
                                <div className="ticket-detail-body">
                                    <p>{TicketDetail?.body}</p>
                                </div>
                            </div>

                            {TicketDetail ? TicketDetail.reply.map((item, key) => {
                                return (
                                    <div className="ticket-detail" key={key}>
                                        <div className="ticket-detail-header">
                                            <div className="td-left">
                                                <h6 className="default">{item?.owner.first_name + " " + item?.owner.last_name}</h6>
                                            </div>
                                            <div className="td-right">
                                                <span className="msg-date"> no time </span>
                                                <span className="msg-date">in api</span>
                                            </div>
                                        </div>
                                        <div className="ticket-detail-body">
                                            <p>
                                                {item?.body}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }) : ""}

                            <div className="ticket-reply-box">
                                {TicketDetail?.state === 'close' ?
                                    <Alert style={{margin: 5}}
                                           message="به دلیل بسته بودن تیکت امکان ارسال پیام وجود ندارد." type="info"
                                           showIcon/> :
                                    <div className="input-group">
                                    <textarea rows="4" className="default-input"
                                              disabled={TicketDetail?.state === 'close'}
                                              onChange={(e) => {
                                                  setReplyBody(e.target.value)
                                              }}
                                              placeholder="متن مورد نظر خود را وارد نمایید."/>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-pink"
                                    disabled={TicketDetail?.state === 'close'}
                                    onClick={() => {
                                        closeTicket(TicketDetail?.id)
                                    }}>بستن تیکت
                            </button>
                            <button type="button" className="btn btn-default" disabled={TicketDetail?.state === 'close'}
                                    onClick={() => {
                                        handleReply(TicketDetail?.id)
                                    }}>ارسال
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}





            <div centered className="modal fade" id="readticket-view" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog w-100 ">
                    <div className="modal-content h-50">
                        <div className="modal-header">
                            <div className="display">
                                <div className="main-title">
                                    <h2 className="default titr">{TicketDetail?.title}</h2>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                        {/* <div className="modal-body text-center pt-5 h-50">
                            <h6 className="default">اعتبار نقدی</h6>
                            <div className="search-input">
                                <label className="default-lable pt-5">مبلغ مورد نظر خود را وارد نمایید.</label>
                                <input type="text" className="default-input" placeholder="100,000" />
                                <span className="unit">تومان</span>
                            </div>
                        </div> */}
                        <div className="modal-body">
                            <div className="ticket-detail">
                                <div className="ticket-detail-header">
                                    <div className="td-left">
                                        <h6 className="default">پشتیبانی</h6>
                                    </div>
                                    <div className="td-right">
                                        <span
                                            className="msg-date">{TicketDetail ? moment(TicketDetail?.creation_date, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY') : ""}</span>
                                        <span
                                            className="msg-date">{TicketDetail ? moment(TicketDetail?.creation_date).locale('fa').format('hh:mm') : ""}</span>
                                    </div>
                                </div>
                                <div className="ticket-detail-body">
                                    <p>{TicketDetail?.body}</p>
                                </div>
                            </div>

                            {TicketDetail ? TicketDetail.reply.map((item, key) => {
                                return (
                                    <div className="ticket-detail" key={key}>
                                        <div className="ticket-detail-header">
                                            <div className="td-left">
                                                <h6 className="default">{item?.owner.first_name + " " + item?.owner.last_name}</h6>
                                            </div>
                                            <div className="td-right">
                                                <span className="msg-date"> no time </span>
                                                <span className="msg-date">in api</span>
                                            </div>
                                        </div>
                                        <div className="ticket-detail-body">
                                            <p>
                                                {item?.body}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }) : ""}

                            <div className="ticket-reply-box">
                                {TicketDetail?.state === 'close' ?
                                    <Alert style={{ margin: 5 }}
                                        message="به دلیل بسته بودن تیکت امکان ارسال پیام وجود ندارد." type="info"
                                        showIcon /> :
                                    <div className="input-group">
                                        <textarea rows="4" className="default-input"
                                            disabled={TicketDetail?.state === 'close'}
                                            onChange={(e) => {
                                                setReplyBody(e.target.value)
                                            }}
                                            placeholder="متن مورد نظر خود را وارد نمایید." />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary rounded-pill"
                                disabled={TicketDetail?.state === 'close'}
                                onClick={() => {
                                    closeTicket(TicketDetail?.id)
                                }}>بستن تیکت
                            </button>
                            <button type="button" className="btn btn-default" disabled={TicketDetail?.state === 'close'}
                                onClick={() => {
                                    handleReply(TicketDetail?.id)
                                }}>ارسال
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tickets;