import React from "react";
import {Link} from "react-router-dom";

function Breadcrumbs(props) {
    const More = props.children
    return (
        <>
            <div className="row sm-mrgb50">
                <div className="col-6">
                    <div className="main-title d-inline-flex">
                        <h2 className="default titr">{props.title}</h2>
                        <ul className="breadcrumb-cs">
                            <li>
                                <Link to="/">صفحه اصلی</Link>
                            </li>
                            {props.parent && (
                                <li>
                                    <Link to={props.parent.link}>{props.parent.title}</Link>
                                </li>
                            )}
                            <li className="active">{props.title}</li>
                        </ul>
                    </div>
                </div>
                {props.children}
            </div>
        </>
    );
}

export default Breadcrumbs;