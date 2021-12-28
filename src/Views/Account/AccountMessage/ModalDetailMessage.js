import React, { useState } from 'react';
import { Modal  , Button} from 'antd';

const ModalDetailMessage = ({ detailMessage, isModalVisible, setIsModalVisible  }) => {

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


        {<p dangerouslySetInnerHTML={{__html: detailMessage?.message?.body}} /> }

      </Modal>
    </>
  );
};

export default ModalDetailMessage;