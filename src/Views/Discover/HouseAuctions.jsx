import React, { useState, useEffect } from "react";
import Footer from "../../components/footer";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setFilterQueries,
  clearFilters,
} from "../../redux/reducers/discover/discover.actions";
import authService from "../../services/auth.service";

function HouseAuctions(props) {
  const history = useHistory();

  const [houseAuctionList, setHouseAuctionList] = useState([]);

  useEffect(() => {
    getListHouseAuctions();
  }, []);

  const getListHouseAuctions = () => {
    authService
      .getListHouseAuctions()
      .then((resp) => {
        setHouseAuctionList(resp.data.data.result);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const handleSetCategory = (value) => {
    props.setFilterQueries({ ...props.discover, home_auction: value });
  };

  console.log("** categories ** ---->>>>> ", props.discover.home_auction);

  return (
    <React.Fragment>
      <div className="container" id="filterside-fl-house">
        <div className="sidebar-header">
          <button
            onClick={() => history.goBack()}
            type="button"
            className="btn-back"
          >
            <i className="fal fa-chevron-left"></i>
          </button>
          <div className="input-group search">
            <input
              type="text"
              className="default-input"
              placeholder="جستجو در خانه‌های حراج"
            />
          </div>
        </div>
        <div className="main-list">
          {/* {houseAuctionList?.map(item => (

            <div key={item?.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={props.discover.home_auction.length ?  props.discover.home_auction.includes(item?.home_auction_name) : false}

                onClick={(e)=>{
              
                  if (e.currentTarget.checked)
                      {
                        handleSetCategory( [...props.discover.home_auction ,  item?.home_auction_name] );
                      }
                  else {
                        handleSetCategory( props.discover.home_auction?.filter(house => house !== item?.home_auction_name) )
              }}}
               
              />
        <label className="form-check-label" for="flexCheckDefault100">
          {item?.home_auction_name}
        </label>
      </div>

      ))}
 */}

          {/* <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault200"
            />
            <label className="form-check-label" for="flexCheckDefault200">
              گالری آرتیبیشن
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault201"
            />
            <label className="form-check-label" for="flexCheckDefault201">
              گالری هان
            </label>
          </div>
 */}
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
  };
};

const mapStateToProps = (store) => {
  return {
    discover: store.discoverReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseAuctions);
