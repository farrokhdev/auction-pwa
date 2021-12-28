import React, { useState } from "react";
import { Modal , message , Input , Form } from "antd";
import avatar from "../../../assets/img/avatar.jpg";
import moment from "jalali-moment";
import BoxUserTicket from "./BoxUserTicket";
import BoxAdminTicket from "./BoxAdminTicket";
import authService from "../../../services/auth.service";
import BoxFristUserTicket from "./BoxFristUserTicket";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

function ModalDetailTicket(props) {
    const { confirm } = Modal;

    const onFinish = (values) => {
        console.log(values);

        authService.ticketReply(props.ticketDetial?.id , values?.body)
            .then(res => {
                message.success("تیکت با موفقیت ارسال شد")
                setTimeout(() => {
                    window.location.reload()
                }, 700);
            })
      };


        const handleOk = () => {
            props.setIsModalVisible(false);
        };

        const handleCancel = () => {
            props.setIsModalVisible(false);
        };


        const handleCloseTicket = (id) => {

            showDeleteConfirm(id)

      
        }

        function showDeleteConfirm(id) {
            confirm({
              title: 'بستن تیکت',
              icon: <ExclamationCircleOutlined />,
              content: 'بعد بستن تیکت امکان ارسال تیکت وجود ندارد!',
              okText: 'بستن',
              okType: 'danger',
              cancelText: 'انصراف',
              className: "conrifm-close-ticket",
              onOk() {
                console.log('OK');

                authService.closeTicket(id).then(res => {
                    message.success("تیکت با موفقیت بسته شد")
                    setTimeout(() => {
                        handleCancel()
                    }, 700);
                })
              },
              onCancel() {
                console.log('Cancel');
                handleCancel()
              },
            });
          }


  return (
    <>
      <Modal
        title={"تیکت"}
        visible={props.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="modal-detail-ticket "
        footer={[
            <footer>
                    {props?.ticketDetial?.state !== "close"  ?  
                <div class=" send-txt w-100">
                    <Form {...layout} 
                        name="control-ref" 
                        onFinish={onFinish}>

                        <Form.Item
                            // className="form-group"
                            name="body"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                        
                        <div className="d-flex justify-content-center align-items-center w-100 ">
                            
                                <input 
                                    type="text" class="default-input" 
                                    placeholder="متن خود را اینجا بنویسید."
                                />
                                <button htmlType="submit">
                                    <span className="bg-danger">
                                        <i  className="fal fa-chevron-circle-right icon-send-reply"></i>
                                    </span>
                                </button>

                               
                        </div>
                        </Form.Item>

                        
                    </Form> 

                    <div className="d-flex">
                        <button onClick={handleCancel} className="btn btn-cancel-ticket mx-2">انصراف</button>
                        <button onClick={(e) => handleCloseTicket(props.ticketDetial?.id)} className="btn btn-close-ticket ">بستن تیکت</button>
                    </div> 
                </div> : null }
            </footer>
          ]}
        
      >

            <BoxFristUserTicket 
                ticketDetial={props.ticketDetial}
            />



        {props.ticketDetial?.reply?.length ? props.ticketDetial?.reply?.map( reply => (
            <>

            {props.ticketDetial?.owner?.id === reply?.owner?.id ? 

                <BoxUserTicket 
                    ticketDetial={props.ticketDetial}
                    reply={reply}
                /> : 
                    
                <BoxAdminTicket 
                    ticketDetial={props.ticketDetial}
                    reply={reply}
                />
            }
                
            </>
        )) : null}

      </Modal>
    </>
  );
}

export default ModalDetailTicket;
