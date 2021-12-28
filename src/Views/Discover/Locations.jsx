import React from 'react';
import Footer from '../../components/footer';
import {useHistory} from 'react-router-dom';


function Locations() {

    const history = useHistory()

    return (
        <React.Fragment>
            <div className="container" id="filterside-fl-location">
                <div className="sidebar-header">
                    <button onClick={()=>history.goBack()} type="button" className="btn-back">
                    <i className="fal fa-chevron-left"></i>
                    </button>
                    <div className="input-group search">
                    <input
                        type="text"
                        className="default-input"
                        placeholder="جستجوی موقعیت مکانی"
                    />
                    <button type="button" className="btn-searchlocation">
                        <i className="far fa-map-marker-alt"></i>
                    </button>
                    </div>
                </div>
                <div className="main-filter">
                    <ul className="main-filterlist">
                    <li className="active">
                        <a href="#">تهران</a><span className="fal fa-times"></span>
                    </li>
                    <li className="active">
                        <a href="#">تبریز</a><span className="fal fa-times"></span>
                    </li>
                    </ul>
                </div>
                <div className="main-list">
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked
                        value=""
                        id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault"> تهران </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault1"
                    />
                    <label className="form-check-label" for="flexCheckDefault1">
                        شیراز
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault2"
                    />
                    <label className="form-check-label" for="flexCheckDefault2"> مشهد </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked
                        value=""
                        id="flexCheckDefault3"
                    />
                    <label className="form-check-label" for="flexCheckDefault3">
                        تبریز
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault4"
                    />
                    <label className="form-check-label" for="flexCheckDefault4">
                        بوشهر
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault5"
                    />
                    <label className="form-check-label" for="flexCheckDefault5">
                        کردستان
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault6"
                    />
                    <label className="form-check-label" for="flexCheckDefault6"> قم </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault7"
                    />
                    <label className="form-check-label" for="flexCheckDefault7">
                        ایلام
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault8"
                    />
                    <label className="form-check-label" for="flexCheckDefault8">
                        قزوین
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault9"
                    />
                    <label className="form-check-label" for="flexCheckDefault9">
                        کردستان
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault10"
                    />
                    <label className="form-check-label" for="flexCheckDefault10"> قم </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault11"
                    />
                    <label className="form-check-label" for="flexCheckDefault11">
                        ایلام
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault12"
                    />
                    <label className="form-check-label" for="flexCheckDefault12">
                        قزوین
                    </label>
                    </div>
                </div>
            </div>

            <Footer/>

        </React.Fragment>
    )
}

export default Locations
