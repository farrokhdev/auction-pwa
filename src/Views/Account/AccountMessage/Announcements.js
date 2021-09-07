import React, { useState } from 'react';
import ModalDetailMessage from './ModalDetailMessage';
import authService from '../../../services/auth.service';

function Announcements({ messagesBox }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailMessage, setDetailMessage] = useState()

    const handleShowModal = (id) => {

        authService.messageDetail(id).then(res => {
            console.log(res);
            setDetailMessage(res?.data?.data?.result)

            setTimeout(() => {
                setIsModalVisible(true)
            }, 300);
        })

    }

    return (
        <>
            {
                messagesBox?.map(message => {
                    return (
                        <React.Fragment>
                            <div onClick={() => handleShowModal(message?.message?.id)} className="fw-block new-notices">
                                <div className="flex-between align-items-start">
                                    <div className="flex-col">
                                        <h6 className="default text-right">{message?.message?.title}</h6>
                                    </div>
                                    <div className="flex-col">
                                        {!message?.is_read ? <i className="fal fa-circle"></i> : null}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <p className="text-right">{message?.message?.body}</p>
                                </div>

                            </div>
                        </React.Fragment>
                    )
                })
            }
            <ModalDetailMessage
                detailMessage={detailMessage}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
            />



        </>
    )
}

export default Announcements;