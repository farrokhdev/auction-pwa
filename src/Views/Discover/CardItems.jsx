import React from "react";
import classnames from 'classnames';
import { convertTypeAuctionToPersian } from "../../utils/converTypePersion";


function CardItems({type ,  auction , url}) {

    // console.log("auction ****" , auction?.type);


  return (
    <div className="fw-block">
      <div className="row">
        <div className="col-4 col-lg-2">
          <div className="img-block">
            <img
              src={url}
              width="493"
              height="621"
              alt="Smart Auction"
              className="img-fluid"
            />


                {/* <div class="tags-block">
                  <div class="auction-category online">آنلاین</div>
                </div> */}


            <div className="tags-block">
              <div 
                className={classnames( "auction-category",{
                    "live": auction?.type === "LIVE",
                    "online": auction?.type === "ONLINE",
                    "timed": auction?.type === "PERIODIC",
                    "firstoffer": auction?.type === "HIDDEN",
                    "secondoffer": auction?.type === "SECOND_HIDDEN",
                                
                })}   >
                    {convertTypeAuctionToPersian(auction?.type)}
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
  );
}

export default CardItems;
