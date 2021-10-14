import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Link from "../Link/Link";
import UserService from "../../api/user.service";
import auth from "../../api/auth.service";







const Nav = () => {
  const [navClass, setNavClass] = useState("");
  const [toggeledNav, settoggeledNav] = useState(false);
  const [ad,setAdmin]= useState(false);
  const [use, setUse] = useState(false);
 
  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let navClass = "";
      if (window.scrollY >= 200) {
        navClass = "scrolled";
      }
      setNavClass(navClass);
    });
    const user = auth.getCurrentUser();
    if (user) {
      setUse(true);
    

    UserService.getUser().then(
      (response) => {},
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.error(resMessage);
        if (resMessage!==null ) {
          setUse(false);
          auth.logout();
          
        }
      }
    );
    
    if(user.roles[0]==="ROLE_ADMIN"){
      setAdmin(true);
      UserService.getAdmin().then(
        (response) => {},
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.error(resMessage);
          if (resMessage!==null ) {
            setUse(false);
            setAdmin(false);
            auth.logout();
            
          }
        }
      );}}

  }, [use]);
  return (
    <nav className={`navbar navbar-expand-md bg-light ${navClass}`}>
      <div className="container-sm">
        <a className="navbar-brand" href="/">
          <span>Akura</span>
          <i className="fas fa-circle ml-1" />
        </a>
        <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return "open";
            return "";
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return "show";
            return "";
          })()}`}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link target="/" offset={-120} classes="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link target="/books" classes="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link target="/stationeries" classes="nav-link">
                Stationeries
              </Link>
            </li>
            <li className="nav-item">
              <Link target="/contact" classes="nav-link">
                Contact us
              </Link>
            </li>
            <li className="nav-item">
              <Link target="/about" classes="nav-link">
                About us
              </Link>
            </li>
            {ad && (<li className="nav-item">
              <Link target="/dash" classes="nav-link">
                DashBoard
              </Link>
            </li>)}
            <li className="nav-item">
              {use ? (
                <Button
                  className="nav-button"
                  type="button"
                  variant="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    auth.logout();
                    setUse(!use);
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="nav-button"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/login";
                  }}
                >
                  Login
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
