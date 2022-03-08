import React, { useState, useEffect, useRef } from "react";
import AccountHeader from "../../../components/AccountHeader";
import Footer from "../../../components/footer";
import axios from "../../../utils/request";
import { BASE_URL } from "../../../utils";
import { message } from "antd";
import { Modal } from "react-bootstrap";
import { TRANSACTION } from "../../../utils/constant";

function AccountWallet() {
  const [Wallet, setWallet] = useState("");
  let numeral = require("numeral");



  const getWallet = () => {
    axios
      .get(`${BASE_URL}/accounting/wallet/me/`)
      .then((resp) => {
        if (resp.data.code === 200) {
          setWallet(resp.data.data.result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWallet();
  }, []);


// TRANSACTION 



  const [show, setShow] = useState(false);
  const [amountValue, setAmountValue] = useState("");
  const [payload, setPayload] = useState({
    transaction_type: "decrease",
    amount: 111,
  });


  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };

useEffect(()=>{
setPayload({...payload ,amount: amountValue })
},[amountValue])



  const transactionChanger = (e)=>{
    setAmountValue(e.target.value)
  }


  const getFromWallet = () => {
    axios
      .post(`${BASE_URL}/accounting/transaction/`, payload)
      .then((res) => {
        if (res.data.code == 201) {
          message.success("برداشت با موفقیت انجام شد");
          hideModal();
          return res;
        }
      })
      .catch((err) => {
        message.error("برداشت با خطا مواجه شد");
        hideModal();
        return err;
      });
  };

// TRANSACTION END


  return (
    <>
      <div className="container bg-white">
        <AccountHeader titlePage={"کیف پول"} />
        <div className="main-content" id="wallet-page">
          <div className="wallet-container">
            <h6 className="default">اعتبار نقدی</h6>
            <h3 className="default">
              {numeral(Wallet.inventory).format("0,0")}
              <span className="unit">تومان</span>
            </h3>
          </div>
          <div className="row mrgtb15 pt-4 px-2">
            <div className="col">
              <button
                type="button"
                className="btn-main"
                data-bs-toggle="modal"
                data-bs-target="#increasecreadit"
              >
                افزایش اعتبار
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn-main"
                data-bs-toggle="modal"
                data-bs-target="#withdrawal"
                onClick={showModal}
              >
                برداشت از حساب
              </button>
            </div>
          </div>
          <div className="wallet-container">
            <h6 className="default">اعتبار هدیه</h6>
            <h3 className="default">
              {numeral(Wallet.gift_credit).format("0,0")}
              <span className="unit">تومان</span>
            </h3>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="increasecreadit"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog w-100 ">
          <div className="modal-content h-50">
            <div className="modal-header">
              <div className="display">
                <div className="">
                  <h2 className="default titr">افزایش اعتبار</h2>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body text-center pt-5 h-50">
              <h3 className="default">
                {numeral(Wallet.inventory).format("0,0")}
                <span className="price-unit">تومان</span>
              </h3>
              <h6 className="default">اعتبار نقدی</h6>
              <div className="search-input">
                <label className="default-lable pt-5">
                  مبلغ مورد نظر خود را وارد نمایید.
                </label>
                <input
                  type="text"
                  className="default-input"
                  placeholder="100,000"
                />
                <span className="unit">تومان</span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default">
                پرداخت
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={hideModal}>
        <div className="modal-dialog w-100">
          <div className="modal-content h-100" style={{border:"none"}}>
            <div className="modal-header">
              <div className="display">
                <div className="">
                  <h2 className="default titr">برداشت از حساب</h2>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body text-center pt-5">
              <h3 className="default">
                {numeral(Wallet.inventory).format("0,0")}{" "}
                <span className="price-unit">تومان</span>
              </h3>
              <h6 className="default">اعتبار نقدی</h6>
              <div className="search-input">
                <label className="default-lable pt-5">
                  مبلغ مورد نظر خود را وارد نمایید.
                </label>
                <input
                  type="text"
                  className="default-input"
                  placeholder="100,000"
                  value={amountValue}
                  onChange={(e)=>transactionChanger(e)}
                />
                <span className="unit">تومان</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={getFromWallet}
              >
                برداشت از حساب
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* <div
      ref={transactionModalRef}
        className="modal fade"
        id="withdrawal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog w-100">
          <div className="modal-content h-100">
            <div className="modal-header">
              <div className="display">
                <div className="">
                  <h2 className="default titr">
                    برداشت از حساب
                  </h2>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body text-center pt-5">
              <h3 className="default">
                {numeral(Wallet.inventory).format("0,0")}{" "}
                <span className="price-unit">تومان</span>
              </h3>
              <h6 className="default">اعتبار نقدی</h6>
              <div className="search-input">
                <label className="default-lable pt-5">
                  مبلغ مورد نظر خود را وارد نمایید.
                </label>
                <input
                  type="text"
                  className="default-input"
                  placeholder="100,000"
                />
                <span className="unit">تومان</span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default"  onClick={getFromWallet}>
                برداشت از حساب
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}

export default AccountWallet;
