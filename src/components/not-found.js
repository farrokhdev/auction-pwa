import React from "react";
import {Result} from 'antd';
import Footer from "./footer";

const NotFound = () => {
    return (
        <>
            <div className="container bg-white">
                <Result
                    status="404"
                    title="404"
                    subTitle="متاسفانه صفحه مورد نظر یافت نشد."
                />
            </div>
            <Footer/>
        </>
    );
};

export default NotFound;