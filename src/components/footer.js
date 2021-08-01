import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faGavel, faHandPaper, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'
import {NavLink as NavLinkRouter} from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn-footer">
                        <NavLinkRouter activeClassName="active" to="/discover" className="btn-footer ">
                            <FontAwesomeIcon icon={faSearch}/>
                            <span className="bottomnav">جستجو</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer ">
                        <NavLinkRouter activeClassName="active" to="/auctions" className="btn-footer ">
                            <FontAwesomeIcon icon={faGavel}/>
                            <span className="bottomnav">حراج‌ها</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer">
                        <NavLinkRouter activeClassName="active" to="/bids" className="btn-footer ">
                            <FontAwesomeIcon icon={faHandPaper}/>
                            <span className="bottomnav">پیشنهادها</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer">
                        <NavLinkRouter activeClassName="active" to="/" className="btn-footer ">
                            <FontAwesomeIcon icon={faHeart}/>
                            <span className="bottomnav">علاقه‌مندی‌ها</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer ">
                        <NavLinkRouter activeClassName="active" to="/account" className="btn-footer ">
                            <FontAwesomeIcon icon={faUser}/>
                            <span className="bottomnav">پروفایل</span>
                        </NavLinkRouter>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;