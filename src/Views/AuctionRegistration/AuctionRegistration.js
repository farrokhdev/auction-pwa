import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountHeader from '../../components/AccountHeader';
import Footer from '../../components/footer';
import AuctionRegistrationContract from './AuctionRegistrationContract';
import AuctionRegistrationFavorite from './AuctionRegistrationFavorite';
import AuctionRegistrationIntroduce from './AuctionRegistrationIntroduce';
import AuctionRegistrationValue from './AuctionRegistrationValue';

function AuctionRegistration(props) {

    const listComponent = [
        // {name:"اطلاعات شخصی",value:1},
        // {name:"اطلاعات مالی",value:2},
        { name: "علاقه‌مندی‌ها", value: 1 },
        { name: "مقادیر", value: 2 },
        { name: "معرف", value: 3 },
        { name: "قرارداد", value: 4 },
    ]

    const [selectComponent, setSelectComponent] = useState(1);
    const [selectProducts, setSelectProducts] = useState("");
    const [RecommenderData, setRecommender] = useState("");

    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auctions/details"} titlePage={"عضویت در حراج"} />
                <div className="sidebar-body mrgt30" id="auction-register">


                    <div className="row">
                        <div className="wizard">
                            <ul className="wizard-list">
                                {
                                    listComponent.map((item, i) => <li key={i} className={selectComponent === item?.value && "current"}>
                                        <span className="d-none d-md-inline-block"> {item?.name}</span>
                                        <span className="wizard-mobile d-md-none"> {item?.name}</span>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                    <ul className="sidebar-filterlist">
    
                        {/* <li className="complete"><Link to={`/auction-registration/Personalinfo/${props.Auction?.id}`}>اطلاعات فردی
                        <span>تکمیل شده</span>
                        </Link></li>
                        <li className="inprogress"><Link to={`/auction-registration/financialinfo/${props.Auction?.id}`}>اطلاعات مالی
                        <span>در حال تکمیل</span>
                        </Link></li> */}
                    </ul>
                </div>

                {selectComponent === 1 && <AuctionRegistrationFavorite
                    setSelectComponent={setSelectComponent}
                    selectComponent={selectComponent}
                    setSelectProducts={setSelectProducts}
                    id={props.id} />}
                {selectComponent === 2 && <AuctionRegistrationValue
                    setSelectComponent={setSelectComponent}
                    selectComponent={selectComponent}
                    selectProducts={selectProducts}
                />}
                {selectComponent === 3 && <AuctionRegistrationIntroduce
                    setSelectComponent={setSelectComponent}
                    selectComponent={selectComponent}
                    setRecommender={setRecommender}
                />}
                {selectComponent === 4 && <AuctionRegistrationContract
                    setSelectComponent={setSelectComponent}
                    selectComponent={selectComponent}
                    selectProducts={selectProducts}
                    RecommenderData={RecommenderData}
                    id={props.id}
                />}
            </div>
            <Footer />
        </>
    )
}

export default AuctionRegistration;