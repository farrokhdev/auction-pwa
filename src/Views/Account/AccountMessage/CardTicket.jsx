import React from "react";

function CardTicket(props) {

    
  return (
    <div onClick={()=>props.showModal(props.id)} className=" fw-block justify-content-start">
      <div className="">
        <div className="d-flex">
          <h6 className="default ">{props.title}</h6>
        </div>
      </div>
      <div className="d-flex">
        <p className="">{props.body}</p>
      </div>
    </div>
  );
}

export default CardTicket;
