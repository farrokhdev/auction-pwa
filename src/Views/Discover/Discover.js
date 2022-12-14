import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Timer from "react-compound-timer";
import authService from "../../services/auth.service";
import queryString from "query-string";
import { connect } from "react-redux";
import {
  setFilterQueries,
  clearFilters,
} from "../../redux/reducers/discover/discover.actions";
import { Empty, Spin } from "antd";
import classnames from "classnames";
import { convertToEn } from "../../utils/converTypePersion";
import Logo from "../../assets/img/logo.svg";
import axios from "../../utils/request";
import { BASE_URL } from "../../utils";
import { message } from "antd";

// let numeral = require('numeral');

function Discover(props) {
  const [loading, setLoading] = useState(true);
  const [Notification, setNotification] = useState({});
  const [resultSearchAndFilters, setResultSearchAndFilters] = useState({
    auctions: [],
    home_auctions: [],
    products: [],
  });

  const queries = queryString.stringify(props.discover);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/messaging/inbox/unread_count/`)
      .then((resp) => {
        setLoading(false);

        if (resp.data.code === 200 && resp.data?.data?.result) {
          setNotification(resp.data?.data?.result);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        message.error("صفحه را دوباره لود کنید");
      });
  };
  const handleSearch = () => {
    setLoading(true);
    authService
      .searchDiscover(queries)
      .then((resp) => {
        setResultSearchAndFilters(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.response);
        setLoading(false);
      });
  };

  function timeExpire(time) {
    let expire = new Date(time);
    let now = new Date();
    if (expire > now) {
      return expire - now;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    handleSearch();
  }, [props.discover]);

  const handleSerchInput = (data) => {
    props.setFilterQueries({ ...props.discover, search: data });
  };

  const handleRemoveFilters = () => {
    props.clearFilters();
  };

  const SearchType = (type, item) => {
    switch (type) {
      case "products":
        return (
          <>
            <Link
              to={`/auctions/one-artwork/${item?.id}`}
              className="artwork-block w-25"
            >
              <div style={{ minHeight: "120px" }} className="fw-block my-3">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <div className="img-block">
                      <Link to={`/auctions/one-artwork/${item?.id}`}>
                        <img
                          style={{
                            backgroundImage: `url(${
                              item?.media?.exact_url
                                ? item?.media?.exact_url
                                : ""
                            })`,
                            height: "8rem",
                          }}
                          className="img-fluid image-custom-back"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-8 col-lg-10">
                    <div className="flex-between">
                      <div className="flex-col">
                        <h5 className="artist-name">{item?.artwork_title}</h5>
                        <h5 className="auction-house-name">
                          {item?.latest_auction?.house?.home_auction_name}
                        </h5>
                      </div>
                      {/* <div className="flex-col">
                                            <button
                                              onClick={() =>
                                                props.addBookmark(
                                                    item?.following?.bookmark?.is_active?
                                                    item?.following?.bookmark?.id :
                                                        item?.id, item?.following?.bookmark?.is_active)
                                            }
                                                type="button"
                                                className={"btn-favorite " + (item?.following?.bookmark?.is_active ? "active" : "")}
                                            ></button>
                                        </div> */}
                    </div>
                    {/* <div className="flex-between align-items-baseline mrgt15">
                                        <div className="flex-col">
                                            <div className="price">
                                                <span>{`${numeral(item?.min_price).format('0,0')} - ${numeral(item?.max_price).format('0,0')}`}  </span>
                                                <span className="unit">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <span className="price-title">پیشنهاد شروع :</span>
                                            <div className="price">
                                                <span>{numeral(item.price).format('0,0')}</span>
                                                <span className="unit">تومان</span>
                                            </div>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      case "auctions":
        return (
          <Link to={`/auctions/details/${item?.id}/`} className="artwork-block">
            <div style={{ minHeight: "120px" }} className="fw-block my-3">
              <div className="row">
                <div className="col-4 col-lg-2">
                  <div className="img-block image-card-auction">
                    <img
                      style={{
                        backgroundImage: `url(${
                          item?.media?.exact_url ? item?.media?.exact_url : ""
                        })`,
                        height: "8rem",
                      }}
                      className="img-fluid image-custom-back"
                    />
                    <div className="tags-block">
                      <div
                        className={classnames("auction-category", {
                          live: item?.type === "LIVE",
                          online: item?.type === "ONLINE",
                          timed: item?.type === "PERIODIC",
                          firstoffer: item?.type === "HIDDEN",
                          secondoffer: item?.type === "SECOND_HIDDEN",
                        })}
                      >
                        <p className="mb-0 type-aucition">
                          {convertToEn(item?.type)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8 col-lg-10">
                  <div className="flex-between">
                    <div className="flex-col">
                      <h5 className="artist-name">{item?.title}</h5>
                      <h5 className="auction-house-name">
                        {item?.house?.home_auction_name}
                      </h5>
                    </div>
                    {/* <div className="flex-col">
                                <button type="button" className="btn-favorite active"></button>
                              </div> */}
                  </div>
                  <div
                    className="jumbotron countdown show start"
                    data-Date="2021/06/05 16:09:00"
                  >
                    {item?.status === "CLOSED" ? (
                      <div className="ended">
                        <div className="text">حراج به پایان رسید</div>
                      </div>
                    ) : (
                      <Timer
                        initialTime={timeExpire(item?.end_time)}
                        direction="backward"
                      >
                        {() => (
                          <div
                            style={{
                              direction: "ltr",
                              textAlign: "right",
                            }}
                          >
                            <Timer.Days /> :
                            <Timer.Hours /> :
                            <Timer.Minutes /> :
                            <Timer.Seconds />
                          </div>
                        )}
                      </Timer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );

      case "home_auctions":
        return (
          <>
            <Link
              to={`/auctions/details/${item?.id}/`}
              className="artwork-block"
            >
              <div style={{ minHeight: "120px" }} className="fw-block my-3">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <div className="img-block image-card-auction">
                      <img
                        style={{
                          backgroundImage: `url(${
                            item?.media ? item?.media[1]?.exact_url : ""
                          })`,
                          height: "8rem",
                        }}
                        className="img-fluid image-custom-back"
                      />
                      <div className="tags-block">
                        <div
                          className={classnames("auction-category", {
                            live: item?.type === "LIVE",
                            online: item?.type === "ONLINE",
                            timed: item?.type === "PERIODIC",
                            firstoffer: item?.type === "HIDDEN",
                            secondoffer: item?.type === "SECOND_HIDDEN",
                          })}
                        >
                          <p className="mb-0 type-aucition">
                            {convertToEn(item?.type)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-8 col-lg-10">
                    <div className="flex-between">
                      <div className="flex-col">
                        <h5 className="artist-name">
                          {item?.home_auction_name
                            ? item?.home_auction_name
                            : "---"}
                        </h5>
                      </div>
                      {/* <div className="flex-col">
                            <button type="button" className="btn-favorite active"></button>
                          </div> */}
                    </div>

                    <div className="col-xl-7 col-9">
                      <button
                        type="button"
                        className="btn-follow follow_ct_btn"
                      >
                        دنبال کردن
                      </button>

                      <div className="h-block-info contact_ct_btn">
                        <a
                          href={item?.phone ? item?.phone : item?.mobile}
                          className="info-tel all-info"
                        >
                          {item?.phone ? item?.phone : item?.mobile}
                        </a>

                        <address className="all-info">
                          {item?.home_auction_location?.address
                            ? item?.home_auction_location?.address
                            : "---"}
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
    }
  };

  const SearchResults = (data) => {
    console.log("DATA ::: >>> ", data.data);
    // if (params.object_type === '' && params.search !== "") {
    return (
      <>
        {data.data.auctions
          ? data.data.auctions.map((item) => {
              return SearchType("auctions", item);
            })
          : ""}
        {data.data.products
          ? data.data.products.map((item) => {
              return SearchType("products", item);
            })
          : ""}

        {data.data.home_auctions
          ? data.data.home_auctions.map((item) => {
              return SearchType("home_auctions", item);
            })
          : ""}
      </>
    );
    // }
  };

  return (
    <React.Fragment>
      <div className="Spin-loader">
        <Spin spinning={loading}>
          <div className="container">
            <div className="top-header flex-between">
              <Link to="/auctions">
                <img
                  src={Logo}
                  width="156"
                  height="34"
                  alt="Smart auction logo"
                />
              </Link>
              <Link to="/account/messages">
                <button
                  type="button"
                  className={classnames({
                    "notification new-notice": Notification?.count,
                    notification: !Notification?.count,
                  })}
                >
                  <i className="fal fa-bell"></i>
                </button>
              </Link>
            </div>

            <div className="d-flex input-group search">
              <input
                type="text"
                className="default-input"
                placeholder="جستجوی اثر، حراج و خانه حراج"
                onChange={(e) => handleSerchInput(e.target.value)}
              />

              <Link to="/discover/filters">
                <button type="button" className="btn-advancesearch">
                  <i className="far fa-sliders-h"></i>
                </button>
              </Link>
            </div>

            <div className="main-filter">
              <ul className="main-filterlist">
                {/* <li id="l-location">
                <Link to="/discover/locations">موقعیت مکانی</Link>
              </li> */}

                <li id="l-category">
                  <Link to="/discover/categories">دسته‌بندی</Link>
                </li>
                {/* <li id="l-house">
                  <Link to="/discover/houseAuctions">خانه حراج</Link>
                </li> */}
                <li id="l-house">
                  <Link to="/discover/houseAuctions">آثار</Link>
                </li>
                <li id="l-type">
                  <Link to="/discover/types">حراج ها</Link>
                </li>

                <li id="l-type">
                  <button onClick={handleRemoveFilters} className="btn-erase">
                    پاک کردن فیلترها
                  </button>
                </li>
              </ul>
            </div>

            <div className="main-content" id="artworks">
              {resultSearchAndFilters?.auctions?.length &&
              resultSearchAndFilters?.products?.length &&
              resultSearchAndFilters?.home_auctions?.length ? (
                <SearchResults data={resultSearchAndFilters} />
              ) : (
                <div className="d-flex justify-content-center ">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{
                      height: 60,
                    }}
                    description={<span>نتیجه‌ای یافت نشد</span>}
                  ></Empty>
                </div>
              )}
            </div>
          </div>
        </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
