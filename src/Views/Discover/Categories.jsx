import React , {useState , useEffect} from "react";
import Footer from '../../components/footer';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterQueries, clearFilters } from '../../redux/reducers/discover/discover.actions'
import authService from "../../services/auth.service";

function Categories(props) {

    const history = useHistory()

    const [categories, setCategories] = useState([])


    useEffect(() => {
      getCategoriesAuctions();
    }, [])


    const getCategoriesAuctions = () => {
      authService.getCategories()
        .then((resp) => {
          setCategories(resp.data.data.result)
        })
        .catch((err) => {
          console.error(err.response);
        });
    };


    const handleSetCategory = (value) => {    
      props.setFilterQueries({...props.discover , category : value});
    }


        
        console.log("** categories ** ---->>>>> " , props.discover.category);

  return (
    <React.Fragment>
      <div className="container" id="filterside-fl-category">
        <div className="sidebar-header">
          <button onClick={()=>history.goBack()} type="button" className="btn-back">
            <i className="fal fa-chevron-left"></i>
          </button>
          <div className="input-group search">
            <input type="text" className="default-input" placeholder="دسته‌بندی" />
            <button type="button" className="btn-searchlocation"></button>
          </div>
        </div>

        <div className="main-list">

          {categories?.map( item  => (

              <div key={item?.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={props.discover.category.length ? props.discover.category.includes(item?.title) : false}

                  onClick={(e)=>{
                
                    if (e.currentTarget.checked)
                        {
                          handleSetCategory( [...props.discover.category ,  item?.title] );
                        }
                    else {
                          handleSetCategory( props.discover.category?.filter(categoryItem => categoryItem !== item?.title) )
                }}}
           
                />
                <label className="form-check-label" for="flexCheckDefault100">
                  {item?.title}
                </label>
              </div>

          ))}




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


export default connect(mapStateToProps, mapDispatchToProps)(Categories)