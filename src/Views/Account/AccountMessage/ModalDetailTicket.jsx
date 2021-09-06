import React, { useState } from "react";
import { Modal , Avatar , Button } from "antd";
import avatar from "../../../assets/img/avatar.jpg";
import moment from "jalali-moment";
import BoxUserTicket from "./BoxUserTicket";
import BoxAdminTicket from "./BoxAdminTicket";
import authService from "../../../services/auth.service";

function ModalDetailTicket(props) {

    const [replyTicket, setReplyTicket] = useState()


        const handleSendReply = (id) => {
            
            authService.ticketReply(id , replyTicket)
            .then(res => {
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            })
        }

        const handleOk = () => {
            props.setIsModalVisible(false);
        };

        const handleCancel = () => {
            props.setIsModalVisible(false);
        };



  return (
    <>
      <Modal
        title={""}
        visible={props.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="modal-detail-ticket"
        footer={[
            <footer>
                <div class="input-group send-txt">
                    <input onChange={(e)=>setReplyTicket(e.target.value)} type="text" class="default-input" placeholder="متن خود را اینجا بنویسید."/>
                    <button onClick={(e)=>handleSendReply(props.ticketDetial?.id)}  class="btn-send"><i class="fal fa-chevron-circle-right"></i></button>
                </div>
            </footer>
          ]}
        
      >

            <BoxUserTicket 
                ticketDetial={props.ticketDetial}
            />


        {/* <div className="ticket-block ">

            <div className="d-flex flex-between">
                <div className="d-block d-md-flex w-100">
                    <div className="col">
                        <div className="d-flex justify-content-start mr-3 ">
                                <Avatar className="" src={avatar} size="small"/>
                                <h5 className="artist-name text-nowrap px-2">
                                    {props.ticketDetial?.owner?.first_name} {' '} {props.ticketDetial?.owner?.last_name}
                                </h5>
                        </div>
                    </div>

                    <div className="col">
                        <div className="d-flex justify-content-start justify-content-md-end mx-5 mx-md-0">
                            <div className="td-right ">
                                <span className="msg-date mb-0 pt-md-2">
                                    {props.ticketDetial ? moment(props.ticketDetial?.creation_date, "YYYY/MM/DD").locale("fa").format("DD MMMM YYYY") : ""}
                                </span>
                                <span className="msg-date mb-0 pt-md-2">
                                    {props.ticketDetial ? moment(props.ticketDetial?.creation_date).locale("fa").format("hh:mm") : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fw-block">
                    <h6 className="default">{props.ticketDetial?.title}</h6>
                    <p>{props.ticketDetial?.body}</p>
            </div>
        </div> */}


        {/* -------------- */}



        {props.ticketDetial?.reply?.length ? props.ticketDetial?.reply?.map( reply => (
            <>
    <BoxAdminTicket 
        ticketDetial={props.ticketDetial}
        reply={reply}
    />


                {/* <div class="ticket-block support">
                    <div class="d-flex flex-between">

                        <div className="d-block d-md-flex w-100">
                            <div className="col">
                                <div className="d-flex justify-content-start mr-3 ">
                                        <Avatar className="" src={avatar} size="small"/>
                                        <h5 className="artist-name text-nowrap px-2">
                                            پشتیبانی
                                        </h5>
                                </div>
                            </div>

                            <div className="col">
                                <div className="d-flex justify-content-start justify-content-md-end mx-5 mx-md-0">
                                    <div className="td-right ">
                                        <span className="msg-date mb-0 pt-md-2">
                                            {reply ? moment(reply?.creation_date, "YYYY/MM/DD").locale("fa").format("DD MMMM YYYY") : ""}
                                        </span>
                                        <span className="msg-date mb-0 pt-md-2">
                                            {reply ? moment(reply?.creation_date).locale("fa").format("hh:mm") : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="fw-block">
                        <h6 class="default">{props.ticketDetial?.title}</h6>
                        <p className="">{reply?.body}</p>
                    </div>
                </div> */}

    
            </>
        )) : null}





             

      </Modal>
    </>
  );
}

export default ModalDetailTicket;
