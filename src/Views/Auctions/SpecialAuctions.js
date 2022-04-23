import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pic1thumb from "../../assets/img/pic1-thumb.jpg";
import pic2thumb from "../../assets/img/pic2-thumb.jpg";
import pic3thumb from "../../assets/img/pic3-thumb.jpg";
import axios from "../../utils/request";
import { BASE_URL } from "../../utils";
import queryString from "query-string";
import Timer from "react-compound-timer";
import { Pagination, Spin } from "antd";
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import moment from "jalali-moment";
import { AuctionType } from "../../utils/converTypePersion";
import PaginationComponent from "../../components/PaginationComponent";

function SpecialAuctions(props) {
  const [Auctions, setAuctions] = useState("");

  const [countAuctions, setCountAuctions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    page_size: 9,
    search: "",
    category: [],
    date_after: "",
    date_before: "",
    ordering: "-creation_time",
    home_auction_name: [],
    type: [],
    visible_in_site: true,
    status: [],
  });

  const queries = queryString.stringify(params);

  console.log("countAuctions==>", countAuctions);
  let getProducts;
  if (props.data === "withoutParams") {
    getProducts = () => {
      setLoading(true);
      axios
        .get(`${BASE_URL}/sale/auctions/?${queries}`)
        .then((resp) => {
          setLoading(false);
          if (resp.data.code === 200) {
            setAuctions(resp.data.data.result);
            setCountAuctions(resp.data.data.count);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    };
  } else {
    getProducts = () => {
      setLoading(true);
      axios
        .get(`${BASE_URL}/sale/auctions/?${queries}`)
        .then((resp) => {
          setLoading(false);
          if (resp.data.code === 200) {
            setAuctions(resp.data.data.result);
            setCountAuctions(resp.data.data.count);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    };
  }

  console.log(Auctions);

  useEffect(() => {
    getProducts();
  }, [params]);

  const handeSelectPage = (e) => {
    setParams({
      ...params,
      page: e,
    });
  };

  const handleSetDate = (dateFrom, dateTo) => {
    setParams({
      ...params,
      start_date_before: dateTo
        ? moment
            .from(dateTo, "fa", "YYYY/MM/DD")
            .locale("en")
            .format("YYYY-MM-DD")
        : "",
      start_date_after: dateFrom
        ? moment
            .from(dateFrom, "fa", "YYYY/MM/DD")
            .locale("en")
            .format("YYYY-MM-DD")
        : "",
    });
  };

  function onChange(dates, dateStrings) {
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    handleSetDate(
      dateStrings ? dateStrings[0] : {},
      dateStrings ? dateStrings[1] : {}
    );
  }

  function timeExpire(time) {
    let expire = new Date(time);
    let now = new Date();
    if (expire > now) {
      return expire - now;
    } else {
      return 0;
    }
  }

  const Like = (data, action) => {
    if (action) {
      axios.delete(`${BASE_URL}/following/${data}`).then((resp) => {
        getProducts();
      });
    } else {
      axios
        .post(`${BASE_URL}/following/`, {
          content_type: "auction",
          object_id: data,
          activity_type: "mark",
        })
        .then((resp) => {
          if (resp.data.code === 201) {
            getProducts();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <ConfigProvider locale={fa_IR} direction="rtl">
          {props.activeKey === "2" ? (
            <DatePickerJalali.RangePicker
              onChange={onChange}
              className="rounded"
              responsive={true}
            />
          ) : (
            ""
          )}
        </ConfigProvider>

        {Auctions && Auctions?.length >= 1
          ? Auctions.map((item) => {
              return (
                <div className="fw-block">
                  <Link to={`/auctions/details/${item?.id}`}>
                    <div className="img-block">
                      <div
                        className="auction_custm_list"
                        style={{
                          display: "flex",
                          gridTemplateColumns: "1fr 1fr 1fr !important",
                        }}
                      >
                        {item?.product_media?.map((media_item, k) => {
                          return (
                            <div
                              className="img-box"
                              style={{ width: "130px", height: "130px" }}
                            >
                              <img
                                src={
                                  media_item?.exact_url
                                    ? media_item?.exact_url
                                    : ""
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                                alt="Smart Auction"
                                className="img-fluid"
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="tags-block">
                        <div className="auction-category online">
                          {AuctionType(item.type)}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex-between">
                    <div className="flex-col">
                      <h5 className="artist-name">{item.title}</h5>
                    </div>
                  </div>
                  <div className="flex-between">
                    <div className="flex-col">
                      <h5 className="auction-house-name">{item.house}</h5>
                    </div>
                    <div className="flex-col">
                      <span className="auction-date">
                        {" "}
                        {item.status == "CLOSED" ? (
                          <div className="ended">
                            <div className="text">حراج به پایان رسید</div>
                          </div>
                        ) : (
                          <Timer
                            initialTime={timeExpire(item.end_time)}
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
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        Like(
                          item?.following?.bookmark?.is_active
                            ? item?.following?.bookmark?.id
                            : item?.id,
                          item?.following?.bookmark?.is_active
                        )
                      }
                      className={
                        "btn-favorite  " +
                        (item?.following?.bookmark?.is_active ? "active" : "")
                      }
                    ></button>
                  </div>
                </div>
              );
            })
          : ""}
        <PaginationComponent
          count={countAuctions}
          handeSelectPage={handeSelectPage}
        />
      </Spin>
    </>
  );
}

export default SpecialAuctions;
