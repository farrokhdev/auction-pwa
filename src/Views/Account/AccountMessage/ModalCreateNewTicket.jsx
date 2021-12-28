import React , {useState , useEffect} from 'react'
import { Modal , message , Select , Form } from "antd";
import authService from '../../../services/auth.service';

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

function ModalCreateNewTicket(props) {

    const { Option } = Select;
    const [categoriTicket, setCategoriTicket] = useState([]);

    const onFinish = (values) => {
        // get title & body & category and create ticket
        authService.createNewTicket(values?.title , values?.body , values?.category)
            .then(res => {
                if(res.data.code === 201){
                    message.success("تیکت با موفقیت ایجاد شد")
                    handleCancel()
                    setTimeout(() => {
                        window.location.reload()
                }, 700);
                
                
                }
            }).catch(err => {
                message.error("ایجاد تیکت با خطا مواجه شد")
            })
      };

    useEffect(() => {
        getCategoryTicket()
     }, [])


    const handleOk = () => {
        props.setVisibleSendNewTicket(false);
    };

    const handleCancel = () => {
        props.setVisibleSendNewTicket(false);
    };

    // get list of category of ticket
    const getCategoryTicket = () => {
        authService.categoryTicket().then(res => {
            setCategoriTicket(res.data.data.result)
        })
    }

    return (
        <Modal 
            title={"تیکت جدید"} 
            visible={props.visibleSendNewTicket} 
            onOk={handleOk} 
            onCancel={handleCancel}
            className="modal-create-ticket"
            footer={[]}>
                <Form {...layout} 
                    name="control-ref" 
                    onFinish={onFinish}>
                    <div className="modal-body">
                        <div className="">
                            <label className="default-lable">دسته‌بندی</label>
                            <Form.Item                   
                                name="category"
                                rules={[{ 
                                        required: true ,
                                        message: 'موضوعی را انتخاب نکرده‌اید!'
                                    }]}>
                                        <Select
                                        className="text-right"
                                        notFoundContent = {' '}
                                        allowClear
                                    >
                
                                        {categoriTicket?.length ? categoriTicket?.map(category => (
                                        <Option className="text-right" value={category?.id}>{category?.title}</Option>
                                    ))  : null }
                
                                    </Select>
                            </Form.Item>
                        </div>

                        <div className="">
                            <label className="default-lable">عنوان</label>
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                    }
                                ]}>
                        
                                <div className="d-flex justify-content-center align-items-center w-100 ">
                                    
                                    <input 
                                        type="text" 
                                        class="default-input" 
                                        placeholder="عنوان مورد نظر را وارد نمایید."
                                    />

                                </div>
                            </Form.Item>

                        </div>
                        <div className="">
                            <label className="default-lable">توضیحات</label>

                            <Form.Item
                                name="body"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                    }
                                ]}>
                        
                                <div className="d-flex justify-content-center align-items-center ">
                                    
                                    <textarea 
                                        rows="3" 
                                        className="default-input"
                                        placeholder="متن مورد نظر خود را وارد نمایید."
                                    />
                                        
                                </div>
                            </Form.Item>
                        </div>
                     
                    </div>
                    <div className="modal-footer">
                  

                        <button 
                            onClick={handleCancel}
                            className="btn btn-cancel-ticket" 
                        >
                                انصراف
                        </button>

                        <button 
                            htmlType="submit"
                            className="btn btn-default" 
                        >
                                ارسال
                        </button>
                    </div>
                </Form>
      </Modal>
    )
}

export default ModalCreateNewTicket;
