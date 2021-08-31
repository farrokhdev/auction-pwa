import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import avatar from '../../assets/img/avatar.jpg';
import AccountHeader from '../../components/AccountHeader';
import { useDispatch } from 'react-redux';
import { clearStorageAll } from '../../redux/reducers/all/all.actions';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { EDIT_PROFILE } from '../../utils/constant';
import { message } from 'antd';

function Account() {
    const dispatch = useDispatch();
    const [user, setUser] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`${BASE_URL}${EDIT_PROFILE}`)
            .then(resp => {
                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setUser(resp.data.data.result)
                }
            })
            .catch(err => {
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"پروفایل"} />
                <div className="sidebar-body" id="account-page">
                    <div className="img-block flex-start">
                        <div className="img-artists">
                            <img src={avatar} width="534" height="534" alt="avatar" className="img-fluid" />
                        </div>
                        <div className="flex-col">
                            <h5 className="artist-name">{user?.first_name}</h5>
                        </div>
                    </div>
                    <ul className="sidebar-filterlist mrgt15">
                        <li><Link to="/account/my-profile"><i className="fal fa-user"></i>پروفایل من<span></span></Link></li>
                        {/* <li><Link to="/account/my-auctions"><i className="fal fa-gavel"></i>حراج‌های من<span></span></Link></li> */}
                        <li><Link to="/account/won-item"><i className="fal fa-hand-paper"></i>موارد برنده شده<span></span></Link></li>
                        <li><Link to="/account/messages"><i className="fal fa-envelope"></i>پیام‌ها<span></span></Link></li>
                        <li><Link to="/account/wallet"><i className="fal fa-wallet"></i>کیف پول<span></span></Link></li>
                        <li><Link to="/account/financialinfo"><i className="fal fa-wallet"></i>اطلاعات مالی<span></span></Link></li>
                    </ul>
                    <h6 className="default mrgt30">تنظیمات</h6>
                    <ul className="sidebar-filterlist mrgt15">
                        <li><Link to="/account/change-password"><i className="fal fa-lock"></i>تغییر رمز عبور<span></span></Link></li>
                        {/* <li><Link to="/"><i className="fal fa-bell"></i>اعلان‌ها<span></span></Link></li>
                        <li><Link to="/"><i className="fal fa-info"></i>درباره ما<span></span></Link></li>
                        <li><Link to="/"><i className="fal fa-align-left"></i>شرایط و قوانین<span></span></Link></li>
                        <li><Link to="/"><i className="fal fa-question"></i>راهنما<span></span></Link></li> */}
                        <li><Link to="/auth/login" onClick={() => { dispatch(clearStorageAll()) }}><i className="fal fa-sign-out"></i>خروج<span></span></Link></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Account;