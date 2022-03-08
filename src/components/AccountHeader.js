import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function AccountHeader(props) {
    const history = useHistory()
    const location = useLocation()


    return (
        <>
            <div className="top-header flex-between">
                <Link 
                // to={props?.linkBack || props?.backAuction || "/account"}
                 onClick={()=>history.goBack()}
                 >
                    <button type="button" className="btn-back" onClick={()=>history.push(`/`)}><i className="fal fa-chevron-left"></i></button>
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