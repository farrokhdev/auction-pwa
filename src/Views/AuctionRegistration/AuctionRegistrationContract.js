import React, { useState, useEffect } from 'react';
import axios from '../../utils/request';
import UploadRequest from "../../utils/uploadRequest"
import { BASE_URL } from '../../utils';
import { CheckCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import { JOIN_AUCTION } from '../../utils/constant';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';

function AuctionRegistrationContract(props) {

    const [CoreUpload, setCoreUpload] = useState("");
    const [Uploaded, setUploaded] = useState(false);
    const [Uploading, setUploading] = useState(false);
    const [posted, setPosted] = useState(false);
    const [loading, setLoading] = useState(false)
    const { setSelectComponent, selectComponent } = props

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    const handleUpload = (e) => {

        let payload = { "content_type": e.target.files[0].name.split('.')[1] }

        axios.post(`${BASE_URL}/core/upload/`, payload)
            .then(resp => {
                if (resp.data.code === 200) {
                    setCoreUpload(resp.data.data.result)
                    setUploading(true)

                    UploadRequest.put(resp.data.data.result.upload_url, e.target.files[0])
                        .then(resp1 => {
                            if (resp1.status === 200) {
                                axios.post(`${BASE_URL}/core/media/photos/`, {
                                    "media_path": resp.data.data.result.upload_url,
                                    "type": e.target.files[0].name.split('.')[1],
                                    "bucket_name": e.target.files[0].name.split('.')[1],
                                    "file_key": resp.data.data.result.file_key
                                })
                                    .then(resp2 => {
                                        if (resp2.data.code === 201) {
                                            setCoreUpload(resp2.data.data.result)
                                            setUploaded(true)
                                            setUploading(false)
                                        }
                                    })
                                    .catch(err => {
                                        console.log("Error Message", err.response);
                                        setUploading(false)
                                    })
                            }
                        })
                        .catch(err => {
                            console.error(err.response);
                            setUploading(false)
                        })
                }
            })
            .catch(err => {
                console.log("Error Message", err.response);
            })

    }

    const sendData = () => {
        setLoading(true)

        axios.post(`${BASE_URL}${JOIN_AUCTION}`, {
            "sale_id": props.id,
            "products_id": props.selectProducts,
            "recommender": props.RecommenderData,
            "medias": [CoreUpload]
        })
            .then(resp => {
                setLoading(false)
                if ((resp.data.code === 201) || (resp.data.code === 200)) {
                    message.success("درخواست شما با موفقیت ثبت شد.")
                    setPosted(true)
                }
            })
            .catch(err => {
                console.error(err);
                message.error("دوباره تلاش کنید")
                setLoading(false)
            })
    }
    if (posted) {
        return (
            <Redirect to={{ pathname: "/auctions/" }} />
        )
    }

    return (
        <>
            <div className="container bg-white">
                <div className="mrgt15 file-group">
                    <p><a href="#" className="text-secondary"><i className="fal fa-arrow-to-bottom"></i>برای دانلود نمونه قرارداد اینجا کلیک کنید.</a></p>
                    <div className="form-group">
                        <button type="button" className="btn-upload"><i className="fal fa-sign-out"></i>آپلود</button>
                        <input
                            type="file"
                            accept=".pdf, .rar"
                            className="default-input"
                            onClick={(e) => e.target.value = ""}
                            onChange={(e) => handleUpload(e)}
                        />
                    </div>
                    {Uploading ? <span style={{ marginRight: 5 }}> درحال آپلود </span> : ""}
                    {Uploaded ? <CheckCircleTwoTone style={{ marginRight: 5 }} twoToneColor="#52c41a" /> : ""}
                </div>

                <div className="btns">
                    <button
                        type="button"
                        className="btn-gray"
                        onClick={() => {
                            setSelectComponent(selectComponent - 1)
                        }}>بازگشت</button>
                    <button
                        type="button"
                        className="btn-default ms-2"
                        onClick={() => sendData()}
                        disabled={!Uploaded}>
                        {loading ? <LoadingOutlined style={{ marginLeft: 5 }} /> : ""}
                        ثبت نهایی</button>
                </div>

            </div>
        </>
    )
}

export default AuctionRegistrationContract;