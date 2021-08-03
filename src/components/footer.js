import { NavLink as NavLinkRouter } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="row footer">
                <div className="col">
                    <button type="button" className="btn-footer">
                        <NavLinkRouter activeClassName="active" to="/discover" className="btn-footer ">
                            <i className="fal fa-search"></i>
                            <span className="bottomnav">جستجو</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer ">
                        <NavLinkRouter activeClassName="active" to="/auctions" className="btn-footer ">
                            <i className="fal fa-gavel"></i>
                            <span className="bottomnav">حراج‌ها</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer">
                        <NavLinkRouter activeClassName="active" to="/bids" className="btn-footer ">
                            <i className="fal fa-hand-paper"></i>
                            <span className="bottomnav">پیشنهادها</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer">
                        <NavLinkRouter activeClassName="active" to="/favorit" className="btn-footer ">
                            <i className="fal fa-heart"></i>
                            <span className="bottomnav">علاقه‌مندی‌ها</span>
                        </NavLinkRouter>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn-footer ">
                        <NavLinkRouter activeClassName="active" to="/account" className="btn-footer ">
                            <i className="fal fa-user"></i>
                            <span className="bottomnav">پروفایل</span>
                        </NavLinkRouter>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;