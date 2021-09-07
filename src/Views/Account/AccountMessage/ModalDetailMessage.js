import React, { useState } from 'react';
import { Modal } from 'antd';

const ModalDetailMessage = ({ detailMessage, isModalVisible, setIsModalVisible }) => {

  console.log("detailMessage -->> ", detailMessage);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <>

      <Modal 
        title={detailMessage?.message?.title} 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[]}
        >

        <p>{detailMessage?.message?.body}</p>

      </Modal>
    </>
  );
};

export default ModalDetailMessage;