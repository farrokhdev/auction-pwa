import React , {useState} from 'react';
import Footer from '../../components/footer';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterQueries, clearFilters } from '../../redux/reducers/discover/discover.actions'
import authService from "../../services/auth.service";


function AuctionTypes(props) {

    const history = useHistory()
    const [auctionTypeList, setAuctionTypeList] = useState([
        {id : 1 , title : "زنده"} , 
        {id : 2 , title : "آنلاین"} , 
        {id : 3 , title : "آفلاین"} , 
        {id : 4 , title : "زمان‌دار"} , 
        {id : 5 , title : "حراج با پیشنهاد قیمت مخفی"} , 
        {id : 6 , title : "حراج با دومین پیشنهاد قیمت مخفی"} , 
    ])


  
  
      const handleSetCategory = (value) => {    
        props.setFilterQueries({...props.discover , type : value});
      }
  
  
      console.log("** type ** ---->>>>> " , props.discover.type);


    return (
        <React.Fragment>
            <div className="container" id="filterside-fl-type">
                <div className="sidebar-header">
                    <button onClick={()=>history.goBack()} type="button" className="btn-back">
                    <i className="fal fa-chevron-left"></i>
                    </button>
                    <div className="input-group search">
                    <input type="text" className="default-input" placeholder="جستجوی نوع" />
                    </div>
                </div>


                <div className="main-list">


                {auctionTypeList?.map( item => (

                    <div key={item?.id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked={props.discover.type.length ? props.discover.type.includes(item?.title) : false}

                            onClick={(e)=>{
                        
                            if (e.currentTarget.checked)
                                {
                                    handleSetCategory( [...props.discover.type ,  item?.title] );
                                }
                            else {
                                    handleSetCategory( props.discover.type?.filter(type => type !== item?.title) )
                        }}}
                      
                        />
                        <label className="form-check-label" for="flexCheckDefault100">
                            {item?.title}
                        </label>
                        </div>

                    ))}

                </div>
                </div>

            <Footer/>
        </React.Fragment>
    )
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AuctionTypes)