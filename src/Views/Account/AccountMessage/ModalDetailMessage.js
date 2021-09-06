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


            footer={[
              <Button key="back" type="primary" onClick={handleCancel}>
                بستن
              </Button>
            ]}

          className="modal-detail-message" 
          title={detailMessage?.message?.title} 
          visible={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}>

        {<p dangerouslySetInnerHTML={{__html: detailMessage?.message?.body}} /> }

      </Modal>
    </>
  );
};

export default ModalDetailMessage;