import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import logo from "../../assets/img/logo.svg";
import pic1 from "../../assets/img/pic1.jpg";
import Timer from "react-compound-timer";
import authService from "../../services/auth.service";
import queryString from "query-string";
import { connect } from 'react-redux';
import { setFilterQueries, clearFilters } from '../../redux/reducers/discover/discover.actions'
import CardItems from "./CardItems";


function Discover(props) {

const [resultSearchAndFilters, setResultSearchAndFilters] = useState({
  auctions : [] , 
  home_auctions : [] , 
  products : [] , 

})

console.log("resultSearchAndFilters?.auctions?.length " , resultSearchAndFilters?.auctions?.length);
console.log("resultSearchAndFilters?.auctions?.length " , resultSearchAndFilters?.home_auctions?.length);
console.log("resultSearchAndFilters?.auctions?.length " , resultSearchAndFilters?.products?.length);

let results = [...resultSearchAndFilters?.auctions , ...resultSearchAndFilters?.home_auctions , ...resultSearchAndFilters?.products]
console.log("results .... >>" , results.length);
console.log("results .... >>" , results);
// const [params, setparams] = useState(props.discover)

console.log("props.Discover ---->>>>> ", props.discover);
console.log("list auctions  ---->>>>> ", resultSearchAndFilters?.auctions);
// console.log("list home_auctions  ---->>>>> ", resultSearchAndFilters?.home_auctions);
// console.log("list products  ---->>>>> ", resultSearchAndFilters?.products);

  const queries = queryString.stringify(props.discover);

  const handleSearch = () => {
    authService.searchDiscover(queries)
      .then((resp) => {
        setResultSearchAndFilters(resp.data)
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  // const Like = () => {
  //   setActive(!Active);
  // };
  // function timeExpire(time) {
  //   let expire = new Date(time);
  //   let now = new Date();
  //   if (expire > now) {
  //     return expire - now;
  //   } else {
  //     return 0;
  //   }
  // }

  // const handleShowFilters = () => {
  //   setVisible(true)
  // }


  useEffect(() => {
    handleSearch()
  }, [props.discover])



  const handleSerchInput = (data) => {
    props.setFilterQueries({...props.discover , search : data})
  }

  const handleRemoveFilters = () => {
    props.clearFilters();
  }


  return (
    <React.Fragment>
      <div className="container">
        <div className="top-header flex-between">
          <a href="#">
            <img
              src="img/logo.svg"
              width="156"
              height="34"
              alt="Smart auction logo"
            />
          </a>
          <button type="button" className="notification new-notice">
            <i className="fal fa-bell"></i>
          </button>
        </div>


    


        <div className="d-flex input-group search">

          <input
            type="text"
            className="default-input"
            placeholder="جستجوی اثر، حراج و خانه حراج"
            onChange = {(e)=>handleSerchInput(e.target.value)}
          />
          
       
      
          <Link to="/discover/filters">
            <button   type="button" className="btn-advancesearch">
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
            <li id="l-house">
              <Link to="/discover/houseAuctions">خانه حراج</Link>
            </li>
            <li id="l-type">
              <Link to="/discover/types">نوع</Link>
            </li>   
            
            <li id="l-type">
              <button onClick={handleRemoveFilters} className="btn-erase">پاک کردن فیلترها</button>
            </li>

          </ul>

         
        </div>
        <div className="main-content" id="artworks">

          {results?.length ? results?.map( itemResult => (
            <>
                <CardItems 
                  auction={itemResult}
                  type={itemResult?.title}
                  url={itemResult?.media?.exact_url}
                
                />
            </>
          )) :  "نتیجه‌ای یافت نشد" }


          {/* <div className="fw-block">
            <div className="row">
              <div className="col-4 col-lg-2">
                <div className="img-block">
                  <img
                    src="img/pic1.jpg"
                    width="493"
                    height="621"
                    alt="Smart Auction"
                    className="img-fluid"
                  />
                  <div className="tags-block">
                    <div className="auction-category online">آنلاین</div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-10">
                <div className="flex-between">
                  <div className="flex-col">
                    <h5 className="artist-name">سهراب سپهری</h5>
                    <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                  </div>
                  <div className="flex-col">
                    <button type="button" className="btn-favorite active"></button>
                  </div>
                </div>
                <div className="flex-between align-items-baseline mrgt20 mrgb5">
                  <div className="flex-col">
                    <div className="price">
                      <span>400 - </span>
                      <span>700</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                  <div className="flex-col right-align">
                    <div
                      className="jumbotron countdown show start"
                      data-Date="2021/7/30 16:09:00"
                    >
                      <div className="running">
                        <timer>
                          <span className="days"></span>
                          <span className="gutter-5"> : </span>
                          <span className="hours"></span>
                          <span className="gutter-5"> : </span>
                          <span className="minutes"></span>
                          <br />
                          <span className="show-text"></span>
                        </timer>
                        <div className="break"></div>
                      </div>
                      <div className="ended">
                        <div className="text">پایان یافته</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-between">
                  <div className="flex-col">
                    <span className="price-title">پیشنهاد شروع:</span>
                    <div className="price">
                      <span>195</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>






          <div className="fw-block">
            <div className="row">
              <div className="col-4 col-lg-2">
                <div className="img-block">
                  <img
                    src="img/pic2.jpg"
                    width="998"
                    height="880"
                    alt="Smart Auction"
                    className="img-fluid"
                  />
                  <div className="tags-block">
                    <div className="auction-category live">زنده</div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-10">
                <div className="flex-between">
                  <div className="flex-col">
                    <h5 className="artist-name">سهراب سپهری</h5>
                    <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                  </div>
                  <div className="flex-col">
                    <button type="button" className="btn-favorite"></button>
                  </div>
                </div>
                <div className="flex-between align-items-baseline mrgt20 mrgb5">
                  <div className="flex-col">
                    <div className="price">
                      <span>400 - </span>
                      <span>700</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                  <div className="flex-col right-align">
                    <div
                      className="jumbotron countdown show end"
                      data-Date="2021/7/30 16:09:00"
                    >
                      <div className="running">
                        <timer>
                          <span className="days"></span>
                          <span className="gutter-5">:</span>
                          <span className="hours"></span>
                          <span className="gutter-5">:</span>
                          <span className="minutes"></span>
                          <span className="show-text"></span>
                        </timer>
                        <div className="break"></div>
                      </div>
                      <div className="ended">
                        <div className="text">پایان یافته</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-between">
                  <div className="flex-col">
                    <span className="price-title">
                      پیشنهاد فعلی <span className="num-bids">(12 بید):</span>
                    </span>
                    <div className="price">
                      <span>195</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fw-block">
            <div className="row">
              <div className="col-4 col-lg-2">
                <div className="img-block">
                  <img
                    src="img/pic3.jpg"
                    width="998"
                    height="880"
                    alt="Smart Auction"
                    className="img-fluid"
                  />
                  <div className="tags-block">
                    <div className="auction-category timed">مدت‌دار</div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-10">
                <div className="flex-between">
                  <div className="flex-col">
                    <h5 className="artist-name">سهراب سپهری</h5>
                  </div>
                  <div className="flex-col">
                    <button type="button" className="btn-favorite"></button>
                  </div>
                </div>
                <div className="flex-between align-items-baseline mrgt20 mrgb5">
                  <div className="flex-col">
                    <div className="price">
                      <span>400 - </span>
                      <span>700</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                  <div className="flex-col right-align">
                    <div
                      className="jumbotron countdown show end"
                      data-Date="2021/7/30 16:09:00"
                    >
                      <div className="running">
                        <timer>
                          <span className="days"></span>
                          <span className="gutter-5">:</span>
                          <span className="hours"></span>
                          <span className="gutter-5">:</span>
                          <span className="minutes"></span>
                          <span className="show-text"></span>
                        </timer>
                        <div className="break"></div>
                      </div>
                      <div className="ended">
                        <div className="text">پایان یافته</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-between">
                  <div className="flex-col">
                    <span className="price-title">
                      پیشنهاد فعلی <span className="num-bids">(12 بید):</span>
                    </span>
                    <div className="price">
                      <span>195</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fw-block">
            <div className="row">
              <div className="col-4 col-lg-2">
                <div className="img-block">
                  <img
                    src="img/pic4.jpg"
                    width="570"
                    height="470"
                    alt="Smart Auction"
                    className="img-fluid"
                  />
                  <div className="tags-block">
                    <div className="auction-category firstoffer">اولین پیشنهاد</div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-10">
                <div className="flex-between">
                  <div className="flex-col">
                    <h5 className="artist-name">سهراب سپهری</h5>
                    <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                  </div>
                  <div className="flex-col">
                    <button type="button" className="btn-favorite"></button>
                  </div>
                </div>
                <div className="flex-between align-items-baseline mrgt20 mrgb5">
                  <div className="flex-col">
                    <div className="price">
                      <span>400 - </span>
                      <span>700</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                  <div className="flex-col right-align">
                    <div
                      className="jumbotron countdown show end"
                      data-Date="2021/7/30 16:09:00"
                    >
                      <div className="running">
                        <timer>
                          <span className="days"></span>
                          <span className="gutter-5">:</span>
                          <span className="hours"></span>
                          <span className="gutter-5">:</span>
                          <span className="minutes"></span>
                          <span className="show-text"></span>
                        </timer>
                        <div className="break"></div>
                      </div>
                      <div className="ended">
                        <div className="text">پایان یافته</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-between">
                  <div className="flex-col">
                    <span className="price-title">
                      پیشنهاد فعلی <span className="num-bids">(12 بید):</span>
                    </span>
                    <div className="price">
                      <span>195</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fw-block">
            <div className="row">
              <div className="col-4 col-lg-2">
                <div className="img-block">
                  <img
                    src="img/pic5.jpg"
                    width="470"
                    height="587"
                    alt="Smart Auction"
                    className="img-fluid"
                  />
                  <div className="tags-block">
                    <div className="auction-category secondoffer">
                      دومین پیشنهاد
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-10">
                <div className="flex-between">
                  <div className="flex-col">
                    <h5 className="artist-name">سهراب سپهری</h5>
                    <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                  </div>
                  <div className="flex-col">
                    <button type="button" className="btn-favorite"></button>
                  </div>
                </div>
                <div className="flex-between align-items-baseline mrgt20 mrgb5">
                  <div className="flex-col">
                    <div className="price">
                      <span>400 - </span>
                      <span>700</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                  <div className="flex-col right-align">
                    <div
                      className="jumbotron countdown show end"
                      data-Date="2021/7/30 16:09:00"
                    >
                      <div className="running">
                        <timer>
                          <span className="days"></span>
                          <span className="gutter-5">:</span>
                          <span className="hours"></span>
                          <span className="gutter-5">:</span>
                          <span className="minutes"></span>
                          <span className="show-text"></span>
                        </timer>
                        <div className="break"></div>
                      </div>
                      <div className="ended">
                        <div className="text">پایان یافته</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-between">
                  <div className="flex-col">
                    <span className="price-title">
                      پیشنهاد فعلی <span className="num-bids">(12 بید):</span>
                    </span>
                    <div className="price">
                      <span>195</span>
                      <span className="unit">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}



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


export default connect(mapStateToProps, mapDispatchToProps)(Discover)