import React from "react";
import avatar from "../../../assets/img/avatar.jpg";
import moment from "jalali-moment";
import {Avatar} from "antd";


function BoxAdminTicket({reply , ticketDetial}) {
  return (
    <div class="ticket-block support">
      <div class="d-flex flex-between">
        <div className="d-block d-md-flex w-100">
          <div className="col">
            <div className="d-flex justify-content-start mr-3 ">
              <Avatar className="" src={avatar} size="small" />
              <h5 className="artist-name text-nowrap px-2">پشتیبانی</h5>
            </div>
          </div>

          <div className="col">
            <div className="d-flex justify-content-start justify-content-md-end mx-5 mx-md-0">
              <div className="td-right ">
                <span className="msg-date mb-0 pt-md-2">
                  {reply
                    ? moment(reply?.creation_date, "YYYY/MM/DD")
                        .locale("fa")
                        .format("DD MMMM YYYY")
                    : ""}
                </span>
                <span className="msg-date mb-0 pt-md-2">
                  {reply
                    ? moment(reply?.creation_date).locale("fa").format("hh:mm")
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fw-block">
        <h6 class="default">{ticketDetial?.title}</h6>
        <p className="">{reply?.body}</p>
      </div>
    </div>
  );
}

export default BoxAdminTicket;
