import React from "react";
import Footer from "../../components/footer";
import { Link  , useHistory} from "react-router-dom";
import { connect } from 'react-redux';
import { setFilterQueries , clearFilters} from '../../redux/reducers/discover/discover.actions';

function FiltersSearchDiscover(props) {

  const history = useHistory()

  const handleRemoveFilters = () => {
    props.clearFilters();
  }

 const handleSetFilters = () => {
   window.location.href = "/discover"
 }


  return (
    <React.Fragment>
      <div className="container ">
        <div className="sidebar-header">
          {/* <button type="button" className="btn-close"></button> */}
          <button onClick={()=>history.goBack()} type="button" className="btn-back">
              <i className="fal fa-chevron-left"></i>
          </button>
          <h3 className="main-title">فیلتر</h3>
          <button onClick={handleRemoveFilters} type="button" className="btn-erase">
            پاک کردن همه
          </button>
        </div>
        <div className="sidebar-body">
          <div className="form-group">
            <label className="default-label">
              <i className="fal fa-sort-amount-up"></i>مرتب‌سازی بر اساس
            </label>
            <select
              className="form-select default-input"
              aria-label="Default select example"
            >
              <option selected>جدیدترین</option>
              <option value="1">محبوب‌ترین</option>
              <option value="2">آخرین</option>
            </select>
          </div>
          <div className="sidebar-filter">
            <h5 className="default-label">
              <i className="fal fa-filter"></i>فیلتر بر اساس
            </h5>
            <ul className="sidebar-filterlist">
              {/* <Link to="/discover/locations">
                <li id="fl-location ">
                  <a href="#">
                    <i className="fal fa-map-marker-alt"></i>موقعیت مکانی
                    <span>1 انتخاب</span>
                  </a>
                </li>
              </Link> */}
              <Link to="/discover/categories">
                <li id="fl-category">
                  <a href="#">
                    <i className="fal fa-pallet-alt"></i>دسته‌بندی
                    <span>2 انتخاب</span>
                  </a>
                </li>
              </Link>

              <Link to="/discover/houseAuctions">
                <li id="fl-house">
                  <a href="#">
                    <i className="fal fa-home"></i>خانه حراج<span>1 انتخاب</span>
                  </a>
                </li>
              </Link>

              <Link to="/discover/types">
                <li id="fl-type">
                  <a href="#">
                    <i className="fal fa-map-marker-alt"></i>نوع<span>همه</span>
                  </a>
                </li>
              </Link>
            </ul>
            <button onClick={handleSetFilters} type="button" className="btn-main ">
              نمایش نتایج
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}




const mapDispatchToProps = (dispatch) => {
  return {
    setFilterQueries: (data) => dispatch(setFilterQueries(data)),
    clearFilters: () => dispatch(clearFilters()),
  }
}

const mapStateToProps = (store) => {
  return {
    discover: store.discoverReducer
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FiltersSearchDiscover)