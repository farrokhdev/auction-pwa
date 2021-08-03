import React from 'react';
import { Link } from 'react-router-dom';


function AccountHeader(props) {
    return (
        <>
            <div className="top-header flex-between">
                <Link to={props?.linkBack || "/account"}>
                    <button type="button" className="btn-back"><i className="fal fa-chevron-left"></i></button>
                </Link>
                <div className="inner-title text-center">
                    <h2 className="main-title">{props.titlePage}</h2>
                </div>
                <button type="button" className="share">
                </button>
            </div>
        </>
    )
}

export default AccountHeader;