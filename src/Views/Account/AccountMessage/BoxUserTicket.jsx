import React from "react";
import avatar from "../../../assets/img/avatar.jpg";
import moment from "jalali-moment";
import {Avatar} from "antd";

function BoxUserTicket({ticketDetial , reply}) {


  return (
    <div className="ticket-block ">
      <div className="d-flex flex-between">
        <div className="d-block d-md-flex w-100">
          <div className="col">
            <div className="d-flex justify-content-start mr-3 ">
              <Avatar className="" src={avatar} size="small" />
              <h5 className="artist-name text-nowrap px-2">
                {ticketDetial?.owner?.first_name}{" "}
                {ticketDetial?.owner?.last_name}
              </h5>
            </div>
          </div>

          <div className="col">
            <div className="d-flex justify-content-start justify-content-md-end mx-5 mx-md-0">
              <div className="td-right ">
                <span className="msg-date mb-0 pt-md-2">
                  {ticketDetial
                    ? moment(ticketDetial?.creation_date, "YYYY/MM/DD")
                        .locale("fa")
                        .format("DD MMMM YYYY")
                    : ""}
                </span>
                <span className="msg-date mb-0 pt-md-2">
                  {ticketDetial
                    ? moment(ticketDetial?.creation_date)
                        .locale("fa")
                        .format("hh:mm")
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fw-block">
        <h6 className="default">{reply?.title}</h6>
        <p>{reply?.body}</p>
      </div>
    </div>
  );
}

export default BoxUserTicket;
